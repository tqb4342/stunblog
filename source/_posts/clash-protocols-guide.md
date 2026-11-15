---
title: Clash 协议对比（2026）：VMess/VLESS/Trojan/Reality 怎么选
date: 2026-11-15 14:30:00
updated: 2026-11-15 14:30:00
categories: 冲浪实践
tags: [Clash, 协议对比, VLESS, Trojan, Reality, 科学上网]
keywords: clash协议,vmess,vless,trojan,reality,机场协议,协议对比,翻墙协议,节点协议,hysteria2,tuic,shadowsocks,clash meta,mihomo,抗封锁,协议怎么选,vmess和vless区别,trojan和vless哪个好,reality协议,科学上网协议,clash内核,节点链接
description: 机场订阅里的 VMess、VLESS、Trojan、Reality 到底差在哪？哪个抗封锁、哪个速度快、哪个适合打游戏？这篇把主流协议从主力到退场挨个掰开对比，新手到折腾党都能找到自己的那条路，Clash 配置示例直接抄。
top_image: https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/banner-protocols.webp
photos: [https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/banner-protocols.webp]
faq:
  - q: "Clash Meta（Mihomo）和原版 Clash 有什么区别？"
    a: "原版 Clash 内核 2023 年就停止维护了，不支持 Reality、Hysteria2、TUIC 这些新协议。Mihomo（原 Clash Meta）是社区接棒的内核，主流协议全支持，现在的主流客户端——Clash Verge Rev、ClashMeta for Android——内置的都是它。还在用老内核客户端的，建议直接换。"
  - q: "为什么我的 VLESS 节点连不上？"
    a: "按顺序查三样：servername（SNI）和 UUID 是否复制完整、端口有没有填错、TLS 有没有开。VLESS 本身不带加密，TLS 关了等于裸奔，服务端会直接拒绝握手。都对着还不行，就是机场服务端的问题，找客服。"
  - q: "哪些协议抗封锁最强？"
    a: "Reality 第一，抓包都难和真实 HTTPS 区分；Trojan 和 VLESS+TLS 紧随其后，流量特征和普通网站访问一致。这三类也是 2026 年机场订阅的绝对主力。"
  - q: "Shadowsocks 现在还能用吗？"
    a: "能用，但只适合轻度场景。SS 协议特征已被研究得很透，严格审查环境下容易被针对。移动设备、路由器挂 SS 做日常浏览问题不大，当主力翻墙通道就别指望它扛封锁了。"
  - q: "机场默认给我的协议，需要自己换吗？"
    a: "基本不用。靠谱机场的默认配置就是 Trojan 或 VLESS（新机场多为 VLESS+Reality），直接用就是最优解。协议是机场服务端定的，你客户端这边只是「能连」和「连不上」的区别，换协议不解决速度慢的问题——速度看节点质量和线路。"
related:
  - slug: best-vpn-guide
    text: 翻墙 VPN 选型总览：三条硬标准与全平台安装
  - slug: windows-internet-guide
    text: Windows 翻墙教程：Clash Verge 从零配置
  - slug: ai-tools-network-guide
    text: AI 工具网络配置：编辑器连不上的排查思路
---

> 🔌 机场订阅一导入，节点列表里排着 vmess://、trojan://、vless:// 一长串链接，宣传页还写着「支持 Reality 抗封锁」——这些名词到底差在哪？这篇把 2026 年还在流通的主流协议挨个拆开：谁抗封锁、谁速度快、谁已经退场。只想挑服务不想研究协议的，直接看 [翻墙 VPN 选型总览](/best-vpn-guide/)，那篇讲怎么挑机场；这篇管「挑完之后，节点背后那点事」。

<!-- more -->

## 30 秒速答

