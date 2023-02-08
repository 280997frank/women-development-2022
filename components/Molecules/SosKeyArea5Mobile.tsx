import React, { useEffect, useState, useRef } from "react";
import { Box, Heading, Text, Spinner, chakra } from "@chakra-ui/react";
import { CollectionReference, doc } from "firebase/firestore";
import { useDocumentData } from "react-firehooks";
import { useInView } from "react-intersection-observer";

import KeyAreaExplanationMobile from "@/components/Molecules/KeyAreaExplanationMobile";
import KeyAreaQuoteMobile from "@/components/Molecules/KeyAreaQuoteMobile";

import { useError } from "@/hooks/error";

import { removeHtmlTags, clamp } from "@/utils";

import type { MobileSectionProps } from "@/types/shapersOfSuccess";

interface SosKeyArea5 {
  description: string;
  title: string;
  quoter: {
    thumbnail: {
      png: string;
      webp: string;
    };
    audio: {
      mp3: string;
      ogg: string;
    };
    name: string;
    position: string;
    caption: string;
    description: string;
    quote: string;
  };
  explanations: {
    description: string;
    title: string;
    thumbnail: {
      png: string;
      webp: string;
      caption: string;
    };
  }[];
}

export default function SosKeyArea5Mobile({
  collectionRef,
  setActiveKeyArea,
  containerRef,
}: MobileSectionProps) {
  const [threshold, setThreshold] = useState([0.1]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView({
    triggerOnce: true,
    root: containerRef.current,
    rootMargin: "-40px 0px 100px 0px",
  });
  const [bgColorRef, inBgColorView, entry] = useInView({
    root: containerRef.current,
    rootMargin: "-40px 0px 0px 0px",
    threshold,
  });
  const [data, isLoading, error] = useDocumentData(
    inView
      ? doc(collectionRef as CollectionReference<SosKeyArea5>, "keyArea5")
      : null,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  useError(error);

  useEffect(() => {
    if (inBgColorView) {
      setActiveKeyArea(5);
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
    <Box pt={10} pb={8} ref={ref} borderTop="1px solid white">
      <Box ref={sectionRef}>
        <Box ref={bgColorRef}>
          <Heading
            fontSize="lg"
            fontWeight="800"
            color="white"
            p={8}
            mx="auto"
            mb={2}
          >
            KEY AREA 05
          </Heading>
          {isLoading ? (
            <Box textAlign="center" my={12}>
              <Spinner size="xl" />
            </Box>
          ) : (
            <>
              <Heading
                fontSize="1.75rem"
                color="#7D0593"
                mb={6}
                p={8}
                mx="auto"
                lineHeight="1"
              >
                {removeHtmlTags(data?.title || "")}
              </Heading>
              <chakra.hr bgColor="white" h="1px" />
              <Text
                p={8}
                mx="auto"
                color="#484947"
                fontWeight="500"
                lineHeight="1.25"
                mt={6}
                mb={8}
                dangerouslySetInnerHTML={{ __html: data?.description ?? "" }}
              />
              <chakra.hr bgColor="white" h="1px" />
              {data?.explanations?.map(({ title, description, thumbnail }) => (
                <KeyAreaExplanationMobile
                  key={title}
                  title={title}
                  headingColor="#7D0593"
                  description={description}
                  thumbnail={thumbnail}
                />
              ))}
              <KeyAreaQuoteMobile
                thumbnail={data?.quoter.thumbnail}
                name={data?.quoter.name}
                quoterPosition={data?.quoter.position}
                description={data?.quoter.description}
                buttonBgColor="#7D0593"
                caption={data?.quoter.caption}
                quote={data?.quoter.quote}
                audio={data?.quoter.audio}
                p={8}
                mt={4}
                mx="auto"
              />
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}
