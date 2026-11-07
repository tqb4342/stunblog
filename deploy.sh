#!/usr/bin/env bash
# 一键发布：本地验证构建 -> 提交 -> 推送（Cloudflare 自动部署）
# 用法：./deploy.sh            （默认提交信息）
#       ./deploy.sh "新文章：xxx"（自定义提交信息）
set -e
cd "$(dirname "$0")"

echo "==> [1/3] 本地构建验证..."
npx hexo clean && npx hexo generate

echo "==> [2/3] 提交..."
git add -A
git commit -m "${1:-update: 发布新内容}"

echo "==> [3/3] 推送 GitHub，触发线上部署..."
git push

echo ""
echo "✅ 完成！1-2 分钟后线上生效：https://aisurf.cc"
