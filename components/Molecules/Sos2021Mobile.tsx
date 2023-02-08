import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  IconButton,
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
import { BsPlusLg } from "react-icons/bs";

import MultimediaModal from "@/components/Atoms/MultimediaModal";
import Figure from "@/components/Atoms/Figure";

import { useError } from "@/hooks/error";

import orchidPng from "@/assets/images/shapers-of-success-mobile/orchid.png";
import orchidWebp from "@/assets/images/shapers-of-success-mobile/orchid.webp";

import { clamp } from "@/utils";

import type { MobileSectionProps } from "@/types/shapersOfSuccess";

interface ActiveModal {
  type: "image" | "video";
  src: {
    png?: string;
    webp?: string;
    mp4?: string;
    webm?: string;
  };
}

interface Sos2021 {
  caption: string;
  description: string;
  title: string;
  video: {
    mp4: string;
    webm: string;
  };
}

export default function Sos2021Mobile({
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
    inView ? doc(collectionRef as CollectionReference<Sos2021>, "2021") : null,
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
    <Box pt={4} /* pb={8} */ id="2021" ref={ref}>
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
            2021
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
              <Text
                p={8}
                mx="auto"
                color="#484947"
                fontWeight="500"
                lineHeight="1.25"
                mt={4}
                mb={8}
                dangerouslySetInnerHTML={{ __html: data?.description ?? "" }}
              />
              <Figure
                p={8}
                mx="auto"
                mb={8}
                caption={data?.caption ?? ""}
                pos="relative"
              >
                <>
                  <picture>
                    <source srcSet={orchidWebp.src} type="image/webp" />
                    <Img
                      src={orchidPng.src}
                      htmlWidth={orchidPng.width}
                      htmlHeight={orchidPng.height}
                      position="relative"
                      left="20%"
                      alt=""
                    />
                  </picture>
                  <IconButton
                    pos="absolute"
                    top="16%"
                    left="47%"
                    opacity="1"
                    w={16}
                    h={16}
                    bgColor="#FACF5099"
                    borderRadius="50%"
                    aria-label="Open Video"
                    fontSize="2.25rem"
                    color="white"
                    icon={<BsPlusLg />}
                    onClick={() => {
                      onOpen();
                      setActiveModal({
                        type: "video",
                        src: { mp4: data?.video.mp4, webp: data?.video.webm },
                      });
                    }}
                  />
                </>
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
