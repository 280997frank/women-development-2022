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

interface Pop1961MobileProps {
  collectionRef: CollectionReference;
  onOpenModal: (payload: ActiveModal) => void;
}

interface Pop1961Content {
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

const Pop1961Mobile = ({ collectionRef, onOpenModal }: Pop1961MobileProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const [data, isLoading, error] = useDocumentData(
    inView
      ? doc(collectionRef as CollectionReference<Pop1961Content>, "1961")
      : null,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  useError(error);

  return (
    <Box border="10px solid #F7CF2D" ref={ref} id="1961" position="relative">
      {isLoading && (
        <Box textAlign="center" my={12}>
          <Spinner size="xl" />
        </Box>
      )}

      {/* <Heading
        pl={4}
        fontSize="6rem"
        color="#867A68"
        textShadow="-2px 0 #F7CF2D, 0 2px #F7CF2D, 2px 0 #F7CF2D, 0 -2px #F7CF2D"
        letterSpacing="10px"
        lineHeight={1}
      >
        1961
      </Heading> */}
      <YearMobile value="1961" />
      <Heading
        px={4}
        lineHeight={1}
        fontSize="2.5rem"
        color="#F7CF2D"
        dangerouslySetInnerHTML={{ __html: data ? data.title : "" }}
      />
      <Text px={4} pt={2} fontWeight="bold" color="white">
        {data?.description}
      </Text>
      <Img
        pt={2}
        src={data?.image}
        alt="1961"
        w="full"
        cursor="pointer"
        onClick={() => {
          onOpenModal({
            type: "image",
            src: { ...data?.imageModal },
          });
        }}
      />
    </Box>
  );
};

export default Pop1961Mobile;
