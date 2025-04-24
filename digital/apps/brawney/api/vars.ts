import { AppImage } from "@do/types";
import { registry } from "@do/consts";

export const image: AppImage = {
  registry,
  name: "brawney-api",
  tag: "latest",
};

export const migrate: AppImage = {
  registry,
  name: "brawney-api",
  tag: "latest",
};

export const migrator: AppImage = {
  registry,
  name: "brawney-migrator",
};
