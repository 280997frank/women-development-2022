import type { Firestore, QueryConstraint } from "firebase/firestore";

export function getFirestore() {
  return {} as Firestore;
}

export function collection(firestore: Firestore, path: string) {
  if (path === "physical-exhibition") {
    return {
      type: "collection",
      _path: {
        segments: ["physical-exhibition"],
        offset: 0,
        len: 1,
      },
    };
  } else {
    return {};
  }
}

export function query() {
  return null;
}

export function orderBy() {
  return {} as QueryConstraint;
}

export function doc(reference: any, path: any) {
  if (reference?._path?.segments?.[0] === "physical-exhibition") {
    return [
      {
        title: "Visit us at these locations near you!",
        schedules: [
          {
            place: "Kampung Admiralty – Zone B",
            dates: "18 Jun – 3 Jul 2022",
            address: "676 Woodlands Drive 71, Singapore 730676",
          },
          {
            address: "1 Tampines Walk, Singapore 528523",
            place: "Our Tampines Hub – Festive Walk East",
            dates: "9 Jul – 24 Jul 2022",
          },
        ],
        description:
          "The Celebrating SG Women Exhibition will be held at different locations island-wide. Come experience the interactive displays and multimedia installations with your loved ones! ",
      },
      false,
      null,
    ];
  } else {
    return [];
  }
}

export function refEqual() {
  return {};
}

export function onSnapshot() {
  return {};
}
