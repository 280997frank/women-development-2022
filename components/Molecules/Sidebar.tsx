import React, { useEffect, useState } from "react";
import {
  Drawer,
  // DrawerHeader,
  DrawerBody,
  // DrawerFooter,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  HStack,
  Text,
  Link,
  Img,
  Box,
  chakra,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";

// import pngTexture from "@/assets/images/texture.png";
// import webpTexture from "@/assets/images/texture.webp";
import fbLogo from "@/assets/images/fb-logo.svg";
import igLogo from "@/assets/images/ig-logo.svg";

import type { FC } from "react";

interface LinkItemProps {
  url: string;
  label: string;
}

function LinkItem({ url, label }: LinkItemProps) {
  const router = useRouter();
  const [isActive, setActive] = useState(false);

  useEffect(() => {
    if (router) {
      if (router.pathname === "/" && url === links[0].url) {
        setActive(true);
      } else {
        setActive(router.asPath === url);
      }
    }
  }, [router, url]);

  return (
    <chakra.li
      key={url}
      w="fit-content"
      sx={{
        "&:not(:last-child)": {
          marginBottom: "0.75rem",
        },
      }}
    >
      <NextLink href={url} passHref>
        <Link
          fontWeight="600"
          _hover={{ color: "#C41128" }}
          color={isActive ? "#696969" : "white"}
          pointerEvents={isActive ? "none" : "auto"}
          lineHeight="1"
        >
          {label}
        </Link>
      </NextLink>
    </chakra.li>
  );
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const links = [
  {
    url: "/?noSplash=true",
    label: "Home",
  },
  {
    url: "/pioneers-of-progress",
    label: "Pioneers of Progress",
  },
  {
    url: "/shapers-of-success",
    label: "Shapers of Success",
  },
  {
    url: "/trailblazers-of-tomorrow",
    label: "Trailblazers of Tomorrow",
  },
  {
    url: "/share-your-hopes",
    label: "Share Your Hopes",
  },
  {
    url: "/physical-exhibition",
    label: "Physical Exhibition",
  },
];

const Sidebar: FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="sm">
      <DrawerOverlay />
      <DrawerContent
        bgColor="#E6B96C"
        /* opacity="0.9"
        backgroundBlendMode="overlay"
        bgPosition="center"
        sx={{
          ".webp &": {
            bgImage: webpTexture.src,
          },
          ".no-webp &": {
            bgImage: pngTexture.src,
          },
        }} */
      >
        {/* <DrawerHeader pt={8}></DrawerHeader> */}
        <DrawerBody
          d="flex"
          flexDir="column"
          justifyContent="space-between"
          py={8}
        >
          <Box>
            <DrawerCloseButton pos="static" color="white" fontSize="2rem" />
            <chakra.ul
              color="white"
              fontSize={{ base: "2xl", "2xl": "3xl" }}
              listStyleType="none"
              mt={8}
            >
              {links.map(({ url, label }) => (
                <LinkItem key={url} url={url} label={label} />
              ))}
            </chakra.ul>
            <chakra.hr my={8} />
            <Text color="white" fontSize="2xl" fontWeight="500" mb={4}>
              Follow us
            </Text>
            <HStack spacing={6} mb={4}>
              <Link href="https://www.facebook.com/MSFSingapore" isExternal>
                <Img src={fbLogo.src} alt="Facebook" />
              </Link>
              <Link href="https://www.instagram.com/msfcares" isExternal>
                <Img src={igLogo.src} alt="Instagram" w="2.5rem" />
              </Link>
            </HStack>
          </Box>
          <Box>
            <Text color="white" fontSize="xl" fontWeight="600" mb={8}>
              For further enquiries, drop us an email:
              <br />
              <Link href="mailto:corpcomms@msf.gov.sg" color="brand.green">
                corpcomms@msf.gov.sg
              </Link>
            </Text>
            <Text color="white" fontSize="xs" fontWeight="600">
              &copy; 2022 Government of Singapore.
              <br />
              All Rights Reserved.
            </Text>
          </Box>
        </DrawerBody>
        {/* <DrawerFooter justifyContent="flex-start" pb={8}></DrawerFooter> */}
      </DrawerContent>
    </Drawer>
  );
};

export default Sidebar;
