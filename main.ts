import { App } from "cdk8s";
import { GrafanaChart, JaegerChart } from "./digital/apps/devstack/";
import { GetEnv, GetEnvVars } from "env";

const app = new App();

console.log("f: process.env", process.env)
const env = GetEnv();
const vars = GetEnvVars(env);
const { grafana, jaeger } = vars;

new GrafanaChart(app, {
  env: env,
  name: grafana.name,
  host: grafana.host,
});

new JaegerChart(app, {
  env: env,
  name: jaeger.name,
  host: jaeger.host,
});

app.synth();
