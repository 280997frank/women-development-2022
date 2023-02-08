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
import YearMobile from "@/components/Atoms/PioneerOfProgress/YearMobile";

interface Pop1978MobileProps {
  collectionRef: CollectionReference;
}

interface Pop1978Content {
  description: string;
  image: string;
  title: string;
  thumbnail: string;
  caption: string;
  videoSrc: string;
  subtitle: string;
  bio: string;
}

const Pop1978Mobile = ({ collectionRef }: Pop1978MobileProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const [data, isLoading, error] = useDocumentData(
    inView
      ? doc(collectionRef as CollectionReference<Pop1978Content>, "1978")
      : null,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  useError(error);

  return (
    <Box pb={8} ref={ref} id="1978" position="relative">
      {isLoading && (
        <Box textAlign="center" my={12}>
          <Spinner size="xl" />
        </Box>
      )}

      {/* <Heading
        pl={8}
        fontSize="6rem"
        color="#867A68"
        textShadow="-2px 0 #F7CF2D, 0 2px #F7CF2D, 2px 0 #F7CF2D, 0 -2px #F7CF2D"
        letterSpacing="10px"
      >
        1978
      </Heading> */}
      <YearMobile value="1978" />
      <Heading px={8} pb={8} fontSize="1.7rem" color="#F7CF2D">
        {data?.title}
      </Heading>
      <chakra.hr bgColor="white" h="0.1px" />
      <Text p={8} fontWeight="bold" color="white">
        {data?.description}
      </Text>
    </Box>
  );
};

export default Pop1978Mobile;
