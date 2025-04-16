import { Chart } from "cdk8s";
import { KubePod } from "@do/k8s";
import { get_app_name, get_app_namespace, get_app_selectors } from "@do/utils";
import { CreatePodProps, GetPodProps } from "@do/types";

const GetProperties = (properties: GetPodProps) => {
  const { id, env, containers } = properties;
  const deployment_props: CreatePodProps = {
    id,
    env,
    name: get_app_name(properties, "pod"),
    namespace: get_app_namespace(properties),
    selector: get_app_selectors(properties),
    containers,
  };
  return deployment_props;
};

export const CreatePod = (chart: Chart, properties: GetPodProps) => {
  const { id, name, namespace, selector, containers } =
    GetProperties(properties);

  const deploy = new KubePod(chart, id, {
    metadata: {
      name,
      namespace,
      labels: selector,
    },
    spec: {
      containers,
    },
  });

  return deploy;
};
