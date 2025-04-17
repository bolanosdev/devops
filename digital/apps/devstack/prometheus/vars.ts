import { AppImage } from "@do/types";
import { registry } from "@do/consts";

export const image: AppImage = {
  registry,
  name: "prometheus",
  tag: "latest",
};
