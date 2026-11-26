---
title: Clash 机场名词解释字典（2026）：节点/订阅/倍率/中转/原生IP 黑话全科普
date: 2026-11-26 09:30:00
updated: 2026-11-26 09:30:00
categories: 冲浪实践
tags: [Clash, 机场, 名词解释, V2Ray, VLESS, Trojan, Reality, 科学上网]
keywords: 机场名词解释,科学上网术语,节点是什么,订阅是什么,机场倍率,中转线路,原生IP,V2Ray,VLESS,Trojan,Reality,协议科普,机场黑话,机场术语,clash术语,fake-ip,机场中转,tun模式,节点订阅,解锁是什么意思
description: 节点、订阅、倍率、机场、中转、原生 IP、V2Ray、VLESS、Trojan、Reality、Fake-IP、Tun……这些科学上网高频词到底什么意思？一篇文章当字典查，覆盖机场术语和主流协议的黑话，新手看完不再懵。
top_image: https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/banner-glossary.webp
photos: [https://tqb4342.oss-cn-guangzhou.aliyuncs.com/img/banner-glossary.webp]
faq:
  - q: "机场和 VPN 有什么区别？"
    a: "机场基于代理协议分流流量，可以按规则决定哪些流量走代理、哪些直连，可定制性强、多节点可切换；VPN 是全局加密隧道，一键使用简单但可控性弱。日常长期用，机场的体验和性价比普遍更好。"
  - q: "节点看不了 Netflix 是为什么？"
    a: "多半是非原生 IP 或被识别为代理 IP。换带「解锁 Netflix」标识的节点，或选住宅 IP / IEPL、IPLC 类线路；IP 归属地、DNS 泄漏都会影响解锁，排查方法见文中「解锁」一节。"
  - q: "Clash 的 Fake-IP 有什么风险？"
    a: "Fake-IP 是 Clash 伪造 DNS 解析的机制，本身不带来安全风险，反而能避免 DNS 泄漏、提高分流命中率。少数老应用对伪造 IP 段兼容性差，遇到连不上的把 DNS 模式切回真实解析即可。"
  - q: "什么是 Reality 协议？为什么它越来越流行？"
    a: "Reality 是基于 VLESS 协议的新型加密与伪装机制，流量特征伪装成访问真实大站，具备更强的抗封锁性和隐蔽性，近两年被大量机场采用。VLESS、Reality 与 VMess、Trojan 的逐项对比，看本站的协议对比文。"
  - q: "倍率越高是不是越好？"
    a: "不是。倍率只决定套餐流量扣得快慢，和速度无关——x3 不是 3 倍速度。高倍率节点通常对应更贵的线路（专线、解锁类），重度用这类节点流量烧得快；轻度浏览用 x1 以内的普通节点最省。"
  - q: "新手第一个订阅去哪买？"
    a: "挑口碑机场入门套餐即可，我自己长期用一枝红杏（99 元/年入门版），购买后后台直接生成 Clash 订阅链接。怎么判断机场靠不靠谱的三条硬标准，看本站 VPN 选型总览。"
related:
  - slug: clash-protocols-guide
    text: Clash 协议对比：VMess/VLESS/Trojan/Reality 怎么选
  - slug: airport-lines-guide
    text: Clash 线路怎么选：直连、中转、专线（IPLC/IEPL）讲透
  - slug: best-vpn-guide
    text: 翻墙 VPN 选型总览：三条硬标准与全平台安装
  - slug: windows-kuaili-guide
    text: 快狸机场 Windows 教程：注册、订阅、客户端全流程
---

> 📖 机场、节点、订阅、倍率、中转、原生 IP、Reality……刚入坑的人打开机场介绍页，满屏黑话，每个字都认识，连起来就是看不懂。这篇就是给你当**字典**用的：从基础黑话到协议、线路、IP 类型，一个词一个词讲清楚，哪里不会查哪里。<!-- more -->协议和线路两块本站有更深的专文（[协议对比](/clash-protocols-guide/)、[线路详解](/airport-lines-guide/)），这里只给字典级的速查释义。

## 30 秒速答

- **机场**：付费代理服务的俗称，卖的是一批境外代理服务器的使用权
- **节点**：一条可用的代理连接配置（服务器地址 + 端口 + 协议 + 账号参数）
- **订阅**：一个链接，导入 Clash 后自动拉取全部节点、可更新
- **倍率**：流量计费系数，x3 表示用 1GB 扣 3GB，跟速度无关
- **中转/专线**：流量先经国内中转服务器再出境的线路类型，晚高峰更稳
- **原生 IP**：被目标服务识别为「真实本地用户」的 IP，解锁 Netflix/ChatGPT 的关键

## 基础黑话：机场、节点、订阅、倍率

### 机场是什么

「机场」是大家对**付费代理服务提供商**的俗称——因为提供一架架「飞机」（节点）让你「起飞」（翻墙）。你付月费或年费，机场给你一批境外代理服务器的使用权。怎么判断一家机场靠不靠谱，三条硬标准在 [VPN 选型总览](/best-vpn-guide/)里展开过，这里不重复。

### 节点（Node）

节点指一条代理连接的完整配置数据：服务器地址、端口、协议类型、UUID 等参数。选一个节点，你的流量就从这个节点所对应的服务器出境。机场后台一排「香港 01」「日本 IEPL 02」，每个都是一条节点。

常见协议类型（协议本身的深度对比看 [Clash 协议对比](/clash-protocols-guide/)）：

- **VMess**：V2Ray 体系的老牌协议，兼容性好，仍在大量机场服役
- **VLESS**：VMess 的轻量升级版，去掉内层加密，传输更灵活
- **Trojan**：基于 HTTPS 的协议，伪装性强，抗封锁能力好
- **Shadowsocks（SS）**：早期加密代理协议，速度快但特征明显，逐渐退场

### 订阅链接（Subscription URL）

机场提供一个 URL，粘进 Clash 的订阅界面，就能自动拉取全部节点信息并定期更新——机场换节点、修线路，你这边一键更新就行，不用手动改配置。链接通常以 `.yaml` 或 `.txt` 结尾。

还没有订阅的话，可以从口碑机场起步——我自己长期用的是[一枝红杏](https://order.yizhihongxing.org/aff.php?aff=4818)（99 元/年入门版），购买后后台直接生成 Clash 订阅链接。

### 倍率（Ratio）

倍率是机场的**流量计费系数**：一个节点消耗的流量与实际计费流量的比值。x1 表示用多少扣多少；x3 表示你实际走 1GB，套餐扣 3GB。

| 区域/节点 | 常见倍率 | 特点 |
|-----------|----------|------|
| 普通/共享节点 | x0.5 ~ x1.0 | 流量消耗慢，适合日常浏览 |
| 日本/韩国 IEPL | x1.0 ~ x2.0 | 专线，适合游戏/视频 |
| 美国/香港中转 | x1.0 ~ x3.0 | 解锁强，流量消耗快 |
| ChatGPT/Netflix 专线 | x3.0 或更高 | 高级内容节点，精准优化 |

两个最常见的误解一次说清：**倍率只决定流量扣得快慢，跟速度无关**——x3 不是「3 倍速度」，快不快要靠测速判断；倍率高也不代表被坑——高倍率通常对应专线或解锁类贵价线路，按需选用，轻度浏览守着 x1 以内的节点最省。

### 节点参数速查

拿到一条节点配置，字段含义对照：

| 字段名 | 含义 |
|--------|------|
| `server` | 节点服务器地址 |
| `port` | 服务器端口号 |
| `uuid` | 用户唯一识别码（VMess/VLESS 用） |
| `alterId` | 额外 ID（旧版 VMess 专属，逐渐淘汰） |
| `cipher` | 加密方式（如 chacha20-ietf-poly1305） |
| `tls` | 是否启用 TLS 加密（true/false） |

## Clash 篇：客户端、模式与核心概念

### Clash 是什么，版本怎么分

Clash 最初是基于 Go 语言的规则驱动代理客户端（原版核心 2023 年已删库停更，现在的「Clash」实际都跑在 Meta 系内核上），支持多种协议，通过配置文件自定义分流规则。名字带 Clash 的软件一箩筐，先分清：

| 软件名称 | 平台 | 特点 |
|----------|------|------|
| **Clash core** | 多平台 | 基础核心，命令行运行（已删库归档） |
| **Clash for Windows (CFW)** | Windows | 经典图形界面（已停更，仍可用） |
| **Clash Verge Rev** | Windows/macOS/Linux | 目前 Windows 主流选择 |
| **Clash Meta（Mihomo）** | 多平台 | 新一代核心，支持 Reality、Hysteria2 |

Windows 上从零装一个客户端的完整流程，看 [Windows 网络配置教程](/windows-internet-guide/)；想直接用机场官方客户端省事的，[快狸 Windows 教程](/windows-kuaili-guide/)四步走完。

### 代理模式（Mode）

- **Global（全局）**：所有流量都走代理节点。省心但访问国内网站会变慢
- **Rule（规则）**：按规则集自动分流，国内直连、国外走代理。**最推荐**
- **Direct（直连）**：完全不走代理，测试网络用

| 使用场景 | 推荐模式 |
|----------|----------|
| 看 Netflix、YouTube | Global |
| 中英文网站同时访问 | Rule |
| 用银行/本地服务 | Direct |

### 规则（Rule）与规则集

规则是 Clash 的核心：判断特定流量走哪个节点、或直连。规则可以是域名、IP 段、进程名等形式，组合起来就是「智能分流」。

| 类型 | 描述 | 示例 |
|------|------|------|
| DOMAIN | 匹配域名 | `DOMAIN,google.com` |
| DOMAIN-SUFFIX | 匹配域名后缀 | `DOMAIN-SUFFIX,youtube.com` |
| DOMAIN-KEYWORD | 包含关键字 | `DOMAIN-KEYWORD,google` |
| IP-CIDR | 匹配 IP 段 | `IP-CIDR,8.8.8.8/32` |
| GEOIP | 按国家/地区 | `GEOIP,CN` |
| PROCESS-NAME | 匹配进程 | `PROCESS-NAME,chrome.exe` |
| MATCH | 兜底规则 | `MATCH` |

用带规则集订阅的机场，规则会长期维护更新，不用自己折腾。

### DNS 与 Fake-IP

DNS 模块决定域名怎么解析，直接影响域名规则能否命中。Clash 有两种 DNS 策略：

- **Fake-IP 模式**：给未解析的域名先返回一个伪造 IP，确保规则命中率最高，推荐国内外流量混合的日常场景
- **真实解析模式（redir-host）**：走真实 DNS 服务器，命中率不如 Fake-IP，但兼容性最传统

```yaml
dns:
  enable: true
  fake-ip-range: 198.18.0.1/16
  enhanced-mode: fake-ip
```

### 负载均衡与自动切换

Clash 的节点自动化管理三种策略：

- **URL-Test**：定期测速，自动选最快节点
- **Fallback**：主节点失效自动切备用
- **Load-Balance**：流量分摊到多个节点

```yaml
proxy-groups:
  - name: AutoGroup
    type: url-test
    proxies:
      - node1
      - node2
    url: 'http://www.gstatic.com/generate_204'
    interval: 300
```

### Tun 模式与系统代理

- **系统代理**：只接管遵守系统代理设置的应用（浏览器等）
- **Tun 模式**：虚拟网卡接管全系统流量，游戏等不认代理设置的软件也能走——需要管理员权限

```yaml
tun:
  enable: true
  stack: system
  dns-hijack:
    - any:53
```

### 控制面板（Dashboard）

Clash 运行时暴露本地控制接口，常见面板：**Yacd**（最轻量的 Web 面板，实时切节点、看规则命中）、**Meta-Yacd**（适配 Mihomo 的改版）、CFW 自带面板（默认 127.0.0.1:9090）。

## IP 篇：原生、住宅与解锁黑话

### 住宅 IP 与数据中心 IP

- **住宅 IP（家宽）**：来自普通家庭网络，不易被识别为代理，访问敏感服务成功率高
- **数据中心 IP**：来自 IDC 机房，速度快但容易被服务商标记限制

### 原生 IP 与非原生 IP

- **原生 IP**：由当地 ISP 分配、归属地和实际一致的 IP——解锁 Netflix/ChatGPT/TikTok 的关键
- **非原生 IP（广播 IP）**：转接或托管分配，IP 归属地与实际不符，部分服务会拒绝

### 静态 IP 与动态 IP

固定不变的适合自建服务、端口转发；家用宽带那种每次重连就换的，普通用户日常无感，不用在意。

### 解锁（Unlock）

「解锁」指用代理节点访问**仅限特定地区可用的服务**：Netflix 美区、ChatGPT、TikTok、Disney+ 等。判断节点能不能解锁：看节点备注（如 `US(Netflix 全解)`）、用 Netflix Checker 等检测工具、或直接 Speedtest 看出口 IP 归属。

| 解锁失败原因 | 解决办法 |
|------|----------|
| IP 非原生/被污染 | 更换节点或反馈机场 |
| DNS 泄漏被识别为本地 | 用 Fake-IP 或 DoH |
| 缓存了地区信息 | 清浏览器缓存/改语言 |
| 服务封了该 IP 段 | 换住宅 IP 或 IEPL/IPLC 线路 |

## 线路篇：直连、中转、专线

线路决定速度、稳定性和抗封锁能力，速查表如下（每条线路的网络路径怎么走、怎么按场景选，展开在 [Clash 线路详解](/airport-lines-guide/)）：

| 类型 | 路径结构 | 特点 |
|------|----------|------|
| **直连** | 用户 → 境外节点 | 延迟低，易被墙封 |
| **中转** | 用户 → 中转节点 → 境外 | 性价比高，抗封锁中等 |
| **BGP 中转** | 用户 → BGP 中转 → 境外 | 晚高峰稳定，三网适配 |
| **IEPL 专线** | 用户 → 专线内网 → 境外 | 延迟低，流媒体友好 |
| **IPLC 专线** | 用户 → 物理专线 → 境外 | 企业级稳定，不易被墙 |

配套术语：**三网优化**（自动选电信/联通/移动最优路径）、**回程优化**（提升海外回国内的速度）、**CN2 GIA**（电信优质回程线路）。抗封锁能力排序：专线 > BGP 中转 > 普通中转 > 直连。

按人群的默认选法：新手 BGP/普通中转够用；重度使用上 IEPL/IPLC；要解锁流媒体和 AI 工具，认准原生 IP + 专线。

## 协议与传输速查

### 传输层协议

| 协议 | 特点 | 常用于 |
|------|------|--------|
| **TLS** | 标准加密传输层，HTTPS 伪装 | Trojan、VMess |
| **XTLS** | 减少 TLS 双重加密的性能损耗 | VLESS 体系 |
| **gRPC** | 基于 HTTP/2 的高性能协议 | 中继传输 |
| **H2 (HTTP/2)** | 低延迟、高并发 | Trojan/VLESS |
| **Reality** | 新一代伪装方案，防主动探测 | VLESS+Vision |

协议之间怎么选、Reality 为什么能抗封锁，逐项对比在 [Clash 协议对比](/clash-protocols-guide/)。

### 加密方式（Cipher）

| 加密方式 | 描述 |
|----------|------|
| `aes-128-gcm` | 高安全性，硬件要求低，广泛兼容 |
| `chacha20-ietf-poly1305` | 移动设备性能友好 |
| `none` | 无加密，VLESS 裸协议用（安全由 TLS 层保障） |

选法：手机等低功耗设备选 chacha20 系；通用设备 aes 系稳妥；VLESS/Reality 协议下 `none` 即可，加密由 TLS 层负责。

### TCP 与 UDP

- **TCP**：面向连接、稳定，网页/视频用
- **UDP**：无连接、低延迟，游戏/实时语音用（看节点是否支持 UDP 转发，游戏党要确认）

## 排障篇：连不上怎么办

节点连不上的常见原因，按排查顺序：

1. **节点本身挂了/被墙**：换其他节点试试
2. **配置参数错**：端口/UUID/加密方式与机场后台不一致
3. **配置文件加载异常**：重新更新订阅
4. **DNS 解析失败**：切 DNS 模式或换 DNS 服务器
5. **规则冲突**：检查目标流量是否被规则分到 DIRECT

调试手段：Clash 面板的日志窗口（开 verbose 级别）看连接细节；`ping`、`tracert` 测连通性；命令行跑 `curl -v` 看握手信息。

## 进阶篇：GeoIP、GeoSite 与隐私

### GeoIP 与 GeoSite

- **GeoIP**：按 IP 归属国家分流，`GEOIP,CN,DIRECT` 即大陆流量直连——生产配置习惯再补一个 `no-resolve`（写成 `GEOIP,CN,DIRECT,no-resolve`），让规则先匹配再解析，避免为了判断归属先把域名解析成真实 IP
- **GeoSite**：预设的域名分类集，`geosite:netflix` 一键识别所有 Netflix 相关流量

```yaml
rules:
  - GEOIP,CN,DIRECT
  - GEOSITE,netflix,US-NODE
```

### 防 DNS 泄漏与隐私建议

DNS 泄漏会让 ISP 看到你真实访问的目的地，即使流量走了代理。防泄漏三件套：

- 启用 Fake-IP 模式
- 配置可信的 DoH（DNS-over-HTTPS）服务器
- 系统 DNS 与 Clash DNS 保持一致，避免「系统直通」

隐私增强：别用无加密的明文协议（裸 SOCKS/HTTP）；优先 Trojan/VLESS+Reality 这类带 TLS 的协议；配置里 `log-level: silent` 关日志；选带混淆伪装的节点（gRPC 伪装等）。

## 术语速查总表

| 术语 | 一句话含义 |
|------|------------|
| 机场 | 付费代理服务提供商的俗称 |
| 节点 | 一条可用的代理连接配置 |
| 订阅链接 | 自动拉取并更新节点列表的 URL |
| 倍率 | 流量计费系数，x3 = 用 1GB 扣 3GB |
| 中转 | 流量先到国内中转服务器再出境 |
| 专线（IPLC/IEPL） | 内网/物理专线出境，稳定不抢公网 |
| 原生 IP | 归属地真实的 IP，解锁服务的关键 |
| 解锁 | 访问仅限特定地区的服务内容 |
| Rule | 流量分流规则 |
| Fake-IP | Clash 伪造 DNS 解析提高命中率的机制 |
| Tun | 虚拟网卡接管全系统流量的模式 |
| Reality | VLESS 体系的新一代伪装协议 |
| 三网优化 | 电信/联通/移动自动选最优路径 |
| BGP 中转 | 晚高峰稳定的智能中转线路 |

## 推荐资源

| 名称 | 链接 | 说明 |
|------|------|------|
| Clash.Meta (Mihomo) | https://github.com/MetaCubeX | 现役主流核心 |
| Yacd 控制面板 | https://github.com/haishanh/yacd | Web 控制前端 |
| ACL4SSR 规则集 | https://github.com/ACL4SSR/ACL4SSR | 分流规则集合 |

顺带解释一个常见困惑：为什么按老教程装「Clash」总是找不到下载？原版核心 2023 年删库后，社区接力的是 Meta 系（Mihomo），各客户端新版本也都换装了这套内核——认准这个名字就不会被老教程带偏。

## FAQ

**Q：机场和 VPN 有什么区别？**
机场基于代理协议分流流量，可以按规则决定哪些流量走代理、哪些直连，可定制性强、多节点可切换；VPN 是全局加密隧道，一键使用简单但可控性弱。日常长期用，机场的体验和性价比普遍更好。

**Q：节点看不了 Netflix 是为什么？**
多半是非原生 IP 或被识别为代理 IP。换带「解锁 Netflix」标识的节点，或选住宅 IP / IEPL、IPLC 类线路；IP 归属地、DNS 泄漏都会影响解锁。

**Q：Clash 的 Fake-IP 有什么风险？**
Fake-IP 是伪造 DNS 解析的机制，本身不带来安全风险，反而能避免 DNS 泄漏、提高分流命中率。少数老应用对伪造 IP 段兼容性差，遇到连不上的把 DNS 模式切回真实解析即可。

**Q：什么是 Reality 协议？为什么它越来越流行？**
Reality 是基于 VLESS 的新型加密与伪装机制，流量特征伪装成访问真实大站，抗封锁性强，近两年被大量机场采用。它与 VMess、Trojan 的逐项对比，看 [协议对比文](/clash-protocols-guide/)。

**Q：倍率越高是不是越好？**
不是。倍率只决定套餐流量扣得快慢，和速度无关——x3 不是 3 倍速度。高倍率节点通常对应专线、解锁类贵价线路，轻度浏览守着 x1 以内的节点最省。

**Q：新手第一个订阅去哪买？**
挑口碑机场入门套餐即可，我自己长期用[一枝红杏](https://order.yizhihongxing.org/aff.php?aff=4818)（99 元/年入门版），购买后后台直接生成 Clash 订阅链接。判断机场靠不靠谱的三条硬标准，看 [VPN 选型总览](/best-vpn-guide/)。
