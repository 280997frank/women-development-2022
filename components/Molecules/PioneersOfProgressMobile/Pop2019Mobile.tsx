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

interface Pop2019MobileProps {
  collectionRef: CollectionReference;
  onOpenModal: (payload: ActiveModal) => void;
}

interface Pop2019Content {
  [key: string]: {
    description: string;
    image: string;
    title: string;
    thumbnail: string;
    caption: string;
    videoSrc: string;
    subtitle: string;
    bio: string;
    video: {
      caption: string;
      thumbnail: string;
      videoSrc: string;
    };
  };
}

const Pop2019Mobile = ({ collectionRef, onOpenModal }: Pop2019MobileProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const [data, isLoading, error] = useDocumentData(
    inView
      ? doc(collectionRef as CollectionReference<Pop2019Content>, "2019")
      : null,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  useError(error);

  return (
    <Box pt={10} pb={8} ref={ref} id="2019" position="relative">
      {isLoading && (
        <Box textAlign="center" my={12}>
          <Spinner size="xl" />
        </Box>
      )}

      {/* <Heading
        fontSize="6rem"
        color="#867A68"
        textShadow="-2px 0 #F7CF2D, 0 2px #F7CF2D, 2px 0 #F7CF2D, 0 -2px #F7CF2D"
        pr={4}
        textAlign="right"
        letterSpacing="10px"
      >
        2019
      </Heading> */}
      <YearMobile value="2019" isRight />
      <Heading px={8} pb={8} fontSize="1.5rem" color="#F7CF2D">
        {data?.section1.title}
      </Heading>
      <chakra.hr bgColor="white" h="0.1px" />
      <Text px={8} pt={8} pb={4} color="white" fontWeight="bold">
        {data?.section1.description}
      </Text>
      <Heading px={8} py={8} fontSize="1.5rem" color="#F7CF2D">
        {data?.section2.title}
      </Heading>
      <chakra.hr bgColor="white" h="0.1px" />
      <Text px={8} pt={8} color="white" fontWeight="bold">
        {data?.section2.description}
      </Text>

      <Img
        px={8}
        pt={4}
        src={data?.section2.video.thumbnail}
        alt="2019"
        cursor="pointer"
        onClick={() => {
          onOpenModal({
            type: "video",
            src: { mp4: data?.section2.video.videoSrc },
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
        dangerouslySetInnerHTML={{ __html: data?.section2.video.caption ?? "" }}
      />
    </Box>
  );
};

export default Pop2019Mobile;
