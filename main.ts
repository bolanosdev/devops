import { App } from "cdk8s";
import { GrafanaChart, JaegerChart } from "./digital/apps/devstack/";
const app = new App();

new GrafanaChart(app, {
  name: "grafana",
  env: "prod",
  host: "grafana.bolanos.dev",
});

new JaegerChart(app, {
  name: "jaeger",
  env: "prod",
  host: "jaeger.bolanos.dev",
});

app.synth();
