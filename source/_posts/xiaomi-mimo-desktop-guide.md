---
title: 小米 MiMo Desktop 实测（2026）：小米版 Codex，一张图建 3D 模型，邀测免费
date: 2026-11-24 10:30:00
updated: 2026-11-24 10:30:00
categories: AI工具
tags: [小米MiMo, MiMo Desktop, 小米版Codex, AI Agent, 3D建模, AI工具]
keywords: 小米mimo desktop,小米版codex,mimo desktop邀测,mimo-x-pro,mimo-x-flash,小米ai桌面,mimo desktop怎么申请,mimo desktop实测,ai建模blender,ai做ppt,ai写网页,国产ai agent,mimo desktop下载,mimo桌面版
description: 小米 MiMo Desktop（「小米版 Codex」）邀测实测：一张参考图自动调 Blender 建出 90+ 零件的机械键盘并做爆炸动画，截图加录屏复刻 GSAP 官网动效，跨会话把报告做成 PPT。Goal/Smart 模式、Skill 复用（40 分钟变 5 分钟）、缓存命中率 99% 的成本控制，附国内/海外邀测申请入口——海外旗舰额度烧得肉疼的，先来免费白嫖这个。
top_image: https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/mimo-desktop-guide-banner.webp
photos: [https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/mimo-desktop-guide-banner.webp]
faq:
  - q: "小米 MiMo Desktop 是什么？和 Codex 有什么区别？"
    a: "MiMo Desktop 是小米 MiMo 首个面向个人用户真实工作场景的桌面 AI 应用，2026 年 9 月 8 日官宣开启邀请制测试，外界常叫它「小米版 Codex」。区别在于定位：它主攻长程复杂任务——你丢进图片、视频、PDF 等素材并说明目标，它自己拆任务、调工具、交付可继续修改的成品，而不是一问一答的聊天窗口。"
  - q: "MiMo Desktop 怎么申请邀测？要钱吗？"
    a: "官方有公开的邀测申请页：国内是 mimo.xiaomimimo.com/desktop/invite，海外是 mimo-ai.xiaomimimo.com/desktop/invite，提交申请等审核即可，优先面向 Xiaomi MiMo 开放平台已有用户。邀测期间可以限时免费体验两款新一代模型 MiMo-X-Pro-Preview 和 MiMo-X-Flash-Preview，正式版的收费策略官方尚未公布——邀测是否仍在开放，以申请页当前状态为准。"
  - q: "MiMo-X-Pro 和 MiMo-X-Flash 两款模型有什么区别？"
    a: "官方暂未公布两个型号的详细规格，从命名看是 Pro（更强）和 Flash（更快）两条产品线。实测中处理建模、写网页这类长任务时默认调用的就是 Flash 型号，具体能力差异要等正式发布。"
  - q: "完全不会 3D 建模，也能用它做模型吗？"
    a: "可以。实测只给一张机械键盘三视图，它自动调用 Blender 完成 90 多个零件的建模、拆解动画和爆炸动画，再导出 glb 做成可交互网页，全程不需要碰 Blender 界面。把这套流程存成 Skill 后，换个物体复用，5 分钟就能出新成品。"
  - q: "国内能直接用 MiMo Desktop 吗？"
    a: "邀测版客户端需要稳定的国际网络环境才能顺畅使用，模型调用也依赖境外网络质量。网络是这类 AI 桌面工具的第一道门槛，先把网络这关过了再上车——桌面端配置看本站的 Windows 网络教程。"
  - q: "MiMo Desktop 和 GPT-6 Astra 比怎么选？"
    a: "两者定位接近但阶段不同：GPT-6 Astra 是 OpenAI 已发布的旗舰模型（11 月的 GPT-6.2 又降价 20%），能力强，但 Plus 订阅跑重任务额度照样容易见底；MiMo Desktop 处于邀测期，可以免费体验，长任务交付和成本控制（缓存命中率最高 99%）是亮点。预算充足追能力选 Astra，想零成本尝鲜选 MiMo 邀测；国产直连的免费路线还有 Kimi K3.1 Pro 一档。"
related:
  - slug: gpt-62-astra-sol
    text: GPT-6.2 Astra/Sol 发布解读：降价 20%、ARC-AGI-3 首个满分
  - slug: gpt-6-astra
    text: GPT-6 Astra 国内怎么用？能力解读、上车到避坑全指南
  - slug: kimi-k31-pro-guide
    text: Kimi K3.1 Pro 实测：草图变 3D 网页、全球第四，免费就能用
  - slug: deepseek-harness-guide
    text: DeepSeek Harness 教程：安装配置、四种模式与插件玩法
