import { ChartsConfig } from "./types";

export const prod_vars: ChartsConfig = {
  grafana: {
    name: "grafana",
    host: "grafana.bolanos.dev",
  },
  jaeger: {
    name: "jaeger",
    host: "jaeger.bolanos.dev",
  },
  db: {
    name: "databases",
    host: "db.bolanos.dev",
  },
  proxy: {
    name: "proxy",
    host: "bolanos.dev",
  },
};
