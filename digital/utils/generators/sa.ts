import { Chart } from "cdk8s";
import { KubeServiceAccount } from "@do/k8s";
import { AppResource } from "@do/types";
import { get_app_name, get_app_namespace } from "@do/utils";

const GetProperties = (properties: AppResource) => {
  const { id, env } = properties;
  const deployment_props: AppResource = {
    id,
    env,
    name: get_app_name(properties, "service-account"),
    namespace: get_app_namespace(properties),
  };
  return deployment_props;
};

export const CreateServiceAccount = (chart: Chart, properties: AppResource) => {
  const { id, name, namespace } = GetProperties(properties);

  const deploy = new KubeServiceAccount(chart, id, {
    metadata: {
      name,
      namespace,
    },
  });

  return deploy;
};
