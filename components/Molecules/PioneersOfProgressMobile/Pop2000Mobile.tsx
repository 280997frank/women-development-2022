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
import { ActiveModal } from "@/types";
import Quiz from "@/components/Atoms/PioneerOfProgress/Quiz";
import { useState } from "react";
import { useOnClickTracking } from "@/hooks/tracking";
import YearMobile from "@/components/Atoms/PioneerOfProgress/YearMobile";

interface Pop2000MobileProps {
  collectionRef: CollectionReference;
  onOpenModal: (payload: ActiveModal) => void;
}

interface Pop2000Content {
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

const Pop2000Mobile = ({ collectionRef, onOpenModal }: Pop2000MobileProps) => {
  const [showQuiz, setShowQuiz] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const [data, isLoading, error] = useDocumentData(
    inView
      ? doc(collectionRef as CollectionReference<Pop2000Content>, "2000")
      : null,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  useError(error);

  useOnClickTracking(showQuiz, "show-quiz", "pioneers-of-progress-2000");

  return (
    <Box pb={8} ref={ref} id="2000" position="relative">
      {isLoading && (
        <Box textAlign="center" my={12}>
          <Spinner size="xl" />
        </Box>
      )}

      <Heading px={8} py={8} fontSize="1.5rem" color="#F7CF2D">
        {data?.section1.title}
      </Heading>
      <chakra.hr bgColor="white" h="0.1px" />
      <Text p={8} color="white" fontWeight="bold">
        {data?.section1.description}
      </Text>
      {/*
      <Heading
        fontSize="6rem"
        color="#867A68"
        textShadow="-2px 0 #F7CF2D, 0 2px #F7CF2D, 2px 0 #F7CF2D, 0 -2px #F7CF2D"
        pl={8}
        letterSpacing="10px"
      >
        2000
      </Heading> */}
      <YearMobile value="2000" />
      <Heading
        px={8}
        pb={8}
        fontSize="1.5rem"
        w="100%"
        color="#F7CF2D"
        dangerouslySetInnerHTML={{ __html: data ? data.section2.title : "" }}
      />
      <chakra.hr bgColor="white" h="0.1px" />
      <Text p={8} color="white" fontWeight="bold">
        {data?.section2.description}
      </Text>

      <Box position="relative" px={4} pt={4}>
        <Img
          src={data?.section3.image}
          alt="2000"
          // cursor="pointer"
          // onClick={() => {
          //   onOpenModal({
          //     type: "image",
          //     src: { ...data?.section3.imageModal },
          //   });
          // }}
        />
        <Hotspot
          position="absolute"
          right="10"
          bottom="0"
          onClick={() => setShowQuiz(!showQuiz)}
        />
      </Box>
      <Text
        my="4"
        px={4}
        fontSize="0.8rem"
        color="white"
        dangerouslySetInnerHTML={{ __html: data ? data.section3.caption : "" }}
      />
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

export default Pop2000Mobile;