---

> 🔧 海外旗舰的额度烧得肉疼的时候，国产桌面 Agent 来了个能白嫖的：**小米 MiMo Desktop 邀测免费**，一张三视图自动调 Blender 建出 90+ 零件的机械键盘、跨会话把报告做成 PPT——外界叫它「小米版 Codex」。本文是完整实测，外加邀测申请入口。<!-- more -->想先看国产直连、连网络都不用配的免费档，[Kimi K3.1 Pro 实测](/kimi-k31-pro-guide/)在这；海外旗舰那条线的账，[GPT-6 Astra 全指南](/gpt-6-astra/)算得最细。

## 30 秒速答

**小米 MiMo Desktop 是什么**：小米 MiMo 首个面向个人真实工作场景的桌面 AI 应用，2026 年 9 月 8 日官宣邀请制测试，可以理解为**小米版 Codex**——但它主攻的不是代码补全，而是长程复杂任务：丢素材、说目标，它自己拆步骤、调工具，交付能直接用的成品。

**实测能干什么**：一张参考图自动调 Blender 建出 90+ 零件的机械键盘并做爆炸动画；截图加录屏复刻 GSAP 官网动效；研究报告跨会话一键转 PPT。

**怎么上车**：去官方邀测申请页提交申请（国内 mimo.xiaomimimo.com/desktop/invite，海外 mimo-ai.xiaomimimo.com/desktop/invite），审核通过即可下载客户端，优先 MiMo 开放平台已有用户；邀测期间可免费体验 MiMo-X-Pro-Preview 和 MiMo-X-Flash-Preview 两款新一代模型。

## 三个实战一览

| 实战任务 | 我的全部输入 | 耗时 | 交付物 |
|---|---|---|---|
| 3D 键盘建模 + 可交互网页 | 一张三视图参考图 | 首次 40 分钟，复用 Skill 后 5 分钟 | 90+ 零件的 glb 模型 + 3D 网页 |
| 复刻 GSAP 官网动效 | 1 张截图 + 1 段录屏 | 一轮对话 | 同风格动态网页 |
| 研究报告转 PPT | 上个会话的报告（新会话零素材） | 约 5 分钟 | 10 页可编辑 PPT |

下面逐个展开讲（实测基于 10 月底邀测版，后续版本功能可能调整）。

---

小米也下场做桌面 Agent 了。

看到小米 MiMo 桌面版官宣开启邀测的消息时，我第一反应是：又一家大厂挤进这个赛道。但真正让我上心的原因很实际——早前用 [GPT-6 Astra](/gpt-6-astra/) 连 Blender 玩 3D 生成，额度掉得飞快，跑一会儿就见底，属实肉疼。听说 MiMo Desktop 邀测期免费，还带两款没正式发布的新模型（MiMo-X-Pro-Preview / MiMo-X-Flash-Preview），我托人拿到了邀测名额，正好拿它接着干同样的活，顺便做个全面实测。

![Xiaomi MiMo 官方宣布 MiMo Desktop 开启邀请制测试](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/mimo-desktop-launch-announcement.webp)

先说清楚它是什么：MiMo Desktop 是 Xiaomi MiMo 首个面向个人用户真实工作场景的桌面 AI 应用。注意「桌面」这两个字——它不是又一个聊天窗口，而是一个桌面 Agent 程序：你把 Office 文件、图片、视频、音频甚至压缩包丢给它，说清楚要做什么，它会自己拆任务、调用工具，最后交付一个能继续修改的成品。

官方对它的定位是「解决长程复杂任务，交付高质量可用的结果」。这句话听着虚，但往下看完这几个实战案例，你会有具体的感觉。

## 实战一：一张参考图，自动调 Blender 建出 90+ 零件的键盘

先交代背景。GPT-6 Astra 发布后，不少人拿它连 Blender 做 3D 生成，成品确实惊艳，我上手试了试：

![GPT-6 Astra 的 Extra High 额度条，跑重任务掉得飞快](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/mimo-gpt6-astra-blender-credits-drain.webp)

刚跑一会儿额度就快见底了。于是切到 MiMo Desktop 接着干同样的活。

我的目标：做一个可交互的 3D 机械键盘网页——敲真实键盘，网页里的按键会跟着按下、发声，还能把键盘拆开再复原。而我的全部输入，只有下面这张机械键盘三视图，外加一段需求描述，全程没碰 Blender。要搁以前，小白想用 Blender 搓出一个像样的作品，门槛是真的高。

