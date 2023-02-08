import { Box, chakra, Heading, Img, Spinner, Text } from "@chakra-ui/react";

import { useError } from "@/hooks/error";
import { ActiveModal } from "@/types";
import { CollectionReference, doc } from "firebase/firestore";
import { useDocumentData } from "react-firehooks";
import { useInView } from "react-intersection-observer";
import YearMobile from "@/components/Atoms/PioneerOfProgress/YearMobile";

interface Pop1959MobileProps {
  collectionRef: CollectionReference;
  onOpenModal: (payload: ActiveModal) => void;
}

interface Pop1959Content {
  [key: string]: {
    description: string;
    image: string;
    title: string;
    thumbnail: string;
    caption: string;
    videoSrc: string;
    subtitle: string;
    bio: string;
    imageModal: {
      jpg: string;
      webp: string;
    };
  };
}

const Pop1959Mobile = ({ collectionRef, onOpenModal }: Pop1959MobileProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const [data, isLoading, error] = useDocumentData(
    inView
      ? doc(collectionRef as CollectionReference<Pop1959Content>, "1959")
      : null,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  useError(error);

  return (
    <Box
      pt={10}
      pb={8}
      ref={ref}
      id="1959"
      position="relative"
      overflowX="hidden"
    >
      {isLoading && (
        <Box textAlign="center" my={12}>
          <Spinner size="xl" />
        </Box>
      )}

      {/* SECTION 1 */}
      <Box mt="4rem" position="relative">
        <Heading
          fontSize={{ base: "2.5rem", sm: "3rem" }}
          color="#F7CF2D"
          pos="absolute"
          top="-10"
          right="0"
          pr={4}
        >
          Pioneers <br />
          of Progress
        </Heading>
        <Box
          backgroundImage={data?.section1.image}
          backgroundPosition="right"
          backgroundSize="cover"
          mr="3rem"
          mt="2rem"
          h="25rem"
        />
        {/* <Heading
          fontSize="6rem"
          color="#867A68"
          textShadow="-2px 0 #F7CF2D, 0 2px #F7CF2D, 2px 0 #F7CF2D, 0 -2px #F7CF2D"
          textAlign="right"
          pr="2rem"
          mt="-1rem"
          letterSpacing="10px"
        >
          1959
        </Heading> */}
        <YearMobile value="1959" isRight />
      </Box>
      <Heading p={8} fontSize="1.5rem" color="#F7CF2D">
        {data?.section1.title}
      </Heading>
      <chakra.hr bgColor="white" h="0.1px" />
      <Text p={8} color="white" fontWeight="bold">
        {data?.section1.description}
      </Text>
      <chakra.hr bgColor="white" h="0.1px" />

      {/* SECTION 2 */}
      <Img
        px={8}
        pt={8}
        src={data?.section3.thumbnail}
        alt="1959"
        cursor="pointer"
        onClick={() => {
          onOpenModal({
            type: "video",
            src: { mp4: data?.section3.videoSrc },
          });
        }}
      />
      <Text
        px={8}
        pt={4}
        pb={8}
        fontSize="0.8rem"
        color="white"
        dangerouslySetInnerHTML={{ __html: data?.section3.caption ?? "" }}
      />
      <chakra.hr bgColor="white" h="0.1px" />

      {/* SECTION 3 */}
      <Img
        w="100%"
        px={8}
        pt={8}
        src={data?.section2.image}
        alt="1959"
        cursor="pointer"
        onClick={() => {
          onOpenModal({
            type: "image",
            src: { ...data?.section2.imageModal },
          });
        }}
      />
      <Text px={8} pt={4} pb={8} fontSize="0.8rem" color="white">
        {data?.section2.caption}
      </Text>
      <chakra.hr bgColor="white" h="0.1px" />

      {/* SECTION 4 */}
      <Heading px={8} pt={8} fontSize="1.5rem" color="#F7CF2D">
        {data?.section4.title}
      </Heading>
      <Text
        px={8}
        pb={4}
        color="white"
        fontSize="xs"
        dangerouslySetInnerHTML={{
          __html:
            data !== undefined
              ? data.section4.subtitle.replace("<br/>", " ")
              : "",
        }}
      />
      <Box position="relative" overflowX="hidden">
        <Img
          float="right"
          mr="-2rem"
          w="50%"
          src={data?.section4.image}
          alt="1959"
          cursor="pointer"
          onClick={() => {
            onOpenModal({
              type: "image",
              src: { ...data?.section4.imageModal },
            });
          }}
        />
        <Text w="55%" pl={8} pb={8} fontSize="0.9rem" color="white">
          {data?.section4.bio}
        </Text>
      </Box>

      {/* SECTION 4 */}
      <Heading p={8} fontSize="1.5rem" color="#F7CF2D">
        {data?.section5.title}
      </Heading>
      <chakra.hr bgColor="white" h="0.1px" />
      <Text p={8} color="white" fontWeight="bold">
        {data?.section5.description}
      </Text>
    </Box>
  );
};

export default Pop1959Mobile;
