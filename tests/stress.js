import { runEndpoints } from "../lib/request.js";
const cfg = JSON.parse(open("../config/endpoints.json"));

export const options = {
  stages: [
    { duration: "30s", target: 10 },   // warm-up
    { duration: "1m", target: 50 },    // ramp
    { duration: "1m", target: 100 },   // push
    { duration: "1m", target: 150 },   // near breaking
    { duration: "30s", target: 0 },    // recover
  ],
  thresholds: {
    http_req_failed: ["rate<0.05"],     // allow a bit more for stress
    http_req_duration: ["p(95)<1500"],
    errors: ["rate<0.05"],
  },
};

export default function () {
  const baseUrl = __ENV.BASE_URL || "https://petstore.swagger.io/v2";
  runEndpoints(baseUrl, cfg);
}