- **新手别纠结**：机场默认给的 Trojan 或 VLESS 就是当下最优解，闭眼用，不用自己换
- **抗封锁最强**：Reality，把流量伪装成访问真实网站的 HTTPS，抓包都难分辨
- **打游戏/弱网**：Hysteria2 或 TUIC，基于 UDP/QUIC，抗丢包强——前提是你的网络环境放行 UDP
- **已经退场的**：SSR 协议停更多年，早该淘汰；原版 Clash 内核 2023 年删库，现在的客户端认 Mihomo 内核就行
- **客户端门槛**：Reality、Hysteria2、TUIC 要用 Mihomo（Clash Meta）内核的客户端，比如 [Clash Verge Rev](/windows-internet-guide/)

## 先搞懂：这些协议在对抗什么

所有翻墙协议解决的都是同一件事：**让你的流量在网络审查设备眼里看起来「正常」**。

审查系统（GFW）识别代理流量主要靠两招——一是「深度包检测」（DPI），拆开数据包看特征；二是「主动探测」，主动连你的代理服务器，看它的反应像不像代理。协议的进化史，就是一部和这两招的缠斗史：早期协议只管加密，后来加密不够了要伪装，伪装不够了要「借真实的网站当幌子」。

理解这条主线，下面每个协议的定位就都好懂了。

## 一张总表先看全貌

| 协议 | 加密 | UDP | 隐蔽性 | 抗封锁 | 适用场景 |
|------|------|-----|--------|--------|----------|
| Trojan | TLS | 支持 | 高 | 强 | 通用主力，机场默认 |
| VLESS | 需配 TLS | 支持 | 高 | 强 | 通用主力，新版机场首选 |
| Reality | TLS+X25519 | 支持 | 极高 | 极强 | 强审查环境下的当红炸子鸡 |
| VMess | 内建 | 支持 | 中 | 中 | 老牌协议，存量节点多 |
| Shadowsocks | 内建 | 支持 | 低 | 弱 | 轻量场景、路由器 |
| Hysteria2 | QUIC | 原生 | 中 | 中 | 游戏、移动网络 |
| TUIC | QUIC | 原生 | 中 | 中 | 长连接稳定性优先 |
| SSR | 内建 | 支持 | 中 | 中 | 已停更，别用 |
| SOCKS5 / HTTP | 无 | 部分 | 无 | 无 | 内网转发、临时应急 |

下面按身份拆成四组：主力服役的、特殊场景的、老将，和已经退场的。

## 主力组：Trojan、VLESS、Reality

这三个是 2026 年机场订阅的绝对主力，也是新手真正需要分清的三个。

### Trojan：把自己扮成普通网站的老兵

Trojan 的思路一句话就能说明白：**既然审查设备放行 HTTPS，那我就让代理流量变成 HTTPS**。

- 基于 TLS 1.3 建连，配一张真域名证书，在外界看来就是访问一个普通网站
- 服务端可以直接和 Nginx 这类 Web 服务器共存——探测的人真去访问，看到的是个正常网页
- 配置不算复杂，Let's Encrypt 免费证书就能跑起来

优点是稳：流量特征和正常 HTTPS 访问一致，日常用几乎不会被针对。缺点是它「像」一个网站，审查方如果持续观察流量行为模式，理论上仍有识别空间——这就引出了下面的 Reality。

### VLESS：把加密外包给 TLS 的轻量选手

VLESS 是 V2Ray 家族里 VMess 的减重版。它的设计有点反直觉：**协议本身不加密**。

听起来离谱，其实是想明白了——既然大家最后都要套 TLS，那协议内部再加密一层就是重复劳动。VLESS 把加密完全交给 TLS/XTLS，自己只做最轻量的转发：

- 去掉了加密和状态机制，握手开销更小，性能比 VMess 好
- 必须配 TLS 用，裸奔等于明文
- 支持 XTLS Vision 流控，专门优化代理场景下的 TLS 转发效率

和 VMess 的核心区别就一条：VMess 自己加密（中等伪装），VLESS 把这活儿全交给 TLS（强伪装、更高性能）。新机场新节点，基本都从 VMess 迁到 VLESS 了。

### Reality：抗封锁天花板

Reality 是 Xray 项目推出的协议，思路比 Trojan 更狠：**不是「伪装成一个网站」，而是「真的去连一个网站」**。

