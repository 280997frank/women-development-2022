import { FC, useEffect, useMemo, useRef, useState } from "react";
import {
  Box,
  Img,
  Text,
  Flex,
  Stack,
  Progress,
  Button,
  chakra,
  useMediaQuery,
} from "@chakra-ui/react";
import { ParallaxProvider } from "react-scroll-parallax";
import NextLink from "next/link";
import { useDocumentData } from "react-firehooks";
import { collection, doc, CollectionReference } from "firebase/firestore";
import textureBg from "@/assets/images/texture.jpg";
import { years } from "@/constants/pioneersConstant";
import Pop1959Desktop from "@/components/Molecules/PioneersOfProgress/Pop1959Desktop";
import Pop1960Desktop from "@/components/Molecules/PioneersOfProgress/Pop1960Desktop";
import Pop1961Desktop from "@/components/Molecules/PioneersOfProgress/Pop1961Desktop";
import Pop1964Desktop from "@/components/Molecules/PioneersOfProgress/Pop1964Desktop";
import Pop1968Desktop from "@/components/Molecules/PioneersOfProgress/Pop1968Desktop";
import Pop1978Desktop from "@/components/Molecules/PioneersOfProgress/Pop1978Desktop";
import Pop1980Desktop from "@/components/Molecules/PioneersOfProgress/Pop1980Desktop";
import Pop1994Desktop from "@/components/Molecules/PioneersOfProgress/Pop1994Desktop";
import Pop1995Desktop from "@/components/Molecules/PioneersOfProgress/Pop1995Desktop";
import Pop1996Desktop from "@/components/Molecules/PioneersOfProgress/Pop1996Desktop";
import Pop2000Desktop from "@/components/Molecules/PioneersOfProgress/Pop2000Desktop";
import Pop2001Desktop from "@/components/Molecules/PioneersOfProgress/Pop2001Desktop";
import Pop2007Desktop from "@/components/Molecules/PioneersOfProgress/Pop2007Desktop";
import Pop2009Desktop from "@/components/Molecules/PioneersOfProgress/Pop2009Desktop";
import Pop2011Desktop from "@/components/Molecules/PioneersOfProgress/Pop2011Desktop";
import Pop2013Desktop from "@/components/Molecules/PioneersOfProgress/Pop2013Desktop";
import Pop2014Desktop from "@/components/Molecules/PioneersOfProgress/Pop2014Desktop";
import Pop2016Desktop from "@/components/Molecules/PioneersOfProgress/Pop2016Desktop";
import Pop2017Desktop from "@/components/Molecules/PioneersOfProgress/Pop2017Desktop";
import Pop2019Desktop from "@/components/Molecules/PioneersOfProgress/Pop2019Desktop";
import { useSelector, shallowEqual } from "react-redux";
import { RootState } from "@/states/store";
import { PopIntro } from "@/types/pioneerOfProgress";
import { useError } from "@/hooks/error";

const { Link } = require("react-scroll");

import { db } from "@/connections/firebase";

const popRef = collection(db, "pioneers-of-progress");

