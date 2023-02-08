import {
  Img,
  Heading,
  Text,
  Box,
  Spinner,
  Link,
  chakra,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { collection, query, orderBy } from "firebase/firestore";
import { useCollection } from "react-firehooks";

import { db } from "@/connections/firebase";

import wnfLogo from "@/assets/images/wnf.png";
import winLogo from "@/assets/images/win.png";
import scwoLogo from "@/assets/images/scwo.png";
import msfLogo from "@/assets/images/msf.png";

import type { FC } from "react";
import type { CollectionReference } from "firebase/firestore";
import { useOnClickTracking } from "@/hooks/tracking";

interface About {
  text: string;
  sequence: number;
}

const sponsors = [
  {
    website: "https://www.uwomenandfamily.org.sg/",
    title: "NTUC Women and Family",
    url: wnfLogo.src,
    height: wnfLogo.height,
    width: wnfLogo.width,
  },
  {
    website: "https://www.facebook.com/PAWIN.sg/",
    title: "PA Women's Integration Network",
    url: winLogo.src,
    height: winLogo.height,
    width: winLogo.width,
  },
  {
    website: "https://www.scwo.org.sg/",
    title: "Singapore Council of Women's Organisations",
    url: scwoLogo.src,
    height: scwoLogo.height,
    width: scwoLogo.width,
  },
  {
    website: "https://www.msf.gov.sg/Pages/default.aspx",
    title: "Ministry of Social and Family Development",
    url: msfLogo.src,
    height: msfLogo.height,
    width: msfLogo.width,
  },
];

const aboutRef = collection(db, "about") as CollectionReference<About>;
const q = query(aboutRef, orderBy("sequence", "asc"));

const AboutContent: FC = () => {
  const toast = useToast();
  const [about, loading, error] = useCollection(q, {
    snapshotListenOptions: {
      includeMetadataChanges: true,
    },
  });

  useOnClickTracking(about !== undefined, "page", "/about-exhibition");

  useEffect(() => {
    if (error) {
      toast({
        title: "Copy Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [error, toast]);

  return (
    <>
      <Heading
        color="brand.orange"
        fontSize={{ base: "xl", lg: "2rem" }}
        fontWeight="bold"
        textAlign={{ lg: "center" }}
        mt={6}
        mb={{ base: 1, lg: 6 }}
        w={{ base: "80%", lg: "full" }}
        mx="auto"
      >
        About the Exhibition
      </Heading>
      {loading ? (
        <Box textAlign="center">
          <Spinner size="xl" />
        </Box>
      ) : (
        about?.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }))
          .map((data) => (
            <Text
              key={data.id}
              color="brand.grey"
              dangerouslySetInnerHTML={{ __html: data.text }}
              fontSize="md"
              w={{ base: "80%", lg: "full" }}
              sx={{
                "&:not(:last-child)": {
                  margin: "0 auto 1rem",
                },
              }}
            />
          ))
      )}
      <Text
        color="brand.grey"
        textAlign="center"
        fontWeight="700"
        mt={{ base: 16, lg: 10 }}
        mb={4}
      >
        Supported by:
      </Text>
      <chakra.ul
        display="flex"
        justifyContent="space-between"
        listStyleType="none"
        pb={{ base: 16, lg: 0 }}
        w={{ base: "90%", lg: "full" }}
        m="auto"
      >
        {sponsors.map(({ website, title, url, width, height }) => (
          <li key={title}>
            <Link href={website} isExternal>
              <Img
                src={url}
                alt={title}
                title={title}
                h={{ base: "1.5rem", sm: "3rem" }}
                w="auto"
                htmlWidth={width}
                htmlHeight={height}
              />
            </Link>
          </li>
        ))}
      </chakra.ul>
    </>
  );
};

export default AboutContent;
