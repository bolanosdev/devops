import { App } from "cdk8s";
import { GrafanaChart } from "./digital/apps/grafana";
const app = new App();

new GrafanaChart(app, {
  name: "grafana",
  env: "prod",
  host: "grafana.bolanos.dev",
});

app.synth();
