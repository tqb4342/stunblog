// aisurf.cc 访问量 Durable Object（SQLite 存储）
// 免费档限额 10 万行写入/天，是 KV 免费档（1000 写/天）的 100 倍，日常流量随便用
// 首次启动自动把 KV（COUNTER 绑定）里的存量计数导入 SQLite，一次性、幂等，数据无缝衔接
// 请求形状：GET https://counter/api?path=/xxx/&count=0|1  返回 { pv, total }
//   count=1 时页面计数与全站总量各 +1；count=0 只读（爬虫/GET 都走这个）

export class CounterDO {
  constructor(state, env) {
    this.state = state;
    this.env = env;
    this.ready = null;
  }

  // 建表 + 一次性从 KV 导入存量（__imported__ 标记防重复导入）
  async ensure() {
    if (!this.ready) {
      this.ready = this.init();
    }
    return this.ready;
  }

  async init() {
    const sql = this.state.storage.sql;
    await sql.exec(
      "CREATE TABLE IF NOT EXISTS counters (key TEXT PRIMARY KEY, value INTEGER NOT NULL DEFAULT 0)"
    );
    const done = await sql
      .exec("SELECT value FROM counters WHERE key = '__imported__'")
      .toArray();
    if (done.length) return;
    // 从 KV 导入全部 pv:* 存量（含 pv:__total__，prefix 天然匹配）
    if (this.env.COUNTER) {
      let cursor;
      do {
        const page = await this.env.COUNTER.list({ prefix: "pv:", cursor });
        for (const k of page.keys) {
          const v = parseInt((await this.env.COUNTER.get(k.name)) || "0", 10);
          if (v > 0) {
            await sql.exec(
              "INSERT INTO counters (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value",
              k.name,
              v
            );
          }
        }
        cursor = page.list_complete ? undefined : page.cursor;
      } while (cursor);
    }
    await sql.exec(
      "INSERT INTO counters (key, value) VALUES ('__imported__', 1) ON CONFLICT(key) DO UPDATE SET value = 1"
    );
  }

  async fetch(request) {
    try {
      await this.ensure();
      const url = new URL(request.url);
      const path = url.searchParams.get("path") || "/";
      const count = url.searchParams.get("count") === "1";
      const key = "pv:" + path;
      const sql = this.state.storage.sql;

      if (count) {
        await sql.exec(
          "INSERT INTO counters (key, value) VALUES (?, 1) ON CONFLICT(key) DO UPDATE SET value = value + 1",
          key
        );
        await sql.exec(
          "INSERT INTO counters (key, value) VALUES ('pv:__total__', 1) ON CONFLICT(key) DO UPDATE SET value = value + 1"
        );
      }
      const pvRows = await sql
        .exec("SELECT value FROM counters WHERE key = ?", key)
        .toArray();
      const totalRows = await sql
        .exec("SELECT value FROM counters WHERE key = 'pv:__total__'")
        .toArray();
      const pv = pvRows.length ? pvRows[0].value : 0;
      const total = totalRows.length ? totalRows[0].value : 0;
      return Response.json(
        { pv, total },
        { headers: { "Cache-Control": "no-store" } }
      );
    } catch (e) {
      // 极端异常：维持旧兜底形状，前端会忽略全 0 响应、不覆盖显示
      return Response.json(
        { pv: 0, total: 0 },
        { headers: { "Cache-Control": "no-store" } }
      );
    }
  }
}
