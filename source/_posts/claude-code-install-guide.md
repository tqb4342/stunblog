---
title: Claude Code 安装配置教程（2026）：Windows 安装、cc-switch 接国产模型到实战
date: 2026-11-13 21:30:00
updated: 2026-11-14 19:30:00
categories: AI工具
tags: [Claude Code, AI编程, cc-switch, Cursor, 国产大模型, CLI]
keywords: claude code安装,claude code教程,claude code配置,claude code国产模型,cc-switch,claude code windows,claude code中文,ai编程工具,claude code免费,glm coding,kimi api,deepseek api,cursor claude,claude code指令,claude.md
description: Windows 怎么安装 Claude Code？cc-switch 接 GLM/Kimi/DeepSeek 国产模型，新用户免费额度就能跑起来低成本写代码，Cursor 联动、常用指令、CLAUDE.md 规则到连接超时排查，全程截图零基础可跟。
photos: [https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/banner-claudecode.webp]
related:
  - slug: claude-opus-55-guide
    text: Claude Opus 5.5 使用指南：提需求、跑长任务、验收结果
  - slug: codex-install-guide
    text: Codex 安装使用指南：ChatGPT Plus 的 AI 编程工具
  - slug: ai-tools-network-guide
    text: AI 工具网络配置：节点挑选与账号环境
  - slug: gpt-6-astra
    text: GPT-6 Astra 国内使用指南
faq:
  - q: "Claude Code 连接超时怎么办？"
    a: "先看浏览器能不能开网页：能开但终端超时，就是终端没走代理——终端不读系统代理设置，设代理环境变量或开 TUN 模式都能解决；浏览器也打不开，先修代理本身。"
  - q: "浏览器能上网，claude 命令却超时，为什么？"
    a: "浏览器走系统代理，终端默认不读系统代理设置，PowerShell 和 Git Bash 照样直连，而 api.anthropic.com 国内直连不通。在终端设 HTTPS_PROXY 环境变量，或者开 TUN 模式接管全部流量。"
  - q: "Claude Code 报 401 怎么排查？"
    a: "自查三处：API key 是否抄错、复制时有没有带空格；Windows 下改完环境变量必须重开终端窗口，旧窗口读不到新变量；用 cc-switch 的检查当前启用的模型和 key 是否对得上。"
  - q: "Claude Code 免费能用吗？"
    a: "官方 Claude 订阅（Pro/Max）可直接登录使用；不想付费的用 cc-switch 接国产模型——GLM、Kimi、DeepSeek 都有便宜或免费的编程档 API，效果打折扣但日常写代码够用。"
  - q: "Claude Code 用哪个国产模型好？"
    a: "编程档优先：智谱 GLM Coding Plan 有专门的低价编程套餐；DeepSeek API 便宜且代码能力强；Kimi 也有对应套餐。在 cc-switch 里都配好，随时切换对比，哪个顺手用哪个。"
---

> 🔧 同样是 AI 写代码，网页聊天是一问一答，Claude Code 是直接在终端里替你干活——写项目、改代码、跑命令一条龙。代价是它原生为 Linux / Mac 设计，Windows 用户装起来处处是坑，官方模型还要订阅付费。这篇从 Git Bash 起步，<!-- more -->到 cc-switch 接国产模型免费写代码、Cursor 联动、CLAUDE.md 立规矩，坑都标在对应步骤里了。网络代理还没配好的，先看 [Windows 翻墙教程](/windows-internet-guide/)——没有这层基础，Claude Code 在国内基本跑不起来。

## 30 秒速答

