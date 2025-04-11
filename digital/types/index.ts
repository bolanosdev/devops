import {
  Container,
  ContainerPort,
  ServicePort,
  IngressRule,
  ServiceBackendPort,
} from "@do/k8s";
export type ServiceType = "ClusterIP";
export type PVCAccessMode = "ReadWriteOnce";

export type AppProps = {
  name: string;
  env: string;
  host?: string;
};
export type AppPorts = {
  container: ContainerPort;
  service: ServicePort;
  ingress: ServiceBackendPort;
};

export type AppSelector = {
  app: string;
};

export type AppContainer = {
  name?: string;
  image: AppImage;
  port?: ContainerPort;
};

export type AppImage = {
  repo?: string;
  name: string;
  tag?: string;
  policy?: string;
};

export type AppPVCResourceRequest = {
  storage: string;
};

export type AppPVCResources = AppResource & {
  requests: AppPVCResourceRequest;
};

export type AppResource = {
  id: string;
  env: Environment;
  name: string;
};

export type GetDeploymentProps = AppResource & {
  replicas: number;
  containers: Container[];
};

export type GetServiceProps = AppResource & {
  type?: ServiceType;
  ports: ServicePort[];
};

export type GetIngressProps = AppResource & {
  rules: IngressRule[];
};

export type GetPersistentVolumeClaimProps = AppResource & {
  access_mode: PVCAccessMode;
  resources: AppPVCResources;
};

export type CreateDeploymentProps = {
  id: string;
  env: Environment;
  name: string;
  namespace: string;
  selector: AppSelector;
  replicas: number;
  containers: Container[];
};

export type CreateServiceProps = {
  id: string;
  env: Environment;
  name: string;
  namespace: string;
  selector: AppSelector;
  type: ServiceType;
  ports: ServicePort[];
};

export type CreateIngressProps = {
  id: string;
  env: Environment;
  name: string;
  namespace: string;

  rules: IngressRule[];
};

export type CreatePVCProps = {
  id: string;
  env: Environment;
  name: string;
  namespace: string;

  access_mode: string;
};
