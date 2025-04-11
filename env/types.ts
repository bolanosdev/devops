export type ChartConfig = {
  name: string;
  host: string;
};

export type ChartsConfig = {
  grafana: ChartConfig;
  jaeger: ChartConfig;
};

export type AppConfig = {
  local: ChartsConfig;
  prod: ChartsConfig;
};
