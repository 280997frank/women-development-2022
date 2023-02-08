import { FC, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useDocumentData } from "react-firehooks";
import { CollectionReference, doc } from "firebase/firestore";
import {
  Box,
  Stack,
  Text,
  Grid,
  GridItem,
  useMediaQuery,
} from "@chakra-ui/react";
import YearWrapper from "@/components/Atoms/PioneerOfProgress/YearWrapper";
import Year from "@/components/Atoms/PioneerOfProgress/Year";
import Title from "@/components/Atoms/PioneerOfProgress/Title";
import Hotspot from "@/components/Atoms/PioneerOfProgress/Hotspot";
import Quiz from "@/components/Atoms/PioneerOfProgress/Quiz";
import { border } from "@/constants/pioneersConstant";
import { useError } from "@/hooks/error";
import { Pop1980 } from "@/types/pioneerOfProgress";
import { useOnClickTracking } from "@/hooks/tracking";
import ImageModal from "@/components/Atoms/PioneerOfProgress/ImageModal";
import { Parallax } from "react-scroll-parallax";
interface Props {
  collectionRef: CollectionReference;
}

const Pop1980Desktop: FC<Props> = ({ collectionRef }) => {
  const { inView, ref } = useInView({
    triggerOnce: true,
    threshold: 0,
  });

  const [isHeightLowerThan600] = useMediaQuery(
    "screen and (max-height: 610px)"
  );
  const [showQuiz, setShowQuiz] = useState(false);
  const [isPlaying, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const [data, isLoading, error] = useDocumentData(
    inView ? doc(collectionRef as CollectionReference<Pop1980>, "1980") : null,
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
    <Box ref={ref}>
      <YearWrapper year={1980}>
        <Stack w="500px" borderRight={border}>
          <Parallax translateX={[-30, 20]} opacity={[2, 0]}>
            <Year pl="35%" value="1980" position="relative" />
          </Parallax>
          <Parallax translateY={[-20, 20]} opacity={[2, 0]}>
            <Title
              p="10"
              pb="5"
              borderBottom={border}
              dangerouslySetInnerHTML={{
                __html: data ? data.section1.title : "",
              }}
            />
            <Text
              p="10"
              py="5"
              fontWeight="bold"
              dangerouslySetInnerHTML={{
                __html: data ? data.section1.description : "",
              }}
            />
          </Parallax>
        </Stack>
        <Stack
          w={isHeightLowerThan600 ? "400px" : "450px"}
          spacing={5}
          pt={isHeightLowerThan600 ? "5" : "10"}
          borderRight={border}
        >
          <Parallax opacity={[2, 0]}>
            <Stack>
              <Box h="40%" borderTop={border}>
                <ImageModal
                  objectFit="cover"
                  objectPosition="top"
                  h="100%"
                  // w="100%"
                  px="10"
                  pt={isHeightLowerThan600 ? "4" : "8"}
                  thumbnail={data?.section2.image}
                  image={data?.section2.imageModal}
                />
              </Box>
              <Text
                className="caption"
                px="10"
                fontSize="sm"
                dangerouslySetInnerHTML={{
                  __html: data ? data.section2.caption : "",
                }}
              />
              <Stack
                direction="row"
                justifyContent="center"
                px="15%"
                spacing={4}
              >
                <Box flex="1">
                  <Hotspot
                    w={isHeightLowerThan600 ? "70px" : "90px"}
                    h={isHeightLowerThan600 ? "70px" : "90px"}
                    type="audio"
                    isPlaying={isPlaying}
                    onClick={() => {
                      if (audioRef.current) {
                        if (audioRef.current.paused) {
                          audioRef.current.play();
                          setPlaying(true);
                        } else {
                          audioRef.current.pause();
                          setPlaying(false);
                        }
                      }
                    }}
                  />
                  <audio src={data?.section2.audio} ref={audioRef} />
                </Box>
                <Text
                  pt="3"
                  fontSize={isHeightLowerThan600 ? "0.7rem" : "sm"}
                  color="#F7CF2D"
                  dangerouslySetInnerHTML={{
                    __html: data ? data.section2.audioCaption : "",
                  }}
                />
              </Stack>
            </Stack>
          </Parallax>
        </Stack>
        <Box width="1000px" pos="relative" borderRight={border}>
          <Grid
            h="100%"
            templateColumns={"50% 50%"}
            templateRows={"1fr auto"}
            templateAreas={`"year empty"
        "figure ."`}
          >
            <GridItem area="year" borderRight={border}>
              <Year top="11%" left="32%" value="1980" />
            </GridItem>
            <GridItem area="figure" borderTop={border}>
              <Grid
                templateColumns="30px 31px 80% 39px 350px"
                templateRows="30px 40px 1fr 30px"
                templateAreas={`". . . empty ."
              ". hotspot . empty ."
          ". . img quiz quiz"
          ". . caption . ."`}
                pb="20px"
              >
                <GridItem area="hotspot" zIndex={10}>
                  <Hotspot onClick={() => setShowQuiz(!showQuiz)} />
                </GridItem>
                <GridItem area="empty" borderRight={border}>
                  &nbsp;
                </GridItem>
                <GridItem area="img">
                  <ImageModal
                    thumbnail={data?.section3.image}
                    image={data?.section3.imageModal}
                  />
                </GridItem>
                <GridItem area="caption" alignSelf="end">
                  <Text
                    className="caption"
                    fontSize="sm"
                    dangerouslySetInnerHTML={{
                      __html: data ? data.section3.caption : "",
                    }}
                  />
                </GridItem>
                <GridItem area="quiz" alignSelf="end">
                  {data && (
                    <Stack
                      transition="opacity 2s ease-in"
                      opacity={showQuiz ? 1 : 0}
                    >
                      <Title pl="4" fontSize="2xl">
                        DO YOU KNOW?
                      </Title>
                      <Quiz borderRightRadius="xl" quiz={data.section3.quiz} />
                    </Stack>
                  )}
                </GridItem>
              </Grid>
            </GridItem>
            <GridItem mt="10" borderTop={border} area="empty">
              &nbsp;
            </GridItem>
          </Grid>
        </Box>
      </YearWrapper>
    </Box>
  );
};

export default Pop1980Desktop;
