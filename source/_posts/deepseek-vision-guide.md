---
title: DeepSeek 多模态实测（2026）：V4.1 Flash 看图能力、接入教程与价格
date: 2026-11-09 10:00:00
updated: 2026-11-09 10:00:00
categories: AI工具
tags: [DeepSeek, 多模态, AI工具, 图像识别]
keywords: deepseek多模态,deepseek看图,deepseek v4.1,deepseek v4.1 flash,deepseek-flash,deepseek vision,deepseek接入教程,deepseek价格,deepseek识图,deepseek图像识别,deepseek api,deepseek-v4-flash-vision-exp,大模型多模态,多模态模型,ai识图,发票识别,报错截图识别,deepseek怎么接入,deepseek能看图吗
description: DeepSeek 能看图了：V4.1 Flash 上线原生多模态，改一个模型 ID 就能接入。附网页复刻、报错截图定位、发票识别三个真实实测、价格与避坑点，看完就能上手。
photos: [https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/deepseek-vision-banner.webp]
related:
  - slug: codex-install-guide
    text: Codex 安装使用教程：Trae 配置与登录全流程
  - slug: ai-tools-network-guide
    text: AI 编程工具网络配置：TUN 模式与节点挑选
  - slug: windows-internet-guide
    text: Windows 翻墙教程：Clash Verge 从零配置
---

> 🔍 这篇写给**在用 DeepSeek、或者打算把它接进自己工作流的朋友**：三个真实实测场景（网页复刻、报错定位、发票识别）+ 改一个模型 ID 就能用的接入方法 + 价格账，一次讲完。只想看结论的，直接跳「30 秒速答」。

<!-- more -->

用 DeepSeek 的朋友多少都遇到过这种尴尬：想让它看一眼截图里的报错，它回你「我无法查看图片」；想让它认张发票，它说「请提供文字」。说白了，过去很长一段时间它就是个纯文本模型，**「能看图」这件事一直是空白**。

这个空白，八月下旬补上了——DeepSeek 发了个实验性多模态模型，**deepseek-v4-flash-vision-exp**。

而 9 月 10 日，这件事又往前走了一步：DeepSeek 发布 **V4.1 Flash**，视觉能力从「外挂实验」转正为「原生多模态」。这篇文章把两代都讲清楚：怎么看、怎么接、多少钱。

## 30 秒速答

- **它是什么**：DeepSeek 首个支持图像输入的模型，能描述图片、识别截图文字、分析图表
- **2026 年 9 月更新**：V4.1 Flash（9/10 发布）原生多模态上线，视觉从外挂转正，新接入用 `deepseek-flash`
- **怎么接入**：改模型 ID 就行——新接入用 `deepseek-flash`，旧集成沿用 `deepseek-v4-flash-vision-exp` 也兼容，不需要重新搭环境
- **支持格式**：JPEG、PNG、GIF、WebP（按文件实际内容识别，不看后缀名）
- **价格**：输入（缓存命中）约 0.05 - 0.1 元/百万 tokens，输出约 4.5 - 9 元/百万 tokens
- **实测能力**：网页复刻、报错定位、发票识别三个场景都能干

## deepseek-v4-flash-vision-exp 是什么

名字里有两个关键信息：**v4**，说明它是 V4 系列；**vision**，说明它终于能「看」了。

最省事的是接入方式——不需要重新搭环境，只要把 API 里的模型名换成 `deepseek-v4-flash-vision-exp`，就能直接调用图片能力。以前接过 DeepSeek 的人，**改一个模型 ID 就能用**。

官方支持三种能力：描述图片、识别截图里的文字、分析图表。格式支持 JPEG、PNG、GIF、WebP。有个细节值得单独提：它是按文件的**实际内容**判断格式，而不是看文件名后缀——你把一个 PNG 改名成 .txt 丢给它，它照样认得出来。

![DeepSeek v4 flash vision exp 能力价格对比表](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/img_10.png)

