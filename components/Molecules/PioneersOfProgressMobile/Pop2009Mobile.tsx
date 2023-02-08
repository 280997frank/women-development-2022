import { Box, Heading, Img, Spinner, chakra, Text } from "@chakra-ui/react";

import { useError } from "@/hooks/error";
import { CollectionReference, doc } from "firebase/firestore";
import { useDocumentData } from "react-firehooks";
import { useInView } from "react-intersection-observer";
import { ActiveModal } from "@/types";
import YearMobile from "@/components/Atoms/PioneerOfProgress/YearMobile";

interface Pop2009MobileProps {
  collectionRef: CollectionReference;
  onOpenModal: (payload: ActiveModal) => void;
}

interface Pop2009Content {
  [key: string]: {
    description: string;
    image: string;
    title: string;
    thumbnail: string;
    caption: string;
    videoSrc: string;
    subtitle: string;
    bio: string;
    quote: string;
    author: string;
    imageModal: {
      jpg: string;
      webp: string;
    };
  };
}

const Pop2009Mobile = ({ collectionRef, onOpenModal }: Pop2009MobileProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const [data, isLoading, error] = useDocumentData(
    inView
      ? doc(collectionRef as CollectionReference<Pop2009Content>, "2009")
      : null,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  useError(error);

  return (
    <Box pb={8} ref={ref} id="2009">
      {isLoading && (
        <Box textAlign="center" my={12}>
          <Spinner size="xl" />
        </Box>
      )}

      {/* <Heading
        fontSize="5rem"
        color="#867A68"
        textShadow="-2px 0 #F7CF2D, 0 2px #F7CF2D, 2px 0 #F7CF2D, 0 -2px #F7CF2D"
        letterSpacing="10px"
        pr={8}
        textAlign="right"
      >
        2009
      </Heading> */}
      <YearMobile value="2009" isRight />
      <Heading px={8} pb={8} fontSize="1.5rem" color="#F7CF2D">
        {data?.section1.title}
      </Heading>
      <chakra.hr bgColor="white" h="0.1px" />
      <Text p={8} color="white" fontWeight="bold">
        {data?.section1.description}
      </Text>

      <Img
        px={8}
        src={data?.section2.image}
        alt="1994"
        cursor="pointer"
        onClick={() => {
          onOpenModal({
            type: "image",
            src: { ...data?.section2.imageModal },
          });
        }}
      />
      <Text
        px={8}
        pt={4}
        pb={8}
        fontSize="0.8rem"
        color="white"
        dangerouslySetInnerHTML={{ __html: data?.section2.caption ?? "" }}
      />
      <Text px={8} fontWeight="bold" color="#F7CF2D">
        {`${data?.section4.quote}`}
      </Text>
      <Text fontSize="0.8rem" mb="2rem" mt="1rem" px={8} color="white">
        {data?.section4.author}
      </Text>
      <chakra.hr bgColor="white" h="0.1px" />

      <Heading px={8} pt={8} fontSize="1.5rem" color="#F7CF2D">
        {data?.section3.title}
      </Heading>
      <Text
        px={8}
        pb={4}
        fontSize="0.7rem"
        color="white"
        dangerouslySetInnerHTML={{
          __html: data ? data.section3.subtitle : "",
        }}
      />
      <Box position="relative" overflowX="hidden">
        <Img
          float="right"
          w="30%"
          mx="2rem"
          src={data?.section3.image}
          alt="2009"
          cursor="pointer"
          onClick={() => {
            onOpenModal({
              type: "image",
              src: { ...data?.section3.imageModal },
            });
          }}
        />
        <Text w="55%" pl={8} fontSize="xs" color="white">
          {data?.section3.bio}
        </Text>
      </Box>
    </Box>
  );
};

export default Pop2009Mobile;
