import React, { useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useDocumentData } from "react-firehooks";
import { CollectionReference, doc } from "firebase/firestore";
import { Box, Flex, IconButton, Img, Text } from "@chakra-ui/react";
import YearWrapper from "@/components/Atoms/ShapersOfSuccess/YearWrapper";
import Title from "@/components/Atoms/ShapersOfSuccess/Title";
import { useError } from "@/hooks/error";
import { imgs } from "@/constants/shapersOfSuccessConstantImage";
import { DesktopSectionProps } from "@/types/shapersOfSuccess";
import { useOnClickTracking } from "@/hooks/tracking";
import { GoMute, GoUnmute } from "react-icons/go";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "@/states/store";
import { Parallax } from "react-scroll-parallax";

interface SosKeyArea5 {
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
    thumbnail: {
      png: string;
      webp: string;
      caption: string;
    };
  }[];
}

export default function Sos5Desktop({
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
    inView
      ? doc(collectionRef as CollectionReference<SosKeyArea5>, "keyArea5")
      : null,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const borderKeyArea01 = "2px solid #fff3";

  const [isActiveSound, setIsActiveSound] = useState(true);

  const [soundSaiful, setSoundSaiful] = useState(
    new Audio(
      "https://firebasestorage.googleapis.com/v0/b/women-development-2022.appspot.com/o/shapers-of-success%2FVO%20MSF%20Saiful.wav?alt=media&token=820ef303-caa1-41a5-b0d8-2ffd054fb3cc"
    )
  );

  useOnClickTracking(!isActiveSound, "modal-content", {
    content: soundSaiful.src,
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

  const rightContent = useMemo(() => {
    const lastActive = activeYears[0];
    if (activeYears.includes("Key Area 05")) {
      return "0px";
    } else if (lastActive !== "Key Area 05") {
      return "1000px";
    }
  }, [activeYears]);

  const paddingTopContent = useMemo(() => {
    const lastActive = activeYears[0];
    if (activeYears.includes("Key Area 05")) {
      return 5;
    } else if (lastActive !== "Key Area 05") {
      return 20;
    }
  }, [activeYears]);

  const posContent = useMemo(() => {
    const lastActive = activeYears[0];
    if (activeYears.includes("Key Area 05")) {
      return "relative";
    } else if (lastActive !== "Key Area 05") {
      return "absolute";
    }
  }, [activeYears]);

  const leftContent = useMemo(() => {
    const lastActive = activeYears[0];
    if (activeYears.includes("Key Area 05")) {
      return 0;
    } else if (lastActive !== "Key Area 05") {
      return -100;
    }
  }, [activeYears]);

  const opacityContent = useMemo(() => {
    const lastActive = activeYears[0];
    if (activeYears.includes("Key Area 05")) {
      return 1;
    } else if (lastActive !== "Key Area 05") {
      return 0;
    }
  }, [activeYears]);

  useError(error);

  useEffect(() => {
    if (inBgColorView) {
      setActiveKeyArea("Key Area 05");
    }
  }, [setActiveKeyArea, inBgColorView]);

  return (
    <Box ref={ref}>
      <Box ref={bgColorRef}>
        <YearWrapper year="Key Area 05" w="230vw">
          <Box
            minW="40vw"
            maxW="40vw"
            zIndex={1}
            borderLeft={borderKeyArea01}
            minH="80vh"
            maxH="80vh"
            opacity={opacityContent}
            transition="all 0.5s linear"
            // minH="90vh"
          >
            <Text
              color="#FFF"
              fontSize={window.innerWidth < 1400 ? "1rem" : "1.25rem"}
              fontWeight="800"
              pl={10}
              pr={10}
              // borderRight={borderKeyArea01}
            >
              KEY AREA 05
            </Text>
            <Title
              color="#7D0593"
              pl={10}
              pt={0}
              pb={5}
              borderBottom={borderKeyArea01}
              pr={10}
              // borderRight={borderKeyArea01}
            >
              {data?.title}
            </Title>
            <Text
              lineHeight={window.innerWidth < 1400 ? "1.25rem" : "1.7rem"}
              pl={10}
              fontSize={window.innerWidth < 1400 ? "0.75rem" : "1.25rem"}
              pt={paddingTopContent}
              fontWeight="bold"
              pr={10}
              color="black"
              transition="all 0.5s linear"
              // borderRight={borderKeyArea01}
              pb={20}
              dangerouslySetInnerHTML={{ __html: data?.description ?? "" }}
            />
          </Box>
          <Box pos="relative">
            <Box
              borderLeft={borderKeyArea01}
              h="80%"
              transition="all 0.5s linear"
              pos="absolute"
              left={rightContent}
            />
          </Box>
          <Box
            minW="70vw"
            maxW="70vw"
            pt={10}
            // borderRight={borderKeyArea01}
            minH="80vh"
            maxH="80vh"
            pos={posContent}
            // top={topContent}
            right={leftContent}
            opacity={opacityContent}
            transition="all 0.5s linear"
            // w={widthContent}
          >
            <Parallax opacity={[2, 0]} translateY={["-15", "0"]}>
              <Box h="10vh" borderBottom={borderKeyArea01} />
              <Title
                textTransform="none"
                pl={10}
                color="#7D0593"
                pt={window.innerWidth < 1400 ? 2 : 10}
              >
                {data?.explanations[0].title}
              </Title>
              <Flex flexDir="row" gap={5} pt={5}>
                <Flex
                  w={window.innerWidth < 1400 ? "25%" : "30%"}
                  flexDir="column"
                  pl={10}
                  gap={2}
                >
                  <Img src={imgs.fatherHood5.src} />
                  <Text
                    pt={2}
                    fontSize={window.innerWidth < 1400 ? "0.7rem" : "0.9rem"}
                    dangerouslySetInnerHTML={{
                      __html: data?.explanations[0].thumbnail?.caption ?? "",
                    }}
                  />
                </Flex>
                <Text
                  lineHeight={window.innerWidth < 1400 ? "1.25rem" : "1.5rem"}
                  w="60%"
                  fontSize={window.innerWidth < 1400 ? "0.75rem" : "1rem"}
                  dangerouslySetInnerHTML={{
                    __html: data?.explanations[0].description as string,
                  }}
                />
              </Flex>
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
            minW="50vw"
            maxW="50vw"
            borderRight={borderKeyArea01}
            minH="80vh"
            maxH="80vh"
            opacity={opacityContent}
            transition="all 0.5s linear"
          >
            <Parallax opacity={[2, 0]} translateY={["10", "0"]}>
              <Box h="5vh" borderBottom={borderKeyArea01} />
              <Flex flexDir="row" gap={5} pt={5}>
                <Img pl={10} w="50%" h="30%" src={imgs.gender5.src} />
                <Text
                  pt={2}
                  w="50%"
                  fontSize={window.innerWidth < 1400 ? "0.7rem" : "0.9rem"}
                  alignSelf="end"
                  dangerouslySetInnerHTML={{
                    __html: data?.explanations[1].thumbnail?.caption ?? "",
                  }}
                />
              </Flex>
              <Text
                lineHeight={window.innerWidth < 1400 ? "1.25rem" : "1.5rem"}
                fontSize={window.innerWidth < 1400 ? "0.75rem" : "1rem"}
                mt={window.innerWidth < 1400 ? 5 : 10}
                color="#202965"
                pl={10}
                dangerouslySetInnerHTML={{
                  __html: data?.explanations[1].description as string,
                }}
              />
            </Parallax>
          </Box>
          <Parallax opacity={[2, 0]} translateY={["-15", "0"]}>
            <Box
              minW="70vw"
              maxW="70vw"
              opacity={opacityContent}
              transition="all 0.5s linear"
            >
              <Box h="15vh" borderBottom={borderKeyArea01} />
              <Flex
                flexDir="row"
                gap={5}
                borderTop={borderKeyArea01}
                pt={5}
                pr={10}
              >
                <Flex flexDir="column" w="30%">
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
                    bgColor="#7D0593"
                    borderRadius="50%"
                    aria-label="Open Video"
                    fontSize="2.25rem"
                    color="white"
                    icon={!isActiveSound ? <GoMute /> : <GoUnmute />}
                    onClick={() => handleAudio(soundSaiful)}
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
                <Flex flexDir="column" gap={5} w="70%">
                  <Title color="#484947">{data?.quoter.name}</Title>
                  <Text
                    fontWeight="500"
                    fontSize={window.innerWidth < 1400 ? "0.75rem" : "1rem"}
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
                    fontSize={window.innerWidth < 1400 ? "1rem" : "1.25rem"}
                    color="#7D0593"
                    fontWeight="bold"
                    lineHeight="1.5rem"
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
