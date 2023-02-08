import React, { useEffect, useRef, useMemo, useState } from "react";
import { Box, Button, Flex, Stack, Text, Progress } from "@chakra-ui/react";
import {
  dotColor,
  spaceDotTimeLine,
  years,
  yearsData,
} from "@/constants/shapersOfSuccessConstantImage";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "@/states/store";
import Sos2020Desktop from "@/components/Molecules/ShapersOfSuccess/Sos2020Desktop";
import { collection, CollectionReference, doc } from "firebase/firestore";
import { db } from "@/connections/firebase";
import Sos2021Desktop from "@/components/Molecules/ShapersOfSuccess/Sos2021Desktop";
import Sos2022Desktop from "@/components/Molecules/ShapersOfSuccess/Sos2022Desktop";
import Sos1Desktop from "@/components/Molecules/ShapersOfSuccess/Sos1Desktop";
import Sos2Desktop from "@/components/Molecules/ShapersOfSuccess/Sos2Desktop";
import Sos3Desktop from "@/components/Molecules/ShapersOfSuccess/Sos3Desktop";
import Sos4Desktop from "@/components/Molecules/ShapersOfSuccess/Sos4Desktop";
import Sos5Desktop from "@/components/Molecules/ShapersOfSuccess/Sos5Desktop";
import SosPollingDesktop from "@/components/Molecules/ShapersOfSuccess/SosPollingDesktop";
import ModalShapersOfSuccess from "@/components/Molecules/ModalShapersOfSuccess";
import Script from "next/script";
import NextLink from "next/link";
import { useDocumentData } from "react-firehooks";
import { isSafari } from "react-device-detect";

const { Link } = require("react-scroll");

const DEFAULT_BG_COLOR = "#e1d4c1";
const sosRef = collection(db, "shapers-of-success");

interface Intro {
  videoDesktop: string;
  desktopVideo: {
    mp4: string;
    webm: string;
  };
}

