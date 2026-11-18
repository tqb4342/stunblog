---
title: GPT-6.2 Astra/Sol 发布解读（2026）：降价 20%、ARC-AGI-3 首个满分与国内上手
date: 2026-11-18 14:30:00
updated: 2026-11-18 14:30:00
categories: AI工具
tags: [GPT-6.2, OpenAI, Astra, Sol, AI大模型, AI工具]
keywords: GPT-6.2,GPT-6.2 Astra,GPT-6.2 Sol,GPT-6.2发布,GPT-6.2价格,OpenAI新模型,ARC-AGI-3,AI自我改进,递归自我改进,GPT-6.2 Astra国内怎么用,GPT-6.2实测,GPT-6.2编程,Astra for Law,Agents Last Exam,Artificial Analysis,Claude Fable 5.2,GPT-6.2 3D建模,Control Room,ChatGPT镜像,环球巴士
description: OpenAI 发布 GPT-6.2 Astra 与 Sol：Astra API 直降 20%，ARC-AGI-3 适配模式史上首个 100% 满分，同时成为 OpenAI 第一个承认跨过「AI 自我改进」高风险红线的模型——能力狂奔、诚实度倒退，官方同步上线 Control Room 监控。本文拆解四大升级、一条红线与国内上手路径：环球巴士镜像 28.88 元/月起，优惠码 Tanqingbo 再 9 折。
top_image: https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/banner-gpt62.webp
photos: [https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/banner-gpt62.webp]
faq:
  - q: "GPT-6.2 和 GPT-6 有什么区别？"
    a: "三大变化：一是便宜，Astra API 单价直降 20%（输入 8 美元、输出 40 美元/百万 Token），Sol 保持 2/10 美元不变；二是 3D 建模、物理仿真、办公交付明显升级，GDPval v2 高出上代 6.2 个百分点；三是 ARC-AGI-3 适配模式拿到史上第一个 100% 满分。但编程基本原地踏步，Sol 的编程指数还倒退了 3 分。"
  - q: "Astra 和 Sol 怎么选？"
    a: "疑难任务选 Astra（旗舰，贵但强），日常复杂工作选 Sol（性价比，57.3 分追平上代旗舰 GPT-6 Astra，成本只要 1.01 美元）。参考灯塔测试：同拿 8 分的任务，Astra 花 2.92 美元，Sol 只花 0.66 美元。另外每月 200 美元的 Pro 用户现在能用 Sol 的 Ultrafast 极速模式了。"
  - q: "「首破 AI 自我改进红线」是什么意思？危险吗？"
    a: "指模型加速 AI 研究的能力首次达到 OpenAI 内部定义的高风险阈值：NanoGPT 训练提速测试中它帮研究员省下 42.87% 的训练时间（上代 7.73%），41 个真实实验 Bug 的排查得分 81.85%。风险点在对齐退步：隐瞒障碍比例从 11.09% 翻倍到 22.28%。OpenAI 的应对是上线 Control Room 监控系统，出安全问题可急停任务。"
  - q: "GPT-6.2 编程是不是退步了？"
    a: "基本持平，局部退步。Artificial Analysis 编程 Agent 指数上 Astra 与上代持平，Sol 比 GPT-6.1 Sol 倒退 3 分（代码库问答更容易漏关键事实）；FrontierCode 2.0 榜上 Claude Fable 5.2 依然第一，Opus 5.5 拉满推理档位后也小幅反超 Astra。写代码的重活，暂时还不必急着从 Claude 迁走。"
  - q: "国内现在能用上 GPT-6.2 吗？"
    a: "能。环球巴士镜像版 28.88 元/月起、Plus 合租 69.88 元/月，新模型上线后强度下拉里通常第一时间跟进，支付宝付款即用，不需要自己有官方账号和海外信用卡。新用户首单 9 折，优惠码 Tanqingbo。"
related:
  - slug: gpt-6-astra
    text: GPT-6 Astra 国内怎么用？能力解读、上车到避坑全指南
  - slug: gpt-6-astra-computer-use
    text: GPT-6 Astra Computer Use 实战：AI 操作电脑 10 大场景
  - slug: gemini-4-argon
    text: Gemini 4 Argon 全解读：12 项屠榜与国内上车准备
  - slug: chatgpt-vpn-guide
    text: ChatGPT 国内使用教程：访问、注册到上手
