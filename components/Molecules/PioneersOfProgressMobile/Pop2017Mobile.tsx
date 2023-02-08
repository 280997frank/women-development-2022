import { Box, Heading, Img, Spinner, chakra, Text } from "@chakra-ui/react";

import { useError } from "@/hooks/error";
import { CollectionReference, doc } from "firebase/firestore";
import { useDocumentData } from "react-firehooks";
import { useInView } from "react-intersection-observer";
import { ActiveModal } from "@/types";
import YearMobile from "@/components/Atoms/PioneerOfProgress/YearMobile";

interface Pop2017MobileProps {
  collectionRef: CollectionReference;
  onOpenModal: (payload: ActiveModal) => void;
}

interface Pop2017Content {
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
    imageModal: {
      jpg: string;
      webp: string;
    };
    quote: string;
    author: string;
  };
}

const Pop2017Mobile = ({ collectionRef, onOpenModal }: Pop2017MobileProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const [data, isLoading, error] = useDocumentData(
    inView
      ? doc(collectionRef as CollectionReference<Pop2017Content>, "2017")
      : null,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  useError(error);

  return (
    <Box pt={10} ref={ref} id="2017" position="relative">
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
        2017
      </Heading> */}
      <YearMobile value="2017" />
      <Heading
        px={8}
        pb={8}
        fontSize="1.5rem"
        color="#F7CF2D"
        dangerouslySetInnerHTML={{ __html: data ? data.section1.title : "" }}
      />
      <chakra.hr bgColor="white" h="0.1px" />
      <Text px={8} pt={8} color="white" fontWeight="bold">
        {data?.section1.description}
      </Text>
      <Img
        pt={2}
        src={data?.section1.image}
        alt="2017"
        cursor="pointer"
        onClick={() => {
          onOpenModal({
            type: "image",
            src: { ...data?.section1.imageModal },
          });
        }}
      />
      <Text
        w="full"
        px={8}
        pt={2}
        pb={4}
        fontSize="0.8rem"
        color="white"
        dangerouslySetInnerHTML={{ __html: data?.section1.caption ?? "" }}
      />
      <Img
        px={8}
        pt={4}
        src={data?.section1.video.thumbnail}
        alt="1994"
        cursor="pointer"
        onClick={() => {
          onOpenModal({
            type: "video",
            src: { mp4: data?.section1.video.videoSrc },
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
        dangerouslySetInnerHTML={{
          __html: data
            ? data.section1.video.caption
                .replace("{`", "")
                .replace("`}", "")
                .replace('{"', "")
                .replace('"}', "")
            : "",
        }}
      />
      <chakra.hr bgColor="white" h="0.1px" />

      <Heading px={8} pt={8} fontSize="1.5rem" color="#F7CF2D">
        {data?.section2.title}
      </Heading>
      <Text
        px={8}
        fontSize="xs"
        color="white"
        dangerouslySetInnerHTML={{
          __html: data ? data.section2.subtitle : "",
        }}
      />
      <Text w="full" px={8} pt={4} pb={8} color="white">
        {data?.section2.bio}
      </Text>
      <Img
        px={8}
        src={data?.section2.image}
        alt="2017"
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
        pt={8}
        fontWeight="bold"
        color="#F7CF2D"
        dangerouslySetInnerHTML={{
          __html: data ? data.section2.quote : "",
        }}
      />
      <Text fontSize="0.8rem" mt="1rem" px={8} color="white">
        {data?.section2.author}
      </Text>
    </Box>
  );
};

export default Pop2017Mobile;
