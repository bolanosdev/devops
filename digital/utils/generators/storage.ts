import { Chart } from "cdk8s";
import { KubePersistentVolumeClaim } from "@do/k8s";
import { GetPersistentVolumeClaimProps, CreatePVCProps } from "@do/types";
import { get_app_name, get_app_namespace } from "@do/utils";

const GetPVCProperties = (properties: GetPersistentVolumeClaimProps) => {
  const { id, env, access_mode, resources } = properties;
  const deployment_props: CreatePVCProps = {
    id,
    env,
    name: get_app_name(properties, "pvc"),
    namespace: get_app_namespace(properties),

    access_mode,
    resources,
  };
  return deployment_props;
};

export const CreatePersistentVolumeClaim = (
  chart: Chart,
  properties: GetPersistentVolumeClaimProps,
) => {
  const { id, name, namespace, access_mode, resources } =
    GetPVCProperties(properties);

  const deploy = new KubePersistentVolumeClaim(chart, id, {
    metadata: {
      name,
      namespace,
    },
    spec: {
      accessModes: [access_mode],
      resources,
    },
  });

  return deploy;
};
