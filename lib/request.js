import http from "k6/http";
import { check, sleep } from "k6";
import { Rate, Trend } from "k6/metrics";

export const errorRate = new Rate("errors");
export const reqDuration = new Trend("req_duration_ms", true);

function renderTemplate(value) {
  const randInt = Math.floor(Math.random() * 1_000_000_000);
  const randStr = Math.random().toString(36).slice(2, 10);
  if (typeof value === "string") {
    return value.replaceAll("{{randInt}}", String(randInt)).replaceAll("{{randStr}}", randStr);
  }
  if (Array.isArray(value)) return value.map(renderTemplate);
  if (value && typeof value === "object") {
    const out = {};
    for (const k of Object.keys(value)) out[k] = renderTemplate(value[k]);
    return out;
  }
  return value;
}

export function runEndpoints(baseUrl, cfg) {
  const headers = cfg.headers || {};
  const endpoints = cfg.endpoints || [];

  for (const ep of endpoints) {
    const method = (ep.method || "GET").toUpperCase();
    const url = `${baseUrl}${ep.path}`;

    const params = { headers, tags: { endpoint: ep.name || ep.path, method } };

    let body = null;
    if (!["GET", "HEAD"].includes(method)) {
      const rendered = renderTemplate(ep.body || {});
      body = JSON.stringify(rendered);
    }

    const res = http.request(method, url, body, params);
    reqDuration.add(res.timings.duration, { endpoint: ep.name || ep.path, method });

    const ok = check(res, {
      "status is expected": (r) => r.status === (ep.expectedStatus ?? 200),
    });

    if (!ok) errorRate.add(1);

    // light pacing (remove if you want maximum throughput)
    sleep(0.2);
  }
}
