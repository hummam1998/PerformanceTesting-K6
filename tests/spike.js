import { runEndpoints } from "../lib/request.js";
import cfg from "../config/endpoints.json";

export const options = {
  stages: [
    { duration: "20s", target: 5 },     // baseline
    { duration: "10s", target: 150 },   // spike
    { duration: "30s", target: 150 },   // hold spike
    { duration: "20s", target: 5 },     // drop
    { duration: "20s", target: 0 },     // finish
  ],
  thresholds: {
    http_req_failed: ["rate<0.08"],
    http_req_duration: ["p(95)<2000"],
    errors: ["rate<0.08"],
  },
};

export default function () {
  const baseUrl = __ENV.BASE_URL || "https://petstore.swagger.io/v2";
  runEndpoints(baseUrl, cfg);
}
