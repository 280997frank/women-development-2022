import React, { useEffect, useRef, useState } from "react";
import { Box, Heading, Text, Spinner, Img, chakra } from "@chakra-ui/react";
import { CollectionReference, doc } from "firebase/firestore";
import { useDocumentData } from "react-firehooks";
import { useInView } from "react-intersection-observer";

import Figure from "@/components/Atoms/Figure";
import KeyAreaExplanationMobile from "@/components/Molecules/KeyAreaExplanationMobile";
import KeyAreaQuoteMobile from "@/components/Molecules/KeyAreaQuoteMobile";

import { useError } from "@/hooks/error";

import { removeHtmlTags, clamp } from "@/utils";

import type { MobileSectionProps } from "@/types/shapersOfSuccess";

interface SosKeyArea1 {
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
    thumbnail?: {
      png: string;
      webp: string;
      caption: string;
    };
  }[];
  image: {
    png: string;
    webp: string;
  };
}

export default function SosKeyArea1Mobile({
  collectionRef,
  setActiveKeyArea,
  containerRef,
}: MobileSectionProps) {
  const [threshold, setThreshold] = useState([0.1]);
  const { ref, inView } = useInView({
    triggerOnce: true,
    root: containerRef.current,
    rootMargin: "-40px 0px 100px 0px",
  });
  const sectionRef = useRef<HTMLDivElement>(null);
  const [bgColorRef, inBgColorView, entry] = useInView({
    root: containerRef.current,
    rootMargin: "-40px 0px 0px 0px",
    threshold,
  });
  const [data, isLoading, error] = useDocumentData(
    inView
      ? doc(collectionRef as CollectionReference<SosKeyArea1>, "keyArea1")
      : null,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  useError(error);

  useEffect(() => {
    if (inBgColorView) {
      setActiveKeyArea(1);
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
    <Box pt={10} pb={8} id="five-keys-areas" ref={ref}>
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
            KEY AREA 01
          </Heading>
          {isLoading ? (
            <Box textAlign="center" my={12}>
              <Spinner size="xl" />
            </Box>
          ) : (
            <>
              <Heading
                fontSize="1.75rem"
                color="#E83C47"
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
              <Figure w="85%" mx="auto" caption="">
                <picture>
                  <source srcSet={data?.image.webp} type="image/webp" />
                  <Img
                    src={data?.image.png}
                    htmlWidth="736"
                    htmlHeight="350"
                    alt=""
                  />
                </picture>
              </Figure>
              {data?.explanations?.map(({ title, description, thumbnail }) => (
                <KeyAreaExplanationMobile
                  key={title}
                  title={title}
                  headingColor="#E83C47"
                  description={description}
                  thumbnail={thumbnail}
                />
              ))}
              <KeyAreaQuoteMobile
                thumbnail={data?.quoter.thumbnail}
                name={data?.quoter.name}
                quoterPosition={data?.quoter.position}
                description={data?.quoter.description}
                buttonBgColor="#E83C47"
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
