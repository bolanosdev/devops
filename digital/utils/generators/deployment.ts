import { Chart } from "cdk8s";
import { KubeDeployment } from "@do/k8s";
import { get_app_namespace, get_app_selectors } from "@do/utils";
import { CreateDeploymentProps, GetDeploymentProps } from "@do/types";

const GetProperties = (properties: GetDeploymentProps) => {
  const { id, name, env, replicas, containers } = properties;
  const deployment_props: CreateDeploymentProps = {
    id,
    name,
    namespace: get_app_namespace(properties),
    selector: get_app_selectors(properties),
    env,
    replicas,
    containers,
  };
  return deployment_props;
};

export const CreateDeployment = (
  chart: Chart,
  properties: GetDeploymentProps,
) => {
  const { id, name, namespace, replicas, selector, containers } =
    GetProperties(properties);

  const deploy = new KubeDeployment(chart, id, {
    metadata: {
      name: `${name}-deployment`,
      namespace,
    },
    spec: {
      replicas,
      selector: {
        matchLabels: selector,
      },
      template: {
        metadata: {
          labels: selector,
        },
        spec: {
          containers,
        },
      },
    },
  });

  return deploy;
};
