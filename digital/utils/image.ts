import { AppImage } from "../types";

export const get_image_name = (image: AppImage) => {
  var image_name = "";

  if (image.repo) {
    image_name += `${image.repo}/`;
  }

  image_name += image.name;

  if (image.tag) {
    image_name += `:${image.tag}`;
  }
  return image_name;
};
