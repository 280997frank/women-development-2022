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

interface Pop2001MobileProps {
  collectionRef: CollectionReference;
}

interface Pop2000Content {
  description: string;
  image: string;
  title: string;
  thumbnail: string;
  caption: string;
  videoSrc: string;
  subtitle: string;
  bio: string;
}

const Pop2001Mobile = ({ collectionRef }: Pop2001MobileProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const [data, isLoading, error] = useDocumentData(
    inView
      ? doc(collectionRef as CollectionReference<Pop2000Content>, "2001")
      : null,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  useError(error);

  return (
    <Box pb={8} ref={ref} id="2001" position="relative">
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
        2001
      </Heading> */}
      <YearMobile value="2001" />
      <Heading px={8} pb={8} fontSize="1.5rem" color="#F7CF2D">
        {data?.title}
      </Heading>
      <chakra.hr bgColor="white" h="0.1px" />
      <Text px={8} pt={8} color="white" fontWeight="bold">
        {data?.description}
      </Text>
    </Box>
  );
};

export default Pop2001Mobile;
