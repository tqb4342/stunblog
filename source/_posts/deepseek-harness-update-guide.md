---
title: DeepSeek Harness v0.2.3 大更新（2026）：任务时间线、代码审阅与 Git 插件源解读
date: 2026-11-26 11:20:00
updated: 2026-11-26 11:20:00
categories: AI工具
tags: [DeepSeek, DeepSeek Harness, AI Agent, 更新, Cordis]
keywords: deepseek harness更新,deepseek harness v0.2.3,dsh更新,deepseek harness时间线,deepseek harness代码审阅,deepseek harness插件市场,deepseek harness连接器,deepseek harness computer use,deepseek harness windows,dsh插件源,git仓库插件,deepseek harness ptc,Python PTC移除,deepseek harness升级,cordis 4.0
description: DeepSeek Harness v0.2.3-alpha.1 大更新逐项解读：任务时间线插件让 Agent 执行不再是黑盒，独立 Code Review 页面支持与 Agent 协作审代码，Git 仓库可直接当插件源（私有仓库也行），飞书企业微信钉钉等 7 类连接器接入，Computer Use 实验性支持 Windows；另有 Python PTC 移除、Cordis 4.0 接口变更这些升级前必须知道的破坏性改动。
top_image: https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/deepseek-harness-update-banner.webp
photos: [https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/deepseek-harness-update-banner.webp]
faq:
  - q: "DeepSeek Harness v0.2.3 更新了什么？"
    a: "一口气加了 Agent 任务时间线插件（层级任务树加阻塞事项记录）、独立 Code Review 代码审阅页面、会话状态区、实验性 Auto review 权限模式；插件市场支持把 Git 仓库直接当插件来源（私有仓库也行）；新增 Linear、Notion、腾讯文档、飞书、企业微信、腾讯会议、钉钉 7 类连接器；MCP 加入 OAuth 授权与工具按需加载；Computer Use 实验性支持 Windows。更新量远超一个小版本该有的体量。"
  - q: "Python PTC 被移除，之前用 PTC 模式的怎么办？"
    a: "v0.2.3-alpha.1 直接移除了 Python PTC 支持，Node PTC 则改为默认在多次调用之间保留变量。之前在 PTC 模式里跑批量任务的，要么切到 Node PTC 重新验证一遍流程，要么回到标准模式分批执行。Cordis 同时升到 4.0.0-rc.12，插件接口和工作目录参数都变了。"
  - q: "独立 Code Review 页面解决什么问题？"
    a: "之前 Agent 写完代码只能看一句任务完成，改动要自己去仓库里翻。现在与当前用户相关的 GitHub PR 可以集中在一个页面查看，修改说明、涉及文件、代码差异直接对照着看，拿不准的修改还能在页面里和 Agent 协作审阅。GitLab 的 Merge Request 同样支持审阅和合并，页面还开放插件扩展。"
  - q: "Git 仓库当插件源有什么用？"
    a: "企业内部开发的 Agent 插件——检查内部代码规范、访问企业知识库、跑自动化测试这类——平时放在私有 Git 仓库里不公开。现在可以直接把这个仓库添加进插件市场，团队成员照常浏览安装，不用为了方便装插件把内部工具挪到公共仓库。"
  - q: "Windows 现在能用 DeepSeek Harness 的 Computer Use 了吗？"
    a: "实验性支持。Agent 可以通过鼠标键盘操作 Windows 界面，点按钮、输入文字，还能通过 cua-mcp 把电脑操作能力提供给其他 Agent 系统调用。注意这是实验性特性，稳定性和权限管理还有待观察，生产环境先用 macOS 版或等后续版本更稳妥。"
  - q: "已经写了自定义插件，升级要注意什么？"
    a: "两件事：Cordis 升级到 4.0.0-rc.12，插件接口、工作目录参数和配置方式都跟着变了，自定义插件大概率要改代码适配；另外 Node.js 版本要求也有调整（alpha.2 就是为此跟进发布的）。升级前先看官方更新日志，确认自己用到的接口有没有在变更清单里。"
related:
  - slug: deepseek-harness-guide
    text: DeepSeek Harness 教程：安装配置、四种模式与插件玩法
  - slug: deepseek-vision-guide
    text: DeepSeek 多模态实测：V4.1 Flash 看图能力与接入
  - slug: claude-code-install-guide
    text: Claude Code 安装配置教程：Windows 安装到实战
  - slug: codex-install-guide
    text: Codex 安装使用教程：国内 Trae 配置全流程
