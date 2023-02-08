import React, { useEffect, useState, useRef } from "react";
import { Box, Heading, Text, Spinner, Img, chakra } from "@chakra-ui/react";
import { CollectionReference, doc } from "firebase/firestore";
import { useDocumentData } from "react-firehooks";
import { useInView } from "react-intersection-observer";

import Figure from "@/components/Atoms/Figure";

import { useError } from "@/hooks/error";

import whitePaperPng from "@/assets/images/shapers-of-success-mobile/white-paper.png";
import whitePaperWebp from "@/assets/images/shapers-of-success-mobile/white-paper.webp";

import { clamp } from "@/utils";

import type { MobileSectionProps } from "@/types/shapersOfSuccess";

interface Sos2022 {
  description: string;
  title: string;
  subtitle: string;
  link: string;
}

export default function Sos2022Mobile({
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
    inView ? doc(collectionRef as CollectionReference<Sos2022>, "2022") : null,
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
    <Box pt={4} id="2022" ref={ref}>
      <Box ref={sectionRef}>
        <Box ref={bgColorRef}>
          <Heading
            fontSize={window.innerWidth < 300 ? "7xl" : "8xl"}
            color="#e1d4c1"
            /* sx={{
            "-webkit-text-stroke": "1px #009481",
          }} */
            w="80%"
            m="auto"
            textShadow="-2px 0 #009481, 0 2px #009481, 2px 0 #009481, 0 -2px #009481"
            textAlign="right"
          >
            2022
          </Heading>
          {isLoading ? (
            <Box textAlign="center" my={12}>
              <Spinner size="xl" />
            </Box>
          ) : (
            <>
              <Heading
                fontSize="1.75rem"
                color="#009481"
                /* sx={{
            "-webkit-text-stroke": "1px #009481",
          }} */
                mb={4}
                p={8}
                mx="auto"
                lineHeight="1"
              >
                {data?.title}
              </Heading>
              <Heading
                as="h3"
                fontSize="2xl"
                color="#009481"
                /* sx={{
            "-webkit-text-stroke": "1px #009481",
          }} */
                mt={8}
                p={8}
                mx="auto"
                lineHeight="1"
              >
                {data?.subtitle}
              </Heading>
              <Text
                p={8}
                mx="auto"
                color="#484947"
                fontWeight="500"
                lineHeight="1.25"
                mt={2}
                mb={8}
                dangerouslySetInnerHTML={{ __html: data?.description ?? "" }}
              />
              <Figure p={8} mx="auto" mb={8} caption="">
                <picture>
                  <source srcSet={whitePaperWebp.src} type="image/webp" />
                  <a
                    rel="noreferrer"
                    href={data?.link}
                    target="_blank"
                    style={{
                      alignSelf: "center",
                      backgroundColor: "red",
                      width: window.innerWidth < 1430 ? "15%" : "15%",
                    }}
                  >
                    <Img
                      p={8}
                      mx="auto"
                      src={whitePaperPng.src}
                      htmlWidth={whitePaperPng.width}
                      htmlHeight={whitePaperPng.height}
                      alt=""
                    />
                  </a>
                </picture>
              </Figure>
              <chakra.hr bgColor="#E5B767" h="2px" />
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}
