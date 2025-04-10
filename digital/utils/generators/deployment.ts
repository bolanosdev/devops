import { Chart } from "cdk8s";
import { KubeDeployment } from "../../../imports/k8s";
import { CreateDeploymentProps, GetDeploymentProps } from "../../types";
import { get_app_namespace, get_app_selectors } from "../";

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
    spec: {
      replicas,
      selector: {
        matchLabels: selector,
      },
      template: {
        metadata: {
          name: `${name}-deployment`,
          namespace,
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