---

版本号是最会骗人的东西。

DeepSeek Harness 这次从 v0.2.2 升到 v0.2.3-alpha.1，看版本号是个不起眼的小更新，翻开更新日志，长度完全不像个小版本该有的。有海外开发者感慨：这帮「疯子」在 0.2.2 和 0.2.3-alpha.1 之间搞出的改动，把破坏性变更都算上，比不少软件从 V2 升到 V3 还多。

![海外开发者的评价：DSH 在 0.2.2 和 0.2.3-alpha.1 之间搞出的改动比不少软件从 V2 升到 V3 还多](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/dsh-v023-00.webp)

Agent 任务时间线、独立代码审阅页面、会话状态区、Git 插件源、七类办公连接器、Windows 电脑操作——一口气全安排上了。DSH 这是在加速把自己从一个 Agent 工具做成完整的 Agent 工作平台。

![v0.2.3 新增功能清单：插件市场 Git 源、时间线插件、代码审阅页面、会话状态区、7 类连接器、Web 远程登录、MCP OAuth 等](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/dsh-v023-01.webp)

还没装过 DeepSeek Harness 的，先看[安装与四种模式教程](/deepseek-harness-guide/)再回来，这篇讲的是它更新了什么。

<!-- more -->

## 30 秒速答

- **更新多大**：版本号 v0.2.2→v0.2.3-alpha.1，实际改动量堪比大版本，同一天还跟进了 alpha.2
- **看得见的**：任务时间线插件、独立 Code Review 页、会话状态区、Auto review 权限模式
- **生态的**：Git 仓库（含私有）直接当插件源；Linear、Notion、腾讯文档、飞书、企业微信、腾讯会议、钉钉 7 类连接器
- **底层的**：MCP 工具按需加载省上下文；Computer Use 实验性支持 Windows
- **要小心的**：Python PTC 直接移除、Cordis 升 4.0 接口变更，自定义插件要改代码
- **网络前提**：本体和 DeepSeek API 国内直连可用，插件市场和海外连接器要另说，见下节

## 开始之前：网络环境

DSH 本体是 npx 本地运行，DeepSeek API 国内直连也没问题，这是它对国内用户友好的地方。但更新涉及的两块要海外网络：从 GitHub 拉插件和更新日志、连接 Linear、Notion 这类海外服务。

没解决网络的先看[翻墙 VPN 选型总览](/best-vpn-guide/)。已经在用 DSH 但装插件经常超时的，大概率也是网络链路问题——插件默认从 GitHub 拉（新版安装源加了大陆镜像可选，见第三节，能绕开这个）。

## 一、Agent 干到哪儿了，进度条里全有

用过 Agent 的人都懂一个痛点：任务一复杂，智能体在做什么、卡在哪个环节，就成了黑盒。你只能盯着光标等，或者反复问「现在到哪了」。

这次新增的实验性时间线插件就是冲这个来的：沿着层级关系展示任务和执行状态，连 Blockers（阻塞事项）都能单独记录。哪个环节推不动了，打开任务树和进展报告直接看对应信息——排查卡点从「问 Agent」变成「看仪表盘」。

![时间线插件界面：发布评审任务进度 70%，间隔报告记录 14:15 开始运行验证、14:00 已检查变更](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/dsh-v023-03.webp)

配套新增的会话状态区域：工作目录、代码变更请求、子 Agent、任务和插件状态集中显示，可以停靠在侧边，分区顺序支持拖动调整。一个界面看清整个会话的家底。会话还加了已读/未读状态，后台跑完的任务，哪些你还没看过结果，会单独提醒——不用再挨个点回去翻。

![DeepSeek Harness 新版主界面：左侧工作区按项目管理会话，输入框支持模式切换与文件引用](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/dsh-v023-04.webp)

权限侧还有个实验性的 Auto review 模式：Agent 每次调用受支持的工具，先交给模型审查一遍再执行。相当于给 Agent 的每次动手加了一道自动安检。举个真实场景：Agent 想跑一条你没要求过的删目录命令，模型先拦下来，弹窗交给你决定——拒绝，或者允许这一次。

