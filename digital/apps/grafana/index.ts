import { Construct } from "constructs";
import { Chart } from "cdk8s";

import { image } from "./vars";
import { AppProps } from "../../types";
import {
  get_app_ports,
  get_app_container,
  get_ingress_rule,
} from "../../utils";
import {
  CreateDeployment,
  CreateService,
  CreateIngress,
} from "../../utils/generators";

export class GrafanaChart extends Chart {
  constructor(scope: Construct, properties: AppProps) {
    super(scope, properties.name);

    const { name, env, host } = properties;
    const ports = get_app_ports("http-server", 80, 3000);

    CreateDeployment(this, {
      id: "1",
      env,
      name,
      replicas: 1,
      containers: [get_app_container({ image, port: ports.container })],
    });

    CreateService(this, {
      id: "2",
      env,
      name,
      ports: [ports.service],
    });

    if (host) {
      CreateIngress(this, {
        id: "3",
        env,
        name,
        rules: [get_ingress_rule(name, host, ports.ingress)],
      });
    }
  }
}