- **是什么**：Anthropic 出的终端 AI 编程工具（CLI Agent），在命令行里直接对话干活——写项目、改代码、跑命令，比网页版 ChatGPT 更贴近真实开发
- **Windows 怎么装**：四步——装 Git Bash 补 Linux 环境 → 一行命令装本体 → 配 PATH → cc-switch 接模型
- **要付费吗**：官方模型需要 Claude 订阅；**用 cc-switch 接国产模型（GLM / Kimi / DeepSeek）免费或低价可用**
- **先低成本跑通**：装本体 → cc-switch 接 GLM / DeepSeek 的低价编程档（新用户免费额度也能撑一阵）→ 让它写个番茄钟验证全链路，确认顺手再考虑订阅
- **装完连不上**：八成是终端没走代理（浏览器能上网不代表终端能），看第四节排查
- **写代码水平怎么样**：Claude 系模型是编程第一梯队；OpenAI 阵营的对照看 [GPT-6 Astra 使用指南](/gpt-6-astra/)，Codex 的安装配置看 [Codex 安装使用指南](/codex-install-guide/)

## 一、安装 Claude Code

### 1. 安装 Git Bash（仅 Windows 需要）

Claude Code 原生为 Linux / macOS 设计，Windows 的命令体系不同，需要先装 Git Bash 补齐环境——它给 Claude Code 提供运行时需要的 bash，后面装本体用的 PowerShell 只是跑安装命令，两者不冲突。下载安装包，安装时一路下一步就行。

