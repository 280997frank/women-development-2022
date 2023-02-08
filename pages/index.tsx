import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Center,
  Link,
  Spinner,
  // IconButton,
  Button,
  Fade,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { query, collection } from "firebase/firestore";
import { useCollectionData } from "react-firehooks";
// import { IoMdClose } from "react-icons/io";

import AboutButton from "@/components/Atoms/AboutButton";
import AboutContent from "@/components/Atoms/AboutContent";
import AboutModal from "@/components/Molecules/AboutModal";
import Layout from "@/components/Templates/Layout";

// import pngLogo from "@/assets/images/women-development-logo.png";
// import webpLogo from "@/assets/images/women-development-logo.webp";

import { db } from "@/connections/firebase";
import { useError } from "@/hooks/error";
import { useAuthentication } from "@/hooks/auth";
import { useWindowSize } from "@/hooks/utils";

import type { LinkProps } from "@chakra-ui/react";
import { CollectionReference } from "firebase/firestore";

interface HomepageVideo {
  desktop: { webm: string; mp4: string };
  mobile: { webm: string; mp4: string };
  type: "opening" | "landing";
}
interface FloatingLink extends LinkProps {
  url: string;
  label: string;
}

const links: FloatingLink[] = [
  {
    url: "/shapers-of-success",
    label: "Shapers<br>of Success",
    color: "brand.turquoise",
    textAlign: "right",
    top: { base: "20%", sm: "21%", lg: "54.5%", xl: "54.5%" },
    left: { base: "18%", sm: "18%", lg: "11%", xl: "12.5%" },
  },
  {
    url: "/trailblazers-of-tomorrow",
    label: "Trailblazers<br>of Tomorrow",
    color: "brand.blue",
    textAlign: "left",
    top: { base: "12%", sm: "14%", lg: "19%", xl: "11%" },
    left: { base: "56.5%", sm: "59%", lg: "57.5%", xl: "56.5%" },
  },
  {
    url: "/pioneers-of-progress",
    label: "Pioneers<br>of Progress",
    color: "brand.yellow",
    textAlign: "left",
    top: { base: "77%", sm: "79%", lg: "40%", xl: "36%" },
    left: { base: "51%", sm: "51%", lg: "72%", xl: "69%" },
  },
];

const hotspots = [
  {
    width: { base: "17%", sm: "28%", lg: "21.5%", xl: "20%" },
    height: { base: "33%", sm: "41%", lg: "42.5%", xl: "29%" },
    top: { base: "32%", sm: "23%", lg: "21.5%", xl: "25%" },
    left: { base: "20%", sm: "13%", lg: "15.5%", xl: "21%" },
    transform: {
      base: "rotate(-46deg)",
      sm: "rotate(-32degdeg)",
      lg: "rotate(-38deg)",
      xl: "rotate(50deg)",
    },
  },
  {
    width: { base: "19%", sm: "24%", lg: "18.5%", xl: "22%" },
    height: { base: "26%", sm: "35%", lg: "34.5%", xl: "36%" },
    top: { base: "21%", sm: "14%", lg: "11.5%", xl: "2%" },
    left: { base: "42%", sm: "39%", lg: "35.5%", xl: "36%" },
    transform: {
      base: "rotate(-36deg)",
      sm: "rotate(-35deg)",
      lg: "rotate(-37deg)",
      xl: "rotate(60deg)",
    },
  },
  {
    width: { base: "50%", sm: "22%", lg: "45.5%", xl: "41%" },
    height: { base: "33%", sm: "57%", lg: "25.5%", xl: "32%" },
    top: { base: "51%", sm: "35%", lg: "46.5%", xl: "49%" },
    left: { base: "32%", sm: "42%", lg: "27.5%", xl: "29%" },
    transform: {
      base: "rotate(-35deg)",
      sm: "rotate(55deg)",
      lg: "rotate(-36deg)",
      xl: "rotate(-29deg)",
    },
  },
];

const homepageRef = collection(
  db,
  "homepage"
) as CollectionReference<HomepageVideo>;

