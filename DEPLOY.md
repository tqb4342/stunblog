# 拾光集部署教程（Cloudflare Pages 保姆级）

从零到上线，每一步照抄即可。全程约 20 分钟（不含等待时间）。

**整体思路**：本地写文章 → 推到 GitHub → Cloudflare 自动拉取、自动构建、自动发布。
以后你只需要管"写文章 + 推送"这两件事，其余全自动。

**前置条件**（已具备可跳过）：
- 一个 GitHub 账号（你主站在用，已有）
- 一个邮箱（注册 Cloudflare 用）
- 能开代理（访问 GitHub 网页和 Cloudflare 控制台需要）

---

## 第 0 步：本地先跑通（约 3 分钟）

部署前先确认网站在本地正常，别把半成品推上去。

打开 PowerShell，逐条执行：

```bash
cd D:/stunblog
```
> 进入网站目录。

```bash
npm install
```
> 安装 Hexo 和依赖，约 2-3 分钟，刷屏是正常的。最后一行出现 `added xxx packages` 且没有 `ERR!` 就算成功。

```bash
npx hexo server
```
> 启动本地预览。看到 `Hexo is running at http://localhost:4000` 就成功了。

浏览器打开 **http://localhost:4000**——能看到深色大 Banner"拾光集"、文章卡片、右上角 🌜/🌞 切换按钮，就说明一切正常。

确认没问题后，回到 PowerShell 按 `Ctrl + C` 停掉预览（会问 `Terminate batch job?`，按 `Y` 回车）。

---

## 第 1 步：在 GitHub 网页上建一个空仓库

1. 开代理，浏览器打开 **https://github.com/new**（已登录状态）
2. 照下面填：
   - **Repository name**：`stunblog`（名字随意，后面要用到，建议就这个）
   - **Description**：可以不填
   - 选 **Private**（私有，别人看不到源码）或 Public 都行，Cloudflare 两种都能连
   - **下面三个勾全部不勾**：不要 Add a README file、不要 .gitignore、不要 license
   > 为什么要空仓库？因为本地已经有完整的文件了，空仓库才能干净地推上去，不会产生冲突。
3. 点绿色按钮 **Create repository**
4. 建好后页面会显示一串命令——**先别操作**，回到本教程第 2 步

---

## 第 2 步：把网站推上 GitHub（本地命令）

打开 PowerShell，逐条执行：

```bash
cd D:/stunblog
```

```bash
git init
```
> 把这个文件夹变成 git 仓库（只需执行一次，重复执行也无害）。

```bash
git add -A
git commit -m "init: Hexo + Stun blog"
```
> 把所有文件打包成一次提交。`-m` 后面是说明文字，随意。

```bash
git branch -M main
```
> 把分支命名为 main（GitHub 默认主分支名）。

```bash
git remote add origin git@github.com:你的用户名/stunblog.git
```
> 告诉 git 远程仓库在哪。**注意两点**：
> 1. 把 `你的用户名` 换成你的 GitHub 用户名（比如 `tqb4342`）
> 2. **必须用 `git@github.com:` 开头的 SSH 地址**，不要用 `https://github.com/...` 开头的——后者会报 `Connection was reset`（443 直连被墙），你之前遇到过
>
> 你的主站一直在用 SSH 方式推送，所以电脑上已经配好了 SSH 密钥，直接就能用。
> 不放心可以先测一下：`ssh -T git@github.com`，回车后看到 `Hi 你的用户名!` 就是通的。

```bash
git push -u origin main
```
> 正式推送。第一次推会在 GitHub 网页上看到文件了（刷新仓库页面）。

**如果 push 卡住或报错**：九成是没走 SSH 或 SSH 密钥问题，报错信息发给我看。

---

## 第 3 步：在 Cloudflare 上创建 Pages 项目

1. 开代理，浏览器打开 **https://dash.cloudflare.com**
2. 没有账号：点 **Sign up**，用邮箱注册（免费计划就够）；有账号直接 **Log in**
3. 登录后，左侧菜单找 **Workers & Pages**（工作量和页面），点进去
4. 点右上角蓝色按钮 **Create**（创建），顶部切到 **Pages** 标签页，点 **Connect to Git**（连接到 Git）
5. 首次会要求授权 GitHub：点 **Install & Authorize**（安装并授权），授权时要选中 `stunblog` 这个仓库
6. 回到 Cloudflare 页面，仓库列表里选 **stunblog**，点 **Begin setup**（开始设置）
7. 填构建配置（就三个格子）：

   | 格子 | 填什么 |
   |------|--------|
   | Project name | `stunblog`（自动填好的，不用动；它决定网址是 `stunblog.pages.dev`） |
   | Production branch | `main`（自动填好的，不用动） |
   | Framework preset | 下拉选 **Hexo**，选完下面两项会自动填好 |

   如果下拉框里没有 Hexo，就手动填：
   - **Build command**（构建命令）：`npx hexo generate`
   - **Build output directory**（构建输出目录）：`public`

