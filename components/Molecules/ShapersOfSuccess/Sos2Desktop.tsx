import React, { useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useDocumentData } from "react-firehooks";
import { CollectionReference, doc } from "firebase/firestore";
import { Box, Button, Flex, IconButton, Img, Text } from "@chakra-ui/react";
import YearWrapper from "@/components/Atoms/ShapersOfSuccess/YearWrapper";
import Title from "@/components/Atoms/ShapersOfSuccess/Title";
import { border } from "@/constants/pioneersConstant";
import { useError } from "@/hooks/error";
import { actions as shapersOfSuccessAction } from "@/states/shapers-of-success/slices";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { DesktopSectionProps } from "@/types/shapersOfSuccess";
import { useOnClickTracking } from "@/hooks/tracking";
import { GoMute, GoUnmute } from "react-icons/go";
import { isSafari } from "react-device-detect";
import { RootState } from "@/states/store";
import { Parallax } from "react-scroll-parallax";

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

export default function Sos2Desktop({
  collectionRef,
  setActiveKeyArea,
  setScrollBox,
}: DesktopSectionProps) {
  const { inView, ref } = useInView({
    triggerOnce: false,
    threshold: 0,
  });

  const [bgColorRef, inBgColorView] = useInView({
    rootMargin: "0px -600px 0px -600px",
  });
  // const { isOpen, onClose, onOpen } = useDisclosure();

  const [data, isLoading, error] = useDocumentData(
    inView
      ? doc(collectionRef as CollectionReference<SosKeyArea2>, "keyArea2")
      : null,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const [buttonReadMore, setButtonReadMore] = useState(false);
  const [buttonReadMore02, setButtonReadMore02] = useState(false);

  const dispatch = useDispatch();

  const [isActiveSound, setIsActiveSound] = useState(true);

  const [soundJest, setSoundJest] = useState(
    new Audio(
      "https://firebasestorage.googleapis.com/v0/b/women-development-2022.appspot.com/o/shapers-of-success%2Fjeslyn-tan.mp3?alt=media&token=b32ade1b-e4a6-482a-a9cb-90b2bb1271a2"
    )
  );

  useOnClickTracking(!isActiveSound, "modal-content", {
    content: soundJest.src,
    type: "audio",
  });

  const handleAudio = (sound: any) => {
    if (isActiveSound) {
      sound.play();
    } else {
      sound.pause();
      sound.currentTime = 0;
    }
    setIsActiveSound(!isActiveSound);
  };

  const { activeYears } = useSelector(
    (state: RootState) => ({
      activeYears: state.shapersOfSuccessProgress.activeYears,
    }),
    shallowEqual
  );

  const paddingContent = useMemo(() => {
    const lastActive = activeYears[0];
    if (activeYears.includes("Key Area 02")) {
      return 10;
    } else {
      return 20;
    }
  }, [activeYears]);

  const rightContent = useMemo(() => {
    const lastActive = activeYears[0];
    if (activeYears.includes("Key Area 02")) {
      return 0;
    } else if (lastActive !== "Key Area 02") {
      return 20;
    }
  }, [activeYears]);

  const rightContent1 = useMemo(() => {
    const lastActive = activeYears[0];
    if (activeYears.includes("Key Area 02")) {
      return 0;
    } else if (lastActive !== "Key Area 02") {
      return 40;
    }
  }, [activeYears]);

  const rightContent2 = useMemo(() => {
    const lastActive = activeYears[0];
    if (activeYears.includes("Key Area 02")) {
      return 0;
    } else if (lastActive !== "Key Area 02") {
      return 60;
    }
  }, [activeYears]);

  const opacityContent = useMemo(() => {
    const lastActive = activeYears[0];
    if (activeYears.includes("Key Area 02")) {
      return 1;
    } else if (lastActive !== "Key Area 02") {
      return 0;
    }
  }, [activeYears]);

  useError(error);

  useEffect(() => {
    if (inBgColorView) {
      setActiveKeyArea("Key Area 02");
    }
  }, [setActiveKeyArea, inBgColorView]);

  const posContent = useMemo(() => {
    const lastActive = activeYears[0];
    if (activeYears.includes("Key Area 02")) {
      return "relative";
    } else if (lastActive !== "Key Area 02") {
      return "absolute";
    }
  }, [activeYears]);

  const topContent = useMemo(() => {
    const lastActive = activeYears[0];
    if (activeYears.includes("Key Area 02")) {
      return 0;
    } else if (lastActive !== "Key Area 02") {
      return 30;
    }
  }, [activeYears]);

  const leftContent = useMemo(() => {
    const lastActive = activeYears[0];
    if (activeYears.includes("Key Area 02")) {
      return 0;
    } else if (lastActive !== "Key Area 02") {
      return -1000;
    }
  }, [activeYears]);

  return (
    <Box ref={ref}>
      <Box ref={bgColorRef}>
        <YearWrapper year="Key Area 02" w="200vw">
          <Box
            minW="20vw"
            maxW="40vw"
            borderLeft={border}
            zIndex={1}
            // borderRight={border}
            minH="80vh"
            maxH="80vh"
            opacity={opacityContent}
            transition="all 0.5s linear"
            // minH={{ lg: "90vh", "2xl": "80vh" }}
          >
            <Parallax opacity={[2, 0]}>
              <Text
                color="#FFF"
                fontSize={window.innerWidth < 1400 ? "1rem" : "1.25rem"}
                fontWeight="800"
                pl={paddingContent}
                opacity={opacityContent}
                transition="all 0.5s linear"
              >
                KEY AREA 02
              </Text>
              <Title
                color="#1B4B76"
                pt={0}
                pb={5}
                // borderBottom={border}
                pr={10}
                pl={paddingContent}
                opacity={opacityContent}
                transition="all 0.5s linear"
              >
                {data?.title}
              </Title>
              <Box pos="relative">
                <Box
                  borderBottom={border}
                  w="100%"
                  transition="all 0.5s linear"
                  left={rightContent}
                  pos="absolute"
                  top={0}
                />
              </Box>
              <Text
                lineHeight={window.innerWidth < 1400 ? "1.25rem" : "1.7rem"}
                pl={paddingContent}
                opacity={opacityContent}
                transition="all 0.5s linear"
                pr={10}
                pt={5}
                fontSize={window.innerWidth < 1400 ? "0.75rem" : "1.25rem"}
                fontWeight="bold"
                dangerouslySetInnerHTML={{ __html: data?.description ?? "" }}
              />
              <Box
                cursor="pointer"
                px="8"
                pt={5}
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
                {/*<AspectRatio ratio={16 / 9}>*/}
                <Img w="75%" src={data?.image.png} />
                {/*</AspectRatio>*/}
              </Box>
              <Text
                fontSize={window.innerWidth < 1400 ? "0.7rem" : "0.9rem"}
                pt={2}
                px={8}
                dangerouslySetInnerHTML={{ __html: data?.image.caption ?? "" }}
              />
            </Parallax>
          </Box>
          <Box pos="relative">
            <Box
              borderRight={border}
              h="100%"
              transition="all 0.5s linear"
              left={rightContent1}
              pos="absolute"
              top={0}
            />
          </Box>
          <Box
            opacity={opacityContent}
            minW="30vw"
            maxW="45vw"
            // borderTop={border}
            // borderRight={border}
            // pr={10}
            // pl={10}
            minH="80vh"
            maxH="80vh"
            pos={posContent}
            top={topContent}
            right={leftContent}
            // w={widthContent}
            transition="all 0.5s linear"
          >
            <Box pos="relative">
              <Box
                borderBottom={border}
                w="100%"
                transition="all 0.5s linear"
                left={rightContent2}
                pos="absolute"
              />
            </Box>
            <Parallax opacity={[2, 0]} translateY={["-5", "0"]}>
              <Title textTransform="none" color="#1B4B76" pl={10} pb={5} pt={5}>
                {data?.explanations[0].title}
              </Title>
              <Flex flexDir="column" gap={5}>
                <Flex
                  justifyContent={window.innerWidth < 1400 ? "center" : "start"}
                >
                  <Img
                    pl={10}
                    w={window.innerWidth < 1400 ? "50%" : "75%"}
                    h={isSafari ? "50%" : "auto"}
                    src={data?.explanations[0].thumbnail?.png as string}
                  />
                </Flex>
                <Flex
                  justifyContent={window.innerWidth < 1400 ? "center" : "start"}
                >
                  <Text
                    pt={2}
                    pl={10}
                    fontSize={window.innerWidth < 1400 ? "0.7rem" : "0.9rem"}
                    dangerouslySetInnerHTML={{
                      __html: data?.explanations[0].thumbnail?.caption ?? "",
                    }}
                  />
                </Flex>
              </Flex>
              <Box
                overflow={buttonReadMore02 ? "auto !important" : "hidden"}
                onWheel={() => setScrollBox(false)}
                onMouseOut={() => setScrollBox(true)}
                sx={{
                  "::-webkit-scrollbar": {
                    width: "5px",
                  },

                  "::-webkit-scrollbar-track": {
                    borderRadius: "10px",
                  },

                  "::-webkit-scrollbar-thumb": {
                    background: "#f5f5f5",
                    borderRadius: "10px",
                  },
                }}
                h={buttonReadMore02 ? "14vh" : "12vh"}
                mt={5}
              >
                <Text
                  lineHeight={window.innerWidth < 1400 ? "1.25rem" : "1.5rem"}
                  pl={10}
                  fontSize={window.innerWidth < 1400 ? "0.75rem" : "1rem"}
                  dangerouslySetInnerHTML={{
                    __html: buttonReadMore02
                      ? data?.explanations[0].description ?? ""
                      : data?.explanations[0].description.slice(0, 540) +
                          "..." ?? "",
                  }}
                />
              </Box>
              <Button
                _active={{
                  bg: "transparent",
                }}
                _focus={{
                  bg: "transparent",
                }}
                _hover={{
                  bg: "#transparent",
                  border: "none",
                }}
                pl={10}
                color="#1B4B76"
                fontSize={window.innerWidth < 1400 ? "0.75rem" : "1rem"}
                bgColor="transparent"
                onClick={() => setButtonReadMore02(!buttonReadMore02)}
              >
                {buttonReadMore02 ? "Read less" : "Read more"}
              </Button>
            </Parallax>
          </Box>
          <Box pos="relative">
            <Box
              borderRight={border}
              h="100%"
              transition="all 0.5 linear"
              ml={rightContent}
            />
          </Box>
          <Box
            minW="55vw"
            maxW="55vw"
            pos={posContent}
            top={topContent}
            right={leftContent}
            opacity={opacityContent}
            // w={widthContent}
            transition="all 0.5 linear"
          >
            <Box h="5vh" borderBottom={border} />
            <Parallax opacity={[2, 0]} translateY={["5", "0"]}>
              <Title color="#1B4B76" pl={10} pt={5} pr={5} textTransform="none">
                {data?.explanations[1].title}
              </Title>
              <Box
                overflow={buttonReadMore ? "auto" : "hidden"}
                onWheel={() => setScrollBox(false)}
                onMouseOut={() => setScrollBox(true)}
                sx={{
                  "::-webkit-scrollbar": {
                    width: "5px",
                  },

                  "::-webkit-scrollbar-track": {
                    borderRadius: "10px",
                  },

                  "::-webkit-scrollbar-thumb": {
                    background: "#f5f5f5",
                    borderRadius: "10px",
                  },
                }}
                maxH={buttonReadMore ? "15vh" : "auto"}
                mt={5}
              >
                <Text
                  lineHeight={window.innerWidth < 1400 ? "1.25rem" : "1.5rem"}
                  pl={10}
                  fontSize={window.innerWidth < 1400 ? "0.75rem" : "1rem"}
                  pr={5}
                  dangerouslySetInnerHTML={{
                    __html: buttonReadMore
                      ? data?.explanations[1].description ?? ""
                      : data?.explanations[1].description.slice(0, 270) +
                          "..." ?? "",
                  }}
                />
              </Box>
              <Button
                _active={{
                  bg: "transparent",
                }}
                _focus={{
                  bg: "transparent",
                }}
                _hover={{
                  bg: "#transparent",
                  border: "none",
                }}
                pl={10}
                color="#1B4B76"
                fontSize={window.innerWidth < 1400 ? "0.75rem" : "1rem"}
                bgColor="transparent"
                onClick={() => setButtonReadMore(!buttonReadMore)}
              >
                {buttonReadMore ? "Read less" : "Read more"}
              </Button>
              <Flex
                gap={5}
                pt={window.innerWidth < 1400 ? 0 : 5}
                justifyContent={window.innerWidth < 1400 ? "center" : "start"}
              >
                <Img
                  pl={10}
                  maxW={window.innerWidth < 1400 ? "50%" : "50%"}
                  h={isSafari ? "300px" : "auto"}
                  src={data?.explanations[1].thumbnail?.png as string}
                />
              </Flex>
              <Flex
                gap={5}
                pt={2}
                justifyContent={window.innerWidth < 1400 ? "center" : "start"}
              >
                <Text
                  pt={2}
                  pl={10}
                  fontSize={window.innerWidth < 1400 ? "0.7rem" : "0.9rem"}
                  dangerouslySetInnerHTML={{
                    __html: data?.explanations[1].thumbnail?.caption ?? "",
                  }}
                />
              </Flex>
            </Parallax>
          </Box>
          <Parallax opacity={[2, 0]} translateY={["-20", "0"]}>
            <Box
              minW="30vw"
              maxW="80vw"
              borderLeft={border}
              opacity={opacityContent}
              transition="all 1s linear"
              pos={posContent}
              top={leftContent}
              pt="20vh"
              // borderRight={border}
              minH="80vh"
              maxH="80vh"
            >
              <Flex flexDir="row" gap={10} borderTop={border} pt={5}>
                <Flex
                  w={window.innerWidth < 1400 ? "25%" : "30%"}
                  flexDir="column"
                >
                  <Img
                    w={window.innerWidth < 1400 ? "150px" : "170px"}
                    // pl={10}
                    alignSelf="center"
                    // w="25%"
                    // h="30%"
                    src={data?.quoter.thumbnail?.png}
                    cursor="pointer"
                  />
                  <IconButton
                    // pos="absolute"
                    // top="100%"
                    // left="50%"
                    // transform="translate(-50%, -50%)"
                    // opacity="1"
                    mt="-40px"
                    alignSelf="center"
                    w={16}
                    h={16}
                    bgColor="#1B4B76"
                    borderRadius="50%"
                    aria-label="Open Video"
                    fontSize="2.25rem"
                    color="white"
                    icon={!isActiveSound ? <GoMute /> : <GoUnmute />}
                    onClick={() => handleAudio(soundJest)}
                  />
                  <Text
                    w="90%"
                    pt={2}
                    alignSelf="center"
                    pl={window.innerWidth < 1400 ? 5 : 8}
                    fontSize={window.innerWidth < 1400 ? "0.7rem" : "0.9rem"}
                    dangerouslySetInnerHTML={{
                      __html: data?.quoter.caption ?? "",
                    }}
                  />
                </Flex>
                <Flex w="80%" flexDir="column" gap={5}>
                  <Title>{data?.quoter.name}</Title>
                  <Text
                    fontSize={window.innerWidth < 1400 ? "0.75rem" : "1rem"}
                    fontWeight="500"
                    dangerouslySetInnerHTML={{
                      __html: data?.quoter.position ?? "",
                    }}
                  />
                  <Text
                    lineHeight={window.innerWidth < 1400 ? "1.25rem" : "1.5rem"}
                    fontSize={window.innerWidth < 1400 ? "0.75rem" : "1rem"}
                    fontWeight="400"
                    dangerouslySetInnerHTML={{
                      __html: data?.quoter.description ?? "",
                    }}
                    pr={10}
                  />
                  <Text
                    pt={5}
                    color="#1B4B76"
                    fontWeight="bold"
                    fontSize={window.innerWidth < 1400 ? "1rem" : "1.25rem"}
                    dangerouslySetInnerHTML={{
                      __html: data?.quoter.quote ?? "",
                    }}
                  />
                </Flex>
              </Flex>
            </Box>
          </Parallax>
        </YearWrapper>
      </Box>
    </Box>
  );
}
