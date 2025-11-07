export default {
  async fetch(request) {
    // 获取 User-Agent
    const ua = request.headers.get("User-Agent") || "";

    // 仅允许 OTT 播放器访问
    const allowed = /OTTPlayer|SmartIPTV|SSIPTV/i.test(ua);

    if (!allowed) {
      return new Response("403 Forbidden - OTT Player Only", {
        status: 403,
        headers: { "content-type": "text/plain; charset=utf-8" },
      });
    }

    // 源站 GitHub Pages
    const targetBase = "https://on-ott.github.io/py";

    // 保留请求路径和查询参数
    const url = new URL(request.url);
    // 移除 Worker 域名部分，只保留路径
    let path = url.pathname;
    // 防止重复斜杠
    if (!path.startsWith("/")) path = "/" + path;

    const targetUrl = targetBase + path + url.search;

    // 转发请求到源站
    const response = await fetch(targetUrl, {
      method: request.method,
      headers: request.headers,
      body: request.body,
    });

    // 返回源站响应
    return new Response(response.body, response);
  },
};