![投入的全部素材：机械键盘三视图](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/mimo-mechanical-keyboard-blueprint-input.webp)

具体做法是用它内置的 **3D 创作 Skill**：把三视图丢进去，让它调用 Blender 做一套未来感的 3D 键盘，同时设计两个动画——拆解 W 键、整套键盘分层炸开。等了一会儿，它交付了效果图，组装态和爆炸态都做了，第一眼就超出预期：

![MiMo 生成的键盘渲染效果图：组装态与全爆炸态预览](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/mimo-futuristic-keyboard-render-result.webp)

模型确认没问题后，我想把它放进网页里玩。导出 glb、写网页、加交互，这几步串起来链路很长，我直接开了 **Goal 模式**：只说最后要做成什么样，中间步骤它自己拆，卡住了自己调整。从界面能看到它的状态——「追求目标」开关打开，持续朝目标推进，直到任务彻底完成：

![Goal 模式：打开「追求目标」开关，任务持续推进直到完成](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/mimo-goal-mode-task-progress.webp)

跑的过程中，右侧能看到任务进度和生成的文件，网页随时可以点开预览——不用干等着，方向跑偏了能及时发现。任务结束后，它给了访问链接，还列出了做好的功能和修过的问题。

说实话，挺爽的。我以前连 Blender 的基本操作都没整明白，这次只给一张参考图，居然把建模、动画、网页全跑通了。第一次完整跑下来花了 40 分钟。

这类任务考验的是 AI 的**长链路执行能力**：从理解参考图，到调用 Blender 建模、做动画，再到导出模型、编写网页，每一步的结果都要能被下一步接着用，中途还要持续跟进进度。按官方介绍，MiMo Desktop 基于 MiMo Code 框架，让新一代 MiMo 模型与 Harness（任务执行框架）协同优化，重点强化工具调用、上下文管理和任务编排——「模型负责思考、Harness 决定它能调什么」这套思路，开源那边的 [DeepSeek Harness](/deepseek-harness-guide/) 走的是同一条路，MiMo 把它包成了开箱即用的桌面产品。这次从参考图一路跑到可交互网页，算是直观验证了这个协同的完成度。

## Skill 复用：第一次 40 分钟，第二次 5 分钟

流程跑通后，我顺手让它把整套流程存成了 **Skill**。下次换个物品，只要给参考图，就能照着这套流程继续建模、做爆炸动画。

比如让它做一个天文望远镜的建模爆炸效果——直接复用刚才的 Skill，从建模到渲染视频只用了 **5 分钟**，第一次做键盘可是花了 40 分钟。注意零件还更多：望远镜 144 个，比键盘的 90+ 更复杂，时间反而压到原来的八分之一。省时间，也省 token。

![望远镜爆炸动画任务：5 分 52 秒完成，含 144 个零件的分离动画](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/mimo-telescope-exploded-animation.webp)

效果拿得出手，零件拆分和爆炸动画都出来了。这就是 Skill 机制的价值：跑通一次的流程可以沉淀下来反复用，越用越快。

## 实战二：截图加录屏，复刻 GSAP 官网动效

3D 建模跑通后，我换了种玩法。先来了个简单的：丢几张黄鹤楼和武汉夜景的照片，让它照着照片里的城市氛围做一个旅行规划页面。成品有模有样，点开每个地标都有对应介绍。

交互简单，我决定上难度：我一直蛮喜欢 GSAP 官网的设计和动效，想让它照着做一个。

这种效果光靠文字很难描述清楚——「高级感」「流畅的滚动动效」这类词，AI 听了也是瞎猜。我的办法是：截一张官网的图，再录一段操作视频，两份素材一起丢给它。图片看样式，录屏看动效。

![只靠截图和录屏复刻的 GSAP 官网风格页面](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/mimo-gsap-website-recreation.webp)

最后做出来的页面，第一眼真有 GSAP 官网那个味道：配色和主要动效都还原了，它还顺手加了一些自己的设计想法。只靠一张截图和一段录屏能做到这个程度，超出预期。

这背后是多模态素材的**互补作用**：截图提供布局、配色和视觉层级，录屏补充滚动、点击时的动态变化。模型要结合两种素材理解设计要求，再转化成页面结构和交互逻辑——那些很难用文字描述的效果，从此有了明确的参考系。

## 实战三：研究报告跨会话做成 PPT

