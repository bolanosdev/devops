import { App } from "cdk8s";
import DopplerSDK from "@dopplerhq/node-sdk";

import {
  JaegerChart,
  GrafanaChart,
  ElasticChart,
  KibanaChart,
  DatabasesChart,
  PrometheusChart,
} from "./digital/apps/devstack";

import { BrawneyApiChart, BrawneyExporterChart } from "@do/apps/brawney";
import { GetEnv, GetEnvVars } from "./env";
import { SecretDictionary } from "digital/types";

const doppler = new DopplerSDK({
  accessToken: process.env.DOPPLER_TOKEN,
});

const app = new App();
const env = GetEnv();
const vars = GetEnvVars(env);
const { grafana, jaeger, db, apis, exporters, prometheus, elastic, kibana } =
  vars;

doppler.secrets.list("devops", env).then(({ secrets }) => {
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

  new ElasticChart(app, {
    env: env,
    name: elastic.name,
    host: elastic.host,
  });

  new KibanaChart(app, {
    env: env,
    name: kibana.name,
    host: kibana.host,
  });

  new DatabasesChart(app, {
    env,
    name: db.name,
    host: db.host,
    secrets: secrets as SecretDictionary,
  });

  new BrawneyExporterChart(app, {
    env,
    name: exporters.brawney.name,
    namespace: "db",
    host: exporters.brawney.host,
    secrets: secrets as SecretDictionary,
  });

  new BrawneyApiChart(app, {
    env: env,
    name: apis.brawney.name,
    host: apis.brawney.host,
  });

  new PrometheusChart(app, {
    env: env,
    name: prometheus.name,
    host: prometheus.host,
  });

  app.synth();
});
