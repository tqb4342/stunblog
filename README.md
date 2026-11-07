# stunblog - 拾光集（Hexo + Stun 主题）

用 hexo-theme-stun 主题新建的 Hexo 博客，接替旧版手写静态骨架（D:/cfblog）。
文章 URL 规则 `posts/:title/` 与旧版保持一致，无缝衔接。

## 目录结构

```
stunblog/
├── _config.yml        # 站点配置（title/url/permalink 等）
├── _config.stun.yml   # Stun 主题配置（拾光集定制版）
├── package.json       # 依赖：Hexo 5.1.1 + 渲染器/生成器（与主站同版本）
├── scaffolds/         # 新建文章模板
├── source/
│   ├── _posts/hello-world.md   # 已从 cfblog 迁移
│   └── about/index.md          # 关于页，已迁移
└── themes/stun/       # 主题（需手动 git clone，见下）
```

## 首次启动（手动执行）

```bash
cd D:/stunblog

# 1. 安装依赖（约 2-3 分钟）
npm install

# 2. 本地预览
npx hexo server
```

浏览器打开 http://localhost:4000 查看效果。

## 写新文章

```bash
cd D:/stunblog
npx hexo new post "文章标题"
# 编辑 source/_posts/文章标题.md，写完 npx hexo server 预览
```

## 部署到 Cloudflare Pages

**保姆级教程见 [DEPLOY.md](DEPLOY.md)**（从建仓库到上线的完整图文步骤，小白向）。

### 快速版（熟手）

### 第一步：推 GitHub（手动执行）

先在 GitHub 网页上新建空仓库（如 `stunblog`，不要勾选 README/.gitignore），然后：

```bash
cd D:/stunblog
git init
git add -A
git commit -m "init: Hexo + Stun blog"
git branch -M main
git remote add origin git@github.com:你的用户名/stunblog.git   # 用 SSH 地址，避开 443 连接重置
git push -u origin main
```

### 第二步：Cloudflare Pages 建项目

1. 开代理访问 dash.cloudflare.com → **Workers & Pages → Create → Pages → Connect to Git**
2. 选中刚才的仓库
3. 构建配置：
   - Framework preset 选 **Hexo**（选不中的话手动填）
   - Build command：`npx hexo generate`
   - Build output directory：`public`
4. 环境变量（Settings → Environment variables → Add）：
   - `NODE_VERSION` = `18`（Hexo 5.1.1 配 Node 18 稳定；报错可换 16 或 20 试）
5. **Save and Deploy**，约 1-2 分钟后 `项目名.pages.dev` 上线

之后每次 `git push`，站点自动重新构建发布。

### 第三步：替换域名占位符

拿到 `xxx.pages.dev` 域名（或绑定自定义域名）后，改 `_config.yml`：

```yaml
url: https://你的实际域名
```

重新 push 一次即可（影响 canonical、RSS 等绝对链接）。

### 第四步（可选）：绑自定义域名 + 搜索引擎收录

- Pages 项目 → Custom domains → Add；域名 DNS 在 Cloudflare 的话一条记录全自动，证书自动签发
- 到 Google Search Console / Bing / 百度站长平台提交 `https://你的域名/sitemap.xml`
  （需要 sitemap 的话：`npm install hexo-generator-sitemap --save` 并在 `_config.yml` 加 `sitemap: {path: sitemap.xml}`）

## 上线前替换

`_config.yml` 中 `url: https://DOMAIN` 替换为实际域名。

## 常用定制位置

| 想改什么 | 位置 |
|----------|------|
| 站名/描述/作者 | `_config.yml` 顶部 Site 段 |
| Banner 标题副标题 | `_config.stun.yml` → `header.banner` |
| 导航菜单 | `_config.stun.yml` → `menu` |
| 侧栏头像/座右铭 | `_config.stun.yml` → `author` |
| 社交链接 | `_config.stun.yml` → `social` |
| Header 高度（默认 50%，可改回 80%） | `_config.stun.yml` → `header.height` |
| 评论系统 | `_config.stun.yml` → Comment config 段 |

## 主题升级

当前 `themes/stun/` 是 zip 解压版（git 直连被墙，走的 codeload 压缩包下载），
**不能 `git pull`**。升级方式二选一：

```bash
# 方式一：网络通畅时重新 clone 成 git 版（推荐，一劳永逸）
cd D:/stunblog
rm -rf themes/stun
git clone git@github.com:liuyib/hexo-theme-stun.git themes/stun   # SSH 方式，避开 443 重置

# 方式二：继续用 zip
curl -L -o stun.zip https://codeload.github.com/liuyib/hexo-theme-stun/zip/refs/heads/master
unzip -q stun.zip && rm -rf themes/stun && mv hexo-theme-stun-master themes/stun && rm stun.zip
```

站点级定制都在 `_config.stun.yml`，升级不丢配置。

> 注意：hexo-theme-stun 已停止维护（最后更新 2022-11），Hexo 5.1.1 下可正常使用。
> 若未来遇到兼容问题，可考虑换 NexT 等维护中的主题。
