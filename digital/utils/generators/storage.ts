import { Chart } from "cdk8s";
import { KubePersistentVolumeClaim } from "@do/k8s";
import { GetPersistentVolumeClaimProps, CreatePVCProps } from "@do/types";
import { get_app_namespace } from "@do/utils";

const GetProperties = (properties: GetPersistentVolumeClaimProps) => {
  const { id, env, name } = properties;
  const deployment_props: CreatePVCProps = {
    id,
    env,
    name: `${name}-pvc`,
    access_mode: "CreatePVCProps",
    namespace: get_app_namespace(properties),
  };
  return deployment_props;
};

export const CreateService = (
  chart: Chart,
  properties: GetPersistentVolumeClaimProps,
) => {
  const { id, name, namespace } = GetProperties(properties);

  const deploy = new KubePersistentVolumeClaim(chart, id, {
    metadata: {
      name,
      namespace,
    },
    spec: {},
  });

  return deploy;
};
