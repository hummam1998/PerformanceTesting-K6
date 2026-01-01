import { runEndpoints, errorRate } from "../lib/request.js";
const cfg = JSON.parse(open("../config/endpoints.json"));

export const options = {
  stages: [
    { duration: "30s", target: 10 },  // ramp up
    { duration: "2m", target: 10 },   // steady
    { duration: "30s", target: 0 },   // ramp down
  ],
  thresholds: {
    http_req_failed: ["rate<0.02"],      // <2% failures
    http_req_duration: ["p(95)<800"],    // p95 < 800ms
    errors: ["rate<0.02"],
  },
};

export default function () {
  const baseUrl = __ENV.BASE_URL || "https://petstore.swagger.io/v2";
  runEndpoints(baseUrl, cfg);
}
