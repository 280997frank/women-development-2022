import { TImgSource } from "../types";
import { getImage } from "../utils";

export const wdFrameImages: { [s: string]: TImgSource[][] } = {
  pioneers: getImage("pioneers", "Pioners", 10, 89),
  shapers: getImage("_", "", 0, 0),
  trailblazers: getImage("_", "", 0, 0),
};