这张图是官方文档给出的能力/价格总表。横向对比 deepseek-v4-flash、deepseek-v4-pro 和 deepseek-v4-flash-vision-exp：上下文长度都是 1M，输出最大 384K，Json Output、Tool Calls、Responses API、Anthropic API 都支持；v4-flash-vision-exp 的输入价和 v4-flash 一致（缓存命中 0.05 / 0.1 元），输出价（4.5 / 9 元）也差不多，相当于**多模态能力基本是加量不加价**。

## 2026 年 9 月更新：V4.1 Flash，视觉从「外挂」转正「原生」

上面讲的 vision-exp 是 8 月的临时答案。9 月 10 日，DeepSeek 发布 **V4.1 Flash**，看图从实验能力变成了模型的正式组成部分，区别是架构级的：

- **vision-exp 是外挂**：在纯文本的 V4 Flash 上外接一个视觉编码器，图文两条通路、后期融合。能用，但跨模态推理偏弱，而且挂着「实验」标签
- **V4.1 Flash 是原生**：图像从预训练第一天起就在训练语料里，视觉编码器（DeepSeek-ViT）从零与文本主干一起训练，图文共享同一个表示空间——不再有单独的 vision 分支，也没有「Exp」后缀

官方公布的视觉基准：**DocVQA 95.6**（扫描文档/表单问答，对应下面发票识别那个场景）、**RefCOCO 86.0**（在图里定位指定元素，对应截图找按钮的 Agent 场景）、CVBench 77.9、MMMU-Pro 56.5。对照本文的三个实测场景：发票识别、报错截图定位这类任务，在 V4.1 上只会更稳。

接入同步简化：模型 ID 统一为 `deepseek-flash`，旧的 `deepseek-v4-flash-vision-exp` 走路由兼容、逐步淘汰；价格维持 Flash 档。一句话：**新代码直接按 V4.1 写，老集成不用急着改**。

补一条最新动态：10 月 17 日 V4.1 Flash 升级到了 1017 版本，11 项基准全涨、多模态相关项也在其中（BabyVision 92.5），价格和模型名照旧不变。

## 价格：一杯奶茶钱

价格按 token 计费，图片会被换算成 token，和文字一起算。

实测口径（每百万 tokens）：

| 项目 | 空闲时段 | 高峰时段 |
|---|---|---|
| 输入（缓存命中） | 0.05 元 | 0.1 元 |
| 输出 | 4.5 元 | 9 元 |

什么概念？普通用户日常跑点识图、分析截图的量，一个月下来可能花不了一杯奶茶钱。便宜，一直是 DeepSeek 最大的标签之一。

> 注：以上为「缓存命中」口径的输入价，未命中价以官方定价页为准。

## 三个实测：它到底「看」得怎么样

光说不练假把式。实测挑了三个最能说明问题的场景，逐个看。

**第一个，网页复刻。** 把 GitHub 一个前端页面的截图直接丢给模型，让它照着复刻。结果模型把整个页面的基础信息结构都读懂了，还原度还不错。但放大对比之后，和 Kimi 的 K3 比还是差一些——K3 连头像这种细节都能还原得更好。

![DeepSeek 网页复刻 GitHub Dashboard 效果](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/img_06.png)

上图是复刻后的页面效果，左侧仓库列表、中间 Home Feed、右侧 changelog 的基本结构都还原出来了。细看头像、阴影这些细节还不够精致，但作为一个「只看图就搭页面」的 demo，已经能省掉大量手写布局的时间。

**第二个，报错截图。** 把一段报错代码的截图丢过去，模型直接定位到 `github-dashboard.html` 的 682 行，指出问题出在一个空对象还被继续读取 user 属性，报错类型是 `TypeError: Cannot read properties of null`。定位完原因还不算完，它顺手把空值保护逻辑补上、把代码改了。从看图、定位到修复，一条龙。

![DeepSeek 识别报错截图并定位修复代码](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/img_05.png)

