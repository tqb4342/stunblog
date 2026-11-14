// aisurf.cc 访问量计数 Worker
// /api/pv?path=/页面路径/  GET=只读  POST=+1 并返回新值
// 返回 { pv, total }：pv=当前页面计数，total=全站总访问量
// 数据存 KV（绑定名 COUNTER，见 wrangler.jsonc）；其余请求全部交给静态资产
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/pv") {
      const path = url.searchParams.get("path") || "/";
      // 归一化与校验：只接受站内路径形状，长度限 200，拒绝 .. 穿越，防注入/刷key
      if (!/^\/[\w\-./]*\/?$/.test(path) || path.includes("..") || path.length > 200) {
        return json({ error: "bad path" }, 400);
      }
      const key = "pv:" + path;
      try {
        let pv;
        if (request.method === "POST") {
          pv = parseInt((await env.COUNTER.get(key)) || "0", 10) + 1;
          await env.COUNTER.put(key, String(pv));
        } else {
          pv = parseInt((await env.COUNTER.get(key)) || "0", 10);
        }
        const total = await totalCounter(env, request.method === "POST");
        return json({ pv, total });
      } catch (e) {
        // 超出每日写入额度等异常：返回 0 不报错，不影响页面
        return json({ pv: 0, total: 0 });
      }
    }

    // 其余请求走静态站点
    return env.ASSETS.fetch(request);
  },
};

const TOTAL_KEY = "pv:__total__";

// 全站总访问量：正常读改写；首次调用（键不存在）时把存量各页面计数求和作为初始值，
// 这样上线前积累的文章阅读数全部计入总量，只初始化一次。
async function totalCounter(env, increment) {
  const saved = await env.COUNTER.get(TOTAL_KEY);
  if (saved !== null) {
    const total = parseInt(saved, 10) + (increment ? 1 : 0);
    if (increment) await env.COUNTER.put(TOTAL_KEY, String(total));
    return total;
  }
  let sum = 0;
  let cursor;
  do {
    const page = await env.COUNTER.list({ prefix: "pv:", cursor });
    for (const k of page.keys) {
      if (k.name === TOTAL_KEY) continue;
      sum += parseInt((await env.COUNTER.get(k.name)) || "0", 10);
    }
    cursor = page.list_complete ? undefined : page.cursor;
  } while (cursor);
  if (increment) sum += 1;
  await env.COUNTER.put(TOTAL_KEY, String(sum));
  return sum;
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}
