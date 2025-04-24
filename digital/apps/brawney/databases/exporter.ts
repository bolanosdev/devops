import { Construct } from "constructs";
import { Chart } from "cdk8s";

import { AppDictionary, AppProps } from "@do/types";
import { CreatePod, CreateService, CreateIngress } from "@do/utils/generators";

import { image } from "./vars";
import { get_app_container, get_app_ports, get_ingress_rule } from "@do/utils";

export class BrawneyExporterChart extends Chart {
  constructor(scope: Construct, properties: AppProps) {
    super(scope, properties.name);

    const { name, namespace, env, host } = properties;
    const ports = get_app_ports("exporter-ports", 9187, 9187);
    const pod_data: AppDictionary = {
      DATA_SOURCE_URL: `db-service.db-${env}.svc.cluster.local:5432/brawney_${env}_db?sslmode_disable`,
      DATA_SOURCE_USER: "postgres",
      DATA_SOURCE_PASS: properties.secrets?.PG_PASSWORD?.computed || "",
    };

    CreatePod(this, {
      id: "1",
      env,
      name,
      namespace,
      containers: [
        get_app_container({
          image,
          port: ports.container,
          env_vars: pod_data,
        }),
      ],
    });

    CreateService(this, {
      id: "2",
      env,
      name,
      namespace,
      ports: [ports.service],
    });

    if (host) {
      CreateIngress(this, {
        id: "3",
        env,
        name,
        namespace,
        rules: [get_ingress_rule(`${name}-service`, host, ports.ingress)],
      });
    }
  }
}
