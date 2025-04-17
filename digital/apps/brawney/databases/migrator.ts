import { Construct } from "constructs";
import { Chart } from "cdk8s";

import { AppDictionary, AppProps } from "@do/types";
import { CreatePod } from "@do/utils/generators";

import { migrator } from "./vars";
import { get_app_container } from "@do/utils";

export class BrawneyMigratorChart extends Chart {
  constructor(scope: Construct, properties: AppProps) {
    super(scope, properties.name);

    const { name, namespace, env } = properties;

    const pod_data: AppDictionary = {
      DATA_SOURCE_URL: `db-service.db-${env}.svc.cluster.local:5432/brawney_${env}_db?sslmode_disable`,
    };

    CreatePod(this, {
      id: "2",
      env,
      name,
      namespace,
      containers: [
        get_app_container({
          image: migrator,
          env_vars: pod_data,
        }),
      ],
    });
  }
}
