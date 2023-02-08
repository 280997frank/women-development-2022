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

import { ActiveModal } from "@/types";
import type { MobileSectionProps } from "@/types/shapersOfSuccess";

interface SosKeyArea2 {
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
    caption: string;
  };
  video: {
    mp4: string;
    webm: string;
  };
}

export default function SosKeyArea2Mobile({
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
      ? doc(collectionRef as CollectionReference<SosKeyArea2>, "keyArea2")
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
      setActiveKeyArea(2);
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
            KEY AREA 02
          </Heading>
          {isLoading ? (
            <Box textAlign="center" my={12}>
              <Spinner size="xl" />
            </Box>
          ) : (
            <>
              <Heading
                fontSize="1.75rem"
                color="#1B4B76"
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
              <Figure
                px="7.5%"
                pb={6}
                borderBottom="1px solid white"
                caption={data?.image.caption ?? ""}
              >
                <picture>
                  <source srcSet={data?.image.webp} type="image/webp" />
                  <Img
                    src={data?.image.png}
                    htmlWidth="688"
                    htmlHeight="388"
                    alt=""
                    onClick={() => {
                      onOpen();
                      setActiveModal({
                        type: "video",
                        src: { mp4: data?.video.mp4, webm: data?.video.webm },
                      });
                    }}
                  />
                </picture>
              </Figure>
              {data?.explanations?.map(
                ({ title, description, thumbnail }, index) => (
                  <KeyAreaExplanationMobile
                    key={title}
                    title={title}
                    headingColor="#1B4B76"
                    description={description}
                    thumbnail={thumbnail}
                    useViewMore
                    isFigureAfterDescription={index === 1}
                  />
                )
              )}
              <KeyAreaQuoteMobile
                thumbnail={data?.quoter.thumbnail}
                name={data?.quoter.name}
                quoterPosition={data?.quoter.position}
                description={data?.quoter.description}
                buttonBgColor="#1B4B76"
                caption={data?.quoter.caption}
                quote={data?.quoter.quote}
                audio={data?.quoter.audio}
                p={8}
                mt={8}
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
