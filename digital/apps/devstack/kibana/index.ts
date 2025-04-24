import { Construct } from "constructs";
import { Chart } from "cdk8s";

import { image } from "./vars";
import {
  CreateDeployment,
  CreateService,
  CreateIngress,
  CreateNamespace,
} from "@do/utils/generators";
import { AppProps } from "@do/types";
import { get_app_ports, get_app_container, get_ingress_rule } from "@do/utils";

export class KibanaChart extends Chart {
  constructor(scope: Construct, properties: AppProps) {
    super(scope, properties.name);

    const { name, env, host } = properties;
    const http_port = get_app_ports("http-server", 80, 5601);

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

    CreateService(this, {
      id: "3",
      env,
      name,
      ports: [http_port.service],
    });

    if (host) {
      CreateIngress(this, {
        id: "4",
        env,
        name,
        rules: [get_ingress_rule(`${name}-service`, host, http_port.ingress)],
      });
    }
  }
}
