import { Chart } from "cdk8s";
import { KubeDeployment } from "@do/k8s";
import {
  get_app_name,
  get_app_namespace,
  get_app_selectors,
  get_app_volumes,
} from "@do/utils";
import { CreateDeploymentProps, GetDeploymentProps } from "@do/types";

const GetProperties = (properties: GetDeploymentProps) => {
  const { id, env, namespace, replicas, volumes, containers } = properties;
  const deployment_props: CreateDeploymentProps = {
    id,
    env,
    name: get_app_name(properties, "deployment"),
    namespace: namespace || get_app_namespace(properties),
    selector: get_app_selectors(properties),
    replicas,
    volumes: get_app_volumes(volumes),
    containers,
  };
  return deployment_props;
};

export const CreateDeployment = (
  chart: Chart,
  properties: GetDeploymentProps,
) => {
  const { id, name, namespace, replicas, selector, volumes, containers } =
    GetProperties(properties);

  const deploy = new KubeDeployment(chart, id, {
    metadata: {
      name,
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
          volumes,
          containers,
        },
      },
    },
  });

  return deploy;
};
