import { TImgSource } from "@/types";

export const getAccessToken = (): string => {
  if ((process.env.NEXT_PUBLIC_COOKIE_NAME as string) !== "") {
    if (typeof window !== "undefined") {
      const token = window.localStorage.getItem(
        process.env.NEXT_PUBLIC_COOKIE_NAME as string
      );
      return token !== null ? token : "";
    }
  }

  return "";
};

export const getImage = (
  folderName: string,
  filePrefix: string,
  startIndex: number,
  arrayLength: number
): TImgSource[][] => {
  const sequence = Array.from(Array(arrayLength).keys());
  const sources: TImgSource[][] = [];

  sequence.forEach((seq, index) => {
    if (index >= startIndex) {
      const zeroPaddedString = `${seq}`.padStart(2, "0");
      const url = `${folderName}/${filePrefix}${zeroPaddedString}`;
      console.log(`/images/${url}.webp`);

      sources.push([
        {
          // srcSet: require(`assets/images/${url}.webp`),
          srcSet: `/images/${url}.webp`,
          // srcSet: `https://assets.ourarmyfamily.com/${url}.webp`,
          type: "image/webp",
        },
        {
          // srcSet: require(`assets/images/${url}.jpg`),
          srcSet: `/images/${url}.jpg`,
          // srcSet: `https://assets.ourarmyfamily.com/${url}.jpg`,
          type: "image/jpeg",
        },
      ]);
    }
  });

  return sources;
};

export function removeHtmlTags(str: string) {
  var div = document.createElement("div");
  div.innerHTML = str;
  return div.innerText;
}

export function clamp(num: number, min = 0, max = 1) {
  return Math.min(Math.max(num, min), max);
}
