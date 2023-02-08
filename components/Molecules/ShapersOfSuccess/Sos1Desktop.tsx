import React, { useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useDocumentData } from "react-firehooks";
import { CollectionReference, doc } from "firebase/firestore";
import { Box, Button, Flex, Img, Text, IconButton } from "@chakra-ui/react";
import { GoMute, GoUnmute } from "react-icons/go";
import YearWrapper from "@/components/Atoms/ShapersOfSuccess/YearWrapper";
import Title from "@/components/Atoms/ShapersOfSuccess/Title";
import { useError } from "@/hooks/error";
import { imgs } from "@/constants/shapersOfSuccessConstantImage";
import { DesktopSectionProps } from "@/types/shapersOfSuccess";
import { useOnClickTracking } from "@/hooks/tracking";
import { isSafari } from "react-device-detect";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "@/states/store";
import { Parallax } from "react-scroll-parallax";

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

export default function Sos1Desktop({
  collectionRef,
  setActiveKeyArea,
  setScrollBox,
}: DesktopSectionProps) {
  const { inView, ref } = useInView({
    triggerOnce: false,
    threshold: 0,
  });

  const [bgColorRef, inBgColorView] = useInView({
    rootMargin: "100px 0px 100px 0px",
  });

  const borderKeyArea01 = "2px solid #fff3";

  const [buttonReadMore, setButtonReadMore] = useState(false);

  const { activeYears } = useSelector(
    (state: RootState) => ({
      activeYears: state.shapersOfSuccessProgress.activeYears,
    }),
    shallowEqual
  );

  // const { isOpen, onClose, onOpen } = useDisclosure();

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
      setActiveKeyArea("Key Area 01");
    }
  }, [setActiveKeyArea, inBgColorView]);

  const [soundMax, setSoundMax] = useState(
    new Audio(
      "https://firebasestorage.googleapis.com/v0/b/women-development-2022.appspot.com/o/shapers-of-success%2Fmax-loh.mp3?alt=media&token=ac73fb4c-ea52-469d-bb78-8147f7a53dc9"
    )
  );

  const [isActiveSound, setIsActiveSound] = useState(true);

  useOnClickTracking(!isActiveSound, "modal-content", {
    content: soundMax.src,
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

  const topImage = useMemo(() => {
    const lastActive = activeYears[0];
    if (activeYears.includes("Key Area 01")) {
      return "50%";
    } else if (lastActive !== "Key Area 01") {
      return "50%";
    }
  }, [activeYears]);

  const leftImage = useMemo(() => {
    const lastActive = activeYears[0];
    if (activeYears.includes("Key Area 01")) {
      return "0%";
    } else if (lastActive !== "Key Area 01") {
      return "-50px";
    }
  }, [activeYears]);

  const titleContent = useMemo(() => {
    const lastActive = activeYears[0];
    if (activeYears.includes("Key Area 01")) {
      return 10;
    }
  }, [activeYears]);

  const widthImage = useMemo(() => {
    const lastActive = activeYears[0];
    if (activeYears.includes("Key Area 01")) {
      return "250px";
    } else if (lastActive !== "Key Area 01") {
      return "0px";
    }
  }, [activeYears]);

  const rightContent = useMemo(() => {
    const lastActive = activeYears[0];
    if (activeYears.includes("Key Area 01")) {
      return "0px";
    } else if (lastActive !== "Key Area 01") {
      return "1000px";
    }
  }, [activeYears]);

  const opacityContent = useMemo(() => {
    const lastActive = activeYears[0];
    if (activeYears.includes("Key Area 01")) {
      return 1;
    } else if (lastActive !== "Key Area 01") {
      return 0;
    }
  }, [activeYears]);

  const posContent = useMemo(() => {
    const lastActive = activeYears[0];
    if (activeYears.includes("Key Area 01")) {
      return "relative";
    } else if (lastActive !== "Key Area 01") {
      return "absolute";
    }
  }, [activeYears]);

  const leftContent = useMemo(() => {
    const lastActive = activeYears[0];
    if (activeYears.includes("Key Area 01")) {
      return 0;
    } else if (lastActive !== "Key Area 01") {
      return -100;
    }
  }, [activeYears]);

  // const displayContent = useMemo(() => {
  //   const lastActive = activeYears[0];
  //   if (lastActive === "Key Area 01") {
  //     console.log("sini")
  //     return "block";
  //   } else if (lastActive !== "Key Area 01") {
  //     console.log("sana")
  //     return "none";
  //   }
  // }, [activeYears]);

  return (
    <Box ref={ref}>
      <Box ref={bgColorRef}>
        <YearWrapper year="Key Area 01" w="280vw">
          <Box
            w={window.innerWidth < 1400 ? "600px" : "750px"}
            mt="15vh"
            opacity={opacityContent}
            transition="all 0.5s linear"
            // pos="relative"
            // mr={window.innerWidth < 1400 ? "-900px" : "-680px"}
          >
            <Img
              top={topImage}
              left={leftImage}
              opacity={opacityContent}
              // display={displayContent}
              // left={leftAnd}
              transition="all 0.5s linear"
              w={widthImage}
              height={window.innerWidth < 1400 ? "250px" : "337px"}
              objectFit="cover"
              objectPosition="100% 0"
              src={imgs.city2020.src}
              zIndex="-100"
              pos="absolute"
              // top={window.innerWidth < 1400 ? "30%" : "50%"}
            />
          </Box>
          <Box
            minW="40vw"
            zIndex={1}
            pos={posContent}
            right={leftContent}
            opacity={opacityContent}
            transition="all 0.5s linear"
            // borderRight={borderKeyArea01}
            minH="80vh"
            maxH="80vh"
          >
            {/*<Parallax opacity={[2, 0]} translateY={["-10", "0"]}>*/}
            <Text
              color="#FFF"
              fontSize={window.innerWidth < 1400 ? "1rem" : "1.25rem"}
              fontWeight="800"
              pl={titleContent}
              opacity={opacityContent}
              // pos="absolute"
              transition="all 0.5s linear"
            >
              KEY AREA 01
            </Text>
            <Title
              color="#E83C47"
              pt={0}
              pb={5}
              // borderBottom={borderKeyArea01}
              pr={10}
              pl={10}
              opacity={opacityContent}
              transition="all 0.5s linear"
            >
              {data?.title}
            </Title>
            <Text
              pt={5}
              lineHeight={window.innerWidth < 1400 ? "1.25rem" : "1.7rem"}
              fontSize={window.innerWidth < 1400 ? "0.75rem" : "1.25rem"}
              fontWeight="bold"
              pr={10}
              dangerouslySetInnerHTML={{ __html: data?.description ?? "" }}
              pl={10}
              opacity={opacityContent}
              transition="all 0.5s linear"
            />
            <Img
              pt={window.innerWidth < 1400 ? 5 : 15}
              minW={window.innerWidth < 1400 ? "30vw" : "40vw"}
              maxW={window.innerWidth < 1400 ? "30vw" : "40vw"}
              // maxW={window.innerWidth < 1400 ? "60vw" : "60vw"}
              src={data?.image.png}
              pl={10}
              opacity={opacityContent}
              transition="all 0.5s linear"
            />
            {/*</Parallax>*/}
          </Box>
          <Box pos="relative">
            <Box
              borderRight={borderKeyArea01}
              h="100%"
              transition="all 0.5s linear"
              pos="absolute"
              left={rightContent}
            />
          </Box>
          {/*<Box border="1px solid black" h="100%"  pos="absolute" top={topImage} left={leftImage} transition="all 0.5s transition"/>*/}
          <Box
            minW="40vw"
            minH="80vh"
            maxH="80vh"
            opacity={opacityContent}
            transition="all 0.5s linear"
            pos={posContent}
            right={leftContent}
          >
            <Parallax opacity={[2, 0]} translateY={["-20", "20"]}>
              <Title
                color="#E83C47"
                pt="20vh"
                pb={5}
                pr={10}
                textTransform="none"
                pl={titleContent}
                opacity={opacityContent}
                transition="all 0.5s linear"
              >
                {data?.explanations[0].title}
              </Title>
              <Text
                borderBottom={borderKeyArea01}
                pb={5}
                fontSize={window.innerWidth < 1400 ? "0.75rem" : "1.25rem"}
                pr={5}
                pt={5}
                dangerouslySetInnerHTML={{
                  __html: data?.explanations[0].description as string,
                }}
                pl={titleContent}
                opacity={opacityContent}
                transition="all 0.5s linear"
              />
            </Parallax>
          </Box>
          <Box pos="relative">
            <Box
              borderLeft={borderKeyArea01}
              h="100%"
              transition="all 0.5s linear"
              pos="absolute"
              left={rightContent}
            />
          </Box>
          <Box
            opacity={opacityContent}
            transition="all 0.5s linear"
            minW="40vw"
            maxW="40vw"
            // borderLeft={borderKeyArea01}
            minH="80vh"
            maxH="80vh"
          >
            <Box h="3vh" />
            <Parallax opacity={[2, 0]} translateX={["5", "0"]}>
              <Title
                color="#E83C47"
                borderTop={borderKeyArea01}
                pt={5}
                pb={5}
                pr={10}
                textTransform="none"
                pl={titleContent}
                opacity={opacityContent}
                transition="all 0.5s linear"
              >
                {data?.explanations[1].title}
              </Title>
              <Flex w="100%" flexDir="column">
                <Flex
                  justifyContent={window.innerWidth < 1400 ? "center" : "start"}
                >
                  <Img
                    w={window.innerWidth < 1400 ? "250px" : "420px"}
                    h={isSafari ? "50%" : "auto"}
                    pl={10}
                    src={data?.explanations[1].thumbnail?.png as string}
                  />
                </Flex>
                <Flex
                  justifyContent={window.innerWidth < 1400 ? "center" : "start"}
                >
                  <Text
                    pt={2}
                    w={window.innerWidth < 1400 ? "60%" : "80%"}
                    pl={10}
                    fontSize={window.innerWidth < 1400 ? "0.7rem" : "0.9rem"}
                    dangerouslySetInnerHTML={{
                      __html: data?.explanations[1].thumbnail?.caption ?? "",
                    }}
                  />
                </Flex>
                <Box
                  overflow={buttonReadMore ? "auto !important" : "hidden"}
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
                  h={
                    buttonReadMore
                      ? window.innerWidth < 1400 && window.innerWidth > 1300
                        ? "27vh"
                        : window.innerWidth < 1300
                        ? "20vh"
                        : "12vh"
                      : "13vh"
                  }
                  mt={5}
                  pr={10}
                >
                  <Text
                    lineHeight={window.innerWidth < 1400 ? "1.25rem" : "1.7rem"}
                    fontSize={window.innerWidth < 1400 ? "0.75rem" : "0.9rem"}
                    pl={10}
                    dangerouslySetInnerHTML={{
                      __html: buttonReadMore
                        ? data?.explanations[1].description ?? ""
                        : data?.explanations[1].description.slice(0, 532) +
                            "..." ?? "",
                    }}
                  />
                </Box>
                <Button
                  alignSelf="start"
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
                  color="#E83C47"
                  fontSize={window.innerWidth < 1400 ? "0.75rem" : "1rem"}
                  bgColor="transparent"
                  onClick={() => setButtonReadMore(!buttonReadMore)}
                >
                  {buttonReadMore ? "Read less" : "Read more"}
                </Button>
              </Flex>
            </Parallax>
          </Box>
          <Box
            minW="30vw"
            borderLeft={borderKeyArea01}
            minH="80vh"
            maxH="80vh"
            opacity={opacityContent}
            transition="all 0.5s linear"
          >
            <Text
              w="100%"
              color="#FFF"
              fontWeight="800"
              pl={10}
              pb={window.innerWidth < 1400 ? "10vh" : "20vh"}
              borderBottom={borderKeyArea01}
              fontSize={window.innerWidth < 1400 ? "1rem" : "1.25rem"}
            >
              KEY AREA 01
            </Text>
            <Parallax opacity={[2, 0]} translateY={["-20", "0"]}>
              <Title
                w="100%"
                color="#E83C47"
                pl={10}
                pt={5}
                pb={10}
                textTransform="none"
              >
                {data?.explanations[2].title}
              </Title>
              <Img
                mt="-20px"
                pl={10}
                w="100%"
                src={data?.explanations[2].thumbnail?.png as string}
                pr={10}
              />
              <Text
                pt={2}
                pl={10}
                fontSize={window.innerWidth < 1400 ? "0.7rem" : "0.9rem"}
                dangerouslySetInnerHTML={{
                  __html: data?.explanations[2].thumbnail?.caption ?? "",
                }}
              />
            </Parallax>
          </Box>
          <Box
            maxH="80vh"
            minH="80vh"
            opacity={opacityContent}
            transition="all 0.5s linear"
          >
            <Parallax opacity={[2, 0]} translateY={["-10", "0"]}>
              <Box
                w="200px"
                borderLeft={borderKeyArea01}
                borderRight={borderKeyArea01}
                h="58vh"
              />
              <Text
                lineHeight={window.innerWidth < 1400 ? "1.2rem" : "1.5rem"}
                w="500px"
                borderRight={borderKeyArea01}
                pl={10}
                fontSize={window.innerWidth < 1400 ? "0.75rem" : "0.9rem"}
                pt={window.innerWidth < 1400 ? 2 : 2}
                borderTop={borderKeyArea01}
                dangerouslySetInnerHTML={{
                  __html: data?.explanations[2].description as string,
                }}
              />
            </Parallax>
          </Box>
          <Parallax opacity={[2, 0]} translateY={["-10", "0"]}>
            <Box
              ml="-300px"
              minW="80vw"
              minH="80vh"
              maxH="80vh"
              // pos={posContent}
              // pr={leftContent}
              opacity={opacityContent}
              transition="all 0.5s linear"
            >
              <Box h="2vh" />
              <Flex flexDir="row" gap={5} borderTop={borderKeyArea01} pt={5}>
                <Flex
                  w={window.innerWidth < 1400 ? "20%" : "25%"}
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
                    bgColor="#E83C47"
                    borderRadius="50%"
                    aria-label="Open Video"
                    fontSize="2.25rem"
                    color="white"
                    icon={!isActiveSound ? <GoMute /> : <GoUnmute />}
                    onClick={() => handleAudio(soundMax)}
                  />
                  <Text
                    w="90%"
                    pt={2}
                    alignSelf="center"
                    pl={window.innerWidth < 1400 ? 5 : 10}
                    fontSize={window.innerWidth < 1400 ? "0.7rem" : "0.9rem"}
                    dangerouslySetInnerHTML={{
                      __html: data?.quoter.caption ?? "",
                    }}
                  />
                </Flex>
                <Flex w="70%" flexDir="column" gap={3}>
                  <Title color="#484947">{data?.quoter.name}</Title>
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
                  />
                  <Text
                    lineHeight={window.innerWidth < 1400 ? "1.25rem" : "1.5rem"}
                    pt={window.innerWidth < 1400 ? 1 : 8}
                    fontSize={window.innerWidth < 1400 ? "0.75rem" : "1.25rem"}
                    fontWeight="bold"
                    color="#E83C47"
                    w="100%"
                    // pr={10}
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
