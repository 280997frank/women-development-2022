import React, { useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useDocumentData } from "react-firehooks";
import { CollectionReference, doc } from "firebase/firestore";
import {
  AspectRatio,
  Box,
  Button,
  Flex,
  IconButton,
  Img,
  Text,
} from "@chakra-ui/react";
import YearWrapper from "@/components/Atoms/ShapersOfSuccess/YearWrapper";
import Title from "@/components/Atoms/ShapersOfSuccess/Title";
import { useError } from "@/hooks/error";
import { imgs } from "@/constants/shapersOfSuccessConstantImage";
import { actions as shapersOfSuccessAction } from "@/states/shapers-of-success/slices";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { DesktopSectionProps } from "@/types/shapersOfSuccess";
import { useOnClickTracking } from "@/hooks/tracking";
import { GoMute, GoUnmute } from "react-icons/go";
import { RootState } from "@/states/store";
import { border } from "@/constants/pioneersConstant";
import { Parallax } from "react-scroll-parallax";

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

export default function Sos3Desktop({
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
      ? doc(collectionRef as CollectionReference<SosKeyArea3>, "keyArea3")
      : null,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const [buttonReadMore, setButtonReadMore] = useState(false);
  const [buttonReadMor031, setButtonReadMore031] = useState(false);

  const dispatch = useDispatch();

  const borderKeyArea01 = "2px solid #fff3";

  const [isActiveSound, setIsActiveSound] = useState(true);

  const [soundLorraine, setSoundLorraine] = useState(
    new Audio(
      "https://firebasestorage.googleapis.com/v0/b/women-development-2022.appspot.com/o/shapers-of-success%2FProtection%20Against%20Violence%20and%20Harm_Talking%20Head_Lorraine.MP3?alt=media&token=e4d6341a-c52e-4a5f-8fe9-6ecee0aec0b4"
    )
  );

  useOnClickTracking(!isActiveSound, "modal-content", {
    content: soundLorraine.src,
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

  useError(error);

  useEffect(() => {
    if (inBgColorView) {
      setActiveKeyArea("Key Area 03");
    }
  }, [setActiveKeyArea, inBgColorView]);

  const { activeYears } = useSelector(
    (state: RootState) => ({
      activeYears: state.shapersOfSuccessProgress.activeYears,
    }),
    shallowEqual
  );

  const paddingContent = useMemo(() => {
    const lastActive = activeYears[0];
    if (activeYears.includes("Key Area 03")) {
      return 10;
    } else {
      return 20;
    }
  }, [activeYears]);

  const rightContent1 = useMemo(() => {
    const lastActive = activeYears[0];
    if (activeYears.includes("Key Area 03")) {
      return 0;
    } else if (lastActive !== "Key Area 03") {
      return 40;
    }
  }, [activeYears]);

  const posContent = useMemo(() => {
    const lastActive = activeYears[0];
    if (activeYears.includes("Key Area 03")) {
      return "relative";
    } else if (lastActive !== "Key Area 03") {
      return "absolute";
    }
  }, [activeYears]);

  const topContent = useMemo(() => {
    const lastActive = activeYears[0];
    if (activeYears.includes("Key Area 03")) {
      return 0;
    } else if (lastActive !== "Key Area 03") {
      return -1000;
    }
  }, [activeYears]);

  const leftContent = useMemo(() => {
    const lastActive = activeYears[0];
    if (activeYears.includes("Key Area 03")) {
      return 0;
    } else if (lastActive !== "Key Area 03") {
      return -300;
    }
  }, [activeYears]);

  const opacityContent = useMemo(() => {
    const lastActive = activeYears[0];
    if (activeYears.includes("Key Area 03")) {
      return 1;
    } else if (lastActive !== "Key Area 03") {
      return 0;
    }
  }, [activeYears]);

  return (
    <Box ref={ref}>
      <Box ref={bgColorRef}>
        <YearWrapper year="Key Area 03" w="300vw">
          <Box
            minW="30vw"
            maxW="35vw"
            borderLeft={borderKeyArea01}
            zIndex={1}
            // borderRight={borderKeyArea01}
            minH="80vh"
            maxH="80vh"
            // opacity={opacityContent}
            transition="all 0.5s linear"
            // minH={{ lg: "90vh", "2xl": "80vh" }}
          >
            <Text
              color="#FFF"
              fontSize={window.innerWidth < 1400 ? "1rem" : "1.25rem"}
              fontWeight="800"
              pl={paddingContent}
              opacity={opacityContent}
              transition="all 0.5s linear"
            >
              KEY AREA 03
            </Text>
            <Title
              color="#99104A"
              pl={paddingContent}
              opacity={opacityContent}
              transition="all 0.5s linear"
              pt={0}
              pb={5}
              borderBottom={borderKeyArea01}
              pr={10}
            >
              {data?.title}
            </Title>
            <Text
              lineHeight={window.innerWidth < 1400 ? "1.25rem" : "1.7rem"}
              pl={paddingContent}
              opacity={opacityContent}
              transition="all 0.5s linear"
              fontSize={window.innerWidth < 1400 ? "0.75rem" : "1.25rem"}
              pt={5}
              fontWeight="bold"
              pr={10}
              dangerouslySetInnerHTML={{ __html: data?.description ?? "" }}
            />
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
            minW="85vw"
            maxW="85vw"
            opacity={opacityContent}
            transition="all 0.5s linear"
            borderRight={borderKeyArea01}
            minH="80vh"
            maxH="80vh"
            pos={posContent}
            top={topContent}
            left={leftContent}
            // w={widthContent}
          >
            <Box h="10vh" />
            <Parallax opacity={[2, 0]} translateY={["-20", "0"]}>
              <Title
                color="#99104A"
                pl={10}
                pb={5}
                pt={5}
                borderTop={borderKeyArea01}
                textTransform="none"
              >
                {data?.explanations[0].title}
              </Title>
              <Flex flexDir="row" gap={10}>
                <Flex
                  flexDir="column"
                  maxW={window.innerWidth < 1400 ? "20%" : "25%"}
                  minW={window.innerWidth < 1400 ? "20%" : "25%"}
                  maxH="50vh"
                >
                  <Img
                    pl={10}
                    w="100%"
                    src={data?.explanations[0].thumbnail?.png as string}
                  />
                  <Text
                    pt={2}
                    pl={10}
                    fontSize={window.innerWidth < 1400 ? "0.7rem" : "0.9rem"}
                    dangerouslySetInnerHTML={{
                      __html: data?.explanations[0].thumbnail?.caption ?? "",
                    }}
                  />
                </Flex>
                <Flex flexDir="column" pr={10}>
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
                      pl="18px"
                      pr={5}
                      fontSize={
                        window.innerWidth < 1400 ? "0.75rem" : "0.95rem"
                      }
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
                    color="#99104A"
                    fontSize="0.85rem"
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
            maxW="30vw"
            borderRight={borderKeyArea01}
            minH="80vh"
            maxH="80vh"
            opacity={opacityContent}
            transition="all 0.5s linear"
          >
            <Parallax opacity={[2, 0]} translateY={["5", "0"]}>
              <Box h="12vh" borderBottom={borderKeyArea01}>
                <Text
                  color="#FFF"
                  fontSize={window.innerWidth < 1400 ? "1rem" : "1.25rem"}
                  fontWeight="800"
                  pl={10}
                >
                  KEY AREA 03
                </Text>
              </Box>
              <Box
                px="8"
                pt={10}
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
                <AspectRatio ratio={16 / 9}>
                  <Img src={data?.image.png} />
                </AspectRatio>
              </Box>
              <Text
                pt={2}
                px={8}
                fontSize={window.innerWidth < 1400 ? "0.7rem" : "0.9rem"}
                dangerouslySetInnerHTML={{ __html: data?.image.caption ?? "" }}
              />
            </Parallax>
          </Box>
          <Box
            minW="80vw"
            maxW="80vw"
            pt={10}
            borderRight={borderKeyArea01}
            minH="80vh"
            maxH="80vh"
          >
            <Box h="15vh" />
            <Parallax opacity={[2, 0]} translateY={["-20", "0"]}>
              <Title
                pt={10}
                pl={10}
                color="#99104A"
                textTransform="none"
                borderTop={borderKeyArea01}
              >
                {data?.explanations[1].title}
              </Title>
              <Flex flexDir="row" gap={window.innerWidth < 1400 ? 0 : 5} pt={5}>
                <Flex flexDir="column" pl={10}>
                  <Img
                    w={window.innerWidth < 1400 ? "80%" : "100%"}
                    // h="50%"
                    src={imgs.education3.src}
                  />
                  <Text
                    pt={2}
                    fontSize={window.innerWidth < 1400 ? "0.7rem" : "0.9rem"}
                    w={window.innerWidth < 1400 ? "80%" : "100%"}
                    dangerouslySetInnerHTML={{
                      __html: data?.explanations[1].thumbnail?.caption ?? "",
                    }}
                  />
                </Flex>
                <Flex flexDir="column" w="70%" pr={10}>
                  <Box
                    h={buttonReadMor031 ? "38vh" : "auto"}
                    overflow={buttonReadMor031 ? "auto" : "hidden"}
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
                      pl={10}
                      fontSize={window.innerWidth < 1400 ? "0.75rem" : "1rem"}
                      dangerouslySetInnerHTML={{
                        __html: buttonReadMor031
                          ? data?.explanations[1].description ?? ""
                          : data?.explanations[1].description?.slice(0, 400) +
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
                    color="#99104A"
                    fontSize={window.innerWidth < 1400 ? "0.75rem" : "1rem"}
                    bgColor="transparent"
                    onClick={() => setButtonReadMore031(!buttonReadMor031)}
                  >
                    {buttonReadMor031 ? "Read less" : "Read more"}
                  </Button>
                </Flex>
              </Flex>
            </Parallax>
          </Box>
          <Parallax opacity={[2, 0]} translateY={["-5", "0"]}>
            <Box
              minW="70vw"
              maxW="70vw"
              pos={posContent}
              right={leftContent}
              opacity={opacityContent}
              transition="all 0.5s linear"
              // borderRight={borderKeyArea01}
              minH="80vh"
              maxH="80vh"
            >
              <Box h="5vh" borderBottom={borderKeyArea01}>
                <Text color="#FFF" fontWeight="800" pl={10}>
                  KEY AREA 03
                </Text>
              </Box>
              <Flex
                flexDir="row"
                gap={10}
                // borderTop={borderKeyArea01}
                pt={5}
                pr={10}
              >
                <Flex
                  flexDir="column"
                  w={window.innerWidth < 1400 ? "25%" : "25%"}
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
                    bgColor="#99104A"
                    borderRadius="50%"
                    aria-label="Open Video"
                    fontSize="2.25rem"
                    color="white"
                    icon={!isActiveSound ? <GoMute /> : <GoUnmute />}
                    onClick={() => handleAudio(soundLorraine)}
                  />
                  <Text
                    w="90%"
                    pt={2}
                    alignSelf="center"
                    pl={window.innerWidth < 1400 ? 5 : 5}
                    fontSize={window.innerWidth < 1400 ? "0.7rem" : "0.9rem"}
                    dangerouslySetInnerHTML={{
                      __html: data?.quoter.caption ?? "",
                    }}
                  />
                </Flex>
                <Flex flexDir="column" gap={5} w="80%">
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
                    pr={10}
                    fontWeight="400"
                    dangerouslySetInnerHTML={{
                      __html: data?.quoter.description ?? "",
                    }}
                  />
                  <Text
                    lineHeight="1.5rem"
                    fontSize={window.innerWidth < 1400 ? "1rem" : "1.25rem"}
                    fontWeight="bold"
                    color="#99104A"
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
