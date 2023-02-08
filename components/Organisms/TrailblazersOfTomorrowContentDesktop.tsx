import React, { useRef, useMemo, useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Img,
  Progress,
  Stack,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
const { Link } = require("react-scroll");
import NextLink from "next/link";
import { ParallaxProvider } from "react-scroll-parallax";

import Layout from "@/components/Templates/Layout";

import textureBg from "@/assets/images/textureTrailblazers.png";
import { yearsData, yearsNumber } from "@/constants/trailblazersConstant";
import TrailblazersOfTomorrowParallax from "@/components/Organisms/TrailblazersOfTomorrowParallax";
import { collection, CollectionReference, doc } from "firebase/firestore";
import { db } from "@/connections/firebase";
import { TTrailblazersOfTomorrow } from "@/types/trailblazersOfTomorrow";
import { useDocumentData } from "react-firehooks";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "@/states/store";

const trailblazersOfTomorrow = collection(
  db,
  "trailblazers-of-tomorrow"
) as CollectionReference<TTrailblazersOfTomorrow>;

const TrailblazersOfTomorrow = () => {
  // state
  const [showTimeline, setShowTimeline] = useState(false);
  const [showEnterBtn, setShowEnterBtn] = useState(false);
  const [lgHeight] = useMediaQuery("(min-height: 60.5em");
  const [mdHeight] = useMediaQuery("(min-height: 40em");
  const [isAtHorizontalEnd, setAtHorizontalEnd] = useState(false);
  const tickingRef = useRef(false);
  const [scrollEl, setScrollElement] = useState<HTMLDivElement>();
  const scrollRef = useRef<HTMLDivElement>(null);

  const [data] = useDocumentData(doc(trailblazersOfTomorrow, "1"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const { activeYears } = useSelector(
    (state: RootState) => ({
      activeYears: state.trailblazersOfTomorrow.activeYears,
    }),
    shallowEqual
  );

  const progress = useMemo(() => {
    const lastActive = activeYears[activeYears.length - 1];
    return (yearsNumber.indexOf(lastActive) + 1) / yearsNumber.length;
  }, [activeYears]);

  // lifecycle
  useEffect(() => {
    if (scrollRef.current) {
      setScrollElement(scrollRef.current);
    }
  }, [scrollRef]);

  return (
    <>
      {!showTimeline && data && (
        <Box h="100vh" color="#FFF">
          <video
            style={{
              width: "100%",
              height: "100vh",
              objectFit: "cover",
              position: "absolute",
              left: 0,
              zIndex: -1,
            }}
            onPlay={() => {
              setTimeout(() => {
                setShowEnterBtn(true);
              }, 2000);
            }}
            playsInline
            muted
            autoPlay
          >
            <source src={data?.videoDesktop.webm} type="video/webm" />
            <source src={data?.videoDesktop.mp4} type="video/mp4" />
          </video>
          <Button
            opacity={showEnterBtn ? 1 : 0}
            transition="opacity 0.5s ease-in"
            onClick={() => setShowTimeline(true)}
            rounded="full"
            px="2.5rem"
            color="#fff"
            fontWeight="bold"
            zIndex={101}
            position="absolute"
            transform="translateX(-50%)"
            bottom={window.innerWidth < 1400 ? "9%" : "10%"}
            left="50%"
            sx={{
              bgColor: "#235786 !important",
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
              <Text
                cursor="pointer"
                fontSize="sm"
                fontWeight="bold"
                color="#484947"
              >
                Pioneers of Progress
              </Text>
            </NextLink>
            <NextLink href="/shapers-of-success" passHref>
              <Text
                cursor="pointer"
                fontSize="sm"
                fontWeight="bold"
                color="#484947"
              >
                Shapers of Success
              </Text>
            </NextLink>
            <NextLink href="/trailblazers-of-tomorrow" passHref>
              <Text
                cursor="pointer"
                fontSize="sm"
                fontWeight="bold"
                color="#235786"
              >
                Trailblazers of Tomorrow
              </Text>
            </NextLink>
          </Stack>
        </Box>
      )}

      <ParallaxProvider scrollContainer={scrollEl} scrollAxis="horizontal">
        <Box
          display={showTimeline ? "block" : "none"}
          top="0px"
          // overflowX="scroll"
          onWheel={(e) => {
            const { currentTarget } = e;

            if (!tickingRef.current) {
              window.requestAnimationFrame(function () {
                window.scrollTo({
                  top: 0,
                  left: window.scrollX + e.deltaY * 1.75,
                  behavior: "auto",
                });

                setAtHorizontalEnd(
                  currentTarget.scrollWidth - Math.ceil(window.scrollX) ===
                    currentTarget.clientWidth // offsetWidth
                );

                tickingRef.current = false;
              });

              tickingRef.current = true;
            }
          }}
          id="containerElm"
        >
          <Box
            h="100%"
            w="100%"
            pos="fixed"
            top="0"
            left="0"
            right="0"
            bottom="0"
            bgColor="#E5E5E5"
          />
          <Img
            zIndex={1}
            h="100%"
            w="100%"
            pos="fixed"
            top="0"
            left="0"
            right="0"
            bottom="0"
            src={textureBg.src}
            mixBlendMode="overlay"
            opacity={0.1}
          />

          <Box as="main" h="calc(100vh - 15px)" position="relative">
            <Text
              fontWeight="700"
              fontSize={window.innerWidth < 1400 ? "3xl" : "4xl"}
              color="#235786"
              transform={
                lgHeight
                  ? "translate(-80px,180px) rotate(90deg)"
                  : mdHeight
                  ? "translate(-40px,152px) rotate(90deg)"
                  : "translate(-20px,132px) rotate(90deg)"
              }
              position="absolute"
              zIndex={11}
              as="h1"
            >
              Trailblazers <br /> of Tomorrow
            </Text>

            <Flex
              h="100%"
              alignItems="center"
              zIndex={10}
              position="relative"
              data-scroll-container
            >
              <TrailblazersOfTomorrowParallax data={data} />
            </Flex>

            <Stack
              px="2.5rem"
              w="100%"
              position="fixed"
              bottom="22px"
              zIndex="10"
            >
              <Box position="relative">
                <Stack
                  direction="row"
                  pl={{ lg: "44%", xl: "34%", "2xl": "22%" }}
                  zIndex={2}
                  position="relative"
                  width={{ lg: "102%", xl: "101%" }}
                  justifyContent="space-between"
                >
                  {yearsData.map((item, index) => (
                    <Stack key={item.year} alignItems="center" spacing={1}>
                      <Text
                        visibility={item.year === 2022 ? "visible" : "hidden"}
                        fontWeight="bold"
                        color="#235786"
                        fontSize="sm"
                      >
                        {item.year}
                      </Text>

                      <Link
                        to={item.year.toString()}
                        spy={true}
                        smooth={true}
                        horizontal
                        offset={-180}
                        // containerId="containerElm"
                      >
                        <Box
                          cursor="pointer"
                          w="10px"
                          h="10px"
                          rounded="full"
                          bgColor="#235786"
                        ></Box>
                      </Link>
                    </Stack>
                  ))}
                </Stack>

                <Box
                  position="absolute"
                  bottom="4px"
                  bgColor="#235786"
                  w={{ lg: "45%", xl: "30%", "2xl": "27%" }}
                  h="2px"
                  zIndex={1}
                ></Box>
                <Progress
                  position="absolute"
                  bottom="4px"
                  zIndex={1}
                  ml={{ lg: "35%", xl: "23%", "2xl": "7.5%" }}
                  width={{ lg: "65%", xl: "77%", "2xl": "92.5%" }}
                  value={parseFloat((progress * 100).toFixed(2))}
                  height="2px"
                  background="transparent"
                  sx={{
                    "& div": {
                      backgroundColor: "#235786",
                    },
                  }}
                />
                <Box
                  position="absolute"
                  bottom="4px"
                  bgColor="#fff"
                  w="100%"
                  h="2px"
                ></Box>
              </Box>
              <Stack direction="row" spacing={5} alignItems="center">
                <NextLink href="/pioneers-of-progress" passHref>
                  <Text
                    fontWeight="600"
                    fontSize="sm"
                    color="#484947"
                    cursor="pointer"
                  >
                    Pioneers of Progress
                  </Text>
                </NextLink>
                <NextLink href="/shapers-of-success" passHref>
                  <Text
                    fontWeight="600"
                    fontSize="sm"
                    color="#484947"
                    cursor="pointer"
                  >
                    Shapers of Success
                  </Text>
                </NextLink>
                <Text fontWeight="bold" fontSize="sm" color="#235786" flex="1">
                  Trailblazers of Tomorrow
                </Text>
                <NextLink href="/share-your-hopes" passHref>
                  <Text
                    cursor="pointer"
                    fontSize="sm"
                    fontWeight="bold"
                    bgColor={isAtHorizontalEnd ? "#235786" : "transparent"}
                    color={isAtHorizontalEnd ? "white" : "#484947"}
                    px={isAtHorizontalEnd ? 2 : 0}
                    borderRadius="0.2rem"
                  >
                    Share Your Hopes
                  </Text>
                </NextLink>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </ParallaxProvider>
      {/* <Box
        position="relative"
        display={showOpening ? "flex" : "none"}
        alignItems="center"
        flexDir="column"
        zIndex={100}
        height="100vh"
        width="100%"
        overflow="hidden"
      >
        <Box mb="2rem">
          {data !== undefined && data.videoUrlDekstop && (
            <RenderVideoPlayer videoURL={data.videoUrlDekstop} />
          )}
        </Box>
        <Button
          size="md"
          borderRadius="20px"
          backgroundColor="#235786"
          color="#fff"
          onClick={() => setShowOpening(false)}
          _hover={{}}
          position="absolute"
          bottom={{ lg: "9%", "2xl": "7%" }}
        >
          CLICK TO ENTER
        </Button>
        <Box position="absolute" bottom="2%" width="100%" px="2.5rem">
          <Box bgColor="#fff" w="100%" h="2px" mb="0.5rem"></Box>

          <Stack direction="row" spacing={5} alignItems="center">
            <NextLink href="/pioneers-of-progress" passHref>
              <Text
                fontWeight="600"
                fontSize={{ lg: "0.875rem", xl: "1rem" }}
                lineHeight="1.25rem"
                color="#484947"
                cursor="pointer"
              >
                Pioneers of Progress
              </Text>
            </NextLink>
            <NextLink href="/shapers-of-success" passHref>
              <Text
                fontWeight="600"
                fontSize={{ lg: "0.875rem", xl: "1rem" }}
                lineHeight="1.25rem"
                color="#484947"
                cursor="pointer"
              >
                Shapers of Success
              </Text>
            </NextLink>
            <Text
              fontWeight="700"
              fontSize={{ lg: "1rem", xl: "1.25rem" }}
              lineHeight="1.5rem"
              color="#235786"
            >
              Trailblazers of Tomorrow
            </Text>
          </Stack>
        </Box>
      </Box> */}
    </>
  );
};

export default TrailblazersOfTomorrow;