![Auto review 权限模式示意：模型拒绝未要求的 rm -rf 调用，用户可选拒绝或允许一次](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/dsh-v023-05.webp)

## 二、代码审阅：AI 也得交作业给人看

这轮更新里最提气的是独立的 Code Review 页面。

之前的流程是：Agent 写完代码，甩一句「任务已完成」，改动自己去仓库里翻。现在与当前用户相关的 GitHub PR 集中放在审阅页面里，修改说明、涉及文件、具体代码差异直接对照着看——哪几行删了、哪几行新加，一目了然。

![Code Review 页面示意：会话关联 GitHub PR，检查状态、评审意见与代码差异对照查看](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/dsh-v023-06.webp)

遇到拿不准的修改，还能在页面内和 Agent 协作审阅。页面本身也支持插件扩展，开发者可以加自己的审阅视图、代码行注解、工具栏和评论框里的操作入口。GitLab 同样获得支持，可以审阅和合并 Merge Request。

多 Agent 同时改代码的场景也照顾到了：Git Worktree 做了优化，可以自定义分支名称、从远程分支创建工作树。一个 Agent 修登录功能，另一个改支付接口，各自在独立工作树里处理，互不干扰，改完统一走代码审阅。会话侧栏的「变更请求与工作树」开关（实验性）就是管这块的，关联的 PR、检查状态、评审意见都挂在对应会话下面。

![会话侧栏的变更请求与工作树开关（实验性）：集中跟踪关联 GitHub PR 的检查状态与代码差异](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/dsh-v023-02.webp)

AI 程序员现在不仅得交作业，连代码评审都安排得明明白白。

## 三、私有 Git 仓库直接装插件

插件市场的升级对企业用户是个实打实的利好：**Git 仓库现在可以直接添加为插件来源，公开、私有仓库都支持**。

典型场景：一家公司内部开发了一套 Agent 插件——有的检查内部代码规范，有的访问企业知识库，有的专门跑自动化测试。这些工具平时放在私有 Git 仓库里，不准备公开。以前想让团队成员装，要么手动分发，要么咬牙把内部工具挪到公共仓库。

现在直接把仓库添加进插件市场，团队照常浏览、安装，内部工具留在内部。

![添加插件对话框：支持输入 GitHub 仓库地址作为插件来源，安装源可选中国大陆镜像源](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/dsh-v023-07.webp)

两个对国内用户实用的细节：安装源里有「中国大陆镜像源」可选，拉插件不用海外网络也快；官方在安装框里明晃晃提醒了一句——插件在本机以你的权限运行，来源不明的插件可能读取和泄露你的数据，装之前先想清楚来源。

连接器名单也扩了一波：Linear、Notion、腾讯文档、飞书、企业微信、腾讯会议、钉钉，一共 7 类。项目管理、知识库、协作文档、团队沟通、在线会议，办公常用的几类工具都覆盖到了。在插件页面完成账号连接或授权，就能在对话中调用对应服务；连接器账号统一管理，MCP 还加入了 OAuth 授权与凭据自动刷新。

工具越接越多，模型的上下文也得省着花——每个 MCP 工具都自带名称、参数和功能说明，几十个一起加载，光「告诉模型有哪些工具可用」就占掉不少 Token。于是有了新的可选 MCP 工具按需加载模式：需要什么工具，再加载对应的定义。连工具说明书都开始精打细算了。

## 四、Windows 电脑操作上车

Computer Use 开始实验性支持 Windows：Agent 可以通过鼠标、键盘操作电脑界面，点击按钮、输入文字，还能通过 cua-mcp 把电脑操作能力提供给其他 Agent 系统调用。

![更新日志中的 Computer Use 条目：macOS 统一系统键盘输入授权，Windows 新增实验性支持](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/dsh-v023-08.webp)

macOS 这边的键鼠授权做了统一，Web 连接模式增加了远程登录。注意「实验性」三个字的分量——想在自己主力机上放开的，建议再等等。

## 五、升级前必读：这批破坏性变更

小版本号掩盖不了里面的硬改动，升级前这几条要过一遍：

**Python PTC 支持直接移除**。之前[教程](/deepseek-harness-guide/)里的四种模式，PTC 模式承担批量执行类任务，这一刀砍的是它的 Python 路线。Node PTC 保留但行为变了：默认在多次调用之间保留变量。用 PTC 跑批量任务的工作流，升级后要重新验证。

