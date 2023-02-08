import React, { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { useDocumentData } from "react-firehooks";
import { CollectionReference, doc } from "firebase/firestore";
import { Box, Flex, IconButton, Img, Text } from "@chakra-ui/react";
import YearWrapper from "@/components/Atoms/ShapersOfSuccess/YearWrapper";
import Year from "@/components/Atoms/ShapersOfSuccess/Year";
import Title from "@/components/Atoms/ShapersOfSuccess/Title";
import { border } from "@/constants/pioneersConstant";
import { useError } from "@/hooks/error";
import { imgs } from "@/constants/shapersOfSuccessConstantImage";
import { actions as shapersOfSuccessAction } from "@/states/shapers-of-success/slices";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  DesktopSectionProps,
  MobileSectionProps,
} from "@/types/shapersOfSuccess";
import { BsPlusLg } from "react-icons/bs";
import orchidPng from "@/assets/images/shapers-of-success-mobile/orchid.png";
import { isSafari } from "react-device-detect";
import { RootState } from "@/states/store";
import { Parallax } from "react-scroll-parallax";

interface Sos2021 {
  caption: string;
  description: string;
  title: string;
  video: {
    mp4: string;
    webm: string;
  };
}

interface Sos2021DesktopProps {
  collectionRef: CollectionReference;
}

export default function Sos2021Desktop({
  collectionRef,
  setActiveKeyArea,
}: DesktopSectionProps) {
  const { inView, ref } = useInView({
    triggerOnce: false,
    threshold: 0,
  });

  const [bgColorRef, inBgColorView] = useInView({
    rootMargin: "1px 0px 1px 0px",
  });
  // const { isOpen, onClose, onOpen } = useDisclosure();

  const [data, isLoading, error] = useDocumentData(
    inView ? doc(collectionRef as CollectionReference<Sos2021>, "2021") : null,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const dispatch = useDispatch();

  useError(error);

  useEffect(() => {
    if (inBgColorView) {
      setActiveKeyArea("2021");
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
    if (activeYears.includes("2021")) {
      return 1;
    } else if (lastActive !== "2021") {
      return 0;
    }
  }, [activeYears]);

  const posContent = useMemo(() => {
    const lastActive = activeYears[0];
    if (activeYears.includes("2021")) {
      return "relative";
    } else if (lastActive !== "2021") {
      return "absolute";
    }
  }, [activeYears]);

  const leftContent = useMemo(() => {
    const lastActive = activeYears[0];
    if (activeYears.includes("2021")) {
      return 0;
    } else if (lastActive !== "2021") {
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
        <YearWrapper year="2021">
          <Box w="650px" borderLeft={border} minH="80vh">
            <Year value="2021" ml="-20px" pt="5vh" borderRight={border} />
            <Parallax opacity={[2, 0]} translateY={["-10", "0"]}>
              <Title
                pt={5}
                pl={5}
                pb={5}
                borderRight={border}
                pos={posContent}
                top={leftContent}
                opacity={opacityContent}
                transition="all 0.5s linear"
              >
                {data?.title}
              </Title>
              <Box h={8} borderRight={border} borderTop={border} />
              <Text
                pos={posContent}
                left={leftContent}
                opacity={opacityContent}
                transition="all 0.5s linear"
                lineHeight={window.innerWidth < 1400 ? "1.25rem" : "1.5rem"}
                pl={5}
                fontSize={window.innerWidth < 1400 ? "0.75rem" : "1.25rem"}
                mt="-10px"
                pr={10}
                dangerouslySetInnerHTML={{ __html: data?.description ?? "" }}
              />
              <Flex
                pos={posContent}
                left={leftContent}
                opacity={opacityContent}
                transition="all 0.5s linear"
                flexDir="row"
                mt={
                  window.innerWidth < 1300
                    ? "-40px"
                    : window.innerWidth < 1400
                    ? "-20px"
                    : "-80px"
                }
              >
                <Text
                  alignSelf="end"
                  minW="80%"
                  pt={2}
                  pl={5}
                  mt={isSafari ? "200px" : 20}
                  fontSize={window.innerWidth < 1400 ? "0.7rem" : "0.9rem"}
                  dangerouslySetInnerHTML={{ __html: data?.caption ?? "" }}
                />
                {/*<Flex flexDir="row" bgColor="red">*/}
                <Box>
                  <IconButton
                    pos="absolute"
                    top="40%"
                    left={window.innerWidth < 1400 ? "74%" : "76%"}
                    opacity="1"
                    w={12}
                    h={12}
                    bgColor="#FACF5099"
                    borderRadius="50%"
                    aria-label="Open Video"
                    fontSize="2.25rem"
                    color="white"
                    icon={<BsPlusLg />}
                    onClick={() => {
                      dispatch(
                        shapersOfSuccessAction.setStream({
                          isOpen: true,
                          content:
                            "https://firebasestorage.googleapis.com/v0/b/women-development-2022.appspot.com/o/shapers-of-success%2F2021.mp4?alt=media&token=27a97f30-7126-41d1-9d91-39304aab70ca",
                          type: "video",
                        })
                      );
                    }}
                  />
                </Box>
                <Img
                  ml={window.innerWidth < 1400 ? "-10px" : "10px"}
                  w={window.innerWidth < 1300 ? "150px" : "200px"}
                  // h={isSafari ? "50%" : "auto"}
                  // ml="20vw"
                  // mt="-30px"
                  src={orchidPng.src}
                />
                {/*</Flex>*/}
              </Flex>
            </Parallax>
          </Box>
        </YearWrapper>
      </Box>
    </Box>
  );
}
