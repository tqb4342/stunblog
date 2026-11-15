// aisurf.cc 访问量计数 Worker（路由层）
// /api/pv?path=/页面路径/  GET=只读  POST=+1 并返回新值
// 计数逻辑在 Durable Object（counter-do.js，SQLite 存储，免费档 10 万行写/天），
// 本文件只做路径校验、爬虫过滤和转发；KV（COUNTER 绑定）保留给 DO 首次启动导入存量用
// 爬虫（Googlebot/Bingbot 等会渲染 JS 的）一律只读不计数：不烧写入额度，也不虚增阅读数
export { CounterDO } from "./counter-do.js";

const BOT_RE = /(bot|crawler|spider|slurp|bingpreview|headless|facebookexternalhit|lighthouse|python-requests|curl\/)/i;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/pv") {
      const path = url.searchParams.get("path") || "/";
      // 归一化与校验：只接受站内路径形状，长度限 200，拒绝 .. 穿越，防注入/刷key
      if (!/^\/[\w\-./]*\/?$/.test(path) || path.includes("..") || path.length > 200) {
        return json({ error: "bad path" }, 400);
      }
      const ua = request.headers.get("user-agent") || "";
      const count = request.method === "POST" && !BOT_RE.test(ua);
      try {
        const id = env.COUNTER_DO.idFromName("global");
        const stub = env.COUNTER_DO.get(id);
        const doUrl =
          "https://counter/api?path=" +
          encodeURIComponent(path) +
          "&count=" +
          (count ? "1" : "0");
        return await stub.fetch(doUrl);
      } catch (e) {
        // DO 冷启动异常等极端情况：维持兜底形状（前端会忽略全 0 响应，不覆盖显示）
        return json({ pv: 0, total: 0 });
      }
    }

    if (url.pathname === "/api/pv-batch") {
      // 批量只读：列表页一次拉多篇文章阅读数，不计数
      if (request.method !== "GET") return json({ error: "bad method" }, 405);
      const paths = (url.searchParams.get("paths") || "")
        .split(",")
        .filter(Boolean)
        .slice(0, 60);
      if (!paths.length) return json({ error: "bad paths" }, 400);
      for (const p of paths) {
        if (!/^\/[\w\-./]*\/?$/.test(p) || p.includes("..") || p.length > 200) {
          return json({ error: "bad path" }, 400);
        }
      }
      try {
        const id = env.COUNTER_DO.idFromName("global");
        const stub = env.COUNTER_DO.get(id);
        return await stub.fetch(
          "https://counter/batch?paths=" + encodeURIComponent(paths.join(","))
        );
      } catch (e) {
        return json({ pvs: {} });
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
