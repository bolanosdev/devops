import { Construct } from "constructs";
import { Chart } from "cdk8s";

import { CreateIngress } from "@do/utils/generators";
import { AppProps } from "@do/types";
import { get_app_ports, get_ingress_rule } from "@do/utils";

export class ElasticChart extends Chart {
  constructor(scope: Construct, properties: AppProps) {
    super(scope, properties.name);

    // this ns, pod, pvc, secrets were created with helm
    //  helm install elasticsearch elastic/elasticsearch \
    //--namespace elastic-prod \
    //--set replicas=1 \
    //--set volumeClaimTemplate.resources.requests.storage=10Gi \
    //--set podSecurityContext.fsGroup=1000 \
    //--set securityContext.runAsUser=1000 \
    //--set volumePermissions.enabled=true \
    //--set resources.requests.memory=2Gi \
    //--set resources.limits.memory=4Gi

    const { name, env, host } = properties;
    const http_port = get_app_ports("http-server", 80, 9200);

    if (host) {
      let annotations;
      if (env === "prod") {
        annotations = {
          "nginx.ingress.kubernetes.io/ssl-redirect": "true",
          "nginx.ingress.kubernetes.io/backend-protocol": "HTTPS",
        };
      }
      CreateIngress(this, {
        id: "5",
        env,
        name,
        annotations,
        rules: [
          get_ingress_rule("elasticsearch-master", host, http_port.ingress),
        ],
      });
    }
  }
}
