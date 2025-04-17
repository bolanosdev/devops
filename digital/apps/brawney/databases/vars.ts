import { AppImage } from "@do/types";
import { registry } from "@do/consts";

export const image: AppImage = {
  registry: "quay.io/prometheuscommunity",
  name: "postgres-exporter",
};

export const migrator: AppImage = {
  registry,
  name: "brawney-migrations",
};
