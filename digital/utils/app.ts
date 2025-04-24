import { get_image_name } from "@do/utils";
import { IntOrString, ServiceBackendPort, IngressRule, EnvVar } from "@do/k8s";
import {
  AppContainer,
  AppResource,
  AppPorts,
  AppSelector,
  AppVolume,
  AppDictionary,
} from "@do/types";

export const get_app_name = (app: AppResource, type: string) => {
  let resource_type = "";

  switch (type) {
    case "deployment":
      resource_type = "deployment";
      break;

    case "service":
      resource_type = "service";
      break;

    case "ingress":
      resource_type = "ingress";
      break;

    case "role":
      resource_type = "role";
      break;

    case "service-account":
      resource_type = "service-account";
      break;

    case "secret":
      resource_type = "secret";
      break;

    case "storage":
      resource_type = "storage";
      break;

    case "pod":
      resource_type = "pod";
      break;

    case "pvc":
      resource_type = "pvc";
      break;

    default:
      throw Error("resource not specified");
  }

  return `${app.name}-${resource_type}`;
};

export const get_app_namespace = (app: AppResource) => {
  if (app.namespace) {
    return `${app.namespace}-${app.env}`;
  }
  return `${app.name}-${app.env}`;
};

export const get_app_selectors = (app: AppResource): AppSelector => ({
  app: app.name,
});

export const get_app_container = ({
  name,
  image,
  port,
  volumes,
  resources,
  env_vars,
}: AppContainer) => {
  return {
    name: name ? name : image.name,
    image: get_image_name(image),
    imagePullPolicy: image.policy ? image.policy : "Always",
    ports: port ? [port] : [],
    env: get_app_envvars(env_vars),
    resources,
    volumeMounts: volumes?.map((it) => ({
      name: it.name,
      mountPath: it.mount_path,
      subPath: it.sub_path,
    })),
  };
};

export const get_ingress_rule = (
  name: string,
  host: string,
  port: ServiceBackendPort,
): IngressRule => {
  const rule: IngressRule = {
    host,
    http: {
      paths: [
        {
          pathType: "Prefix",
          path: "/",
          backend: {
            service: {
              name,
              port,
            },
          },
        },
      ],
    },
  };

  return rule;
};

export const get_app_ports = (
  name: string,
  inbound: number,
  outbound: number,
): AppPorts => ({
  container: {
    name,
    containerPort: outbound,
  },
  service: {
    name,
    port: inbound,
    targetPort: IntOrString.fromNumber(outbound),
  },
  ingress: {
    number: outbound,
  },
});

export const get_app_volumes = (volumes: AppVolume[] | undefined) => {
  return (
    volumes?.map((it) => ({
      name: it.name,
      persistentVolumeClaim: {
        claimName: it.claim,
      },
    })) || volumes
  );
};

export const get_app_envvars = (
  vars: AppDictionary | undefined,
): EnvVar[] | undefined => {
  if (vars) {
    let env_vars: EnvVar[] = [];
    for (const key of Object.keys(vars)) {
      env_vars.push({ name: key, value: vars[key] });
    }

    return env_vars;
  }

  return undefined;
};
