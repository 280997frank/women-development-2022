import React, { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { useDocumentData } from "react-firehooks";
import { CollectionReference, doc } from "firebase/firestore";
import { Box, Flex, Img, Stack, Text } from "@chakra-ui/react";
import YearWrapper from "@/components/Atoms/ShapersOfSuccess/YearWrapper";
import Year from "@/components/Atoms/ShapersOfSuccess/Year";
import Title from "@/components/Atoms/ShapersOfSuccess/Title";
import { border } from "@/constants/pioneersConstant";
import { useError } from "@/hooks/error";
import { imgs } from "@/constants/shapersOfSuccessConstantImage";
import {
  DesktopSectionProps,
  MobileSectionProps,
} from "@/types/shapersOfSuccess";
import NextLink from "next/link";
import Link from "next/link";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "@/states/store";
import { Parallax } from "react-scroll-parallax";

interface Sos2022 {
  description: string;
  title: string;
  subtitle: string;
  link: string;
}

interface Sos2022DesktopProps {
  collectionRef: CollectionReference;
}

export default function Sos2022Desktop({
  collectionRef,
  setActiveKeyArea,
}: DesktopSectionProps) {
  const { inView, ref } = useInView({
    triggerOnce: false,
    threshold: 0,
  });

  const [bgColorRef, inBgColorView] = useInView({
    rootMargin: "100px 0px 100px 0px",
  });

  // const { isOpen, onClose, onOpen } = useDisclosure();

  const [data, isLoading, error] = useDocumentData(
    inView ? doc(collectionRef as CollectionReference<Sos2022>, "2022") : null,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  useError(error);

  useEffect(() => {
    if (inBgColorView) {
      setActiveKeyArea("2022");
    }
  }, [setActiveKeyArea, inBgColorView]);

  const { activeYears } = useSelector(
    (state: RootState) => ({
      activeYears: state.shapersOfSuccessProgress.activeYears,
    }),
    shallowEqual
  );

  const opacityContent = useMemo(() => {
    const lastActive = activeYears[0];
    if (activeYears.includes("2022")) {
      return 1;
    } else if (lastActive !== "2022") {
      return 0;
    }
  }, [activeYears]);

  const posContent = useMemo(() => {
    const lastActive = activeYears[0];
    if (activeYears.includes("2022")) {
      return "relative";
    } else if (lastActive !== "2022") {
      return "absolute";
    }
  }, [activeYears]);

  const leftContent = useMemo(() => {
    const lastActive = activeYears[0];
    if (activeYears.includes("2022")) {
      return 0;
    } else if (lastActive !== "2022") {
      return -100;
    }
  }, [activeYears]);

  return (
    <Box
      ref={ref}
      pl={10}
      opacity={opacityContent}
      transition="all 0.5s linear"
    >
      <Box ref={bgColorRef}>
        <YearWrapper year="2022">
          <Box w="800px" borderRight={border} minH="80vh">
            <Year value="2022" pl="150px" />
            <Parallax opacity={[2, 0]} translateY={["10", "0"]}>
              <Title
                pl={20}
                pt={5}
                pr={10}
                pos={posContent}
                top={leftContent}
                opacity={opacityContent}
                transition="all 0.5s linear"
              >
                {data?.title}
              </Title>
              <Text
                pb={2}
                pl={20}
                pt={5}
                fontWeight="bold"
                fontSize={window.innerWidth < 1400 ? "0.75rem" : "1.25rem"}
                color="#009481"
                dangerouslySetInnerHTML={{ __html: data?.subtitle ?? "" }}
                pos={posContent}
                top={leftContent}
                opacity={opacityContent}
                transition="all 0.5s linear"
              />
              <Flex
                flexDir="column"
                gap={5}
                pr={10}
                pos={posContent}
                right={leftContent}
                opacity={opacityContent}
                transition="all 0.5s linear"
              >
                <Text
                  lineHeight={window.innerWidth < 1400 ? "1.25rem" : "1.5rem"}
                  fontSize={window.innerWidth < 1400 ? "0.75rem" : "1.25rem"}
                  pl={20}
                  dangerouslySetInnerHTML={{ __html: data?.description ?? "" }}
                />
                <a
                  rel="noreferrer"
                  href={data?.link}
                  target="_blank"
                  style={{
                    alignSelf: "center",
                    backgroundColor: "red",
                    width:
                      window.innerWidth < 1430 && window.innerHeight > 600
                        ? "15%"
                        : window.innerHeight < 600
                        ? "12%"
                        : "15%",
                  }}
                >
                  <Img cursor="pointer" src={imgs.logoWD2022.src} />
                </a>
              </Flex>
            </Parallax>
          </Box>
        </YearWrapper>
      </Box>
    </Box>
  );
}