- 基于 TLS 1.3 + X25519，握手时「借用」一个公网上真实存在的大站（比如某科技巨头的官网，要求支持 TLS 1.3 和 HTTP/2）当门面，SNI 填的就是那个真站的域名
- 主动探测打过来，流量会被转给那个真实网站，探测者看到的是真网页——不是「像」，是真
- 不需要自己持有域名和证书，服务端配置反而比 Trojan 省事

代价是客户端门槛：Reality 需要 Xray 或 Mihomo 内核支持，老 Clash 客户端连不上。2026 年它已经是强审查环境里公认的最强协议，新机场宣传页上「支持 Reality」基本是标配卖点。

## 特殊场景组：Hysteria2、TUIC

这两个和上面所有协议走的不是一条路——它们基于 UDP 的 QUIC 协议栈，专攻**丢包和高延迟**。

### Hysteria2

为烂网络而生：移动网络、跨境高峰期这种丢包严重的环境，TCP 系协议丢包就退避降速，越卡越慢。Hysteria2 反着来——用自研的 Brutal 拥塞控制，按你设定的带宽硬发，丢包不退让，烂网络下的速度表现一骑绝尘。打游戏（Steam、战网）、跨境视频通话这类对延迟敏感的场景是它的舒适区。

### TUIC

同样是 QUIC 系，主打多路复用和 0-RTT 建连。和 Hysteria2 的差别在脾气：TUIC 用相对标准的拥塞控制，来得温和，长连接下波动小；Hysteria2 的 Brutal 更猛也更容易触发运营商 QoS。日常体验两者接近，选哪个主要看你家机场提供了哪个。

**共同的前提**：你的网络环境得放行 UDP。部分公司网络、校园网会把 UDP 掐死，这种情况 QUIC 系协议直接没戏，老老实实用 Trojan/VLESS。另外这两个协议同样需要 Mihomo 内核客户端支持。

## 老将组：VMess、Shadowsocks

### VMess

V2Ray 的元老协议，内置加密（AES-128-GCM / ChaCha20）、带时间戳防重放，巅峰期（2017-2021）是机场的绝对主力。现在地位被 VLESS 取代——伪装能力中等，无 TLS 时容易被主动探测识别。存量节点还很多，能用，但新部署没人再选它。

拿到 vmess:// 开头的链接，导入方法在 [Windows 翻墙教程](/windows-internet-guide/) 里有完整截图演示。

### Shadowsocks（SS）

2012 年出生的轻量级加密代理，整个协议简单到惊人，也因此能在路由器、老旧设备上跑到飞起。问题还是老问题：太简单，特征被研究透了，严格审查环境下容易被识别。现在它的合理定位是**移动设备和路由器上的轻量方案**，别拿它当主力翻墙通道。

## 退场组：SSR、HTTP/SOCKS5

**SSR（ShadowsocksR）**：SS 的魔改版，加了协议混淆和流量模拟，早年抗封锁确实强过 SS。但它是私有分支、争议大、停更多年，新机场新客户端都在弃用。还看到教程推荐 SSR 的，直接关掉，内容至少五年没更新了。

**HTTP/HTTPS 代理**：最古老的形态，只能转发 Web 流量，不支持 UDP，裸 HTTP 还是明文。企业内网、临时应急凑合用，翻墙就别想了。

**SOCKS5**：通用转发协议，支持 UDP，但完全不加密不伪装。它的正业是本地转发、内网中转——比如给某个不认代理的软件单独走通道，很多软件的「网络设置」里那个 SOCKS5 填写框说的就是它。

## Clash 配置长什么样

Clash 全家（含 Mihomo）用 YAML 描述节点，挑三种典型写法对照着看——当下最主流的 Trojan / VLESS+Reality，加上存量最多的 VMess：

