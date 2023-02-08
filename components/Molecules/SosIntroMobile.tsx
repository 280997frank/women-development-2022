import React, { useEffect, useState, useRef } from "react";
import { Box, Flex, Text, Spinner } from "@chakra-ui/react";
import { CollectionReference, doc } from "firebase/firestore";
import { useDocumentData } from "react-firehooks";
import { useInView } from "react-intersection-observer";

import { useError } from "@/hooks/error";

import { clamp } from "@/utils";

import type { MobileSectionProps } from "@/types/shapersOfSuccess";

interface Intro {
  video: {
    mp4: string;
    webm: string;
  };
}

export default function SosIntroMobile({
  collectionRef,
  setActiveKeyArea,
  containerRef,
}: MobileSectionProps) {
  const [threshold, setThreshold] = useState([0.1]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [bgColorRef, inBgColorView, entry] = useInView({
    root: containerRef.current,
    rootMargin: "-40px 0px 0px 0px",
    threshold,
  });
  const [data, isLoading, error] = useDocumentData(
    doc(collectionRef as CollectionReference<Intro>, "intro"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  useError(error);

  useEffect(() => {
    if (inBgColorView) {
      setActiveKeyArea(0);
    }
  }, [setActiveKeyArea, inBgColorView]);

  useEffect(() => {
    if (entry && entry.rootBounds && sectionRef.current) {
      const newThreshold = clamp(
        entry.rootBounds.height / sectionRef.current.offsetHeight
      );

      setThreshold((currentThreshold) => {
        if (currentThreshold.includes(newThreshold)) {
          return currentThreshold;
        }

        return [...currentThreshold, newThreshold].sort();
      });
    }
  }, [entry]);

  return (
    <Box id="intro" ref={bgColorRef}>
      <Box ref={sectionRef}>
        <Flex justifyContent="center" alignItems="center" h="177vw">
          {isLoading ? (
            <Spinner size="xl" />
          ) : (
            <video muted autoPlay playsInline width="1080" height="1920">
              <source src={data?.video.webm} type="video/webm" />
              <source src={data?.video.mp4} type="video/mp4" />
              Sorry, your browser doesn&apos;t support embedded videos.
            </video>
          )}
        </Flex>
        {/* <Text
          w="max-content"
          mx="auto"
          color="white"
          fontSize="xs"
          fontWeight="500"
          bgColor="#009481"
          p={4}
          borderRadius="2rem"
        >
          SCROLL DOWN
        </Text> */}
      </Box>
    </Box>
  );
}
