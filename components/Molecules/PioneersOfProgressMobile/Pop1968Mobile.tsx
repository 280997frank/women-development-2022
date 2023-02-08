import { Box, Heading, Img, Spinner, chakra, Text } from "@chakra-ui/react";

import { useError } from "@/hooks/error";
import { CollectionReference, doc } from "firebase/firestore";
import { useDocumentData } from "react-firehooks";
import { useInView } from "react-intersection-observer";
import { ActiveModal } from "@/types";
import YearMobile from "@/components/Atoms/PioneerOfProgress/YearMobile";

interface Pop1968MobileProps {
  collectionRef: CollectionReference;
  onOpenModal: (payload: ActiveModal) => void;
}

interface Pop1968Content {
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
}

const Pop1968Mobile = ({ collectionRef, onOpenModal }: Pop1968MobileProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const [data, isLoading, error] = useDocumentData(
    inView
      ? doc(collectionRef as CollectionReference<Pop1968Content>, "1968")
      : null,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  useError(error);

  return (
    <Box pb={8} ref={ref} id="1968" position="relative">
      {isLoading && (
        <Box textAlign="center" my={12}>
          <Spinner size="xl" />
        </Box>
      )}

      {/* <Heading
        pr={4}
        fontSize="6rem"
        color="#867A68"
        textShadow="-2px 0 #F7CF2D, 0 2px #F7CF2D, 2px 0 #F7CF2D, 0 -2px #F7CF2D"
        textAlign="right"
        letterSpacing="10px"
      >
        1968
      </Heading> */}
      <YearMobile value="1968" isRight />
      <Heading px={8} pb={8} fontSize="2rem" color="#F7CF2D">
        {data?.title}
      </Heading>
      <chakra.hr bgColor="white" h="0.1px" />
      <Text p={8} fontWeight="bold" color="white">
        {data?.description}
      </Text>
      <Img
        src={data?.image}
        px={8}
        alt="1968"
        w="full"
        cursor="pointer"
        onClick={() => {
          onOpenModal({
            type: "image",
            src: { ...data?.imageModal },
          });
        }}
      />
      <Text
        px={8}
        pt={4}
        fontSize="0.8rem"
        color="white"
        dangerouslySetInnerHTML={{ __html: data?.caption ?? "" }}
      />
    </Box>
  );
};

export default Pop1968Mobile;
