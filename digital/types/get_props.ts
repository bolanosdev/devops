import {
  Container,
  ServicePort,
  IngressRule,
  PolicyRule,
  ResourceRequirements,
} from "@do/k8s";

import {
  AppResource,
  PVCAccessMode,
  AppServiceType,
  AppVolume,
  AppDictionary,
} from "./app_props";

export type GetDeploymentProps = AppResource & {
  replicas: number;
  env_vars?: AppDictionary;
  volumes?: AppVolume[];
  containers: Container[];
};

export type GetPodProps = AppResource & {
  env_vars?: AppDictionary;
  command?: string[];
  containers: Container[];
};

export type GetServiceProps = AppResource & {
  type?: AppServiceType;
  ports: ServicePort[];
};

export type GetIngressProps = AppResource & {
  annotations?: AppDictionary;
  rules: IngressRule[];
};

export type GetPersistentVolumeClaimProps = AppResource & {
  access_mode: PVCAccessMode;
  resources: ResourceRequirements;
};

export type GetRoleProps = AppResource & {
  rules?: PolicyRule;
};
