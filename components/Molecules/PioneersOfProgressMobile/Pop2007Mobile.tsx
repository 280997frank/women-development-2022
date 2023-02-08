import {
  Box,
  Heading,
  Img,
  Spinner,
  chakra,
  Text,
  SlideFade,
  Flex,
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

interface Pop2007MobileProps {
  collectionRef: CollectionReference;
  onOpenModal: (payload: ActiveModal) => void;
}

interface Pop2007Content {
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

const Pop2007Mobile = ({ collectionRef, onOpenModal }: Pop2007MobileProps) => {
  const [showQuiz, setShowQuiz] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const [data, isLoading, error] = useDocumentData(
    inView
      ? doc(collectionRef as CollectionReference<Pop2007Content>, "2007")
      : null,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  useError(error);

  useOnClickTracking(showQuiz, "show-quiz", "pioneers-of-progress-2007");

  return (
    <Box pb={8} ref={ref} id="2007" position="relative">
      {isLoading && (
        <Box textAlign="center" my={12}>
          <Spinner size="xl" />
        </Box>
      )}
      {/* <Heading
        fontSize="5rem"
        color="#867A68"
        textShadow="-2px 0 #F7CF2D, 0 2px #F7CF2D, 2px 0 #F7CF2D, 0 -2px #F7CF2D"
        pr={8}
        textAlign="right"
        letterSpacing="10px"
      >
        2007
      </Heading> */}
      <YearMobile value="2007" isRight />
      <Heading px={8} pb={8} fontSize="1.5rem" color="#F7CF2D">
        {data?.section1.title}
      </Heading>
      <chakra.hr bgColor="white" h="0.1px" />
      <Text p={8} color="white" fontWeight="bold">
        {data?.section1.description}
      </Text>

      <Box flexDir="row" pos="relative" w="100vw" mb="5">
        <Text
          minW="40vw"
          maxW="40vw"
          pl={8}
          // pr="15rem"
          pb="10rem"
          color="white"
          fontSize={{ base: "0.55rem", sm: "1rem" }}
          dangerouslySetInnerHTML={{
            __html: data ? data.section2.caption : "",
          }}
          pos="absolute"
        />
        <Box flexDir="row" pos="relative" px={8}>
          <Hotspot
            position="absolute"
            left="15%"
            bottom={window.innerWidth >= 768 ? "20%" : "5%"}
            zIndex={1}
            onClick={() => setShowQuiz(!showQuiz)}
          />
          <Img
            // ml="-50px"
            // position="absolute"
            // right="10"
            // top="0"
            minW="100%"
            src={data?.section2.image}
            alt="2007"
            // cursor="pointer"
            // onClick={() => {
            //   onOpenModal({
            //     type: "image",
            //     src: { ...data?.section2.imageModal },
            //   });
            // }}
          />
        </Box>
      </Box>
      <SlideFade in={showQuiz}>
        <Box display={showQuiz ? "block" : "none"} px="1rem">
          <Text fontWeight="bold" fontSize="1.5rem" color="#F7CF2D">
            DO YOU KNOW?
          </Text>
          {data && <Quiz quiz={data.section2.quiz} />}
        </Box>
      </SlideFade>

      <Heading px={8} py={8} fontSize="1.5rem" color="#F7CF2D">
        {data?.section3.title}
      </Heading>
      <chakra.hr bgColor="white" h="0.1px" />
      <Text px={8} pt={8} color="white" fontWeight="bold">
        {data?.section3.description}
      </Text>
    </Box>
  );
};

export default Pop2007Mobile;
