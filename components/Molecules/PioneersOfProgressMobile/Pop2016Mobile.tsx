import { Box, Heading, Img, Spinner, chakra, Text } from "@chakra-ui/react";

import { useError } from "@/hooks/error";
import { CollectionReference, doc } from "firebase/firestore";
import { useDocumentData } from "react-firehooks";
import { useInView } from "react-intersection-observer";
import { ActiveModal } from "@/types";
import YearMobile from "@/components/Atoms/PioneerOfProgress/YearMobile";

interface Pop2016MobileProps {
  collectionRef: CollectionReference;
  onOpenModal: (payload: ActiveModal) => void;
}

interface Pop2016Content {
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
}

const Pop2016Mobile = ({ collectionRef, onOpenModal }: Pop2016MobileProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const [data, isLoading, error] = useDocumentData(
    inView
      ? doc(collectionRef as CollectionReference<Pop2016Content>, "2016")
      : null,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  useError(error);

  return (
    <Box ref={ref} id="2016" position="relative">
      {isLoading && (
        <Box textAlign="center" my={12}>
          <Spinner size="xl" />
        </Box>
      )}

      {/* <Heading
        fontSize="6rem"
        color="#867A68"
        textShadow="-2px 0 #F7CF2D, 0 2px #F7CF2D, 2px 0 #F7CF2D, 0 -2px #F7CF2D"
        letterSpacing="10px"
        pr={8}
        textAlign="right"
      >
        2016
      </Heading> */}
      <YearMobile value="2016" isRight />
      <Heading px={8} pb={8} fontSize="1.5rem" w="80%" color="#F7CF2D">
        {data?.title}
      </Heading>
      <chakra.hr bgColor="white" h="0.1px" />
      <Text px={8} pt={8} color="white" fontWeight="bold">
        {data?.description}
      </Text>

      <Img
        px={8}
        pt={4}
        src={data?.video.thumbnail}
        alt="1994"
        cursor="pointer"
        onClick={() => {
          onOpenModal({
            type: "video",
            src: { mp4: data?.video.videoSrc },
          });
        }}
      />
      <Text
        w="full"
        px={8}
        pt={2}
        fontSize="0.8rem"
        color="white"
        dangerouslySetInnerHTML={{ __html: data?.video.caption ?? "" }}
      />
    </Box>
  );
};

export default Pop2016Mobile;
