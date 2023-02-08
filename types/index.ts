export type TImgSource = {
  srcSet: string;
  type: string;
};

export interface ActiveModal {
  type: "image" | "video";
  src: {
    png?: string;
    webp?: string;
    mp4?: string;
    webm?: string;
  };
}
