import { App } from "cdk8s";
import { GrafanaChart } from "./lib/grafana";
const app = new App();

new GrafanaChart(app, "grafana", "bd");

app.synth();
