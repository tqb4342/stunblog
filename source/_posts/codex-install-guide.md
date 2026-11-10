---
title: Codex 安装使用教程（2026）：国内 Trae 配置与登录全流程图文指南
date: 2026-11-08 00:15:00
updated: 2026-11-08 00:15:00
categories: AI工具
tags: [Codex, AI编程, Trae, OpenAI]
keywords: codex安装教程,codex使用教程,codex教程,trae codex,codex插件,codex登录,codex cli,codex国内,codex配置,openai codex,codex chatgpt登录,ai编程工具,codex怎么安装,codex怎么用,codex新手入门,codex登录失败,codex插件安装,trae安装codex,codex免费吗,codex多少钱,codex账号,gpt-6 codex,codex额度
description: Codex 安装使用教程（2026 最新版）：在国内环境下用 Trae 装 OpenAI Codex 插件、用 ChatGPT 账号授权登录、完成首次偏好配置的全流程图文演示，覆盖前置条件、登录失败排查与常见问题。
top_image: https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/codex-install-banner.webp
photos: [https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/codex-install-banner.webp]
related:
  - slug: ai-tools-network-guide
    text: AI 编程工具连不上？TUN 模式与分流规则配置
  - slug: windows-internet-guide
    text: Windows 翻墙教程：Clash Verge 从零配置
  - slug: accounts-google
    text: 谷歌账号(Gmail)注册教程：收不到验证码三招解决
---

> 🚀 本文只解决一件事——**把 Codex 装起来、登进去、跑起来**。全程以 Trae 为例，Cursor、Qoder、Kiro 等工具流程一致。

<!-- more -->

## 30 秒速答

