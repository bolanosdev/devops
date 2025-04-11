import { Chart } from "cdk8s";
import { KubeIngress } from "@do/k8s";
import { get_app_namespace } from "@do/utils";
import { GetIngressProps, CreateIngressProps } from "@do/types";

const GetProperties = (properties: GetIngressProps) => {
  const { id, env, name, rules } = properties;
  const props: CreateIngressProps = {
    id,
    env,
    name,
    namespace: get_app_namespace(properties),
    rules,
  };
  return props;
};

export const CreateIngress = (chart: Chart, properties: GetIngressProps) => {
  const { id, name, namespace, rules } = GetProperties(properties);

  const deploy = new KubeIngress(chart, id, {
    metadata: {
      name,
      namespace,
    },
    spec: {
      ingressClassName: "nginx",
      rules,
    },
  });

  return deploy;
};
