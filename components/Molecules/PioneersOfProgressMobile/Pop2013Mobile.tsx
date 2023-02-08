import {
  Box,
  Heading,
  Img,
  Spinner,
  chakra,
  Text,
  SlideFade,
} from "@chakra-ui/react";

import { useError } from "@/hooks/error";
import { CollectionReference, doc } from "firebase/firestore";
import { useDocumentData } from "react-firehooks";
import { useInView } from "react-intersection-observer";
import Hotspot from "@/components/Atoms/PioneerOfProgress/Hotspot";
import { useState } from "react";
import Quiz from "@/components/Atoms/PioneerOfProgress/Quiz";
import { useOnClickTracking } from "@/hooks/tracking";
import YearMobile from "@/components/Atoms/PioneerOfProgress/YearMobile";

interface Pop2013MobileProps {
  collectionRef: CollectionReference;
}

interface Pop2013Content {
  [key: string]: {
    description: string;
    image: string;
    title: string;
    thumbnail: string;
    caption: string;
    videoSrc: string;
    subtitle: string;
    bio: string;
    quiz: {
      answers: string[];
      correct: number;
      funfact: string;
      question: string;
    };
  };
}

const Pop2013Mobile = ({ collectionRef }: Pop2013MobileProps) => {
  const [showQuiz, setShowQuiz] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const [data, isLoading, error] = useDocumentData(
    inView
      ? doc(collectionRef as CollectionReference<Pop2013Content>, "2013")
      : null,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  useError(error);

  useOnClickTracking(showQuiz, "show-quiz", "pioneers-of-progress-2013");

  return (
    <Box pt={6} pb={8} ref={ref} id="2013" position="relative">
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
        2013
      </Heading> */}
      <YearMobile value="2013" isRight />
      <Heading px={8} pb={8} fontSize="1.5rem" color="#F7CF2D">
        {data?.section1.title}
      </Heading>
      <chakra.hr bgColor="white" h="0.1px" />
      <Text p={8} color="white" fontWeight="bold">
        {data?.section1.description}
      </Text>

      <Box position="relative">
        <Img pl={8} top="0" w="100%" src={data?.section3.image} alt="2013" />
        <Hotspot
          position="absolute"
          right="15%"
          bottom="15%"
          onClick={() => setShowQuiz(!showQuiz)}
        />
        <Text
          px={8}
          py={4}
          fontSize="0.7rem"
          color="white"
          dangerouslySetInnerHTML={{
            __html: data ? data.section3.caption : "",
          }}
        />
      </Box>
      <SlideFade in={showQuiz}>
        <Box display={showQuiz ? "block" : "none"} px="1rem">
          <Text fontWeight="bold" fontSize="1.5rem" color="#F7CF2D">
            DO YOU KNOW?
          </Text>
          {data && <Quiz quiz={data.section3.quiz} />}
        </Box>
      </SlideFade>
    </Box>
  );
};

export default Pop2013Mobile;
