---
title: DeepSeek Harness 教程（2026）：安装配置、四种模式与插件玩法
date: 2026-11-17 10:30:00
updated: 2026-11-17 10:30:00
categories: AI工具
tags: [DeepSeek, DeepSeek Harness, AI Agent, AI编程, 开源, 插件, Cordis]
keywords: deepseek harness,dsh,deepseek harness安装,deepseek harness教程,deepseek开源,ai agent框架,一切皆插件,cordis内核,npx dsh,dsh四种模式,dsh插件,ai agent运行时,deepseek api key配置,claude code替代,自组装agent,开源agent框架,dsh web ui,ai编程工具,agent插件开发,2026 ai工具
description: DeepSeek Harness（dsh）是 DeepSeek 开源的 AI Agent 运行时，核心理念「一切皆插件」：模型、工具、界面、任务循环全部可替换。本文从 npx 一条命令安装讲起，走通模型配置、四种模式选择、Cordis 插件机制与社区插件安全，没编程经验也能跟着做。
top_image: https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/banner-dsh.webp
photos: [https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/banner-dsh.webp]
faq:
  - q: "DeepSeek Harness 是什么？"
    a: "DeepSeek Harness（简称 dsh）是 DeepSeek 开源的 AI Agent 运行时，核心理念「一切皆插件」：模型、工具、界面、会话、沙箱、任务循环全做成可替换的插件，由 Cordis 内核负责加载和依赖管理。一句话理解：Agent = 大模型 + Harness，模型负责思考，Harness 决定它能看什么、能调什么工具。"
  - q: "DeepSeek Harness 怎么安装？"
    a: "最省事是一条官方命令：先装好 Node.js 和 DeepSeek API Key，终端运行 npx @deepseek-ai/dsh web。第一次会下载依赖，启动后终端打印 Web UI 地址（默认 http://127.0.0.1:3080），复制到浏览器打开即可。想开发插件的可以从源码运行：git clone 官方仓库后 pnpm install、pnpm run build、pnpm dsh web。"
  - q: "DeepSeek Harness 和 Claude Code、Codex 有什么区别？"
    a: "Claude Code、Codex 这类是厂商配好的固定 Agent：工具、权限、任务循环都替你定好了，开箱即用。DeepSeek Harness 把这些组件全部开放出来，让你自己组装——加工具、换模型、改权限、写插件都行。它更像组装 Agent 的模块化框架，不是开箱即用的聊天工具。"
  - q: "DeepSeek Harness 的四种模式怎么选？"
    a: "日常任务用标准模式（整理文件、改文档、分析资料、写代码）；步骤多、要批量执行的交给 PTC 模式；极简模式只保留 Shell 和文件编辑两个工具，适合开发者测模型；创造模式开放插件组合，能装社区插件或让 Agent 自制插件。先用标准模式，遇到默认能力做不了的再进创造模式。"
  - q: "DeepSeek Harness 装社区插件安全吗？"
    a: "要谨慎。收录数量多不等于都经过安全审核。从 GitHub 装的插件可能在安装阶段执行 prepare 构建脚本，pnpm 默认会拦住，只有把插件明确加入 allowBuilds 才会继续。建议只装来源可信、最好锁定具体 commit 的插件，来路不明的仓库别急着运行。"
related:
  - slug: deepseek-harness-update-guide
    text: DeepSeek Harness v0.2.3 大更新：时间线、代码审阅与 Git 插件源
  - slug: deepseek-vision-guide
    text: DeepSeek 多模态实测：V4.1 Flash 看图能力与接入
  - slug: claude-code-install-guide
    text: Claude Code 安装配置教程：Windows 安装到实战
  - slug: codex-install-guide
    text: Codex 安装使用教程：国内 Trae 配置全流程
---

> 🔧 这篇写给**想拆开 Agent 看看里面的人**：不满足于用现成的 Codex、Claude Code，想自己换模型、加工具、改权限、组装一个贴身定制的 Agent。只想装好就用的，[Claude Code 教程](/claude-code-install-guide/) 和 [Codex 教程](/codex-install-guide/) 更省事，不用折腾这篇。

<!-- more -->

## 30 秒速答

- **DeepSeek Harness（dsh）是什么**：DeepSeek 开源的 AI Agent 运行时，官方概括一句话——**Everything is a Plugin，一切皆插件**：模型、工具、界面、任务循环全都能替换
- **和 Claude Code 什么区别**：Claude Code 是厂商配好的固定 Agent，dsh 把组件全拆开让你自己组装
- **怎么装**：`npx @deepseek-ai/dsh web` 一条命令，前提是 Node.js + DeepSeek API Key
- **要花多少钱**：软件免费开源，模型调用走 DeepSeek API 按量计费
- **适合谁**：有明确需求、现成 Agent 缺某项能力、愿意折腾的人；图省事的别来

## 一、Harness 到底是什么：模型之外的那一层

把 Agent 理解成一个能干活的 AI 员工，它由两部分组成：

**Agent = 大模型 + Harness**

