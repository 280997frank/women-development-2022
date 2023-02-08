import type { Dispatch, SetStateAction, RefObject } from "react";
import type { CollectionReference } from "firebase/firestore";

export interface MobileSectionProps {
  collectionRef: CollectionReference;
  setActiveKeyArea: Dispatch<SetStateAction<number>>;
  containerRef: RefObject<HTMLDivElement>;
}

export interface DesktopSectionProps {
  collectionRef: CollectionReference;
  setActiveKeyArea: Dispatch<SetStateAction<string>>;
  setScrollBox: Dispatch<SetStateAction<boolean>>;
}
