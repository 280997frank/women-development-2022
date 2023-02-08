import React, { useState, useRef } from "react";
import { Box } from "@chakra-ui/react";
import { collection } from "firebase/firestore";

import MilestoneSelection from "@/components/Molecules/MilestoneSelection";
import SosIntroMobile from "@/components/Molecules/SosIntroMobile";
import Sos2020Mobile from "@/components/Molecules/Sos2020Mobile";
import Sos2021Mobile from "@/components/Molecules/Sos2021Mobile";
import Sos2022Mobile from "@/components/Molecules/Sos2022Mobile";
import SosKeyArea1Mobile from "@/components/Molecules/SosKeyArea1Mobile";
import SosKeyArea2Mobile from "@/components/Molecules/SosKeyArea2Mobile";
import SosKeyArea3Mobile from "@/components/Molecules/SosKeyArea3Mobile";
import SosKeyArea4Mobile from "@/components/Molecules/SosKeyArea4Mobile";
import SosKeyArea5Mobile from "@/components/Molecules/SosKeyArea5Mobile";
import PollQuestionMobile from "@/components/Molecules/PollQuestionMobile";
import PollResultsMobile from "@/components/Molecules/PollResultsMobile";

import { db } from "@/connections/firebase";

import { useWindowSize } from "@/hooks/utils";

const sosRef = collection(db, "shapers-of-success");
const DEFAULT_BG_COLOR = "#e1d4c1";

function getBgColor(activeKeyArea: number) {
  let newBgColor = DEFAULT_BG_COLOR;

  switch (activeKeyArea) {
    case 1:
      newBgColor = "#FBCC7A";
      break;
    case 2:
      newBgColor = "#F19E57";
      break;
    case 3:
      newBgColor = "#71B6FE";
      break;
    case 4:
      newBgColor = "#9BC5C2";
      break;
    case 5:
      newBgColor = "#99D2AC";
      break;
  }

  return newBgColor;
}

export default function ShapersOfSuccessMobile() {
  const { innerHeight } = useWindowSize();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeKeyArea, setActiveKeyArea] = useState(0);

  return (
    <Box
      ref={containerRef}
      // bgColor="#EADDC6"
      bgColor={getBgColor(activeKeyArea)}
      height={`calc(${innerHeight}px - 6rem)`}
      maxH="-webkit-fill-available"
      overflow="hidden auto"
      // mt={24}
      transition="background-color 1.1s"
    >
      <MilestoneSelection
        pageName="shapers"
        data={[
          {
            name: "intro",
          },
          { name: "milestone", isSeparator: true },
          {
            name: "2020",
          },
          {
            name: "2021",
          },
          {
            name: "2022",
          },
          {
            name: "five-keys-areas",
          },
          { name: "polling", isSeparator: true },
          {
            name: "questions",
          },
          {
            name: "result",
          },
        ]}
      />
      <SosIntroMobile
        collectionRef={sosRef}
        setActiveKeyArea={setActiveKeyArea}
        containerRef={containerRef}
      />
      <Sos2020Mobile
        collectionRef={sosRef}
        setActiveKeyArea={setActiveKeyArea}
        containerRef={containerRef}
      />
      <Sos2021Mobile
        collectionRef={sosRef}
        setActiveKeyArea={setActiveKeyArea}
        containerRef={containerRef}
      />
      <Sos2022Mobile
        collectionRef={sosRef}
        setActiveKeyArea={setActiveKeyArea}
        containerRef={containerRef}
      />
      <SosKeyArea1Mobile
        collectionRef={sosRef}
        setActiveKeyArea={setActiveKeyArea}
        containerRef={containerRef}
      />
      <SosKeyArea2Mobile
        collectionRef={sosRef}
        setActiveKeyArea={setActiveKeyArea}
        containerRef={containerRef}
      />
      <SosKeyArea3Mobile
        collectionRef={sosRef}
        setActiveKeyArea={setActiveKeyArea}
        containerRef={containerRef}
      />
      <SosKeyArea4Mobile
        collectionRef={sosRef}
        setActiveKeyArea={setActiveKeyArea}
        containerRef={containerRef}
      />
      <SosKeyArea5Mobile
        collectionRef={sosRef}
        setActiveKeyArea={setActiveKeyArea}
        containerRef={containerRef}
      />
      <PollQuestionMobile
        collectionRef={sosRef}
        setActiveKeyArea={setActiveKeyArea}
        containerRef={containerRef}
      />
      <PollResultsMobile
        collectionRef={sosRef}
        setActiveKeyArea={setActiveKeyArea}
        containerRef={containerRef}
      />
    </Box>
  );
}