大模型负责理解、推理和生成；Harness 负责把模型放进一个能干活的环境里——给它工具、文件权限、上下文、任务循环、插件和执行记录。

同一个模型放进不同的 Harness，表现可能差很多。区别常常出在：模型能看到哪些信息、可以调用什么工具、失败以后怎么重试、每一步有没有权限限制。这套思路不止开源社区在玩，小米 MiMo Desktop 就是「MiMo 模型 + MiMo Code 框架」包成开箱即用桌面产品的路线——一张图自动调 Blender 建模、跨会话做 PPT，实测看 [小米 MiMo Desktop 邀测指南](/xiaomi-mimo-desktop-guide/)。

![DeepSeek Harness 项目概念图](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/dsh-01.webp)

所以 DeepSeek Harness 的重点不在模型本身，而在**怎么组装和管理 Agent**。模型接入、工具、界面和运行能力，都可以通过插件体系组合——驱动这套体系的内核叫 **Cordis**，这个名字后文还会出现，先记住就行。

![Agent = 大模型 + Harness](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/dsh-02.webp)

## 二、安装前准备：Node.js 和 API Key

最省事的官方安装方式需要两样东西。

**Node.js**，用来运行 DeepSeek Harness。去 Node.js 官网下载长期支持版（LTS），按安装向导走完：

![Node.js 官网下载页](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/dsh-03.webp)

**API Key**，到 DeepSeek 开放平台创建，相当于模型调用凭证，后续请求按量计费。安全红线：**不要把 Key 发进群聊、截图或公开文档，也不要写进准备上传 GitHub 的文件**：

![DeepSeek 开放平台创建 API Key](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/dsh-04.webp)

## 三、一条命令跑起来

打开终端（Windows 用 PowerShell 或命令提示符，macOS 按 Command + 空格搜「终端」），输入官方命令：

```bash
npx @deepseek-ai/dsh web
```

第一次运行会下载依赖，等一会儿。启动成功后终端会打印 Web UI 地址，官方默认是：

```text
http://127.0.0.1:3080
```

复制到浏览器打开，就进去了。

偷懒技巧：如果你已经在用 Codex、Claude Code 或 WorkBuddy，可以把 dsh 的官方仓库地址（[github.com/deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness)）发给它，让 AI 替你检查 Node.js 环境并执行启动命令——过程和手动装完全一样，跑完照旧认准终端打印的本地地址。

官方也提供从源码运行的方式（git clone + pnpm install + pnpm run build + pnpm dsh web），那是给准备开发插件的人用的，普通用户用不上。

## 四、第一次打开：配置模型和工作区

**配模型**：进 Web UI 后打开设置里的 Models 页面，找到 DeepSeek，填入 API Key 保存。官方文档说明，模型配置保存后下一次请求就生效，不用重启服务：

![Models 页面配置 API Key](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/dsh-06.webp)

**选工作区**：选一个本地文件夹，Agent 后续读取和修改的文件都放在这里。第一次体验强烈建议**新建一个空文件夹**，别直接选桌面、文档目录或正在用的重要项目：

![选择工作区文件夹](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/dsh-07.webp)

**看权限**：dsh 会按当前权限策略决定哪些操作直接执行、哪些要先征得同意。刚上手保留审批提示更稳妥，看懂它会调用哪些工具后再逐步放开：

![权限策略设置](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/dsh-08.webp)

然后发第一个任务验证链路：

> 在当前工作区新建一个名为 deepseek-harness.txt 的文档，写入 DeepSeek Harness，完成后告诉我文件保存位置。

它能建文件、写内容、报路径，模型、工作区和基础写入能力就全接通了：

![第一个任务执行成功](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/dsh-09.webp)

## 五、四种运行模式怎么选

- **标准模式**：普通任务都从这开始——整理文件、改文档、分析资料、处理代码
- **PTC 模式**：步骤多、要批量执行的活——批量读文件、按同一规则处理数据、连续完成一组标准动作
- **极简模式**：预设最少，接近直接观察模型怎么处理任务，开发者测试用，一般用户很少碰
- **创造模式**：开放插件组合能力，可以装社区插件，也可以让 Agent 按开发文档做新插件

![dsh 四种运行模式](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/dsh-10.webp)

选择原则一句话：**日常任务用标准模式，确实遇到默认能力做不了的事，再进创造模式**。

## 六、Cordis 内核：插件怎么协作

按官方架构文档，插件可以注册工具、事件监听和其他服务；插件卸载时，通过上下文注册的内容会自动清理；插件依赖的服务没就绪，框架会等依赖好了再加载它。

规则听着抽象，拿**图片翻译 Agent** 当例子就清楚了。需求：用户上传一张带外语文字的图片，Agent 先识别图中文字，再翻译成中文，最后把译文保存成文档：

![给 Agent 的任务描述：图片翻译](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/dsh-12.webp)

开始制作后，dsh 会先确认交付形式——明确告诉它，要做成一个可安装、可复用的插件：

![图片翻译任务：确认交付形式](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/dsh-13.webp)

