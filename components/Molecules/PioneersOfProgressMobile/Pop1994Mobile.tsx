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

interface Pop1994MobileProps {
  collectionRef: CollectionReference;
  onOpenModal: (payload: ActiveModal) => void;
}

interface Pop1994Content {
  [key: string]: {
    description: string;
    image: string;
    title: string;
    thumbnail: string;
    caption: string;
    videoSrc: string;
    subtitle: string;
    bio: string;
    quote: string;
    author: string;
    quiz: {
      answers: string[];
      correct: number;
      funfact: string;
      question: string;
    };
    imageModal: {
      jpg: string;
      webp: string;
    };
  };
}

const Pop1994Mobile = ({ collectionRef, onOpenModal }: Pop1994MobileProps) => {
  const [showQuiz, setShowQuiz] = useState(false);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const [data, isLoading, error] = useDocumentData(
    inView
      ? doc(collectionRef as CollectionReference<Pop1994Content>, "1994")
      : null,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  useError(error);

  useOnClickTracking(showQuiz, "show-quiz", "pioneers-of-progress-1994");

  return (
    <Box pb={8} ref={ref} id="1994" position="relative" overflowX="hidden">
      {isLoading && (
        <Box textAlign="center" my={12}>
          <Spinner size="xl" />
        </Box>
      )}

      {/* SECTION 1 */}
      {/* <Heading
        fontSize="6rem"
        color="#867A68"
        textShadow="-2px 0 #F7CF2D, 0 2px #F7CF2D, 2px 0 #F7CF2D, 0 -2px #F7CF2D"
        pl={8}
        letterSpacing="10px"
      >
        1994
      </Heading> */}
      <YearMobile value="1994" />
      <Heading p={8} fontSize="1.5rem" color="#F7CF2D">
        {data?.section1.title}
      </Heading>
      <chakra.hr bgColor="white" h="0.1px" />
      <Text p={8} color="white" fontWeight="bold">
        {data?.section1.description}
      </Text>

      {/* SECTION 2 */}
      <Img
        pt={4}
        src={data?.section2.image}
        alt="1994"
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
        pt={4}
        pb={8}
        fontSize="0.8rem"
        color="white"
        dangerouslySetInnerHTML={{ __html: data?.section2.caption ?? "" }}
      />
      <chakra.hr bgColor="white" h="0.1px" />

      {/* SECTION 3 */}
      <Heading px={8} pt={8} fontSize="1.5rem" color="#F7CF2D">
        {data?.section3.title}
      </Heading>
      <Text
        px={8}
        pb={4}
        fontSize="sm"
        color="white"
        dangerouslySetInnerHTML={{
          __html:
            data !== undefined
              ? data.section3.subtitle.replace("<br/>", " ")
              : "",
        }}
      />
      <Box position="relative">
        <Img
          // position="absolute"
          float="right"
          transform="translateX(20%)"
          w="50%"
          src={data?.section3.image}
          alt="1994"
          onClick={() => {
            onOpenModal({
              type: "image",
              src: { ...data?.section3.imageModal },
            });
          }}
        />
        <Text width="60%" pl={8} pb={12} fontSize="0.9rem" color="white">
          {data?.section3.bio}
        </Text>
      </Box>

      {/* SECTION 4 */}
      <Text px={8} fontWeight="bold" color="#F7CF2D">
        {`${data?.section4.quote}`}
      </Text>
      <Text fontSize="0.8rem" mt="1rem" px={8} color="white">
        {data?.section4.author}
      </Text>

      {/* SECTION 5 */}
      <Box position="relative" mt="1rem">
        <Hotspot
          position="absolute"
          right="20px"
          bottom="-40px"
          onClick={() => setShowQuiz(!showQuiz)}
        />
        <Img ml="-5rem" src={data?.section5.image} w="full" alt="1980" />
      </Box>
      <Text
        px={4}
        mt="2"
        mb="4"
        fontSize="0.8rem"
        color="white"
        dangerouslySetInnerHTML={{ __html: data?.section5.caption ?? "" }}
      />
      <SlideFade in={showQuiz}>
        <Box display={showQuiz ? "block" : "none"} px="1rem">
          <Text fontWeight="bold" fontSize="1.5rem" color="#F7CF2D">
            DO YOU KNOW?
          </Text>
          {data && <Quiz quiz={data.section5.quiz} />}
        </Box>
      </SlideFade>
    </Box>
  );
};

export default Pop1994Mobile;
