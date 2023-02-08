import {
  Box,
  Heading,
  Img,
  Spinner,
  chakra,
  Text,
  Table,
  Flex,
  SlideFade,
} from "@chakra-ui/react";

import { useError } from "@/hooks/error";
import { CollectionReference, doc } from "firebase/firestore";
import { useDocumentData } from "react-firehooks";
import { useInView } from "react-intersection-observer";
import Hotspot from "@/components/Atoms/PioneerOfProgress/Hotspot";
import { useRef, useState } from "react";
import Quiz from "@/components/Atoms/PioneerOfProgress/Quiz";
import { useOnClickTracking } from "@/hooks/tracking";
import YearMobile from "@/components/Atoms/PioneerOfProgress/YearMobile";
import muteSound from "@/assets/images/pop/Sound On_=False, Colour=Yellow.png";
import { ActiveModal } from "@/types";

interface Pop1980MobileProps {
  collectionRef: CollectionReference;
  onOpenModal: (payload: ActiveModal) => void;
}

interface Pop1980Content {
  [key: string]: {
    description: string;
    image: string;
    title: string;
    thumbnail: string;
    caption: string;
    videoSrc: string;
    subtitle: string;
    bio: string;
    audio: string;
    audioCaption: string;
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

const Pop1980Mobile = ({ collectionRef, onOpenModal }: Pop1980MobileProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [isPlaying, setPlaying] = useState(false);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const [data, isLoading, error] = useDocumentData(
    inView
      ? doc(collectionRef as CollectionReference<Pop1980Content>, "1980")
      : null,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  useError(error);

  useOnClickTracking(isPlaying, "modal-content", {
    content: audioRef.current ? audioRef.current.src : "",
    type: "audio",
  });

  useOnClickTracking(showQuiz, "show-quiz", "pioneers-of-progress-1980");

  return (
    <Box pb={8} ref={ref} id="1980" position="relative">
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
        textAlign="right"
        pr={4}
        mt="-3rem"
        letterSpacing="10px"
      >
        1980
      </Heading> */}
      <YearMobile value="1980" isRight />
      <Heading p={8} fontSize="1.5rem" color="#F7CF2D">
        {data?.section1.title}
      </Heading>
      <chakra.hr bgColor="white" h="0.1px" />
      <Text p={8} color="white" fontWeight="bold">
        {data?.section1.description}
      </Text>

      {/* SECTION 2 */}
      <Img
        src={data?.section2.image}
        alt="1980"
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
        dangerouslySetInnerHTML={{ __html: data ? data.section2.caption : "" }}
      />
      <Flex px={4} alignItems="center">
        <Hotspot
          type="audio"
          isPlaying={isPlaying}
          onClick={() => {
            if (audioRef.current) {
              if (audioRef.current.paused) {
                audioRef.current.play();
                setPlaying(true);
              } else {
                setPlaying(false);
                audioRef.current.pause();
              }
            }
          }}
        />
        <audio src={data?.section2.audio} ref={audioRef} />

        <Text
          ml="1rem"
          flex={1}
          color="#F7CF2D"
          fontWeight="bold"
          mb="8"
          dangerouslySetInnerHTML={{
            __html: data ? data.section2.audioCaption : "",
          }}
        />
      </Flex>

      {/* SECTION 3 */}
      {/* <Text textAlign="center" mt="3rem" mb="2" color="white">
        {data?.section3.caption}
      </Text> */}
      <Box position="relative">
        <Hotspot
          position="absolute"
          right={4}
          bottom={-2}
          onClick={() => setShowQuiz(!showQuiz)}
        />
        <Img
          onClick={() => {
            onOpenModal({
              type: "image",
              src: { ...data?.section3.imageModal },
            });
          }}
          src={data?.section3.image}
          w="full"
          alt="1980"
        />
        <Text
          px={4}
          pt={2}
          pr="100px"
          color="white"
          fontSize="0.8rem"
          dangerouslySetInnerHTML={{ __html: data?.section3.caption ?? "" }}
        />
      </Box>
      {showQuiz && (
        <SlideFade in={showQuiz}>
          <Box display={showQuiz ? "block" : "none"} p="1rem">
            <Text fontWeight="bold" fontSize="1.5rem" color="#F7CF2D">
              DO YOU KNOW?
            </Text>
            {data && <Quiz quiz={data.section3.quiz} />}
          </Box>
        </SlideFade>
      )}
    </Box>
  );
};

export default Pop1980Mobile;