最近 AI 硬件挺火，我让 MiMo Desktop 整理一份《2026 年 AI 硬件产业全景》研究报告。它先拆分研究范围，再逐个查资料、整理数据，最后汇成一份网页报告。看完基本能把这几年 AI 硬件的变化快速摸清。

网页报告有点长，我想压一压、配上图，做成 PPT。这次我开了一个**新会话**，只说了一句：「把刚才的报告做成 PPT。」

结果它自己找到了上个会话里的研究报告，直接接着搜图、排版——**跨会话的成果复用**，不用重新交代背景、搬运资料：

![跨会话复用：新会话自动找到上个会话的研究报告，接着做 PPT](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/mimo-cross-session-ppt-reuse.webp)

等了一会儿 PPT 就出来了，10 页，整体不错，就是字有点多。

改的时候我懒得自己挑模型，直接开 **Smart 模式**，只丢一句：「文字太多了，多用图表和图片展示。」按官方介绍，Smart 会综合评估任务类型、复杂程度、交付要求和执行成本，自动匹配合适的模型、Agent 和 Skill，把质量、速度、成本一起纳入调度。对我来说就是：不用研究模型和 Skill，直接说哪里不满意。

整体改完后我又抠了抠细节：某页有组数字看着太干，直接**框选**那块区域，让 AI 换成图表。等了一会儿就改好了，前后一对比，重点信息更集中，更适合演示：

![框选修改前后对比：干巴巴的数字块变成了图表速览](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/mimo-chart-revision-before-after.webp)

不过 AI 改 PPT 也有翻车的时候——有一版改完还不如改之前。好在每次修改都留版本记录，直接点**版本回滚**就能退回，不用担心 AI 瞎改最后连原版都找不着。

对于需要反复修改的工作，**框选**让修改要求落到具体元素上，**版本记录**让修改过程可回溯，两者结合才是可控的修订流程。

## 成本控制：它是怎么让我不心疼额度的

写到这里，最大的感受是：终于不用自己收拾 AI 留下的残局了。从建模到 PPT，成品都能直接打开，不满意接着改，改坏了能回滚。

而成本控制上，MiMo Desktop 主要做了三件事：

![MiMo Desktop 的成本控制机制：Smart 调度、局部编辑、上下文缓存](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/mimo-cost-control-cache.webp)

1. **Smart 调度**：按任务需求匹配模型和执行路径，不杀鸡用牛刀；
2. **局部编辑**：框选式修改，只重新生成需要的范围；
3. **上下文缓存**：减少重复内容的计算。

三种机制分别作用于模型选择、修改范围和上下文复用。按官方测试数据，同会话缓存命中率最高 99%，跨会话最高 95%——对需要多轮沟通、反复修改的任务，这个体感差异非常明显。对比我跑 GPT-6 Astra 那几分钟见底的额度条，邀测期的 MiMo Desktop 用起来是真的不心疼。

## 结论

AI 工具值不值钱，不看它能聊什么，看它能交什么活。

MiMo Desktop 这几轮实测下来，交付的东西都是能直接打开、能接着改的成品，不是聊天记录里的一段代码。长链路任务（建模→动画→网页）、多模态理解（截图+录屏）、跨会话复用（报告→PPT），这三块的表现对得起「小米版 Codex」这个外号，部分体验甚至比我预期的好。

也要说清楚现状：目前它还是**邀测预览版**，名额有限、两款模型（MiMo-X-Pro-Preview / MiMo-X-Flash-Preview）的能力细节没完全公开、正式版的收费策略未知。所以我的建议是：感兴趣就去官方邀测页（mimo.xiaomimimo.com/desktop/invite）提交申请，邀测期能免费用就是赚到；等不及的，已发布的旗舰能力更强——GPT-6 Astra 一直是这类长任务的标杆，11 月迭代出的 [GPT-6.2](/gpt-62-astra-sol/) 又降价 20%，但订阅档跑重任务额度依然吃紧；真要上车，[GPT-6 Astra 全指南](/gpt-6-astra/) 里镜像和合租的省法先看完再下单。

另外提醒一句：这类桌面 AI 工具对网络环境的要求不低，客户端更新、模型调用、素材上传都走国际网络，网络不稳的话体验会大打折扣——[先把网络这关过了](/windows-internet-guide/)再谈工具。全程零网络依赖的国产免费路线，[Kimi K3.1 Pro](/kimi-k31-pro-guide/) 也值得一试。

等正式版开放后，我会再测一轮它的能力边界和性价比，到时候见。
