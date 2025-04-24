import { ChartsConfig } from "./types";

export const local_vars: ChartsConfig = {
  grafana: {
    name: "grafana",
    host: "grafana.bolanos.local",
  },
  jaeger: {
    name: "jaeger",
    host: "jaeger.bolanos.local",
  },
  db: {
    name: "db",
    host: "db.bolanos.local",
  },
  elastic: {
    name: "elastic",
    host: "elastic.bolanos.local",
  },
  kibana: {
    name: "kibana",
    host: "kibana.bolanos.local",
  },
  prometheus: {
    name: "prometheus",
    host: "prometheus.bolanos.local",
  },
  apis: {
    brawney: {
      name: "brawney-api",
      host: "api.brawney.local",
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
      host: "postgres-exporter.brawney.local",
    },
  },
};
