import { Chart } from "cdk8s";
import { KubeSecret } from "@do/k8s";
import { AppSecret } from "@do/types";
import { get_app_name, get_app_namespace } from "@do/utils";

const GetProperties = (properties: AppSecret) => {
  const { id, env, string_data } = properties;
  const deployment_props: AppSecret = {
    id,
    env,
    name: get_app_name(properties, "secret"),
    namespace: get_app_namespace(properties),
    string_data,
  };
  return deployment_props;
};

export const CreateSecret = (chart: Chart, properties: AppSecret) => {
  const { id, name, namespace, string_data } = GetProperties(properties);

  const deploy = new KubeSecret(chart, id, {
    metadata: {
      name,
      namespace,
    },
    stringData: string_data,
  });

  return deploy;
};
