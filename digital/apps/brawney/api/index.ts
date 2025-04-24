import { Construct } from "constructs";
import { Chart } from "cdk8s";

import { image, migrator } from "./vars";
import {
  CreateDeployment,
  CreateService,
  CreateIngress,
  CreateNamespace,
} from "@do/utils/generators";
import { AppDictionary, AppProps } from "@do/types";
import {
  get_app_ports,
  get_app_container,
  get_ingress_rule,
  get_app_namespace,
} from "@do/utils";

export class BrawneyApiChart extends Chart {
  constructor(scope: Construct, properties: AppProps) {
    super(scope, properties.name);

    const { name, env, host } = properties;
    const http_port = get_app_ports("http-server", 80, 9005);
    const pod_data: AppDictionary = {
      DATA_SOURCE_URL: `db-service.db-${env}.svc.cluster.local:5432/brawney_${env}_db?sslmode_disable`,
    };

    CreateNamespace(this, {
      id: "1",
      env,
      name,
    });

    CreateDeployment(this, {
      id: "2",
      env,
      name,
      replicas: 1,
      containers: [get_app_container({ image, port: http_port.container })],
    });

    CreateDeployment(this, {
      id: "3",
      env,
      name: "brawney-api-migrator",
      namespace: get_app_namespace({ id: "", name, env }),
      replicas: 1,
      containers: [
        get_app_container({
          image: migrator,
          env_vars: pod_data,
        }),
      ],
    });

    CreateService(this, {
      id: "4",
      env,
      name,
      ports: [http_port.service],
    });

    if (host) {
      CreateIngress(this, {
        id: "5",
        env,
        name,
        rules: [get_ingress_rule(`${name}-service`, host, http_port.ingress)],
      });
    }
  }
}
