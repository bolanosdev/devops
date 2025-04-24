export type ChartConfig = {
  name: string;
  host?: string;
};

export type ChartsConfig = {
  grafana: ChartConfig;
  jaeger: ChartConfig;
  db: ChartConfig;
  elastic: ChartConfig;
  kibana: ChartConfig;
  prometheus: ChartConfig;
  apis: {
    brawney: ChartConfig;
  };
  migrators: {
    brawney: ChartConfig;
  };
  exporters: {
    brawney: ChartConfig;
  };
};

export type AppConfig = {
  local: ChartsConfig;
  prod: ChartsConfig;
};
