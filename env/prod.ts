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
    name: "db",
    host: "db.bolanos.dev",
  },
  prometheus: {
    name: "prometheus",
    host: "prometheus.bolanos.dev",
  },
  apis: {
    brawney: {
      name: "brawney-api",
      host: "api.brawney.com",
    },
  },
  migrators: {
    brawney: {
      name: "brawney-migrator",
    },
  },
  exporters: {
    brawney: {
      name: "brawney-postgres-exporter",
      host: "postgres-exporter.brawney.com",
    },
  },
};
