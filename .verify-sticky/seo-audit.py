# -*- coding: utf-8 -*-
"""aisurf.cc 全面 SEO 诊断脚本（针对 localhost:4000 即将部署版本）"""
import re, json, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

import urllib.request

BASE = 'http://localhost:4000'
URLS = [
    '/',
    '/codex-install-guide/',
    '/ai-tools-network-guide/',
    '/windows-internet-guide/',
    '/accounts-google/',
    '/about/',
]

def fetch(path):
    req = urllib.request.Request(BASE + path, headers={'User-Agent': 'Mozilla/5.0 SEOAudit'})
    with urllib.request.urlopen(req, timeout=10) as r:
        return r.read().decode('utf-8', 'replace'), r.status, dict(r.headers)

issues, warns, oks = [], [], []

def issue(msg): issues.append(msg)
def warn(msg): warns.append(msg)
def ok(msg): oks.append(msg)

def get_meta(html, name):
    m = re.search(r'<meta\s+(?:name|property)="%s"\s+content="([^"]*)"' % re.escape(name), html)
    return m.group(1) if m else None

titles = {}
for path in URLS:
    html, status, hdrs = fetch(path)
    page = path.rstrip('/') or '首页'

    # --- title ---
    t = re.search(r'<title>([^<]*)</title>', html)
    title = t.group(1) if t else ''
    titles[path] = title
    tl = len(title)
    if not title: issue(f'{page}: 无 <title>')
    elif tl < 15: warn(f'{page}: title 偏短({tl}字): {title}')
    elif tl > 60: warn(f'{page}: title 偏长({tl}字, SERP 约截断30汉字): {title}')
    else: ok(f'{page}: title {tl}字')

    # --- description ---
    d = get_meta(html, 'description')
    if not d: issue(f'{page}: 无 description')
    else:
        dl = len(d)
        if dl < 50: warn(f'{page}: description 偏短({dl}字)')
        elif dl > 160: warn(f'{page}: description 偏长({dl}字)')
        else: ok(f'{page}: description {dl}字')

    # --- canonical ---
    c = re.search(r'<link rel="canonical" href="([^"]*)"', html)
    if not c: issue(f'{page}: 无 canonical')
    else:
        expected = 'https://aisurf.cc' + (path if path == '/' else path)
        if c.group(1) != expected:
            issue(f'{page}: canonical 不匹配: {c.group(1)} != {expected}')
        else: ok(f'{page}: canonical 正确')

    # --- robots meta ---
    r = get_meta(html, 'robots')
    if r: issue(f'{page}: 意外出现 robots meta: {r}')

    # --- og tags ---
    for og in ['og:title', 'og:description', 'og:url', 'og:type', 'og:image']:
        if not get_meta(html, og):
            (issue if og in ('og:title','og:url','og:image') else warn)(f'{page}: 缺 {og}')
    else:
        pass
    og_all = all(get_meta(html, o) for o in ['og:title','og:url','og:image'])
    if og_all: ok(f'{page}: og 核心三件套齐全')

    # --- twitter card ---
    tc = get_meta(html, 'twitter:card')
    (ok if tc else warn)(f'{page}: twitter:card {"有" if tc else "缺失（社交分享缩略图降级）"}')

    # --- h1 ---
    h1s = re.findall(r'<h1[^>]*>(.*?)</h1>', html, re.S)
    h1s = [re.sub(r'<[^>]+>', '', h).strip() for h in h1s]
    h1s = [h for h in h1s if h]
    if len(h1s) == 0: issue(f'{page}: 无 h1')
    elif len(h1s) > 1: issue(f'{page}: {len(h1s)} 个 h1: {h1s[:3]}')
    else: ok(f'{page}: 唯一 h1「{h1s[0][:30]}」')

    # --- JSON-LD ---
    ld = re.findall(r'<script type="application/ld\+json">(.*?)</script>', html, re.S)
    if not ld:
        warn(f'{page}: 无 JSON-LD')
    for block in ld:
        if '&quot;' in block: issue(f'{page}: JSON-LD 含 HTML 转义引号（解析失败）')
        try:
            data = json.loads(block)
            types = [data.get('@type')] if isinstance(data, dict) else [x.get('@type') for x in data if isinstance(x, dict)]
            ok(f'{page}: JSON-LD 有效: {types}')
            if isinstance(data, dict) and data.get('@type') == 'Article':
                for k in ['headline', 'image', 'datePublished', 'dateModified', 'author']:
                    if not data.get(k): warn(f'{page}: Article schema 缺 {k}')
        except Exception as e:
            issue(f'{page}: JSON-LD 解析失败: {e}')

    # --- img alt ---
    imgs = re.findall(r'<img\s[^>]*>', html)
    noalt = [i for i in imgs if 'alt="' not in i and "alt='" not in i]
    if noalt: warn(f'{page}: {len(noalt)}/{len(imgs)} 张图缺 alt')

    # --- 外链 rel ---
    ext = []
    for tag in re.findall(r'<a\s[^>]*href="https?://[^"]*"[^>]*>', html):
        href = re.search(r'href="([^"]*)"', tag).group(1)
        if 'aisurf.cc' not in href and 'localhost' not in href:
            rel = re.search(r'rel="([^"]*)"', tag)
            ext.append((href, rel.group(1) if rel else ''))
    mysite = [e for e in ext]
    nofollow = [e for e in ext if 'nofollow' in e[1] or 'sponsored' in e[1]]
    if mysite:
        leak = [u for u, rel in mysite if 'nofollow' not in rel and 'sponsored' not in rel]
        if leak:
            warn(f'{page}: dofollow 外链: {leak[:3]}')
        else:
            ok(f'{page}: 外链 {len(mysite)} 个全部正确处理（推广已 nofollow）')

    # --- viewport ---
    if 'name="viewport"' not in html: issue(f'{page}: 无 viewport')

# --- title 唯一性 ---
if len(titles) != len(set(titles.values())):
    from collections import Counter
    dup = [t for t, n in Counter(titles.values()).items() if n > 1]
    issue(f'title 重复: {dup}')

# --- 内链检查: 抓全站所有内部链接并探活 ---
print('\n' + '='*60)
print('内链探活（全站爬取）...')
all_links = set()
for path in URLS:
    html, _, _ = fetch(path)
    for href in re.findall(r'href="(/[a-zA-Z0-9\-_/%.]*)"', html):
        if any(x in href for x in ['.css', '.js', '.png', '.jpg', '.ico', '.xml', '.svg', '.woff']): continue
        all_links.add(href)
broken = []
for link in sorted(all_links):
    try:
        req = urllib.request.Request(BASE + link, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=8) as r:
            if r.status != 200: broken.append((link, r.status))
    except urllib.error.HTTPError as e:
        broken.append((link, e.code))
    except Exception as e:
        broken.append((link, str(e)[:40]))
if broken:
    for l, c in broken: issue(f'内链断链: {l} → {c}')
else:
    ok(f'内链探活 {len(all_links)} 条全部 200')

print('\n' + '='*60)
print(f'✔ 通过 {len(oks)} 项 | ⚠ 警告 {len(warns)} 项 | ✘ 问题 {len(issues)} 项')
print('\n--- ✘ 问题（必修）---')
for m in issues: print(' ', m)
print('\n--- ⚠ 警告（建议）---')
for m in warns: print(' ', m)
print('\n--- ✔ 通过项 ---')
for m in oks: print(' ', m)
