#!/usr/bin/env bash
# SEO 自动推送：把本次部署新增/修改的文章 URL 推给 IndexNow(Bing等) 和百度
# 由 deploy.sh 在 git push 成功后自动调用；也可手动执行 ./seo-push.sh
# Google 无普通内容的推送 API（Indexing API 仅限招聘/直播页），靠 sitemap 自动抓取，无需处理
set -uo pipefail
cd "$(dirname "$0")"

SITE="aisurf.cc"

# IndexNow 密钥（对应文件 source/<key>.txt 已随站部署）
INDEXNOW_KEY="41699b6c66a682d18c6c418b516c728e"

# 百度 API 推送 token 从本地私密文件读取（seo-push.secret.sh 已 gitignore，仓库公开也不泄露）
# 注意：API 的 site 参数必须用裸域名 aisurf.cc（不带 https://），脚本已按此拼接
BAIDU_TOKEN=""
[ -f ./seo-push.secret.sh ] && . ./seo-push.secret.sh

# ---- 1. 收集本次变动的文章 ----
# 参数 $1 = 本次推送前上游 SHA（deploy.sh 传入）；为空则回退对比上一次提交
RANGE="${1:-}"
if [ -z "$RANGE" ]; then
  RANGE=$(git rev-parse HEAD~1 2>/dev/null || echo "")
fi
if [ -n "$RANGE" ]; then
  POSTS=$(git diff --name-only "$RANGE" HEAD -- source/_posts/ 2>/dev/null \
    | sed 's|^source/_posts/||; s|\.md$||' | grep -v '^$' || true)
else
  POSTS=""
fi

if [ -z "$POSTS" ]; then
  echo "SEO推送: 本次部署无文章变动，跳过"
  exit 0
fi

URLS="https://$SITE/"
URL_LIST="\"https://$SITE/\""
while IFS= read -r p; do
  URLS="$URLS
https://$SITE/$p/"
  URL_LIST="$URL_LIST, \"https://$SITE/$p/\""
done <<< "$POSTS"

echo "SEO推送: 变动文章 $(echo "$POSTS" | wc -l) 篇，推送以下 URL："
echo "$URLS" | sed 's/^/  /'

# ---- 2. IndexNow（一次覆盖 Bing、Yandex 等） ----
echo "--> IndexNow (Bing)..."
HTTP_CODE=$(curl -s -m 20 -o /tmp/indexnow_resp.txt -w "%{http_code}" -X POST \
  "https://api.indexnow.org/indexnow" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d "{\"host\": \"$SITE\", \"key\": \"$INDEXNOW_KEY\", \"keyLocation\": \"https://$SITE/$INDEXNOW_KEY.txt\", \"urlList\": [$URL_LIST]}")
BODY=$(head -c 200 /tmp/indexnow_resp.txt)
echo "    HTTP $HTTP_CODE $BODY"
case "$HTTP_CODE" in
  200|202) echo "    ✅ IndexNow 推送成功";;
  *) echo "    ⚠️ IndexNow 未成功（若密钥文件刚随本次部署上线，属正常，下次部署再推）";;
esac

# ---- 3. 百度 API 推送 ----
if [ -z "$BAIDU_TOKEN" ]; then
  echo "--> 百度推送: 未配置 BAIDU_TOKEN，跳过"
  echo "    配置方法：百度搜索资源平台 → 普通收录 → API 推送，复制 token 填到本文件顶部 BAIDU_TOKEN"
else
  echo "--> 百度 API 推送..."
  RESP=$(curl -s -m 20 -X POST "http://data.zz.baidu.com/urls?site=$SITE&token=$BAIDU_TOKEN" \
    -H "Content-Type: text/plain" --data-binary "$URLS")
  echo "    $RESP"
  case "$RESP" in
    *success*) echo "    ✅ 百度推送成功";;
    *) echo "    ⚠️ 百度推送未成功（新站配额为 0 属正常，配额下发后自动生效）";;
  esac
fi
