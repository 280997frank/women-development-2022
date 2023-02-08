import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Heading,
  Text,
  Spinner,
  Img,
  useDisclosure,
  chakra,
} from "@chakra-ui/react";
import { CollectionReference, doc } from "firebase/firestore";
import { useDocumentData } from "react-firehooks";
import { useInView } from "react-intersection-observer";

import Figure from "@/components/Atoms/Figure";
import KeyAreaExplanationMobile from "@/components/Molecules/KeyAreaExplanationMobile";
import KeyAreaQuoteMobile from "@/components/Molecules/KeyAreaQuoteMobile";
import MultimediaModal from "@/components/Atoms/MultimediaModal";

import { useError } from "@/hooks/error";

import { removeHtmlTags, clamp } from "@/utils";

import type { ActiveModal } from "@/types";
import { MobileSectionProps } from "@/types/shapersOfSuccess";

interface SosKeyArea3 {
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
    description?: string;
    title?: string;
    thumbnail?: {
      png: string;
      webp: string;
      caption: string;
    };
  }[];
  image: {
    png: string;
    webp: string;
    caption: string;
  };
  video: {
    mp4: string;
    webm: string;
  };
}

export default function SosKeyArea3Mobile({
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
      ? doc(collectionRef as CollectionReference<SosKeyArea3>, "keyArea3")
      : null,
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
      setActiveKeyArea(3);
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
            KEY AREA 03
          </Heading>
          {isLoading ? (
            <Box textAlign="center" my={12}>
              <Spinner size="xl" />
            </Box>
          ) : (
            <>
              <Heading
                fontSize="1.75rem"
                color="#99104A"
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
                mb={6}
                dangerouslySetInnerHTML={{ __html: data?.description ?? "" }}
              />
              <chakra.hr bgColor="white" h="1px" />
              {Array.isArray(data?.explanations) &&
                [
                  ...(data?.explanations as SosKeyArea3["explanations"]).slice(
                    0,
                    1
                  ),
                  {},
                  ...(data?.explanations as SosKeyArea3["explanations"]).slice(
                    1
                  ),
                ].map(({ title, description, thumbnail }, index) => {
                  if (index === 1) {
                    return (
                      <KeyAreaExplanationMobile key={index}>
                        <Figure pb={6} caption={data?.image.caption ?? ""}>
                          <picture>
                            <source
                              srcSet={data?.image.webp}
                              type="image/webp"
                            />
                            <Img
                              src={data?.image.png}
                              htmlWidth="682"
                              htmlHeight="384"
                              alt=""
                              onClick={() => {
                                onOpen();
                                setActiveModal({
                                  type: "video",
                                  src: {
                                    mp4: data?.video.mp4,
                                    webm: data?.video.webm,
                                  },
                                });
                              }}
                            />
                          </picture>
                        </Figure>
                      </KeyAreaExplanationMobile>
                    );
                  }

                  return (
                    <KeyAreaExplanationMobile
                      key={title}
                      title={title}
                      headingColor="#99104A"
                      description={description}
                      thumbnail={thumbnail}
                      useViewMore
                      viewMorePosition={2}
                    />
                  );
                })}
              <KeyAreaQuoteMobile
                thumbnail={data?.quoter.thumbnail}
                name={data?.quoter.name}
                quoterPosition={data?.quoter.position}
                description={data?.quoter.description}
                buttonBgColor="#99104A"
                caption={data?.quoter.caption}
                quote={data?.quoter.quote}
                audio={data?.quoter.audio}
                p={8}
                mt={4}
                mx="auto"
              />
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
