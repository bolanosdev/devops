import { App } from "cdk8s";
import DopplerSDK from "@dopplerhq/node-sdk";

import {
  JaegerChart,
  GrafanaChart,
  DatabasesChart,
} from "./digital/apps/devstack";

import { GetEnv, GetEnvVars } from "./env";
import { SecretDictionary } from "digital/types";
import { BrawneyExporterChart } from "@do/apps/brawney";

const doppler = new DopplerSDK({
  accessToken: process.env.DOPPLER_TOKEN,
});

const app = new App();
const env = GetEnv();
const vars = GetEnvVars(env);
const { grafana, jaeger, db, exporters } = vars;

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

  app.synth();
});