const ShapersOfSuccessDesktop = () => {
  const containerRef = useRef(null);
  const { activeYears } = useSelector(
    (state: RootState) => ({
      activeYears: state.shapersOfSuccessProgress.activeYears,
    }),
    shallowEqual
  );
  // const [progress, setProgress] = useState(0);
  const [textColor, setTextColor] = useState("#009481");
  const [colorProgressBar, setColorProgressBar] = useState("#009481");
  const [activeYear, setActiveYear] = useState("2020");
  const [isAtHorizontalEnd, setAtHorizontalEnd] = useState(false);
  const [bgColor, setBgColor] = useState(DEFAULT_BG_COLOR);
  const [activeKeyArea, setActiveKeyArea] = useState("2020");
  // const [scrollBox, setScrollBox] = useState(true);

  const [scrollEl, setScrollElement] = useState<HTMLDivElement>();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      setScrollElement(scrollRef.current);
    }
  }, [scrollRef]);

  // console.log(activeYears)

  const handleBgColor = () => {
    if (activeYears.length > 1) {
      const activeArea = activeYears[activeYears.length - 1];

      if (activeArea === "Key Area 01") {
        return "#FBCC7A";
      }

      if (activeArea === "Key Area 02") {
        return "#F19E57";
      }

      if (activeArea === "Key Area 03") {
        return "#71B6FE";
      }

      if (activeArea === "Key Area 04") {
        return "#9BC5C2";
      }

      if (activeArea === "Key Area 05") {
        return "#99D2AC";
      }

      return DEFAULT_BG_COLOR;
    }
  };

  useEffect(() => {
    let newBgColor = DEFAULT_BG_COLOR;
    // console.log(activeKeyArea);

    switch (activeKeyArea) {
      case "Key Area 01":
        newBgColor = "#FBCC7A";
        break;
      case "Key Area 02":
        newBgColor = "#F19E57";
        break;
      case "Key Area 03":
        newBgColor = "#71B6FE";
        break;
      case "Key Area 04":
        newBgColor = "#9BC5C2";
        break;
      case "Key Area 05":
        newBgColor = "#99D2AC";
        break;
    }

    setBgColor(newBgColor);
  }, [activeKeyArea, activeYear]);

  const [data, isLoading, error] = useDocumentData(
    doc(sosRef as CollectionReference<Intro>, "intro"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const [isInScrollBox, setScrollBox] = useState(true);
  const tickingRef = useRef(false);

  const [showTimeline, setShowTimeline] = useState(false);
  const [showEnterBtn, setShowEnterBtn] = useState(false);

  return (
    <>
      {!showTimeline && data && (
        <Box h="100vh">
          <video
            style={{
              width: "100%",
              height: "100vh",
              objectFit: "cover",
              position: "absolute",
              left: 0,
              zIndex: -1,
            }}
            onEnded={() => {
              setShowEnterBtn(true);
            }}
            // src={data?.videoDesktop}
            playsInline
            muted
            autoPlay
          >
            <source src={data?.desktopVideo.webm} type="video/webm" />
            <source src={data?.desktopVideo.mp4} type="video/mp4" />
          </video>
          <Button
            opacity={showEnterBtn ? 1 : 0}
            transition="opacity 0.5s ease-in"
            onClick={() => setShowTimeline(true)}
            rounded="full"
            px="2.5rem"
            color="#FFF"
            fontWeight="bold"
            zIndex={101}
            position="absolute"
            transform="translateX(-50%)"
            bottom={window.innerWidth < 1400 ? "15%" : "18%"}
            left="50%"
            sx={{
              bgColor: "#009481 !important",
            }}
          >
            CLICK TO ENTER
          </Button>
          <Stack
            justifyContent="space-between"
            w="calc(100% - 4rem)"
            ml="8"
            position="fixed"
            bottom="5px"
            zIndex={101}
            direction="row"
            spacing={5}
            borderTop="1px solid #FFF"
            py="2"
          >
            <NextLink href="/pioneers-of-progress" passHref>
              <Text cursor="pointer" fontSize="sm" fontWeight="bold">
                Pioneers of Progress
              </Text>
            </NextLink>
            <NextLink href="/shapers-of-success" passHref>
              <Text
                cursor="pointer"
                fontSize="sm"
                fontWeight="bold"
                color="#009481"
              >
                Shapers of Success
              </Text>
            </NextLink>
            <NextLink href="/trailblazers-of-tomorrow" passHref>
              <Text cursor="pointer" fontSize="sm" fontWeight="bold">
                Trailblazers of Tomorrow
              </Text>
            </NextLink>
          </Stack>
        </Box>
      )}

      <ParallaxProvider scrollContainer={scrollEl} scrollAxis="horizontal">
        <Box
          ref={scrollRef}
          display={showTimeline ? "block" : "none"}
          h="calc(100vh - 23px)"
          overflowX="scroll"
          onWheel={(e) => {
            if (isInScrollBox) {
              e.currentTarget.scrollLeft += e.deltaY;

              setAtHorizontalEnd(
                e.currentTarget.scrollWidth -
                  Math.ceil(e.currentTarget.scrollLeft) ===
                  e.currentTarget.clientWidth // offsetWidth
              );
            }
          }}
          id="containerElm"
        >
          <Box
            as="main"
            h="100%"
            w="100%"
            pos="fixed"
            top="0"
            left="0"
            right="0"
            bottom="0"
            bgColor={
              activeYears[0] === "Key Area 01"
                ? "#FBCC7A"
                : activeYears[0] === "Key Area 02"
                ? "#F19E57"
                : activeYears[0] === "Key Area 03"
                ? "#71B6FE"
                : activeYears[0] === "Key Area 04"
                ? "#9BC5C2"
                : activeYears[0] === "Key Area 05"
                ? "#99D2AC"
                : "#e1d4c1"
            }
            transition="background-color 1.1s"
            overflowY="hidden"
          />
          {/*<ParallaxProvider scrollAxis="horizontal">*/}
          <Flex h="100%" alignItems="center" zIndex={10} position="relative">
            <Text
              alignSelf="start"
              fontSize={window.innerWidth < 1400 ? "3xl" : "4xl"}
              color={textColor}
              transform="translate(-40px,23vh) rotate(90deg)"
              fontWeight="bold"
              position="absolute"
              as="h1"
              zIndex="sticky"
              ml={5}
            >
              Shapers
              <br /> of Success
            </Text>
            <Flex
              h="100%"
              alignItems="center"
              zIndex={10}
              position="relative"
              ref={containerRef}
              data-scroll-container
            >
              {/*<Parallax*/}
              {/*  shouldAlwaysCompleteAnimation*/}
              {/*  onProgressChange={(progress) => setProgress(progress)}*/}
              {/*>*/}
              <Flex>
                <Sos2020Desktop
                  collectionRef={sosRef}
                  setActiveKeyArea={setActiveKeyArea}
                  setScrollBox={setScrollBox}
                />
                <Sos2021Desktop
                  collectionRef={sosRef}
                  setActiveKeyArea={setActiveKeyArea}
                  setScrollBox={setScrollBox}
                />
                <Sos2022Desktop
                  collectionRef={sosRef}
                  setActiveKeyArea={setActiveKeyArea}
                  setScrollBox={setScrollBox}
                />
                <Sos1Desktop
                  collectionRef={sosRef}
                  setActiveKeyArea={setActiveKeyArea}
                  setScrollBox={setScrollBox}
                />
                <Sos2Desktop
                  collectionRef={sosRef}
                  setActiveKeyArea={setActiveKeyArea}
                  setScrollBox={setScrollBox}
                />
                <Sos3Desktop
                  collectionRef={sosRef}
                  setActiveKeyArea={setActiveKeyArea}
                  setScrollBox={setScrollBox}
                />
                <Sos4Desktop
                  collectionRef={sosRef}
                  setActiveKeyArea={setActiveKeyArea}
                  setScrollBox={setScrollBox}
                />
                <Sos5Desktop
                  collectionRef={sosRef}
                  setActiveKeyArea={setActiveKeyArea}
                  setScrollBox={setScrollBox}
                />
                <SosPollingDesktop
                  collectionRef={sosRef}
                  setActiveKeyArea={setActiveKeyArea}
                  setScrollBox={setScrollBox}
                />
                <ModalShapersOfSuccess />
                <Script
                  src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_V3_SITE_KEY}`}
                />
              </Flex>
              {/*</Parallax>*/}
            </Flex>
            <Stack px="8" w="100%" position="fixed" bottom="5px" zIndex="10">
              <Box position="relative">
                <Stack
                  pl="15vw"
                  direction="row"
                  justifyContent="space-between"
                  pr="25%"
                  zIndex={2}
                  position="relative"
                >
                  {years.map((item, index) => (
                    <Stack
                      key={item}
                      alignItems="center"
                      spacing={1}
                      // pl={item === "POLLING" ? "3vw" : "0"}
                    >
                      <Text
                        visibility={
                          activeYears.indexOf(item) > -1 ? "visible" : "hidden"
                        }
                        fontWeight="bold"
                        color={yearsData[index].textColor}
                        fontSize="sm"
                        minW={spaceDotTimeLine[index]}
                        textAlign="center"
                        maxW={spaceDotTimeLine[index]}
                      >
                        {item}
                      </Text>

                      <Link
                        to={item}
                        spy={true}
                        smooth={true}
                        horizontal
                        containerId="containerElm"
                      >
                        <Box
                          cursor="pointer"
                          w="10px"
                          h="10px"
                          rounded="full"
                          _hover={{
                            bg: yearsData[index].dotColor,
                            border: "none",
                          }}
                          bgColor={
                            activeYears.length <= 0
                              ? "#7D0593"
                              : (dotColor[
                                  activeYears[activeYears.length - 1]
                                ] as string)
                          }
                        />
                      </Link>
                    </Stack>
                  ))}
                </Stack>
                {/*<Progress*/}
                {/*  zIndex={2}*/}
                {/*  bottom="4px"*/}
                {/*  h="1px"*/}
                {/*  value={parseFloat((progress * 100).toFixed(2))}*/}
                {/*  right="26%"*/}
                {/*  left="0"*/}
                {/*  colorScheme="pioneer"*/}
                {/*  pos="absolute"*/}
                {/*/>*/}
                {/* <Progress
                      zIndex={2}
                      transform="translateY(-3.5px)"
                      mr="25%"
                      ml="4%"
                      h="2px"
                      value={50}
                      colorScheme="pink"
                    /> */}
                {/* <Box
                      position="absolute"
                      bottom="4px"
                      bgColor="#fff"
                      w="100%"
                      h="2px"
                    ></Box> */}
                <Box>
                  {/*<Box*/}
                  {/*  position="absolute"*/}
                  {/*  bottom="4px"*/}
                  {/*  bgColor={colorProgressBar}*/}
                  {/*  w={`calc(${(progress * 100).toFixed(2)}% - 1%)`}*/}
                  {/*  // w="100%"*/}
                  {/*  h="2px"*/}
                  {/*  zIndex={1}*/}
                  {/*></Box>*/}
                </Box>
                <Box
                  position="absolute"
                  bottom="4px"
                  bgColor="#fff"
                  w="100%"
                  h="2px"
                />
              </Box>
              <Stack direction="row" pb={isSafari ? 5 : 0}>
                <NextLink href="/pioneers-of-progress" passHref>
                  <Text
                    fontSize="sm"
                    fontWeight="bold"
                    cursor="pointer"
                    pt={window.innerWidth < 1400 ? 2 : 2}
                  >
                    Pioneers of Progress
                  </Text>
                </NextLink>
                <Text
                  fontSize="sm"
                  flex="1"
                  fontWeight="bold"
                  color="#009481"
                  pt={window.innerWidth < 1400 ? 2 : 2}
                >
                  Shapers of Success
                </Text>
                <NextLink href="/trailblazers-of-tomorrow" passHref>
                  <Text
                    pt={window.innerWidth < 1400 ? 2 : 2}
                    cursor="pointer"
                    fontSize="sm"
                    fontWeight="bold"
                    bgColor={isAtHorizontalEnd ? "#009481" : "transparent"}
                    color={isAtHorizontalEnd ? "white" : "black"}
                    px={isAtHorizontalEnd ? 2 : 0}
                    borderRadius="0.2rem"
                  >
                    Trailblazers of Tomorrow
                  </Text>
                </NextLink>
              </Stack>
            </Stack>
          </Flex>
          {/*</ParallaxProvider>*/}
        </Box>
      </ParallaxProvider>
    </>
  );
};

export default ShapersOfSuccessDesktop;
