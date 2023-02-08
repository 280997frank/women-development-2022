import {
  Box,
  Heading,
  Img,
  Spinner,
  chakra,
  Text,
  Table,
  Flex,
} from "@chakra-ui/react";

import { useError } from "@/hooks/error";
import { CollectionReference, doc } from "firebase/firestore";
import { useDocumentData } from "react-firehooks";
import { useInView } from "react-intersection-observer";
import { ActiveModal } from "@/types";
import YearMobile from "@/components/Atoms/PioneerOfProgress/YearMobile";

interface Pop2014MobileProps {
  collectionRef: CollectionReference;
  onOpenModal: (payload: ActiveModal) => void;
}

interface Pop2014Content {
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

const Pop2014Mobile = ({ collectionRef, onOpenModal }: Pop2014MobileProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const [data, isLoading, error] = useDocumentData(
    inView
      ? doc(collectionRef as CollectionReference<Pop2014Content>, "2014")
      : null,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  useError(error);

  return (
    <Box pt={10} pb={8} ref={ref} id="2014" position="relative">
      {isLoading && (
        <Box textAlign="center" my={12}>
          <Spinner size="xl" />
        </Box>
      )}

      {/* <Heading
        fontSize="6rem"
        color="#867A68"
        textShadow="-2px 0 #F7CF2D, 0 2px #F7CF2D, 2px 0 #F7CF2D, 0 -2px #F7CF2D"
        pl={8}
        letterSpacing="10px"
      >
        2014
      </Heading> */}
      <YearMobile value="2014" />
      <Heading px={8} pb={8} fontSize="1.5rem" color="#F7CF2D">
        {data?.section1.title}
      </Heading>
      <chakra.hr bgColor="white" h="0.1px" />
      <Text px={8} pt={8} color="white" fontWeight="bold">
        {data?.section1.description}
      </Text>

      <Img
        px={8}
        pt={4}
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
        w="full"
        px={8}
        pt={4}
        pb={8}
        fontSize="0.8rem"
        color="white"
        dangerouslySetInnerHTML={{ __html: data?.section2.caption ?? "" }}
      />
    </Box>
  );
};

export default Pop2014Mobile;
