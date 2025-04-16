export type ChartConfig = {
  name: string;
  host: string;
};

export type ChartsConfig = {
  grafana: ChartConfig;
  jaeger: ChartConfig;
  db: ChartConfig;
  prometheus: ChartConfig;
  exporters: {
    brawney: ChartConfig;
  };
};

export type AppConfig = {
  local: ChartsConfig;
  prod: ChartsConfig;
};
