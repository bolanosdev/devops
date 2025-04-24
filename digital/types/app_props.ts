import {
  ContainerPort,
  ServicePort,
  ServiceBackendPort,
  ResourceRequirements,
} from "@do/k8s";

export type AppServiceType = "ClusterIP" | "LoadBalancer";
export type PVCAccessMode = "ReadWriteOnce" | "ReadWriteMany";

export type Secret = {
  raw: string;
  computed: string;
};

export type AppProps = {
  name: string;
  namespace?: string;
  env: string;
  host?: string;
  secrets?: SecretDictionary | undefined;
  commands?: string[];
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
  commands?: string[];
  env_vars?: AppDictionary;
  volumes?: AppVolume[];
  resources?: ResourceRequirements;
};

export type AppImage = {
  registry?: string;
  name: string;
  tag?: string;
  policy?: string;
  resources?: ResourceRequirements;
};

export type AppResource = {
  id: string;
  env: string;
  name: string;
  namespace?: string;
};

export type AppVolume = {
  name: string;
  claim: string;
  mount_path: string;
  sub_path: string;
};

export type SecretDictionary = { [key: string]: Secret };
export type AppDictionary = { [key: string]: string };

export type AppSecret = AppResource & {
  string_data: AppDictionary;
};
