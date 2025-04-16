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
  exporters: {
    brawney: {
      name: "brawney-postgres-exporter",
      host: "postgres-exporter.brawney.local",
    },
  },
};
