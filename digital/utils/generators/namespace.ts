import { Chart } from "cdk8s";
import { KubeNamespace } from "../../../imports/k8s";
import { AppResource } from "../../types";
import { get_app_namespace } from "../";

const GetProperties = (properties: AppResource) => {
  const { id, env } = properties;
  const deployment_props: AppResource = {
    id,
    env,
    name: get_app_namespace(properties),
  };
  return deployment_props;
};

export const CreateNamespace = (chart: Chart, properties: AppResource) => {
  const { id, name } = GetProperties(properties);

  const deploy = new KubeNamespace(chart, id, {
    metadata: {
      name,
    },
  });

  return deploy;
};