这里有个真实的技术坑：官方模型配置文档写得清楚，DeepSeek 自己的 Chat Completions 路由按**文本模型**处理，附带图片的请求会在发送前被拒绝——要完成这个任务，得接入支持图片的模型或视觉插件。

好消息是这个限制官方已经补上了：9 月发布的 V4.1 Flash 原生支持多模态，在 Harness 里把模型 ID 改成 `deepseek-flash`（旧的 `deepseek-v4-flash-vision-exp` 仍兼容）就能接收图片输入，比挂第三方视觉插件省事，还少一层数据中转——实测效果（网页复刻、报错定位、发票识别）看 [DeepSeek 多模态实测](/deepseek-vision-guide/)。10 月 17 日这个模型又升级到 V4.1-Flash-1017，跑分和成本表现更好，代码生成能力也涨了一截——官方管这叫「许愿式编程」，大白话提需求，它直接交付完整可用的代码。Harness 需要 0.2.1-rc.1 以上版本才能完整适配，多模型协作的实战看 [DeepSeek 1017 游戏素材实测](/multimodel-game-assets/)。

回到插件协作：视觉插件识别图中文字 → 翻译插件把识别结果翻成中文 → 导出插件把译文存成文档，Cordis 负责它们的加载、依赖和清理。如果翻译插件声明依赖视觉识别服务，视觉插件没就绪时翻译插件会等待，导出环节也不会提前执行——**加功能、删功能不用每次重做整个 Agent**：

![三个插件按顺序协作完成图片翻译](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/dsh-14.webp)

插件骨架搭好后，对话框上方会出现这个插件的操作界面，这就是它的使用入口：

![插件操作界面出现在对话框上方](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/dsh-15.webp)

dsh 还保留完整的会话和工具执行记录：用户说了什么、模型怎么响应、调了哪个工具、工具返回什么，都能顺着记录查。插件出错时，开发者可以从具体步骤开始排查，不必只看最后那句失败提示：

![会话与工具执行记录](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/dsh-16.webp)

## 七、社区插件去哪找，安全吗

社区已经有人把散落在 GitHub 上的插件整理成了 **DSH 1024Store**：截至 2026 年 8 月 17 日汇总了 4120 个插件，既有开发者 PR 提交的，也有从 GitHub dsh-plugin 话题自动发现的，还提供在线市场、搜索入口和查询 API。想加主题、通知、文件处理或外部服务连接时，先按名称、作者或功能搜一圈，看有没有现成方案，再决定直接装还是参考代码自己做：

![DSH 1024Store 社区插件目录](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/dsh-17.webp)

但**收录数量只能说明选择多，不能代表每个都经过安全审核**。官方 CLI 有专门提示：从 GitHub 安装的插件可能在安装阶段执行 prepare 构建脚本，这一步由 pnpm 在插件所在 profile 目录完成，不属于 Agent 任务的沙箱执行流程；pnpm 默认会拦住这类脚本，只有把插件明确加入 allowBuilds 才会继续。

三条安全底线：

1. 只装来源可信的插件，最好锁定具体 commit
2. 来路不明的仓库，截图做得再好看也别急着运行
3. API Key 之类的敏感信息，别放进任何插件能读到的地方

## 八、适合谁，值不值得上手

**只想装好就用、不想碰 Node.js 和 API Key 的**：[Claude Code](/claude-code-install-guide/)、[Codex](/codex-install-guide/) 这类成熟 Agent 产品省事得多，dsh 对你是负担。

**有明确需求、现成 Agent 又缺某项能力的**：dsh 有意思得多——装别人写好的插件，或让 Agent 按官方文档替你做一个，模型、工具、界面都能继续调整，做出来的东西更贴近自己的活。

它当前的短板也直说：开发者预览阶段，界面和配置可能变化（v0.2.3 就把 Cordis 升到了 4.0、插件接口改了一轮，变化快到什么程度、升级要注意什么，[v0.2.3 大更新解读](/deepseek-harness-update-guide/)里逐条列了）；社区插件质量参差；自制插件能生成出来，但测试和维护都是你自己的事。

所以第一次上手别急着组装万能 Agent，走这三步：

1. 装好 dsh，选个空工作区，跑通模型配置
2. 装一个来源可信的插件，观察它加了什么能力
3. 两步都稳了，再做一个只解决单一问题的插件

走完这一遍，dsh 最基本的使用路径就通了。

## 写在最后

DeepSeek Harness 的价值不在「又一个 AI 客户端」，而在把 Agent 拆成了零件：模型是零件，工具是零件，界面也是零件，Cordis 负责把它们拼起来。会组装的人，能拼出比任何现成产品都贴身的 Agent。

想接着折腾的，[DeepSeek 多模态实测](/deepseek-vision-guide/) 帮你把「眼睛」接上，[1017 版游戏素材实测](/multimodel-game-assets/) 看多模型协作的成本账；想横向对比编程 Agent 的，[AI 工具箱](/ai-tools/) 里按场景分好类了。
