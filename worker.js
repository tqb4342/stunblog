// aisurf.cc 文章访问量计数 Worker
// /api/pv?path=/文章路径/  GET=只读  POST=+1 并返回新值
// 数据存 KV（绑定名 COUNTER，见 wrangler.jsonc）；其余请求全部交给静态资产
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/pv") {
      const path = url.searchParams.get("path") || "/";
      // 归一化与校验：只接受站内路径形状，长度限 200，防注入/刷key
      if (!/^\/[\w\-./]*\/?$/.test(path) || path.length > 200) {
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
        return json({ pv });
      } catch (e) {
        // 超出每日写入额度等异常：返回 0 不报错，不影响页面
        return json({ pv: 0 });
      }
    }

    // 其余请求走静态站点
    return env.ASSETS.fetch(request);
  },
};

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}
