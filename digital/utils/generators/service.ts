import { Chart } from "cdk8s";
import { KubeService } from "@do/k8s";
import { GetServiceProps, CreateServiceProps } from "@do/types";
import { get_app_namespace, get_app_selectors } from "@do/utils";

const GetProperties = (properties: GetServiceProps) => {
  const { id, env, name, type, ports } = properties;
  const deployment_props: CreateServiceProps = {
    id,
    env,
    name,
    type: type ? type : "ClusterIP",
    namespace: get_app_namespace(properties),
    selector: get_app_selectors(properties),
    ports,
  };
  return deployment_props;
};

export const CreateService = (chart: Chart, properties: GetServiceProps) => {
  const { id, name, namespace, selector, type, ports } =
    GetProperties(properties);

  const deploy = new KubeService(chart, id, {
    metadata: {
      name: `${name}-service`,
      namespace,
    },
    spec: {
      type,
      ports,
      selector,
    },
  });

  return deploy;
};