const PioneersOfProgressDesktop: FC = () => {
  const [isHeightLowerThan600] = useMediaQuery(
    "screen and (max-height: 610px)"
  );

  const [scrollEl, setScrollElement] = useState<HTMLDivElement>();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      setScrollElement(scrollRef.current);
    }
  }, [scrollRef]);

  const { activeYears } = useSelector(
    (state: RootState) => ({
      activeYears: state.pioneerOfProgress.activeYears,
    }),
    shallowEqual
  );
  const [data, , error] = useDocumentData(
    doc(popRef as CollectionReference<PopIntro>, "intro"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  useError(error);
  const [isInScrollBox, setScrollBox] = useState(true);
  const [showTimeline, setShowTimeline] = useState(false);
  const [showEnterBtn, setShowEnterBtn] = useState(false);
  const [isAtHorizontalEnd, setAtHorizontalEnd] = useState(false);
  const [isVideoLoaded, setVideoLoaded] = useState(false);
  const tickingRef = useRef(false);

  const progress = useMemo(() => {
    const lastActive = activeYears[activeYears.length - 1];
    return (years.indexOf(lastActive) + 1) / years.length;
  }, [activeYears]);

  return (
    <>
      {!showTimeline && data && (
        <Box h="100vh" color="#FFF">
          <chakra.video
            transform="translateX(-50%) translateY(-50%)"
            pos="fixed"
            left="50%"
            top="50%"
            minW="100%"
            minH="100%"
            w="auto"
            h="auto"
            onPlay={() => {
              setTimeout(() => {
                setShowEnterBtn(true);
              }, 2000);
            }}
            playsInline
            autoPlay
            muted
            bg={
              isVideoLoaded
                ? "linear-gradient(to top, #7F735D 50%, #b1a68f 50%)"
                : "#7F735D"
            }
            onLoadedData={() => setVideoLoaded(true)}
            mixBlendMode="darken"
          >
            <source src={data?.desktopWebm} type="video/webm" />
            <source src={data?.desktopMp4} type="video/mp4" />
          </chakra.video>
          <Button
            opacity={showEnterBtn ? 1 : 0}
            transition="opacity 0.5s ease-in"
            onClick={() => setShowTimeline(true)}
            rounded="full"
            px="2.5rem"
            color="#484947"
            fontWeight="bold"
            zIndex={101}
            position="absolute"
            transform="translateX(-50%)"
            bottom="14%"
            left="50%"
            sx={{
              bgColor: "#F7CF2D !important",
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
            borderTop="2px solid #fff3"
            py="2"
          >
            <Text fontSize="sm" fontWeight="bold" color="#F7CF2D">
              Pioneers of Progress
            </Text>
            <NextLink href="/shapers-of-success" passHref>
              <Text cursor="pointer" fontSize="sm" fontWeight="bold">
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
          color="#FFF"
          display={showTimeline ? "block" : "none"}
          h="calc(100vh - 23px)"
          // overflowX="auto"
          onWheel={(e) => {
            const { currentTarget } = e;

            // currentTarget.scrollLeft += e.deltaY;

            if (isInScrollBox) {
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
            bgColor="#867A68"
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
          <Flex h="100%" alignItems="center" zIndex={10} position="relative">
            <Flex
              maxH="75vh"
              fontSize={isHeightLowerThan600 ? "0.8rem" : "1rem"}
              sx={{
                ".caption": {
                  fontSize: isHeightLowerThan600 ? "0.7rem" : "sm",
                  fontStyle: "italic",
                },
                ".answerbtn": {
                  fontSize: isHeightLowerThan600 ? "0.7rem" : "sm",
                },
                ".question": {
                  fontSize: isHeightLowerThan600 ? "xs" : "sm",
                },
                ".funfact": {
                  fontSize: isHeightLowerThan600 ? "0.65rem" : "sm",
                },
              }}
            >
              <Pop1959Desktop collectionRef={popRef} />
              <Pop1960Desktop collectionRef={popRef} />
              <Pop1961Desktop collectionRef={popRef} />
              <Pop1964Desktop collectionRef={popRef} />
              <Pop1968Desktop collectionRef={popRef} />
              <Pop1978Desktop collectionRef={popRef} />
              <Pop1980Desktop collectionRef={popRef} />
              <Pop1994Desktop collectionRef={popRef} />
              <Pop1995Desktop collectionRef={popRef} />
              <Pop1996Desktop collectionRef={popRef} />
              <Pop2000Desktop collectionRef={popRef} />
              <Pop2001Desktop collectionRef={popRef} />
              <Pop2007Desktop collectionRef={popRef} />
              <Pop2009Desktop collectionRef={popRef} />
              <Pop2011Desktop collectionRef={popRef} />
              <Pop2013Desktop collectionRef={popRef} />
              <Pop2014Desktop collectionRef={popRef} />
              <Pop2016Desktop collectionRef={popRef} />
              <Pop2017Desktop collectionRef={popRef} />
              <Pop2019Desktop
                collectionRef={popRef}
                setScrollBox={setScrollBox}
              />
            </Flex>
          </Flex>

          <Stack px="8" w="100%" position="fixed" bottom="5px" zIndex="10">
            <Box position="relative">
              <Stack
                direction="row"
                justifyContent="space-between"
                pl="2.5%"
                pr="25%"
                zIndex={5}
                position="relative"
              >
                {years.map((item) => (
                  <Stack key={item} alignItems="center" spacing={1}>
                    <Text
                      visibility={
                        activeYears.indexOf(item) > -1 ? "visible" : "hidden"
                      }
                      fontWeight="bold"
                      color="#F7CF2D"
                      fontSize="sm"
                    >
                      {item}
                    </Text>

                    <Link
                      to={item.toString()}
                      spy={true}
                      smooth={true}
                      horizontal
                      // containerId="containerElm"
                    >
                      <Box
                        cursor="pointer"
                        w="10px"
                        h="10px"
                        rounded="full"
                        bgColor={
                          activeYears[activeYears.length - 1] >= item
                            ? "#F7CF2D"
                            : "#FFF"
                        }
                      ></Box>
                    </Link>
                  </Stack>
                ))}
              </Stack>
              <Progress
                zIndex={2}
                bottom="4px"
                h="1px"
                value={parseFloat((progress * 100).toFixed(2))}
                right="26%"
                left="0"
                colorScheme="pioneer"
                pos="absolute"
              />
              <Box
                position="absolute"
                bottom="4px"
                bgColor="#fff"
                w="100%"
                h="1px"
              ></Box>
            </Box>
            <Stack direction="row" spacing={5}>
              <Text fontSize="sm" fontWeight="bold" flex="1" color="#F7CF2D">
                Pioneers of Progress
              </Text>
              <NextLink href="/shapers-of-success" passHref>
                <Text
                  cursor="pointer"
                  fontSize="sm"
                  fontWeight="bold"
                  bgColor={isAtHorizontalEnd ? "#F7CF2D" : "transparent"}
                  px={isAtHorizontalEnd ? 2 : 0}
                  borderRadius="0.2rem"
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
          </Stack>
        </Box>
      </ParallaxProvider>
    </>
  );
};

export default PioneersOfProgressDesktop;
