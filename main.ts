import { App } from "cdk8s";
import {
  JaegerChart,
  GrafanaChart,
  DatabasesChart,
} from "./digital/apps/devstack/";
import { GetEnv, GetEnvVars } from "env";

const app = new App();

const env = GetEnv();
const vars = GetEnvVars(env);
const { grafana, jaeger, db } = vars;

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

new DatabasesChart(app, {
  env,
  name: db.name,
  host: db.host,
});

app.synth();
