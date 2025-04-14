import { App } from "cdk8s";
import {
  JaegerChart,
  GrafanaChart,
  DatabasesChart,
  ProxyChart,
} from "./digital/apps/devstack/";
import { GetEnv, GetEnvVars } from "env";

const app = new App();

const env = GetEnv();
const vars = GetEnvVars(env);
const { grafana, jaeger, db, proxy } = vars;

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

new ProxyChart(app, {
  env,
  name: proxy.name,
  host: proxy.host,
});

app.synth();
