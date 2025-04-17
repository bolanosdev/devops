import { Construct } from "constructs";
import { Chart } from "cdk8s";

import { AppDictionary, AppProps } from "@do/types";
import { Quantity } from "@do/k8s";
import {
  CreateNamespace,
  CreateDeployment,
  CreateService,
  CreateServiceAccount,
  CreatePersistentVolumeClaim,
} from "@do/utils/generators";

import { image } from "./vars";
import { get_app_container, get_app_name, get_app_ports } from "@do/utils";

export class DatabasesChart extends Chart {
  constructor(scope: Construct, properties: AppProps) {
    super(scope, properties.name);

    const { name, env } = properties;
    const ports = get_app_ports("db-ports", 5432, 5432);
    const pod_data: AppDictionary = {
      POSTGRES_PASSWORD: properties.secrets?.PG_PASSWORD?.computed || "",
    };

    const volume = {
      name: get_app_name({ id: "", env, name }, "storage"),
      claim: get_app_name({ id: "", env, name }, "pvc"),
      mount_path: "/var/lib/postgresql/data",
      sub_path: "postgres",
    };

    CreateNamespace(this, {
      id: "1",
      env,
      name,
    });

    CreateServiceAccount(this, {
      id: "3",
      env,
      name,
    });

    CreatePersistentVolumeClaim(this, {
      id: "4",
      env,
      name,
      access_mode: "ReadWriteOnce",
      resources: {
        requests: {
          storage: Quantity.fromString("2Gi"),
        },
      },
    });

    CreateDeployment(this, {
      id: "5",
      env,
      name,
      replicas: 1,
      volumes: [volume],
      containers: [
        get_app_container({
          image,
          port: ports.container,
          volumes: [volume],
          env_vars: pod_data,
        }),
      ],
    });

    CreateService(this, {
      id: "7",
      env,
      name,
      ports: [ports.service],
    });
  }
}
