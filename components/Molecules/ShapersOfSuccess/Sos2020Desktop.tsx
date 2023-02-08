import React, { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { useDocumentData } from "react-firehooks";
import { CollectionReference, doc } from "firebase/firestore";
import { AspectRatio, Box, Flex, Img, Text } from "@chakra-ui/react";
import YearWrapper from "@/components/Atoms/ShapersOfSuccess/YearWrapper";
import Year from "@/components/Atoms/ShapersOfSuccess/Year";
import Title from "@/components/Atoms/ShapersOfSuccess/Title";
import { border } from "@/constants/pioneersConstant";
import { useError } from "@/hooks/error";
import { imgs } from "@/constants/shapersOfSuccessConstantImage";
import { actions as shapersOfSuccessAction } from "@/states/shapers-of-success/slices";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { DesktopSectionProps } from "@/types/shapersOfSuccess";
import { isSafari } from "react-device-detect";
import { RootState } from "@/states/store";
import { Parallax } from "react-scroll-parallax";

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

export default function Sos2020Desktop({
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
    inView ? doc(collectionRef as CollectionReference<Sos2020>, "2020") : null,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const dispatch = useDispatch();

  const { activeYears } = useSelector(
    (state: RootState) => ({
      activeYears: state.shapersOfSuccessProgress.activeYears,
    }),
    shallowEqual
  );

  const posContent = useMemo(() => {
    const lastActive = activeYears[0];
    if (activeYears.includes("2020")) {
      return "relative";
    } else if (lastActive !== "2020") {
      return "absolute";
    }
  }, [activeYears]);

  const leftContent = useMemo(() => {
    const lastActive = activeYears[0];
    if (activeYears.includes("2020")) {
      return 0;
    } else if (lastActive !== "2020") {
      return 30;
    }
  }, [activeYears]);

  const opacityContent = useMemo(() => {
    if (activeYears.includes("2020")) {
      return 1;
    } else {
      return 0;
    }
  }, [activeYears]);

  const titleContent = useMemo(() => {
    const lastActive = activeYears[0];
    if (activeYears.includes("2020")) {
      return 8;
    } else {
      return 10;
    }
  }, [activeYears]);

  const imageContent = useMemo(() => {
    const lastActive = activeYears[0];
    if (activeYears.includes("2020")) {
      return "35%";
    } else {
      return "10%";
    }
  }, [activeYears]);

  useError(error);

  useEffect(() => {
    if (inBgColorView) {
      setActiveKeyArea("2020");
    }
  }, [setActiveKeyArea, inBgColorView]);

  return (
    <Box
      ref={ref}
      mt="-15px"
      opacity={opacityContent}
      transition="all 0.5s linear"
    >
      <Box ref={bgColorRef}>
        <YearWrapper year="2020">
          <Box display="none">
            <Year left="0" top="0" value="2020" />
          </Box>
          <Box w="100%" mt="15vh" pos="relative" mr="-300px">
            <Img
              top={imageContent}
              opacity={opacityContent}
              transition="all 0.5s linear"
              w="400px"
              height="250px"
              objectFit="cover"
              objectPosition="100% 0"
              src={imgs.city2020.src}
              zIndex="-100"
              pos="absolute"
              // top="35%"
            />
          </Box>
          <Box
            w="1400px"
            ml="-180px"
            // bgColor="red"
            borderRight={border}
            // minH={{ lg: "90vh", "2xl": "80vh" }}
            // borderLeft={border}
            minH="85vh"
          >
            <Title
              py="5"
              borderBottom={border}
              pl={titleContent}
              opacity={opacityContent}
              // pos="absolute"
              transition="all 0.5s linear"
            >
              {data?.title}
            </Title>
            <Text
              lineHeight={window.innerWidth < 1400 ? "1.25rem" : "1.5rem"}
              pos={posContent}
              left={leftContent}
              opacity={opacityContent}
              transition="all 0.5s linear"
              px="8"
              py="5"
              fontSize={window.innerWidth < 1400 ? "0.75rem" : "1.25rem"}
              dangerouslySetInnerHTML={{ __html: data?.description ?? "" }}
            />
            <Flex
              w="100%"
              flexDir="column"
              pos={posContent}
              left={leftContent}
              opacity={opacityContent}
              transition="all 0.5s linear"
            >
              <Box
                cursor="pointer"
                zIndex={100}
                onClick={() => {
                  dispatch(
                    shapersOfSuccessAction.setStream({
                      isOpen: true,
                      content: data?.image.png as string,
                      type: "image",
                    })
                  );
                }}
              >
                <Img
                  w={window.innerWidth < 1400 ? "420px" : "500px"}
                  maxW={window.innerWidth < 1400 ? "420px" : "500px"}
                  // maxH="90%"
                  pl={10}
                  pr={10}
                  src={data?.image.thumbnail.png}
                />
              </Box>
              <Text
                pl={10}
                pr={10}
                pt={2}
                w={window.innerWidth < 1400 ? "80%" : "90%"}
                fontSize={window.innerWidth < 1400 ? "0.7rem" : "0.9rem"}
                dangerouslySetInnerHTML={{ __html: data?.image.caption ?? "" }}
              />
            </Flex>
          </Box>
          <Box minW="800px" maxW="600px" h="100%">
            <Parallax opacity={[0.5, 0]} translateY={["15", "0"]}>
              <Box
                h="30vh"
                borderRight={border}
                ml="-20px"
                pt="5vh"
                pos={posContent}
                left={leftContent}
                opacity={opacityContent}
                transition="all 0.5s linear"
              >
                <Year value="2020" />
              </Box>
            </Parallax>
            <Box
              h={window.innerWidth < 1400 ? 0 : 10}
              borderRight={border}
              borderTop={border}
            />
            <Parallax opacity={[2, 0]} translateY={["-15", "0"]}>
              <Text
                pos={posContent}
                left={leftContent}
                opacity={opacityContent}
                transition="all 0.5s linear"
                pt={10}
                w="55vw"
                lineHeight={window.innerWidth < 1400 ? "1.25rem" : "1.5rem"}
                px="8"
                fontSize={window.innerWidth < 1400 ? "1rem" : "1.5rem"}
                fontWeight="bold"
                color="#009481"
                dangerouslySetInnerHTML={{ __html: data?.quote ?? "" }}
              />
              <Flex
                flexDir="row"
                gap={2}
                align="center"
                mt={5}
                pos={posContent}
                left={leftContent}
                opacity={opacityContent}
                transition="all 0.5s linear"
              >
                <Img
                  cursor="pointer"
                  onClick={() => {
                    dispatch(
                      shapersOfSuccessAction.setStream({
                        isOpen: true,
                        content: data?.quoter.image.png as string,
                        type: "image",
                      })
                    );
                  }}
                  borderRadius="100%"
                  w="13%"
                  alignSelf="start"
                  // maxH="100%"
                  ml={8}
                  src={data?.quoter.thumbnail.png}
                  borderLeft={border}
                />
                <Text
                  fontWeight="bold"
                  color="#009481"
                  alignSelf="center"
                  fontSize="1rem"
                  ml={isSafari ? "20px" : "0"}
                >
                  {data?.quoter.name ?? ""}
                  <span
                    style={{
                      color: "black",
                      fontWeight: "normal",
                      fontSize: "1rem",
                    }}
                  >
                    {data?.quoter.description}
                  </span>
                </Text>
              </Flex>
            </Parallax>
          </Box>
          <Box minW="500px" mt={5}>
            <Parallax opacity={[2, 0]} translateY={["-15", "0"]}>
              <Box
                cursor="pointer"
                pl={20}
                onClick={() => {
                  dispatch(
                    shapersOfSuccessAction.setStream({
                      isOpen: true,
                      content: data?.video.mp4 as string,
                      type: "video",
                    })
                  );
                }}
              >
                <AspectRatio
                  ratio={16 / 9}
                  // top={topContent}
                  // left={leftContent}
                  // w={widthContent}
                  transition="all 0.5s linear"
                  opacity={opacityContent}
                >
                  <Img src={imgs.shanmugan.src} />
                </AspectRatio>
              </Box>
              <Text
                pt={2}
                pl={20}
                pb="5"
                fontSize={window.innerWidth < 1400 ? "0.7rem" : "0.9rem"}
                dangerouslySetInnerHTML={{ __html: data?.video.caption ?? "" }}
              />
            </Parallax>
            {/* <Year right="-4%" top="45%" value="1959" /> */}
          </Box>
        </YearWrapper>
      </Box>
    </Box>
  );
}
