import { Construct } from "constructs";
import { Chart } from "cdk8s";
import { KubeDeployment } from "../../imports/k8s";

export class GrafanaChart extends Chart {
  constructor(scope: Construct, ns: string, appLabel: string) {
    super(scope, ns);

    new KubeDeployment(this, "my-deployment", {
      spec: {
        replicas: 3,
        selector: { matchLabels: { app: appLabel } },
        template: {
          metadata: { labels: { app: appLabel } },
          spec: {
            containers: [
              {
                name: "app-container",
                image: "nginx:1.19.10",
                ports: [{ containerPort: 80 }],
              },
            ],
          },
        },
      },
    });
  }
}