8. **先别急着点部署**——往下滚到 **Environment variables**（环境变量），点 **Add variable**：
   - Variable name：`NODE_VERSION`
   - Value：`18`
   - 点 **Save**

   > 这一步告诉 Cloudflare 用 Node 18 来构建，和 Hexo 5.1.1 是最稳搭配。跳过的话可能构建报错。
9. 点 **Save and Deploy**（保存并部署）

---

## 第 4 步：等它构建完成（1-3 分钟）

页面会显示构建日志一行行往下滚，最后出现 **Success** 和彩带。

- 失败了：点进这次部署记录 → **View log**，把报错最后几行发给我
- 成功了：页面顶部会给你网址，形如：

```
https://stunblog.pages.dev
```

浏览器打开它——你的博客已经在全世界都能访问了。

**以后更新网站**：本地改完文章，只需要：

```bash
cd D:/stunblog
git add -A
git commit -m "写完了xxx"
git push
```

推完约 1 分钟，线上自动更新，什么都不用管。

---

## 第 5 步：改掉域名占位符（重要，别跳过）

现在网站配置里的网址还是占位符 `https://DOMAIN`，会影响文章链接、分享卡片等。要用真实域名替换：

1. 打开 `D:/stunblog/_config.yml`，找到第 13 行左右：

```yaml
url: https://DOMAIN
```

2. 改成（先用 Cloudflare 送的域名）：

```yaml
url: https://stunblog.pages.dev
```

3. 再推一次：

```bash
cd D:/stunblog
git add -A
git commit -m "fix: 设置站点 url"
git push
```

> 以后绑了自定义域名，就再把这个 url 改成自定义域名，同样重推一次。

---

## 第 6 步（可选）：绑自己的域名

`stunblog.pages.dev` 对国内访客速度一般，正式用建议绑自己的域名：

1. 先买好一个域名（Cloudflare Registrar / 阿里云等都行）
2. 域名 DNS 托管到 Cloudflare（在 Cloudflare 控制台 **Add a site** 按提示操作；在别家托管的话这步换成去域名商加 CNAME 记录）
3. 进入 Pages 项目页面 → **Custom domains** 标签 → **Set up a custom domain**
4. 输入你的域名，按提示确认。DNS 在 Cloudflare 的话全程自动，HTTPS 证书也自动签发，无需任何操作
5. 生效后回到第 5 步，把 `_config.yml` 的 url 改成自定义域名，重推

---

## 第 7 步（可选）：提交给搜索引擎

想让百度/必应/Google 收录：

1. 装站点地图生成器：

```bash
cd D:/stunblog
npm install hexo-generator-sitemap --save
```

2. 在 `_config.yml` 末尾加：

```yaml
sitemap:
  path: sitemap.xml
```

3. push 之后，访问 `https://你的域名/sitemap.xml` 确认能打开
4. 到各站长平台添加站点、提交 sitemap：
   - 百度：https://ziyuan.baidu.com
   - 必应：https://www.bing.com/webmasters
   - Google（需代理）：https://search.google.com/search-console

---

## 常见问题

| 现象 | 原因和解决 |
|------|-----------|
| `git push` 报 `Connection was reset` | remote 用了 https 地址。改成 SSH：`git remote set-url origin git@github.com:你的用户名/stunblog.git` |
| `ssh -T git@github.com` 连不通 | SSH 密钥问题，把报错发我 |
| Cloudflare 构建失败 | 进 Deployments → 点失败记录 → View log，把最后报错的几行发我 |
| 构建报 Node 相关错误 | 回到 Pages 项目的 Settings → Environment variables，把 `NODE_VERSION` 改成 `16` 或 `20` 再重新部署 |
| 打开 pages.dev 白屏/404 | 确认 Build output directory 填的是 `public` 不是 `/` |
| 本地 4000 端口被占用 | `npx hexo server -p 4001` 换个端口 |
