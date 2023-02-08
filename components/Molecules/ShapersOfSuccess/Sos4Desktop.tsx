import React, { useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useDocumentData } from "react-firehooks";
import { CollectionReference, doc } from "firebase/firestore";
import { Box, Button, Flex, IconButton, Img, Text } from "@chakra-ui/react";
import YearWrapper from "@/components/Atoms/ShapersOfSuccess/YearWrapper";
import Title from "@/components/Atoms/ShapersOfSuccess/Title";
import { border } from "@/constants/pioneersConstant";
import { useError } from "@/hooks/error";
import { imgs } from "@/constants/shapersOfSuccessConstantImage";
import { DesktopSectionProps } from "@/types/shapersOfSuccess";
import { useOnClickTracking } from "@/hooks/tracking";
import { GoMute, GoUnmute } from "react-icons/go";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "@/states/store";
import { Parallax } from "react-scroll-parallax";

interface SosKeyArea4 {
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
    thumbnails?: {
      png: string;
      webp: string;
      caption: string;
    }[];
  }[];
}

export default function Sos4Desktop({
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

  // const { isOpen, onClose, onOpen } = useDisclosure();

  const [data, isLoading, error] = useDocumentData(
    inView
      ? doc(collectionRef as CollectionReference<SosKeyArea4>, "keyArea4")
      : null,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const [buttonReadMore, setButtonReadMore] = useState(false);

  const [isActiveSound, setIsActiveSound] = useState(true);

  const [soundAmolat, setSoundAmolat] = useState(
    new Audio(
      "https://firebasestorage.googleapis.com/v0/b/women-development-2022.appspot.com/o/shapers-of-success%2FMSF%20Recording%20(Amolat%20Singh).mp3?alt=media&token=072869b6-98a1-4660-a565-32514981c499"
    )
  );

  useOnClickTracking(!isActiveSound, "modal-content", {
    content: soundAmolat.src,
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

  const titleContent = useMemo(() => {
    const lastActive = activeYears[0];
    if (activeYears.includes("Key Area 04")) {
      return 10;
    }
  }, [activeYears]);

  const marginTopContent = useMemo(() => {
    const lastActive = activeYears[0];
    if (activeYears.includes("Key Area 04")) {
      return 0;
    } else {
      return "5vh";
    }
  }, [activeYears]);

  useError(error);

  useEffect(() => {
    if (inBgColorView) {
      setActiveKeyArea("Key Area 04");
    }
  }, [setActiveKeyArea, inBgColorView]);

  const opacityContent = useMemo(() => {
    const lastActive = activeYears[0];
    if (activeYears.includes("Key Area 04")) {
      return 1;
    } else if (lastActive !== "Key Area 04") {
      return 0;
    }
  }, [activeYears]);

  const posContent = useMemo(() => {
    const lastActive = activeYears[0];
    if (activeYears.includes("Key Area 04")) {
      return "relative";
    } else if (lastActive !== "Key Area 04") {
      return "absolute";
    }
  }, [activeYears]);

  const leftContent = useMemo(() => {
    const lastActive = activeYears[0];
    if (activeYears.includes("Key Area 04")) {
      return 0;
    } else if (lastActive !== "Key Area 04") {
      return -100;
    }
  }, [activeYears]);

  return (
    <Box ref={ref}>
      <Box ref={bgColorRef}>
        <YearWrapper year="Key Area 04" w="180vw">
          <Box
            minW="20vw"
            maxW="40vw"
            zIndex={1}
            borderLeft={border}
            borderRight={border}
            h="80vh"
            minH="80vh"
            maxH="80vh"
            opacity={opacityContent}
            pos={posContent}
            // top={topContent}
            right={leftContent}
            transition="all 0.5s linear"
            // minH={{ lg: "90vh", "2xl": "80vh" }}
          >
            <Text
              color="#FFF"
              fontSize={window.innerWidth < 1400 ? "1rem" : "1.25rem"}
              fontWeight="800"
              pl={titleContent}
              transition="all 0.5s linear"
            >
              KEY AREA 04
            </Text>
            <Title
              color="#202965"
              pl={10}
              pt={0}
              pb={5}
              borderBottom={border}
              transition="all 0.5s linear"
              pr={10}
            >
              {data?.title}
            </Title>
            <Text
              lineHeight={window.innerWidth < 1400 ? "1.25rem" : "1.7rem"}
              pl={10}
              transition="all 0.5s linear"
              fontSize={window.innerWidth < 1400 ? "0.75rem" : "1.25rem"}
              pt={5}
              fontWeight="bold"
              pr={10}
              dangerouslySetInnerHTML={{ __html: data?.description ?? "" }}
            />
          </Box>
          <Box
            minW="60vw"
            maxW="70vw"
            // pt={10}
            borderRight={border}
            minH="80vh"
            maxH="80vh"
            mt={marginTopContent}
            transition="all 0.5s linear"
            opacity={opacityContent}
          >
            <Parallax opacity={[2, 0]} translateY={["-15", "0"]}>
              <Box
                h={window.innerWidth < 1400 ? "10vh" : "10vh"}
                borderBottom={border}
              />
              <Title textTransform="none" pl={10} pt={5} color="#202965">
                {data?.explanations[0].title}
              </Title>
              <Flex flexDir="row" gap={5} pt={5}>
                <Flex
                  w={window.innerWidth < 1400 ? "20%" : "30%"}
                  flexDir="column"
                  pl={10}
                  gap={2}
                >
                  <Img src={imgs.singleParent4.src} />
                  <Text
                    pt={2}
                    fontSize={window.innerWidth < 1400 ? "0.7rem" : "0.9rem"}
                    dangerouslySetInnerHTML={{
                      __html:
                        data?.explanations[0].thumbnails?.length != null
                          ? data.explanations[0].thumbnails[0].caption
                          : "",
                    }}
                  />
                  <Img src={imgs.lowIncome4.src} />
                  <Text
                    pt={2}
                    fontSize={window.innerWidth < 1400 ? "0.7rem" : "0.9rem"}
                    dangerouslySetInnerHTML={{
                      __html:
                        data?.explanations[0].thumbnails?.length != null
                          ? data.explanations[0].thumbnails[1].caption
                          : "",
                    }}
                  />
                </Flex>
                <Flex w="80%" flexDir="column" pr={10}>
                  <Box
                    h={buttonReadMore ? "46vh" : "auto"}
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
                  >
                    <Text
                      lineHeight={
                        window.innerWidth < 1400 ? "1.25rem" : "1.5rem"
                      }
                      fontSize={window.innerWidth < 1400 ? "0.75rem" : "1rem"}
                      pl="18px"
                      dangerouslySetInnerHTML={{
                        __html: buttonReadMore
                          ? data?.explanations[0].description ?? ""
                          : data?.explanations[0].description?.slice(0, 400) +
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
                    color="#202965"
                    fontSize={window.innerWidth < 1400 ? "0.75rem" : "1rem"}
                    bgColor="transparent"
                    onClick={() => setButtonReadMore(!buttonReadMore)}
                  >
                    {buttonReadMore ? "Read less" : "Read more"}
                  </Button>
                </Flex>
              </Flex>
            </Parallax>
          </Box>
          <Box
            minW="30vw"
            maxW="70vw"
            borderRight={border}
            minH="80vh"
            maxH="80vh"
            pos={posContent}
            left={leftContent}
            opacity={opacityContent}
            transition="all 0.5s linear"
          >
            <Box h="10vh" borderBottom={border}>
              <Text
                color="#FFF"
                fontSize={window.innerWidth < 1400 ? "1rem" : "1.25rem"}
                fontWeight="800"
                pl={10}
              >
                KEY AREA 04
              </Text>
            </Box>
            <Flex flexDir="row" gap={10} pt={5} pr={10}>
              <Flex
                flexDir="column"
                w={window.innerWidth < 1400 ? "25%" : "30%"}
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
                  bgColor="#202965"
                  borderRadius="50%"
                  aria-label="Open Video"
                  fontSize="2.25rem"
                  color="white"
                  icon={!isActiveSound ? <GoMute /> : <GoUnmute />}
                  onClick={() => handleAudio(soundAmolat)}
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
              <Flex flexDir="column" gap={5} w="80%">
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
                  fontWeight="bold"
                  color="#202965"
                  dangerouslySetInnerHTML={{ __html: data?.quoter.quote ?? "" }}
                />
              </Flex>
            </Flex>
          </Box>
        </YearWrapper>
      </Box>
    </Box>
  );
}
