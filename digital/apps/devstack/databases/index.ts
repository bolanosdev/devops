import { Construct } from "constructs";
import { Chart } from "cdk8s";

import { AppProps } from "@do/types";
import { CreateNamespace } from "@do/utils/generators";

export class DatabasesChart extends Chart {
  constructor(scope: Construct, properties: AppProps) {
    super(scope, properties.name);

    const { name, env } = properties;

    CreateNamespace(this, {
      id: "1",
      env,
      name,
    });
  }
}
