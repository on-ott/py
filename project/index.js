export default {
  async fetch(request) {
    const ua = request.headers.get("User-Agent") || "";

    if (!/OTTPlayer|SmartIPTV|SSIPTV/i.test(ua)) {
      return new Response("403 Forbidden - OTT Only", { status: 403 });
    }

    const target = "https://on-ott.github.io/py/public/article1.html"; // 源站地址
    const url = new URL(request.url);
    const newUrl = target + url.pathname + url.search;

    return fetch(newUrl, request);
  },
};