- **Codex 是什么**：OpenAI 的 AI 编程工具，在编辑器里装插件后能补全代码、改 Bug、做重构
- **要不要 API Key**：不用，ChatGPT Plus 账号直接登录授权即可
- **装在哪**：Trae、Cursor、Qoder、Kiro 都有 Codex 插件，本文用 Trae 演示——它免费，官网国内直连就能下载
- **国内最大的坑**：网络环境打不开 OpenAI 登录页——先把网络环境搞定再动手装
- **要花多少钱**：Codex 本身随 ChatGPT Plus（20 美元/月）走，国内合租 [**环球巴士**](http://cn.goingbus.com?s=wX0haoloon) 28.88 元/月起

## 一、装之前的三件事

动手之前先核对三个前置条件，少一个都走不通：

### 1. 一个 AI 编程工具

Codex 以插件形式跑在 AI 编程工具里，Trae、Cursor、Qoder、Kiro 都支持。本文全程用 Trae 演示——它免费，字节出品，官网 [trae.cn](https://www.trae.cn/) 国内直连就能下载。Cursor 官网在海外，下载注册本身就先吃网络环境，新手第一站选 Trae 能少一道坎。其他工具照着流程走就行，只是按钮位置略有差别。

### 2. 一个 ChatGPT Plus 账号

Codex 需要付费会员才能用，Plus、Business、Pro 都可以。免费账号登不进去，这是硬门槛。

连 ChatGPT 账号都还没有的话，用谷歌邮箱注册一个最顺——[ChatGPT 国内使用教程](/chatgpt-vpn-guide/) 讲了从翻墙到注册的全流程；谷歌邮箱本身国内手机号收不到验证码的解法，看 [谷歌账号(Gmail)注册教程](/accounts-google/)。

还没有 Plus 的两条路：

- **自己开**：需要外币信用卡，走官方渠道 20 美元/月。支付被拒的话，先确认卡片开通了境外无卡支付，再换 PayPal 试试
- **合租或镜像**：不用海外支付方式，支付宝直付。[**环球巴士**](http://cn.goingbus.com?s=wX0haoloon) 的 ChatGPT 镜像 28.88 元/月起，新用户首单 9 折，优惠码 `Tanqingbo`。算笔账：官方 Plus 一年 240 美元，折人民币 1700 元上下；合租一年 300 多元，差价够再续好几年

### 3. 网络环境

这是国内用户卡得最多的一关：**Codex 的登录授权页在 OpenAI 域名下，直连打不开**。开始装之前，先确认浏览器能正常访问 ChatGPT 官网。

- 已经有代理工具和机场订阅的，装之前把全局或规则模式开好
- 还没解决网络问题的，先把这一课补上：[Windows 翻墙教程：Clash Verge 从零配置](/windows-internet-guide/)——工具选型、订阅导入、节点挑选的踩坑记录全在里面

> 💡 三个条件齐了再往下走。登录授权失败的案例里，十有八九是网络问题被当成了账号问题。

## 二、安装：在 AI 编程工具里装上 Codex 插件

### 2.1 第一步：搜索 Codex 插件

打开 Trae，点击左侧的应用图标（扩展商店），在搜索框输入 `codex`，回车搜索：

![Trae 扩展商店中搜索 Codex 插件](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/codex-02-search-plugin.webp?v=2)

### 2.2 第二步：安装插件并进入登录页

找到 OpenAI Codex 插件后点击安装。装完后 Trae 左侧会出现 OpenAI 图标，点它进入登录引导页：

![安装完成后点击 OpenAI 图标进入 Codex 登录页面](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/codex-03-login-page.webp?v=2)

按新手引导完成初始设置，就到了登录环节。

## 三、登录：用 ChatGPT 账号授权

登录是全程唯一容易翻车的环节，前置条件都齐的话，这关过了后面一路顺。

### 3.1 选择登录方式

在登录页选「通过 ChatGPT 登录」。系统会提示打开浏览器授权：

![Codex 登录页选择通过 ChatGPT 账号登录](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/codex-04-login-method.webp?v=2)

### 3.2 浏览器授权

点「打开」按钮，默认浏览器会跳到 OpenAI 授权页：

![点击打开按钮跳转浏览器授权](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/codex-05-browser-auth.webp?v=2)

### 3.3 确认授权

在浏览器里登录你的 Plus 账号，出现确认页后点「继续」：

![浏览器中确认 Codex 授权登录](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/codex-06-authorize.webp?v=2)

两个注意点：

- 授权页一直转圈打不开：九成是网络没走代理，回到第一节的网络条件排查，别急着卸载重装；AI 编程工具场景的网络排障（TUN 模式、分流规则、节点挑选）另有一篇专门讲：[AI 编程工具网络配置](/ai-tools-network-guide/)
- 确认账号是 Plus、Business 或 Pro 会员，免费号会在这一步被拒——反复重试没用，这是会员门槛，不是 bug

### 3.4 登录成功确认

看到下面这个提示页，登录就完成了：

![Codex 登录成功提示页面](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/codex-07-login-success.webp?v=2)

## 四、首次使用：配置偏好

回到 Trae，现在可以和 Codex 对话了。正式干活前建议先配一下偏好，省得来回返工：

![Codex 偏好设置界面一](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/codex-08-config1.webp?v=2)

![Codex 偏好设置界面二](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/codex-09-config2.webp?v=2)

![Codex 语言与响应偏好配置](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/codex-10-config3.webp?v=2)

![Codex 上下文记忆配置](https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/codex-11-config4.webp?v=2)

配置项按需调整，几个通用建议：

- **语言偏好**：中文或 English，看团队协作习惯
- **代码风格**：跟项目走，已有工程就保持现有规范
- **响应速度**：平衡模式够用，赶工再调激进
- **上下文记忆**：建议开启，长会话里少重复解释背景

## 五、配置完能干什么

装好之后的典型用法：

- 代码补全和建议——写代码时实时给下一行建议，Tab 接受
- Bug 定位与修复——把报错直接贴给它，让它找根因
- 代码重构和优化——指定函数或模块，让它先给改法再动手
- 技术问题解答——当个看得见你工程上下文的 ChatGPT 用
- 项目架构建议——新项目起步时让它先出方案，再动工

除了自己交互着用，Codex CLI 还能被其他 AI 无头调用、当工具使——本站有一篇[多模型协作实战](/multimodel-game-assets/)，Claude 调 Codex 出参考图、DeepSeek 负责建模，一晚上量产上千个游戏素材，算是把这条用法跑通了。

上手有个顺序：先拿小任务试水——读代码、解释一段逻辑、定位一个报错；输出质量确认没问题，再放权让它改文件。上来就把整个工程丢给它改，返工成本比人工还高。

模型侧现在能用到 GPT-6 Astra（Codex 内可切换）——前端审美和产品设计是强项，额度烧得也快，日常轻量任务用国产模型更划算。

## 六、常见问题

登录环节出问题先查这张表，对得上号再看下面的 FAQ：

| 现象 | 先查什么 | 处理 |
|------|----------|------|
| 授权页打不开或一直转圈 | 网络环境 | 回第一节确认代理开着，浏览器能开 ChatGPT 官网再重试 |
| 授权页能开，最后确认被拒 | 会员状态 | 免费账号升 Plus 后再试，重试本身没用 |
| 提示登录状态失效 | 浏览器缓存 | 清缓存或换浏览器重新走一遍授权 |
| 插件商店搜不到 codex | 关键词拼写 | 确认搜的是 codex 这个词本身，别带空格 |

**Codex 安装最常见的问题是什么？**

网络环境没准备好，导致装完插件后打不开 OpenAI 的登录授权页。开始安装前先确认浏览器能正常访问 ChatGPT 官网，访问不了就先解决网络问题再装。

**Codex 使用需要 API Key 吗？**

不需要。ChatGPT Plus 及以上用户直接用账号登录授权就能用 Codex，不用另外申请 API Key，这是目前门槛最低的接入方式。

**Codex 登录失败怎么排查？**

按三个方向查：账号是否为 Plus、Business 或 Pro 会员（免费号登不进去）；网络能否打开 OpenAI 授权页；浏览器缓存是否异常，清缓存后重试。多数登录失败都卡在前两条。

**ChatGPT Plus 国内怎么开通？**

不用自己办外币卡，走合租或镜像方案最省事，支付宝就能付——文中的合租方案就是这条路。

**Codex 教程适用于哪些 AI 编程工具？**

本文以 Trae 为例演示，但 Cursor、Qoder、Kiro 等主流 AI 编程工具的流程一致：搜插件、安装、账号授权登录。区别只在界面布局，核心三步相同。想在装之前先横向比一比各家工具的，看本站 [AI 工具箱](/ai-tools/)，编程类收了十几个主流选手。
