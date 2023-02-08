export function useCollection() {
  return [];
}

export function useDocumentData() {
  return [];
}

export function useCollectionData() {
  const data = [
    {
      type: "landing",
      mobile: {
        mp4: "https://firebasestorage.googleapis.com/v0/b/women-development-2022.appspot.com/o/homepage%2Flanding.mp4?alt=media&token=25f803dc-c958-440b-9c1e-b6697adfe340",
        webm: "https://firebasestorage.googleapis.com/v0/b/women-development-2022.appspot.com/o/homepage%2Flanding.webm?alt=media&token=0eafde37-df8f-4769-8391-046b92efe81c",
      },
      desktop: {
        mp4: "https://firebasestorage.googleapis.com/v0/b/women-development-2022.appspot.com/o/homepage%2Flanding.mp4?alt=media&token=25f803dc-c958-440b-9c1e-b6697adfe340",
        webm: "https://firebasestorage.googleapis.com/v0/b/women-development-2022.appspot.com/o/homepage%2Flanding.webm?alt=media&token=0eafde37-df8f-4769-8391-046b92efe81c",
      },
    },
    {
      type: "opening",
      mobile: {
        mp4: "https://firebasestorage.googleapis.com/v0/b/women-development-2022.appspot.com/o/homepage%2FMobile_Landing.mp4?alt=media&token=dec5a012-771d-4ef2-ba99-7e1a17557910",
        webm: "https://firebasestorage.googleapis.com/v0/b/women-development-2022.appspot.com/o/homepage%2FMobile_Landing.webm?alt=media&token=d3d1be6f-4f92-420a-87be-dff67bbaf7c2",
      },
      desktop: {
        mp4: "https://firebasestorage.googleapis.com/v0/b/women-development-2022.appspot.com/o/homepage%2FDesktop_Landing.mp4?alt=media&token=ebb90496-51a8-456f-b012-ffb1ea64af8c",
        webm: "https://firebasestorage.googleapis.com/v0/b/women-development-2022.appspot.com/o/homepage%2FDesktop_Landing.webm?alt=media&token=7a75d03d-80c8-4980-851a-763d79094a77",
      },
    },
  ];
  return [data];
}