下载地址：[git-scm.com/install/windows](https://git-scm.com/install/windows)

### 2. 安装 Claude Code 本体

打开终端（Windows 用 PowerShell，Mac/Linux 用 Terminal），粘贴命令：

```
irm https://daheiai.com/cc.ps1 | iex
```

安装 2.1.153 老版本命令（2.1.156 对第三方 API 有兼容性问题，建议回退）：

```
& ([scriptblock]::Create((irm https://daheiai.com/cc.ps1))) 2.1.153
```

备用官方原版命令：`irm https://claude.ai/install.ps1 | iex`——官方源国内一般要挂代理才能访问，所以前面放国内可直连的第三方脚本源；介意第三方脚本的，配好代理后直接走这条官方命令。

整个过程要下载 200+MB 的软件，网络不好会等很久，耐心点。装完首次启动会进欢迎界面，看到下面这屏就是成了：

![Claude Code 安装完成后首次启动的欢迎界面](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/claudecode-1.webp)

### 3. 配置环境变量 PATH

把 `C:\Users\你的用户名\.local\bin\` 加到用户级 PATH。

**Windows 具体操作**：开始菜单输入「环境变量」→ 编辑系统环境变量 → 点「环境变量」→ 在上半部分**「用户变量」**里找到 `Path` 双击 → 新建一条，把上面的路径复制进去。改用户变量就够了，不需要管理员权限——下面那半区「系统变量」才要。

**Mac / Linux**：通常不需要手动配，安装脚本会自动处理。先重开个终端输入 `claude` 试试；还是找不到命令，就把下面这行加到 `~/.bashrc` 或 `~/.zshrc`（看自己用哪个 shell），加完 `source` 对应的文件生效：

```
export PATH="$HOME/.local/bin:$PATH"
```

### 4. 安装 cc-switch，接入国产模型

装好了，但还没有 AI 模型可用——官方 Claude 模型需要订阅。这时候 **cc-switch** 登场：把各家模型的 API key 统一管起来，想用哪家点一下就切过去，不用手动改配置。

cc-switch 支持的模型：[智谱 GLM](https://www.bigmodel.cn/glm-coding?ic=A7DYW5XKAV)、[MiniMax](https://platform.minimaxi.com/subscribe/token-plan)、[Kimi](https://www.kimi.com/membership/pricing)、[DeepSeek](https://platform.deepseek.com/) 等；Claude、GPT 等模型可通过 API 中转接入。

下载安装：[github.com/farion1231/cc-switch/releases](https://github.com/farion1231/cc-switch/releases)

装好打开 cc-switch，按下图添加模型：

![cc-switch 添加 AI 大模型的入口界面](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/claudecode-2.webp)

以智谱 GLM 为例：先去 [智谱 GLM](https://www.bigmodel.cn/glm-coding?ic=A7DYW5XKAV) 官网注册账号、获取 API key。

![智谱 GLM 官网的 API Key 获取页面](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/claudecode-3.webp)

拿到 API key 复制好，回到 cc-switch：点右上角「+」号 → 选择 Zhipu GLM → 输入 API key → 点「添加」。

![cc-switch 中选择 Zhipu GLM 并填入 API key](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/claudecode-4.webp)

接着启动该模型，Claude Code 就能用了。

![cc-switch 启用 GLM 模型成功](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/claudecode-5.webp)

## 二、Cursor IDE 里用 Claude

Claude Code 不挑编辑器，但配合 [Cursor](https://cursor.com/cn) 体验最好。打开 Cursor，命令终端（快捷键 `Ctrl+J`）输入 `claude` 启动。

![在 Cursor 终端中输入 claude 启动](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/claudecode-6.webp)

### Claude Code 的三种权限模式

- **Plan Mode（计划模式）**：不直接执行，先做详尽计划，确认后才动手
- **默认模式**：自主判断——简单操作直接执行，关键改动先问你
- **Accept Edits（自动编辑）**：文件修改自动通过，运行命令仍需确认

快捷键 `Shift+Tab` 循环切换。日常用默认模式最稳。

此外还有一种高风险模式，终端输入 `claude --dangerously-skip-permissions` 启动——所有操作不需要任何确认，包括删除文件。新手别碰，我不建议用。

![--dangerously-skip-permissions 危险模式启动提示](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/claudecode-8.webp)

## 三、CC 实战

### 1. 开发一个软件

装好就能干活了。比如让它写个桌面番茄钟，直接说人话：

![向 Claude Code 下达开发番茄钟软件的指令](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/claudecode-9.webp)

它会先给出执行计划和三种方案，手动选一个就开始执行，也可以 `Shift+Tab` 带着当前反馈批准。

![Claude Code 生成的执行计划与三种方案](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/claudecode-10.webp)

执行完它会告诉你番茄钟已创建完成，还附上运行方式：

![番茄钟软件创建完成的反馈](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/claudecode-11.webp)

新开一个终端，运行：

```
cd pomodoro-timer
npm start
```

![运行 npm start 启动番茄钟软件](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/claudecode-12.webp)

### 2. 常用指令大全

指令不用背——输入 `/` 终端就会弹出提示列表。这张表当字典查，高频的几个我挑出来讲：

![Claude Code 常用斜杠指令大全](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/claudecode-13.webp)

挑几个高频的说：`/compact` 主动压缩上下文（对话太长时省 token）；`/init` 初始化项目级 CLAUDE.md；`/agents` 创建管理子 agent。比如输入 `/simplify`，Claude 会派生 3 个 agent，从代码质量、运行效率、复用性三个角度做一次代码审核，然后自动优化。

### 3. 设置规则（CLAUDE.md、memory.md）

CLAUDE.md 是给 Claude 立规矩的文件，分几个层级。

**第一层：全局规则**。个人习惯类，比如「永远用中文回答」，配置位置：

![全局 CLAUDE.md 的配置位置示例](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/claudecode-14.webp)

**第二层：项目规则**。想让 Claude 记住项目的技术架构、开发规范、设计风格，把 CLAUDE.md 放项目根目录：

![项目根目录下的 CLAUDE.md 规则文件](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/claudecode-15.webp)

**第三层：子文件夹规则**。项目里的子模块也能单独设规则，把 CLAUDE.md 放对应子文件夹即可：

![子文件夹中放置 CLAUDE.md 设置局部规则](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/claudecode-16.webp)

创建方式有两种：项目目录下输入 `/init` 自动创建项目级 CLAUDE.md——

![/init 命令自动创建项目级 CLAUDE.md](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/claudecode-17.webp)

或者直接用自然语言让它自己写，比如输入「记得永远说中文，并写入全局 claude.md」：

![让 Claude 写入全局 CLAUDE.md 的指令示例](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/claudecode-18.webp)

用 `/memory` 命令可以直接修改全局和项目 CLAUDE.md（选中回车进入编辑）：

![/memory 命令管理全局与项目记忆文件](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/claudecode-19.webp)

另外还有个 **auto-memory** 主动记忆功能：Claude 会根据上下文自动记住你的使用习惯，存到 memory.md，优先级低于 CLAUDE.md。不想要就在设置里把 `Auto-memory` 置为 `off`，默认是开的。

规则体系总结，两张图说清：

![全局级与项目级 CLAUDE.md 的定位对比](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/claudecode-20.webp)

![CLAUDE.md 与 Auto-memory 的优先级关系](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/claudecode-21.webp)

规则文件里该写什么也有讲究——长任务何时继续何时暂停、汇报格式怎么定，Opus 5.5 时代的一套玩法看 [Claude Opus 5.5 使用指南](/claude-opus-55-guide/)。

### 4. 高级扩展

**Skill**：有些功能常用但没必要写进 CLAUDE.md，就封装成 Skill 按需调用，分四种类型：

![Claude Code Skill 的四种类型](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/claudecode-22.webp)

怎么找 Skill？先装一个 Find Skill（[github.com/vercel-labs/skills](https://github.com/vercel-labs/skills)），把下载链接直接告诉 Claude，它自己装：

![通过 Find Skill 搜索并安装技能](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/claudecode-23.webp)

装好之后想要什么功能直接说——「我想要一个优化前端的 skill」，它就自己去搜去装，还能选装在全局还是当前项目。

**openCLI**：把常用应用和社交媒体封装成 Skill，装完 Claude 能直接操作你的软件。链接（[github.com/jackwener/OpenCLI](https://github.com/jackwener/OpenCLI/)）扔给它自动装：

![openCLI 安装完成提示](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/claudecode-24.webp)

比如让它去小红书搜长沙必吃的餐厅——它是真去搜，还给你汇总成 10 家：

![openCLI 让 Claude 去小红书搜索餐厅的结果](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/claudecode-25.webp)

提示词可以更细：按距离排序、把餐厅图片也带回来。知乎、B 站同理。

**子 agent**：复杂任务里让 Claude 分出几个子 agent 并行干活——主任务写代码，子 agent 去调研、查文档，互不干扰。

**Hooks**：事件驱动自动化——特定事件触发时自动执行动作。两种形态：命令型（跑 Shell 脚本，适合格式化、跑测试、发通知）和提示型（任务收尾前让 Claude 再做一次质量检查）。比如直接说「帮我做个 Hook，每次任务完成后自动发一个提示音」：

![让 Claude 创建任务完成提示音 Hook 的指令](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/claudecode-26.webp)

## 四、连接失败排查：先分清是哪类问题再动手

装好不代表一帆风顺。Claude Code 最常见的故障是「连不上」，但「连不上」其实是四种不同的病——对号入座再动手，别上来就重装：

| 报错长相 | 问题类型 | 去哪查 |
| --- | --- | --- |
| Connection error / fetch failed / ETIMEDOUT | 网络不通 | 下面第 1 条 |
| 401 / Invalid API key | 身份验证 | 第 2 条 |
| 时好时坏 / 模型不存在 / 响应异常 | 接口地址 | 第 3 条 |
| 429 / rate limit / credit balance | 额度 | 第 4 条 |

### 1. 网络超时（八成的人卡在这）

**典型症状：浏览器能正常打开网页，终端里敲 `claude` 就转圈到超时。**

原因一句话讲清：浏览器走的是系统代理，而终端默认不读系统代理设置——你在 Clash 里开了「系统代理」，PowerShell 和 Git Bash 照样直连，api.anthropic.com 国内直连不通，超时就是这么来的。

两个解法选一个：

**临时方案**（只对当前终端窗口有效）：启动前设代理环境变量，端口按自己代理软件的实际端口改（Clash 默认 7890）：

```powershell
$env:HTTPS_PROXY = "http://127.0.0.1:7890"
$env:HTTP_PROXY = "http://127.0.0.1:7890"
claude
```

**一劳永逸方案**：开 TUN 模式——虚拟网卡接管所有流量，终端和命令行工具全部走代理，不用每次设变量。

用 Trae、Cursor、Codex 这类工具登录页转圈的，根因相同，各工具单独的配置流程看 [AI 工具网络配置](/ai-tools-network-guide/)。还不行就先验证代理本身通不通，终端里跑：

```
curl -x http://127.0.0.1:7890 https://www.google.com -I
```

返回 HTTP/2 200 说明代理没问题，问题在别处；连 curl 都不通，是代理软件的事。Windows 上还没有代理工具的，从安装到能用看 [Windows 翻墙教程](/windows-internet-guide/)，个人在用的是[一枝红杏](https://order.yizhihongxing.org/aff.php?aff=4818)，99 元/年入门档，跑 AI 编程工具够用。

### 2. 401 身份验证失败

自查三处：API key 是不是抄错了、复制时有没有带上空格；Windows 下设置完环境变量必须**重开一个终端窗口**，旧窗口读不到新变量；用 cc-switch 的，检查当前启用的模型和 key 是不是对得上。

### 3. 接口地址问题

用 cc-switch 接国产模型或中转的，报「模型不存在」或响应时好时坏，先看 BASE_URL 拼得全不全（结尾带不带 /v1，按中转商文档来），再确认中转服务本身没挂——中转不稳的典型表现就是时好时坏，跟你的配置没关系。

### 4. 429 与额度

429 是限速不是封号——请求太密了，等几分钟再试，别当网络问题去折腾代理，方向就错了。报 credit balance 的是余额不足，去服务商后台充值，或用 cc-switch 切别的模型先干着。

## FAQ

**Claude Code 连接超时怎么办？**

先看浏览器能不能开网页：能开但终端超时，就是终端没走代理——终端不读系统代理设置，设代理环境变量或开 TUN 模式都能解决；浏览器也打不开，先修代理本身。

**浏览器能上网，claude 命令却超时，为什么？**

浏览器走系统代理，终端默认不读系统代理设置，PowerShell 和 Git Bash 照样直连，而 api.anthropic.com 国内直连不通。在终端设 HTTPS_PROXY 环境变量，或者开 TUN 模式接管全部流量。

**Claude Code 报 401 怎么排查？**

自查三处：API key 是否抄错、复制时有没有带空格；Windows 下改完环境变量必须重开终端窗口，旧窗口读不到新变量；用 cc-switch 的检查当前启用的模型和 key 是否对得上。

**Claude Code 免费能用吗？**

官方 Claude 订阅（Pro/Max）可直接登录使用；不想付费的用 cc-switch 接国产模型——GLM、Kimi、DeepSeek 都有便宜或免费的编程档 API，效果打折扣但日常写代码够用。

**Claude Code 用哪个国产模型好？**

编程档优先：智谱 GLM Coding Plan 有专门的低价编程套餐，DeepSeek API 便宜且代码能力强，Kimi 也有对应套餐。都在 cc-switch 里配好，随时切换对比，哪个顺手用哪个。

## 写在最后

Claude Code 的完整链路：**Git Bash → 装本体 → 配 PATH → cc-switch 接模型 → （可选）Cursor 联动 → CLAUDE.md 立规矩**。装完先跑通「番茄钟」这种小项目验证全链路，再上真实代码。

纠结要不要订阅的，走低成本路线先验证：cc-switch 接 GLM / DeepSeek 的低价编程档（新用户免费额度也够跑完验证流程），番茄钟跑通了、确认这工具确实顺手，再考虑 Claude 订阅解锁完整实力——顺序反了容易白花钱。

想在 AI 编程上多线开花的：OpenAI 阵营的 Codex 安装配置看 [Codex 安装使用指南](/codex-install-guide/)（ChatGPT Plus 用户直接可用）；GPT-6 Astra 的写代码能力与上车方式看 [GPT-6 Astra 国内使用指南](/gpt-6-astra/)；终端连不上的通病排查看 [AI 工具网络配置](/ai-tools-network-guide/)。想系统看看还有哪些 AI 工具值得上车，翻 [AI 工具箱](/ai-tools/)，100+ 个工具按场景分好类，标「实测」的都配了完整教程。