**Cordis 升级到了 4.0.0-rc.12 版本**，插件接口、工作目录参数和配置方式跟着变了一轮。已经写了自定义插件的，这次升级大概率要顺手改自己的代码。

**Node.js 版本要求有调整**，24.x 系列要 24.22.3 及以上、26.x 系列要 26.13.1 及以上，官方同一天跟进发布的 v0.2.3-alpha.2 就是干这个的。装环境时先对一眼自己的 Node 版本。

![v0.2.3-alpha.2 发布页：Node.js 版本要求调整为 24.22.3、26.13.1 及以上](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/dsh-v023-09.webp)

完整变更清单看官方更新日志：[github.com/deepseek-ai/deepseek-harness/releases](https://github.com/deepseek-ai/deepseek-harness/releases)。

照这个迭代速度，接下来几周大概率还有新东西。DSH 从 Agent 工具进化成 Agent 工作平台的方向，已经越来越清晰了。

## 常见问题

**DeepSeek Harness v0.2.3 更新了什么？**

一口气加了 Agent 任务时间线插件（层级任务树加阻塞事项记录）、独立 Code Review 代码审阅页面、会话状态区、实验性 Auto review 权限模式；插件市场支持把 Git 仓库直接当插件来源（私有仓库也行）；新增 Linear、Notion、腾讯文档、飞书、企业微信、腾讯会议、钉钉 7 类连接器；MCP 加入 OAuth 授权与工具按需加载；Computer Use 实验性支持 Windows。更新量远超一个小版本该有的体量。

**Python PTC 被移除，之前用 PTC 模式的怎么办？**

v0.2.3-alpha.1 直接移除了 Python PTC 支持，Node PTC 则改为默认在多次调用之间保留变量。之前在 PTC 模式里跑批量任务的，要么切到 Node PTC 重新验证一遍流程，要么回到标准模式分批执行。Cordis 同时升到 4.0.0-rc.12，插件接口和工作目录参数都变了。

**独立 Code Review 页面解决什么问题？**

之前 Agent 写完代码只能看一句任务完成，改动要自己去仓库里翻。现在与当前用户相关的 GitHub PR 可以集中在一个页面查看，修改说明、涉及文件、代码差异直接对照着看，拿不准的修改还能在页面里和 Agent 协作审阅。GitLab 的 Merge Request 同样支持审阅和合并，页面还开放插件扩展。

**Git 仓库当插件源有什么用？**

企业内部开发的 Agent 插件——检查内部代码规范、访问企业知识库、跑自动化测试这类——平时放在私有 Git 仓库里不公开。现在可以直接把这个仓库添加进插件市场，团队成员照常浏览安装，不用为了方便装插件把内部工具挪到公共仓库。

**Windows 现在能用 DeepSeek Harness 的 Computer Use 了吗？**

实验性支持。Agent 可以通过鼠标键盘操作 Windows 界面，点按钮、输入文字，还能通过 cua-mcp 把电脑操作能力提供给其他 Agent 系统调用。注意这是实验性特性，稳定性和权限管理还有待观察，生产环境先用 macOS 版或等后续版本更稳妥。

**已经写了自定义插件，升级要注意什么？**

两件事：Cordis 升级到 4.0.0-rc.12，插件接口、工作目录参数和配置方式都跟着变了，自定义插件大概率要改代码适配；另外 Node.js 版本要求也有调整（alpha.2 就是为此跟进发布的）。升级前先看官方更新日志，确认自己用到的接口有没有在变更清单里。

## 写在最后

这次更新最值得琢磨的不是某个单点功能，而是整体走向：时间线解决「看不见」、审阅页解决「不放心」、插件源和连接器解决「接不进来」——全是 Agent 从玩具走向生产环境路上的真实关卡。Agent 系统要连续、持久地干活，工程配套得先跟上，DSH 显然想明白了这件事。

装 Harness 的完整流程和四种模式详解在 [DeepSeek Harness 教程](/deepseek-harness-guide/)；想要个装好就用的成熟替代品，[Claude Code](/claude-code-install-guide/) 和 [Codex](/codex-install-guide/) 都有完整教程；各 AI 工具怎么按场景选，[AI 工具箱](/ai-tools/) 里分好类了。
