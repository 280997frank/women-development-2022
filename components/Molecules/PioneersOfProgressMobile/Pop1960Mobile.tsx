import {
  Box,
  Heading,
  Img,
  Spinner,
  chakra,
  Text,
  SlideFade,
  Flex,
  Fade,
  Slide,
} from "@chakra-ui/react";

import { useError } from "@/hooks/error";
import { CollectionReference, doc } from "firebase/firestore";
import { useDocumentData } from "react-firehooks";
import { useInView } from "react-intersection-observer";
import Hotspot from "@/components/Atoms/PioneerOfProgress/Hotspot";
import { ActiveModal } from "@/types";
import { useState } from "react";
import Quiz from "@/components/Atoms/PioneerOfProgress/Quiz";
import { useOnClickTracking } from "@/hooks/tracking";
import YearMobile from "@/components/Atoms/PioneerOfProgress/YearMobile";

interface Pop1960MobileProps {
  collectionRef: CollectionReference;
  onOpenModal: (payload: ActiveModal) => void;
}

interface Pop1960Content {
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
    quiz: {
      answers: string[];
      correct: number;
      funfact: string;
      question: string;
    };
  };
}

const Pop1960Mobile = ({ collectionRef, onOpenModal }: Pop1960MobileProps) => {
  const [showQuiz, setShowQuiz] = useState(false);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const [data, isLoading, error] = useDocumentData(
    inView
      ? doc(collectionRef as CollectionReference<Pop1960Content>, "1960")
      : null,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  useError(error);

  useOnClickTracking(showQuiz, "show-quiz", "pioneers-of-progress-1960");

  return (
    <Box pb={8} ref={ref} id="1960" position="relative">
      {isLoading && (
        <Box textAlign="center" my={12}>
          <Spinner size="xl" />
        </Box>
      )}

      {/* SECTION 1 */}
      <Img
        src={data?.section1.image}
        alt="1960"
        cursor="pointer"
        onClick={() => {
          onOpenModal({
            type: "image",
            src: { ...data?.section1.imageModal },
          });
        }}
      />
      <Text
        px={8}
        pt={4}
        pb={8}
        fontSize="0.8rem"
        color="white"
        dangerouslySetInnerHTML={{ __html: data?.section1.caption ?? "" }}
      />
      {/* <Heading
        fontSize="6rem"
        color="#867A68"
        textShadow="-2px 0 #F7CF2D, 0 2px #F7CF2D, 2px 0 #F7CF2D, 0 -2px #F7CF2D"
        textAlign="right"
        pr={4}
        letterSpacing="10px"
      >
        1960
      </Heading> */}
      <YearMobile value="1960" isRight />
      {/* SECTION 2 */}
      {/* <Text px={8} pt={4} mb="2" fontSize="0.8rem" color="white">
        {data?.section2.caption}
      </Text> */}
      <Box position="relative">
        <Img
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
        <Hotspot
          position="absolute"
          bottom="6"
          right="4"
          onClick={() => setShowQuiz(!showQuiz)}
        />
        <Text
          px={4}
          pt={4}
          mr="100px"
          fontSize="0.8rem"
          color="white"
          dangerouslySetInnerHTML={{ __html: data?.section2.caption ?? "" }}
        />
      </Box>
      <SlideFade in={showQuiz}>
        <Box display={showQuiz ? "block" : "none"} p="1rem">
          <Text fontWeight="bold" fontSize="1.5rem" color="#F7CF2D">
            DO YOU KNOW?
          </Text>
          {data ? <Quiz quiz={data.section2.quiz} /> : null}
        </Box>
      </SlideFade>
    </Box>
  );
};

export default Pop1960Mobile;
