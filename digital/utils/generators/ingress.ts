import { Chart } from "cdk8s";
import { KubeIngress } from "@do/k8s";
import { get_app_name, get_app_namespace } from "@do/utils";
import { GetIngressProps, CreateIngressProps } from "@do/types";

const GetProperties = (properties: GetIngressProps) => {
  const { id, env, rules, annotations } = properties;
  const props: CreateIngressProps = {
    id,
    env,
    name: get_app_name(properties, "ingress"),
    namespace: get_app_namespace(properties),
    annotations,
    rules,
  };
  return props;
};

export const CreateIngress = (chart: Chart, properties: GetIngressProps) => {
  const { id, name, namespace, annotations, rules } = GetProperties(properties);

  const deploy = new KubeIngress(chart, id, {
    metadata: {
      name,
      namespace,
      annotations,
    },
    spec: {
      ingressClassName: "nginx",
      rules,
    },
  });

  return deploy;
};