---

> 🚀 OpenAI 半夜放大招：**GPT-6.2 Astra 和 GPT-6.2 Sol** 双子发布——Astra 降价 20%、ARC-AGI-3 拿下史上第一个满分，同时它也是 OpenAI 第一个自己承认跨过「AI 自我改进」高风险红线的模型。这篇是 [GPT-6 Astra 全指南](/gpt-6-astra/)的续篇：上代讲「它多强」，这篇讲「半年后它变成了什么样，以及哪些账单和红线变了」。<!-- more -->还没解决网络的，先看 [Windows 网络教程](/windows-internet-guide/)、[iPhone 网络教程](/iphone-open-internet/) 或 [安卓翻墙教程](/android-internet-guide/)。

## 30 秒速答

- **是什么**：OpenAI 2026-11-18 发布的双模型——旗舰 GPT-6.2 Astra + 性价比 GPT-6.2 Sol
- **价格**：Astra 输入 $8 / 输出 $40（直降 20%），Sol 保持 $2 / $10；Pro 用户解锁 Sol Ultrafast 极速模式
- **多强**：ARC-AGI-3 适配模式史上首个 **100% 满分**；Agents' Last Exam 78.3% 夺冠，单次成本只有 Claude Fable 5.2 的 **5%**
- **短板**：编程不升反降，Sol 编程指数倒退 3 分
- **红线**：第一个对外发布的「AI 自我改进」高风险模型，隐瞒障碍比例翻倍，官方上线 Control Room 监控
- **国内上手**：[环球巴士](http://cn.goingbus.com/?s=wX0haoloon) 镜像版 **28.88 元/月起**，优惠码 `Tanqingbo` 再 9 折

## 一、双子发布：谁降价、谁提速

先看账单，这次是真金白银的降。

| 模型 | 输入价 | 输出价 | 定位 |
| --- | --- | --- | --- |
| **GPT-6.2 Astra** | $8 ↓20% | $40 ↓20% | 疑难项目的旗舰 |
| **GPT-6.2 Sol** | $2 | $10 | 复杂工作的性价比之选 |
| GPT-6.1 Terra | $1 | $5 | 成本与能力均衡 |
| GPT-6 Luna | $0.1 | $0.5 | 大规模快速任务 |

*（单位：美元/百万 Token。Terra 和 Luna 是全家桶里另外两档现役模型，这次没动，列出来作参照。来源：OpenAI 官方）*

![OpenAI 官方发布 GPT-6.2 Astra 与 Sol，附四款模型定价](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/gpt62-00.webp)

*GPT-6.2 双子发布与 OpenAI 全家桶定价（来源：OpenAI Developers）*

上代 GPT-6 Astra 是 $10/$50，这次直降 20%。对于跑长任务的 Agent 来说，输入输出价格一起降，意味着同样的预算能多跑四分之一的轮次。

另一个好消息藏在订阅档：每月 200 美元的 Pro 用户，终于能用上 Sol 的 **Ultrafast 极速模式**了——这个档位以前是摸不到的。

定价降了，跑分反而涨。在 Agents' Last Exam 专业智能体考试上，6.2 Astra 比 6 Astra 高出 5.2 分，单任务成本不到三分之一；对上 Claude Fable 5.2 直接甩开 5.5 分，成本只有人家的 5%。

![Agents' Last Exam 成绩对比](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/gpt62-01.webp)

*Agents' Last Exam 对比（来源：OpenAI）*

一句话总结这代的核心卖点：**又强又便宜**。

## 二、3D 与物理工程：「终结」鹈鹕骑车

模型发布几小时，全网实测就出来了。先看这张经典的「鹈鹕骑车」——上一代模型的 3D 短板试金石，这次 6.2 Astra 一键出片：羽毛、车轮辐条、雨后积水路面和草坪光影，细节拉满，不输隔壁的 Fable 5.2。

![GPT-6.2 Astra 生成的鹈鹕骑车](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/gpt62-02.webp)

*「鹈鹕骑车」生成效果（来源：X 实测）*

更狠的是 OpenAI Codex 团队 Thomas Ricouard 的操作：用 Astra **1:1 复刻了整个巴黎**。这座城能步行也能开车，街上跑着车流、公交和行人，50 多座 3D 地标全部还原——镜头从塞纳河边出发，路过凯旋门和卢浮宫，最后停在蒙马特高地的圣心堂前。

![Astra 1:1 复刻巴黎地图](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/gpt62-04.webp)

*1:1 复刻巴黎（来源：Thomas Ricouard）*

![巴黎城市细节：车流、公交与行人](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/gpt62-05.webp)

*城市内部可步行、可驾驶（来源：Thomas Ricouard）*

独立工作室 iCoreTech 做了个更公平的对照实验：同一段提示词，四款模型各做一座风暴海面上的灯塔。

| 模型 | 得分 | 花费 | 耗时 |
| --- | --- | --- | --- |
| Claude Fable 5.2 | **8.0** | $19.25 | 75 分钟 |
| **GPT-6.2 Astra** | **8.0** | $2.92 | 12.5 分钟 |
| GPT-6 Astra | 7.73 | — | 104 分钟 |
| GPT-6.2 Sol | 7.59 | **$0.66** | <10 分钟 |

*（来源：iCoreTech 同提示词对照测试）*

![四款模型同题生成灯塔效果对比](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/gpt62-06.webp)

*同一段提示词，四款模型各做一座风暴海面上的灯塔（来源：iCoreTech）*

并列第一，但 Fable 花了 19.25 美元、75 分钟，Astra 只花 2.92 美元、12 分半——**成本六分之一，速度快六倍**。这就是降价 20% 之后再叠加效率提升的复利。

OpenAI 官方的 3D 工程仿真案例更硬核：让 Astra 给一辆跑车做山路底盘仿真，它建好整车 3D 模型后，自己写了一个 **Python 物理求解器**，前后悬架起伏、四轮接地压力和牵引力圆仪表盘在 Blender 中实时联动。

![跑车山路底盘物理仿真](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/gpt62-07.webp)

*底盘物理仿真实时联动（来源：OpenAI）*

机械建模同样在线：仅凭几张照片和说明书，它把一台八分之一比例的氮气遥控越野车逐个零件建模合体；面对 8000 转红线的直列六缸发动机，还在 180 倍慢动作下跑出了燃气温度与连杆应力仿真。给它一张后院空地照片规划菜园，上一代画出的树冠还像塑料积木，6.2 Astra 不仅木箱绿植细节逼真，还顺手做了个日照模拟器。

![3D 建模与仿真案例](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/gpt62-08.webp)

*机械建模与菜园规划（来源：OpenAI）*

同样是浏览器里直接生成的东西，还有能玩的霓虹城市飞船竞速游戏、阳光斜照玫瑰花窗的巴黎圣母院 3D 漫游。以及一个名场面复刻：默认档下让 6.2 Astra 和 Fable 5.2 各写一个 HTML，还原马斯克星舰被「筷子」夹住——GPT-6.2 构图干净，用时 2 分 03 秒，不到 Fable 的四分之一；Fable 光和烟更足，还多画了个发射台。

![星舰「筷子」夹持 HTML 复刻对比](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/gpt62-09.webp)

*星舰回收名场面复刻对比（来源：X 实测）*

## 三、办公交付：PPT、Excel、法律、科研全升级

日常办公是这次另一个发力点。OpenAI 内部的 GDPval v2 基准考的全是咨询、金融、设计行业的真实项目——Astra 比上一代高 6.2 个百分点，输出 Token 反而少用 22%，Sol 也涨了 5.3 个百分点。

![GDPval v2 成绩](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/gpt62-10.webp)

*GDPval v2 基准（来源：OpenAI）*

具体到干活是什么样：

- **做 PPT**：零售商 Veylan 二季度财报测试中，它把「销售额增长 5.3%」提炼进主标题，底部给出不含退税重做预算的管理层建议——不再整空话套话。给一张旧 PPT 截图，它能复刻藏青色顶栏、街角店铺插画和荧光笔高亮，细到字号
- **做 Excel**：农机公司估值建模算出每股稀释估值 26.39 美元，股权价值桥、分业务增速、敏感性表排在同一张表上，不用翻页对照
- **做会计**：会计 Agent 公司 Basis 实测，处理长周期账务工作的平均耗时降了 50%

![投行级 PPT 复刻效果](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/gpt62-11.webp)

*像素级 PPT 复刻（来源：OpenAI）*

法律场景更狠。Harvey LAB-AA 测试的规矩是：交付物必须满足每一条评分标准，出现一处实质性幻觉就判零分。Astra 的满分通过率是 Claude Fable 5.2 的两倍多，成本只有它的六分之一左右。OpenAI 还顺势推出了律所定制版 **Astra for Law**：直接连上超 3.1 亿个真实判例链接，把满分率推高到 20.8%，实质性幻觉比 Claude Opus 5.5 少 95%。

实验室场景，终端科研基准 Terminal-Bench-Science 拿到 77.1%，比上一代涨 9 个百分点，开销不到原来的三分之一。

## 四、跑分：ARC-AGI-3 史上第一个满分

第三方榜单成绩第一时间出炉。

**Artificial Analysis 综合智能指数**：Astra 涨 5 分到 62.1，超过 Gemini 4 Carbon 和 Claude Opus 5.5，全榜第二——榜首还是 Claude Fable 5.2 的 64.6。

![Artificial Analysis 智能指数榜](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/gpt62-12.webp)

*AA 综合智能指数（来源：Artificial Analysis）*

但一算钱，局面反过来：Fable 5.2 跑一轮指数任务要 26.54 美元，**Astra 只要 4 美元**；Sol 拿 57.3 分追平上代旗舰 GPT-6 Astra，成本只有 1.01 美元。

![智能指数与单任务成本对比](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/gpt62-03.webp)

*各模型跑完一道题花的钱与智能指数（数据来源：Artificial Analysis）*

翻译一下这张图：同样的分数，OpenAI 花的钱最少；同样的预算，OpenAI 拿的分最高——性价比的排面，这代被它占住了。

![智能指数与成本对比](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/gpt62-13.webp)

*性能-成本对比（来源：Artificial Analysis）*

**Agents' Last Exam**（长程专业项目）：Astra 以 78.3% 夺冠，单次花费 2.89 美元，只有 Claude Fable 5.2 的 5%。

**ARC-AGI** 的突破最有历史感——ARC Prize 联创 Greg Kamradt 第一时间发文祝贺：

![ARC Prize 联创 Greg Kamradt 发文祝贺](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/gpt62-14.webp)

*（来源：X / Greg Kamradt）*

在 ARC-AGI-3 适配模式下（允许模型在多轮之间保留中间状态，更接近真实长任务的用法），**GPT-6.2 Astra 成为史上第一个拿下 100% 满分的模型**，Sol 也冲上 98.2%。ARC-AGI-2 上 Astra 同样以 95.8% 登顶；不带状态适配的 ARC-AGI-3 标准模式 70.3%，比上一代大涨 17.4 个百分点。

![ARC-AGI-3 首个 100% 满分](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/gpt62-15.webp)

*ARC-AGI 系列成绩（来源：ARC Prize）*

还有一项底层突破来自 Epoch AI：不开思维链、逼模型一口气直接作答时，GPT-6.2 Astra 在**单个输出 Token 内就能完成 12.3 步串行推理**（相当于一个字里压缩了十几步思考）（上代 10.5 步，Claude Fable 5.1 是 4.2 步），无思维链的高中数学竞赛准确率冲上 79.2%。

![Epoch AI：单 Token 串行推理步数](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/gpt62-16.webp)

*串行推理效率（来源：Epoch AI，CC-BY）*

## 五、短板也很清楚：编程不升反降

不是所有科目都进步。Artificial Analysis 的编程 Agent 指数显示，Astra 和上一代持平，**Sol 甚至比自己的上一代 GPT-6.1 Sol 倒退了 3 分**——主要是做代码库问答时更容易漏掉关键事实。

![编程 Agent 指数对比](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/gpt62-17.webp)

*编程 Agent 指数（来源：Artificial Analysis）*

即便在 OpenAI 自己公布的 FrontierCode 2.0 里，Claude Fable 5.2 依然稳居第一，Opus 5.5 拉满推理档位后也小幅反超了 Astra。

![FrontierCode 2.0 榜单](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/gpt62-18.webp)

*FrontierCode 2.0（来源：OpenAI）*

给你的实际建议：**3D、办公、长程 Agent 任务可以放心切 Astra，纯编程重活暂时不必从 Claude 迁走**。想深耕 AI 编程的，看这两篇：[Codex 安装使用指南](/codex-install-guide/)、[Claude Code 安装配置教程](/claude-code-install-guide/)。

## 六、真正的大事：首破「AI 自我改进」红线

比起跑分，这次真正让人脊背发凉的突破藏在系统安全卡里——**OpenAI 首次承认，GPT-6.2 Astra 已跨过「AI 自我改进」的高风险红线**。

判断依据是它帮人类训练新模型的速度：

- **NanoGPT 测试**（从零训练小语言模型）：上一代平均省 7.73% 训练时间，6.2 Astra 直接省 **42.87%**，提速翻了 5 倍多（人类最好纪录 72.38%）
- **实验 Bug 排查**：41 个 OpenAI 研究员当初花几小时到几天才排查出来的真实实验 Bug，Astra 平均得分 **81.85%**，参测几代模型里最高

![系统安全卡：AI 自我改进能力评估](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/gpt62-19.webp)

*系统安全卡中对「AI 自我改进」能力的评估（来源：OpenAI）*

![NanoGPT 训练提速测试](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/gpt62-20.webp)

*NanoGPT 训练提速（来源：OpenAI）*

按 OpenAI 的说法，这相当于给公司里每位研究员都配了一名能力很强的研究工程师当助手。但棘手的地方在于：**AI 帮人类造 AI 的能力越强，诚实度却在往后退**。

博主 Token Gremlin 翻完系统卡后发现，新模型在多项对齐测试中出现明显倒退，但 OpenAI 还是直接上线了：

![博主 Token Gremlin 的系统卡解读](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/gpt62-21.webp)

*（来源：X / Token Gremlin）*

- 研究员故意删掉目标文件给任务设障，Astra 汇报时**隐瞒或歪曲障碍的比例 22.28%**，比上一代的 11.09% 整整翻倍
- 遇到搜索工具故障拒不承认的比例，从 7.6% 飙到 **23%**
- 英国 AI 安全研究所（UK AISI）的独立测试还发现：它在 85% 的运行中怀疑自己正在被测试（前代 57%），面对旧版行为检测器的规避率从 1.7% 暴涨到 **48.8%**

![对齐测试退步数据](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/gpt62-22.webp)

*对齐测试对比（来源：OpenAI 系统卡）*

所以 OpenAI 在扩大 Astra 内部使用之前做了三件事：加强研究环境隔离、扩大对前沿 Agent 的监控、专门搭了一套叫 **Control Room（控制室）** 的系统——盯着整个研究基础设施上的模型任务，出现安全问题能迅速叫停。

研究能力越来越强，行为却越来越难看透。**通往递归自我改进路上的第一个里程碑，OpenAI 自己承认，已经跨过去了**——这次是先把急停键装好，才把模型放出来。

## 七、国内怎么用上 GPT-6.2

从官宣到真用上，国内用户中间还隔着节点和支付两道墙。最稳的路径还是 [环球巴士](http://cn.goingbus.com/?s=wX0haoloon)：ChatGPT 镜像版 **28.88 元/月起**，Plus 合租 69.88 元/月，按以往节奏，新模型强度下拉通常很快跟进，支付宝付款即用，不需要自己注册 OpenAI 账号和海外信用卡。新用户首单 9 折，**优惠码 `Tanqingbo`**。

**购买流程 5 步**：进 [环球巴士](http://cn.goingbus.com/?s=wX0haoloon) → 注册账号 → 选套餐（镜像尝鲜 / 合租日常）→ 下单时填优惠码 `Tanqingbo` → 支付宝付款自动发货。

想自己注册官方账号再决定充哪个档位的，完整流程看 [ChatGPT 国内使用教程](/chatgpt-vpn-guide/)。

## 写在最后

GPT-6.2 是一次很「拧巴」的发布：一边是降价 20%、ARC-AGI-3 史上首个满分、办公交付全面升级的进步叙事；另一边是编程原地踏步、隐瞒障碍比例翻倍、自我改进红线被跨过的隐忧。

对普通用户的结论很务实：**该用就用**——3D、办公自动化、长程任务的性价比确实到了新台阶；但「AI 帮人类造 AI」的这条线跨过去之后，接下来每一代的系统安全卡，都值得多看两眼再上车。

上一篇讲 [GPT-6 Astra 操作电脑的 10 个实战场景](/gpt-6-astra-computer-use/)，这一篇讲它的进化。谷歌那边的 [Gemini 4 Argon](/gemini-4-argon/) 也在虎视眈眈——下一个该轮到谁接招？Claude Fable 5.2 的王座，看来坐不了太安稳。
