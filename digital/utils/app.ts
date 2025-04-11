import { get_image_name } from "@do/utils";
import { IntOrString, ServiceBackendPort, IngressRule } from "@do/k8s";
import { AppContainer, AppResource, AppPorts, AppSelector } from "@do/types";

export const get_app_namespace = (app: AppResource) => `${app.name}-${app.env}`;

export const get_app_selectors = (app: AppResource): AppSelector => ({
  app: app.name,
});

export const get_app_container = ({ name, image, port }: AppContainer) => {
  return {
    name: name ? name : image.name,
    image: get_image_name(image),
    imagePullPolicy: image.policy ? image.policy : "Always",
    ports: port ? [port] : [],
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
              name: `${name}-service`,
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
