import {
  Container,
  ServicePort,
  IngressRule,
  PolicyRule,
  Volume,
  ResourceRequirements,
} from "@do/k8s";
import { AppResource, AppSelector, AppServiceType } from "./app_props";

export type CreateDeploymentProps = {
  id: string;
  env: string;
  name: string;
  namespace: string;
  selector: AppSelector;
  replicas: number;

  volumes?: Volume[];
  containers: Container[];
};

export type CreatePodProps = {
  id: string;
  env: string;
  name: string;
  namespace: string;
  selector: AppSelector;

  containers: Container[];
};

export type CreateServiceProps = {
  id: string;
  env: string;
  name: string;
  namespace: string;
  selector: AppSelector;
  type: AppServiceType;
  ports: ServicePort[];
};

export type CreateIngressProps = {
  id: string;
  env: string;
  name: string;
  namespace: string;

  rules: IngressRule[];
};

export type CreatePVCProps = {
  id: string;
  env: string;
  name: string;
  namespace: string;

  access_mode: string;
  resources: ResourceRequirements;
};

export type CreateRoleProps = AppResource & {
  rules: PolicyRule[];
};
