import React from "react";
import { Box, Button, Img, Link, useDisclosure } from "@chakra-ui/react";
import Head from "next/head";
import Script from "next/script";
import NextLink from "next/link";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import shortid from "shortid";
import { useRouter } from "next/router";

import Sidebar from "@/components/Molecules/Sidebar";

import burgerIcon from "@/assets/images/burger.svg";
import pngLogo from "@/assets/images/women-development-logo.png";
import webpLogo from "@/assets/images/women-development-logo.webp";

import { usePageVisibility } from "@/hooks/tracking";
import { useWindowSize } from "@/hooks/utils";
import { useGetUser } from "@/hooks/auth";

import { actions as authAction } from "@/states/auth/slices";
// import BestView from "./BestView";
import { onLeave, onVisit } from "@/utils/tracking";

import type { FC, ReactNode } from "react";

interface LayoutProps {
  title: string;
  children: ReactNode;
  headerBgColor?: string;
  description?: string;
  setLogoAtTop?: boolean;
  showSidebar?: boolean;
}

const BestView = dynamic(() => import("./BestView"), {
  ssr: false,
});

const Layout: FC<LayoutProps> = ({
  title,
  children,
  headerBgColor = "#F7F5E8",
  description = "",
  setLogoAtTop = false,
  showSidebar = true,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isVisible = usePageVisibility();
  const dispatch = useDispatch();
  const router = useRouter();
  const { anonymousId, sessionId } = useGetUser();
  const { innerWidth } = useWindowSize();

  useEffect(() => {
    if (isVisible) {
      const newSessionid = shortid.generate() as string;
      dispatch(authAction.setSessionId(newSessionid));
      onVisit({
        anonymousId,
        sessionId: newSessionid,
        type: "visit",
        data: anonymousId,
        router: router.asPath,
      });
    } else {
      onLeave({
        anonymousId,
        sessionId,
        type: "leave",
        data: anonymousId,
        router: router.asPath,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible, anonymousId, router.asPath]);

  return (
    <>
      <Head>
        <title>{title} | Celebrating SG Women</title>
        <meta name="description" content={description} />
        <meta
          name="viewport"
          content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <Script src="/modernizr-webp.js"></Script>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=UA-232255302-1"
      />
      <Script id="gtag">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'UA-232255302-1');
        `}
      </Script>
      <BestView>
        <Box
          as="header"
          position={{ lg: "absolute" }}
          bgColor={headerBgColor}
          h={24}
          sx={{ touchAction: "none" }}
        >
          {showSidebar && (
            <Button
              onClick={onOpen}
              zIndex={100}
              pos="fixed"
              top={innerWidth < 1400 ? 9 : 12}
              transform="translateY(-50%)"
              left={{ base: 2, lg: 8 }}
              bgColor="transparent"
              _hover={{
                bgColor: "transparent",
              }}
            >
              <Img
                src={burgerIcon.src}
                alt="Open Sidebar"
                w={{ base: 10, lg: 12 }}
              />
            </Button>
          )}
          {setLogoAtTop && (
            <NextLink href="/?noSplash=true" passHref>
              <Link>
                <picture>
                  <source srcSet={webpLogo.src} type="image/webp" />
                  <Img
                    src={pngLogo.src}
                    color="brand.red"
                    fontWeight="bold"
                    lineHeight="1.5"
                    alt="Celebrating SG Women"
                    d={{ base: "block", lg: "none" }}
                    pos="fixed"
                    top={12}
                    transform="translateY(-50%)"
                    right={8}
                    h="3rem"
                    w="auto"
                    htmlWidth={pngLogo.width}
                    htmlHeight={pngLogo.height}
                  />
                </picture>
              </Link>
            </NextLink>
          )}
        </Box>
        {children}
        {showSidebar && <Sidebar isOpen={isOpen} onClose={onClose} />}
      </BestView>
    </>
  );
};

export default Layout;