从截图里能看到：它先说「已解决」，再列出出错位置、错误类型、触发点，最后把第 680–687 行的修复代码贴出来。这个流程对前端排查 bug 特别友好——以前得把报错文字复制给 AI，现在直接丢截图就行。

**第三个，发票识别。** 一张发票截图丢进去，模型很快把发票类型、号码、开票日期这些核心字段都抽了出来，还按基础信息、购买方、销售方几个维度自动整理成了结构化表格。对日常报销、财务录入、票据归档这些场景来说，已经相当实用了。

![DeepSeek 识别发票并整理成结构化表格](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/img_01.png)

发票类型、发票号码、开票日期、购买方、销售方等字段都按表格列了出来。这种「截图 → 结构化数据」的能力，自动化做报销、票据归档基本够用了。

说实话，前两个案例确实惊艳，但发票识别这种，其实是合格的图像理解模型本该有的基本功——做到是应该的，做不到才奇怪。

## 怎么接入

除了官方 API，几个主流 Agent 都能直接接：Codex 里能用，WorkBuddy 里能用，Claude Code 也能接。甚至 Obsidian 的 WeSight 插件接入之后也能直接识图——比如让模型数一数图片里有几个人，它也能答上来。

有一个前置条件要先说清楚：**DeepSeek 的 API 国内直连没问题，但 Codex、Claude Code 这些海外 Agent 本身需要科学上网环境**。还没解决的，[Windows 翻墙教程](/windows-internet-guide/) 从零配一遍；已经能翻墙但编辑器里还是转圈的，看 [AI 编程工具网络配置](/ai-tools-network-guide/) 开 TUN 模式。机场我用的是 [一枝红杏](https://order.yizhihongxing.org/aff.php?aff=4818)，七八年的老牌，没断过流。

接入步骤就一步：把模型 ID 改成 `deepseek-flash`（V4.1 原生多模态；旧集成里的 `deepseek-v4-flash-vision-exp` 仍兼容可用）。不管是官方 API 还是各家 Agent，认准 ID 就行。想在 Codex 里跑的，安装配置看 [Codex 安装使用教程](/codex-install-guide/)，把 DeepSeek 配成模型供应商就能识图干活。

![DeepSeek API 文档 model 列表](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/img_08.png)

官方文档里的 model 参数表把各型号列在一起，只需要把 model 字段替换成对应的模型名，图片输入接口就通了。这也是最省心的一点：不改动调用方式，只改一个名字。

一句话总结：以前 DeepSeek 只长了嘴，现在终于睁开了眼。

## 这件事为什么值得关注

因为它补上了 DeepSeek 在 Agent 应用生态里最关键的一环。

过去半年，DeepSeek 靠文本能力圈了一大波开发者，但很多人做 Agent、做工具的时候，一遇到图片输入就卡住。社区为了绕开这个限制，搞出了一堆插件和第三方方案——麻烦不说，还多一层数据风险。现在官方下场，问题从根上解决了。

当然，国产模型里做多模态的不只 DeepSeek 一家，像 Kimi 的 K3、豆包的 Doubao-Seed-Evolving，支持得都比它早。所以这篇文章的主角不是「国产唯一」，而是「DeepSeek 终于跟上」。

顺带一提，识别之外，这颗模型的建模生产力也已经被人拿来干实事了——[有人用多模型分工一夜产出 1245 种游戏素材](/multimodel-game-assets/)，DeepSeek 在里面正是主力。

## 想试的话，三步

1. 去官方接口，把模型名改成 `deepseek-flash`（V4.1；旧的 `deepseek-v4-flash-vision-exp` 仍兼容）
2. 在你常用的 Agent 里，丢一张图试试（截图报错、发票、网页都行）
3. 效果好，就把它塞进你的日常流水线——丢截图比复制粘贴报错文字顺手多了

模型选型不止 DeepSeek 一家，[AI 工具箱](/ai-tools/) 收了各家主流工具，按分类挑组合。