```yaml
proxies:
  # Trojan
  - name: "Trojan 节点"
    type: trojan
    server: example.com
    port: 443
    password: "your_password"
    sni: example.com
    skip-cert-verify: false

  # VLESS + Reality
  - name: "VLESS Reality 节点"
    type: vless
    server: example.com
    port: 443
    uuid: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
    flow: xtls-rprx-vision
    tls: true
    network: tcp
    servername: example.com
    reality-opts:
      public-key: "服务端给的公钥"
      short-id: "服务端给的 short-id"

  # VMess + WS
  - name: "VMess 节点"
    type: vmess
    server: example.com
    port: 443
    uuid: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
    alterId: 0
    cipher: auto
    tls: true
    network: ws
    ws-opts:
      path: "/ws"
      headers:
        Host: example.com
```

三个提醒：

1. 现实里你几乎不用手写这些——机场订阅一键导入，客户端自动生成。看懂结构是为了排障：连不上时知道去核对 servername、UUID、端口这几处
2. Reality、Hysteria2、TUIC 需要客户端是 Mihomo 内核（Clash Verge Rev 等都满足），原版 Clash 内核不支持
3. `skip-cert-verify: false` 保持默认，开成 true 会放弃证书校验，等于给中间人攻击开门

## 按场景选：四条路线

**纯新手**：什么都不用选。机场默认配置就是 Trojan 或 VLESS，电脑装 [Clash Verge Rev](/windows-internet-guide/)，手机看 [安卓](/android-internet-guide/) 或 [iPhone 教程](/iphone-open-internet/)，导入订阅就能用。

**怕封锁的**：认准 Reality 节点。机场节点列表里名字带 Reality / Vision 的就是，优先选它。没有的话 Trojan 和 VLESS+TLS 也够日常用。

**打游戏的**：Hysteria2 或 TUIC，前提确认网络放行 UDP。游戏对丢包比对带宽敏感得多，QUIC 系的抗丢包优势体感明显。

**路由器/老设备的**：Shadowsocks 还能再战。设备性能跑不动重型协议的场景，SS 的轻量反而是优点。

## FAQ

**Clash Meta（Mihomo）和原版 Clash 有什么区别？**

原版 Clash 内核 2023 年就停止维护了，不支持 Reality、Hysteria2、TUIC 这些新协议。Mihomo（原 Clash Meta）是社区接棒的内核，主流协议全支持，现在的主流客户端——Clash Verge Rev、ClashMeta for Android——内置的都是它。还在用老内核客户端的，建议直接换。

**为什么我的 VLESS 节点连不上？**

按顺序查三样：servername（SNI）和 UUID 是否复制完整、端口有没有填错、TLS 有没有开。VLESS 本身不带加密，TLS 关了等于裸奔，服务端会直接拒绝握手。都对着还不行，就是机场服务端的问题，找客服。

**哪些协议抗封锁最强？**

Reality 第一，抓包都难和真实 HTTPS 区分；Trojan 和 VLESS+TLS 紧随其后，流量特征和普通网站访问一致。这三类也是 2026 年机场订阅的绝对主力。

**Shadowsocks 现在还能用吗？**

能用，但只适合轻度场景。SS 协议特征已被研究得很透，严格审查环境下容易被针对。移动设备、路由器挂 SS 做日常浏览问题不大，当主力翻墙通道就别指望它扛封锁了。

**机场默认给我的协议，需要自己换吗？**

基本不用。靠谱机场的默认配置就是 Trojan 或 VLESS（新机场多为 VLESS+Reality），直接用就是最优解。协议是机场服务端定的，你客户端这边只是「能连」和「连不上」的区别，换协议不解决速度慢的问题——速度看节点质量和线路。

## 写在最后

协议这件事，搞明白原理是乐趣，但**不是必需品**——靠谱机场 + 默认配置，够 95% 的人用，真要动手选的时候再回来查这张表就行。

网络还没通的，先走 [翻墙 VPN 选型总览](/best-vpn-guide/) 把服务定了；通了的，正事可以安排上：海外 AI 是现在最高频的用途，[ChatGPT 国内使用教程](/chatgpt-vpn-guide/) 从注册到上手全流程都有，编辑器类工具连不上代理的排查思路在 [AI 工具网络配置](/ai-tools-network-guide/)；想系统看看有哪些值得用的工具，翻 [AI 工具箱](/ai-tools/)，100 多个工具按场景分好类，标「实测」的都配了完整教程。
