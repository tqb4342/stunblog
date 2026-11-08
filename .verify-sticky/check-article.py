import re

html = open('D:/stunblog/.verify-sticky/ag2.html', encoding='utf-8').read()

items = re.findall(r'post-related__link" href="([^"]+)">([^<]+)<', html)
print('推荐条目:', len(items), '条')
for h, t in items:
    print('  ', t[:40], '->', h)

ld = html.find('ld+json')
print('JSON-LD Article:', 'OK' if ('"@type": "Article"' in html or '"@type":"Article"' in html) else 'FAIL')
if ld != -1:
    seg = html[ld:ld + 600]
    print('JSON-LD 无转义引号:', 'OK' if '&quot;' not in seg else 'FAIL')
print('og:image:', 'OK' if 'og:image' in html else 'FAIL')
print('canonical:', 'OK' if '<link rel="canonical" href="https://aisurf.cc/accounts-google/"' in html else 'FAIL')
print('页面无 robots noindex:', 'OK' if 'name="robots"' not in html else 'FAIL')