const Homepage = () => {
  const router = useRouter();
  const [isOpeningVideoEnd, setOpeningVideoEnd] = useState(false);
  const [isLandingVideoEnd, setLandingVideoEnd] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isReady = useAuthentication();
  const { innerHeight } = useWindowSize();
  const [isDesktopAndLarger] = useMediaQuery("(min-width: 62em)");
  const [data, isLoading, error] = useCollectionData(
    isReady ? query(homepageRef) : null,
    {
      snapshotListenOptions: {
        includeMetadataChanges: true,
      },
    }
  );
  const landingVideo = useMemo(() => {
    const video = data?.find(({ type }) => type === "landing");

    if (isDesktopAndLarger) {
      return video?.desktop;
    }

    return video?.mobile;
  }, [data, isDesktopAndLarger]);
  const openingVideo = useMemo(() => {
    const video = data?.find(({ type }) => type === "opening");

    if (isDesktopAndLarger) {
      return video?.desktop;
    }

    return video?.mobile;
  }, [data, isDesktopAndLarger]);

  useError(error);

  useEffect(() => {
    try {
      const isFirstTimeOpen = JSON.parse(
        window.localStorage.getItem("isFirstTimeOpen") || "true"
      );

      if (isFirstTimeOpen && isLandingVideoEnd) {
        onOpen();
        window.localStorage.setItem("isFirstTimeOpen", "false");
      }
    } catch (error) {
      onOpen();
      window.localStorage.setItem("isFirstTimeOpen", "false");
    }
  }, [onOpen, isLandingVideoEnd]);

  useEffect(() => {
    // `router` is null in jsdom so need to add extra validation
    if (router) {
      const { noSplash } = router.query;

      try {
        if (typeof noSplash === "string" && JSON.parse(noSplash)) {
          setOpeningVideoEnd(true);
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error("Invalid value for param `noSplash`:", noSplash);
        }
      }
    }
  }, [router]);

  return (
    <Layout
      title="Home"
      showSidebar={isOpeningVideoEnd}
      headerBgColor={isOpeningVideoEnd ? "#f7f2e4" : "#f4f0e0"}
      setLogoAtTop={isOpeningVideoEnd}
    >
      <Box
        as="main"
        // height={{ base: "100%", lg: "100vh" }}
        h={{ base: `calc(${innerHeight}px - 6rem)`, lg: "100vh" }}
        overflowY="auto"
        bgColor={isOpeningVideoEnd ? "#f7f2e4" : "#f4f0e0"}
        // bgImage="linear-gradient(to right, #f7f2e4 50%, #f1edd9 50%)"
        // pt={{ base: isOpeningVideoEnd ? 20 : 0, lg: 0 }}
        sx={{
          "@media (min-width: 62em)": {
            "& > video": {
              height: "100%",
              width: "100%",
            },
          },
        }}
      >
        {isLoading && (
          <Center h="inherit">
            <Spinner size="xl" />
          </Center>
        )}
        {openingVideo && !isOpeningVideoEnd && (
          <>
            <video
              muted
              autoPlay
              playsInline
              style={{ mixBlendMode: "darken" }}
              /* onTimeUpdate={(e) => {
                if (
                  e.currentTarget.currentTime > 12.5 &&
                  !e.currentTarget.paused
                ) {
                  e.currentTarget.pause();
                  setOpeningVideoEnd(true);
                }
              }} */
              onEnded={() => {
                setOpeningVideoEnd(true);
              }}
            >
              <source src={openingVideo?.webm} type="video/webm" />
              <source src={openingVideo?.mp4} type="video/mp4" />
              Sorry, your browser doesn&apos;t support embedded videos.
            </video>
            {/* <IconButton
              variant="unstyled"
              aria-label="Skip video"
              fontSize="2.5rem"
              pos="fixed"
              top={4}
              right={4}
              icon={<IoMdClose />}
              onClick={() => {
                setOpeningVideoEnd(true);
              }}
            /> */}
            <Button
              pos="fixed"
              top={4}
              right={4}
              border="1px solid black"
              bgColor="transparent"
              onClick={() => {
                setOpeningVideoEnd(true);
              }}
            >
              Skip Intro
            </Button>
          </>
        )}
        {landingVideo && isOpeningVideoEnd && (
          <>
            {/* <picture>
              <source srcSet={webpLogo.src} type="image/webp" />
              <Img
                src={pngLogo.src}
                color="brand.red"
                fontWeight="bold"
                fontSize="5xl"
                alt="Celebrating SG Women"
                d={{ lg: "none" }}
                mx="auto"
                mb={4}
                width="80%"
                htmlWidth={pngLogo.width}
                htmlHeight={pngLogo.height}
              />
            </picture> */}
            <Box
              pos="relative"
              h={{ lg: "inherit" }}
              sx={{
                "& > video": {
                  height: "inherit",
                  mixBlendMode: "darken",
                },
              }}
            >
              <video
                muted
                autoPlay
                playsInline
                width="3998"
                height="2250"
                onTimeUpdate={(e) => {
                  if (e.currentTarget.currentTime >= 8.5) {
                    setLandingVideoEnd(true);
                  }
                  if (
                    e.currentTarget.currentTime >= 72 &&
                    !e.currentTarget.paused
                  ) {
                    e.currentTarget.pause();
                  }
                }}
              >
                <source src={landingVideo?.webm} type="video/webm" />
                <source src={landingVideo?.mp4} type="video/mp4" />
                Sorry, your browser doesn&apos;t support embedded videos.
              </video>
              {links.map(({ url, label, ...rest }) => (
                <NextLink key={url} href={url} passHref>
                  <Link
                    {...rest}
                    lineHeight="1.1"
                    position="absolute"
                    fontWeight="bold"
                    fontSize={{
                      base: "xs",
                      sm: "2xl",
                      lg: "4xl",
                      "2xl": "5xl",
                    }}
                    color="transparent"
                    // bgColor="rgba(10, 150, 230, 0.7)"
                    dangerouslySetInnerHTML={{ __html: label }}
                    _focus={{
                      boxShadow: "none",
                    }}
                  />
                </NextLink>
              ))}
              {hotspots.map((props, index) => (
                <NextLink
                  key={links[index].url}
                  href={links[index].url}
                  passHref
                >
                  <Link
                    {...props}
                    position="absolute"
                    // bgColor="rgba(10, 150, 230, 0.7)"
                    bgColor="transparent"
                    _focus={{
                      boxShadow: "none",
                    }}
                  />
                </NextLink>
              ))}
            </Box>
            <Fade in={isLandingVideoEnd} unmountOnExit>
              <AboutButton
                pos="absolute"
                top="62%"
                right="18%"
                display={{ base: "none", lg: "inline-flex" }}
                onClick={onOpen}
              />
            </Fade>
            {isDesktopAndLarger ? (
              <AboutModal isOpen={isOpen} onClose={onClose} />
            ) : (
              <AboutContent />
            )}
          </>
        )}
      </Box>
    </Layout>
  );
};

export default Homepage;
