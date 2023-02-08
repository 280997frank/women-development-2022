import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Spinner,
  Img,
  chakra,
  useDisclosure,
} from "@chakra-ui/react";
import { CollectionReference, doc } from "firebase/firestore";
import { useDocumentData } from "react-firehooks";
import { useInView } from "react-intersection-observer";

import MultimediaModal from "@/components/Atoms/MultimediaModal";
import Figure from "@/components/Atoms/Figure";

import { useError } from "@/hooks/error";

import { ActiveModal } from "@/types";

import cityPng from "@/assets/images/shapers-of-success-mobile/city-2020.png";
import cityWebp from "@/assets/images/shapers-of-success-mobile/city-2020.webp";

import { clamp } from "@/utils";

import type { MobileSectionProps } from "@/types/shapersOfSuccess";

interface Sos2020 {
  description: string;
  image: {
    caption: string;
    thumbnail: {
      png: string;
      webp: string;
    };
    png: string;
    webp: string;
  };
  quote: string;
  quoter: {
    description: string;
    name: string;
    thumbnail: {
      png: string;
      webp: string;
    };
    image: {
      png: string;
      webp: string;
    };
  };
  title: string;
  video: {
    caption: string;
    mp4: string;
    webm: string;
    thumbnail: {
      png: string;
      webp: string;
    };
  };
}

export default function Sos2020Mobile({
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
    inView ? doc(collectionRef as CollectionReference<Sos2020>, "2020") : null,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [activeModal, setActiveModal] = useState<ActiveModal>({
    type: "image",
    src: {},
  });

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
    <Box pt={10} /* pb={8} */ id="2020" ref={ref}>
      <Box ref={sectionRef}>
        <Box ref={bgColorRef}>
          <Heading fontSize="3rem" color="#009481" w="80%" m="auto">
            Shapers of Success
          </Heading>
          <picture>
            <source srcSet={cityWebp.src} type="image/webp" />
            <Img
              src={cityPng.src}
              htmlWidth={cityPng.width}
              htmlHeight={cityPng.height}
              mb="-2rem"
              mt="-1rem"
              alt=""
            />
          </picture>
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
            2020
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
                mb={8}
                p={8}
                mx="auto"
                lineHeight="1"
              >
                {data?.title}
              </Heading>
              <chakra.hr bgColor="#E5B767" h="2px" />
              <Text
                p={8}
                mx="auto"
                color="#484947"
                fontWeight="700"
                lineHeight="1.25"
                my={8}
                dangerouslySetInnerHTML={{ __html: data?.description ?? "" }}
              />
              <Figure
                p={8}
                mx="auto"
                mb={8}
                caption={data?.image.caption ?? ""}
              >
                <picture>
                  <source
                    srcSet={data?.image.thumbnail.webp}
                    type="image/webp"
                  />
                  <Img
                    src={data?.image.thumbnail.png}
                    htmlWidth="680"
                    htmlHeight="374"
                    _hover={{ cursor: "pointer" }}
                    onClick={() => {
                      onOpen();
                      setActiveModal({
                        type: "image",
                        src: { png: data?.image.png, webp: data?.image.webp },
                      });
                    }}
                    alt=""
                  />
                </picture>
              </Figure>
              <chakra.hr bgColor="#E5B767" h="2px" />
              <Text
                color="#009481"
                fontWeight="600"
                p={8}
                mx="auto"
                mt={8}
                mb={4}
                dangerouslySetInnerHTML={{ __html: data?.quote ?? "" }}
              />
              <Flex p={8} mx="auto" gap={4} mb={8} alignItems="center">
                <picture>
                  <source
                    srcSet={data?.quoter.thumbnail.webp}
                    type="image/webp"
                  />
                  <Img
                    src={data?.quoter.thumbnail.webp}
                    alt=""
                    htmlWidth="138"
                    htmlHeight="138"
                    borderRadius="50%"
                    w={20}
                    onClick={() => {
                      onOpen();
                      setActiveModal({
                        type: "image",
                        src: {
                          png: data?.quoter.image.png,
                          webp: data?.quoter.image.webp,
                        },
                      });
                    }}
                  />
                </picture>
                <Box flex="1">
                  <Text color="#009481" fontWeight="600">
                    {data?.quoter.name}
                  </Text>
                  <Text color="#484947" fontSize="xs" fontWeight="500">
                    {data?.quoter.description}
                  </Text>
                </Box>
              </Flex>
              <Figure
                p={8}
                mx="auto"
                mb={6}
                caption={data?.video.caption ?? ""}
              >
                <picture>
                  <source
                    srcSet={data?.video.thumbnail.webp}
                    type="image/webp"
                  />
                  <Img
                    src={data?.video.thumbnail.png}
                    htmlWidth="674"
                    htmlHeight="382"
                    _hover={{ cursor: "pointer" }}
                    onClick={() => {
                      onOpen();
                      setActiveModal({
                        type: "video",
                        src: { mp4: data?.video.mp4, webm: data?.video.webm },
                      });
                    }}
                    alt=""
                  />
                </picture>
              </Figure>
              <chakra.hr bgColor="#E5B767" h="2px" />
            </>
          )}
          <MultimediaModal
            isOpen={isOpen}
            onClose={onClose}
            type={activeModal.type}
            src={activeModal.src}
          />
        </Box>
      </Box>
    </Box>
  );
}
