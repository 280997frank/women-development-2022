import { FC, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useDocumentData } from "react-firehooks";
import { CollectionReference, doc } from "firebase/firestore";
import { Stack, Text, Img, Grid, GridItem, Box } from "@chakra-ui/react";
import YearWrapper from "@/components/Atoms/PioneerOfProgress/YearWrapper";
import Year from "@/components/Atoms/PioneerOfProgress/Year";
import Title from "@/components/Atoms/PioneerOfProgress/Title";
import Hotspot from "@/components/Atoms/PioneerOfProgress/Hotspot";
import { border } from "@/constants/pioneersConstant";
import { useError } from "@/hooks/error";
import { Pop2007 } from "@/types/pioneerOfProgress";
import Quiz from "@/components/Atoms/PioneerOfProgress/Quiz";
import ImageModal from "@/components/Atoms/PioneerOfProgress/ImageModal";
import { useOnClickTracking } from "@/hooks/tracking";
import { Parallax } from "react-scroll-parallax";
interface Props {
  collectionRef: CollectionReference;
}

const Pop2007Desktop: FC<Props> = ({ collectionRef }) => {
  const { inView, ref } = useInView({
    triggerOnce: true,
    threshold: 0,
  });
  const [showQuiz, setShowQuiz] = useState(false);

  const [data, isLoading, error] = useDocumentData(
    inView ? doc(collectionRef as CollectionReference<Pop2007>, "2007") : null,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  useError(error);

  useOnClickTracking(showQuiz, "show-quiz", "pioneers-of-progress-2007");

  return (
    <Box ref={ref}>
      <YearWrapper year={2007}>
        <Box w="1400px" pos="relative" h="100%">
          <Grid
            templateAreas={`
          "desc empty . ."
          ". hotspot . ."
          "caption . img quiz"`}
            templateColumns={"510px 160px 200px"}
            templateRows={"1fr 0px 100px"}
            h="100%"
          >
            <GridItem area="empty" borderLeft={border}>
              &nbsp;
            </GridItem>
            <GridItem alignSelf="end" area="desc" pos="relative">
              <Parallax translateY={[-30, 0]} opacity={[2, 0]}>
                <Year right="0" top="-35%" pr="8" value="2007" />
                <Title
                  pl="100px"
                  pr="8"
                  pb="5"
                  borderBottom={border}
                  dangerouslySetInnerHTML={{
                    __html: data ? data.section1.title : "",
                  }}
                />
                <Text
                  pl="100px"
                  pr="8"
                  py="5"
                  fontWeight="bold"
                  dangerouslySetInnerHTML={{
                    __html: data ? data.section1.description : "",
                  }}
                />
              </Parallax>
            </GridItem>
            <GridItem area="caption" alignSelf="end" pr="16">
              <Text
                className="caption"
                textAlign="right"
                dangerouslySetInnerHTML={{
                  __html: data ? data.section2.caption : "",
                }}
              />
            </GridItem>
            <GridItem
              area="img"
              alignSelf="end"
              justifySelf="end"
              pos="relative"
              zIndex={1}
            >
              <Hotspot
                pos="absolute"
                bottom="50px"
                left="65px"
                onClick={() => setShowQuiz(!showQuiz)}
              />
              <Img maxW="400px" src={data?.section2.image} />
            </GridItem>
            <GridItem area="quiz" alignSelf="end" w="500px">
              <Stack
                transform="translateX(-50px)"
                opacity={showQuiz ? 1 : 0}
                transition="opacity 1s ease-in"
              >
                <Title pl="80px" fontSize="2xl">
                  DO YOU KNOW?
                </Title>
                {data && (
                  <Quiz
                    borderRightRadius="xl"
                    pl="80px"
                    quiz={data.section2.quiz}
                  />
                )}
              </Stack>
            </GridItem>
          </Grid>
        </Box>
        <Stack w="500px" borderLeft={border}>
          <Stack borderRight={border} h="68%">
            <Parallax translateY={[30, -10]} opacity={[2, 0]}>
              <Stack>
                <Year pl="10" position="relative" value="2007" />
                <Title
                  px="20"
                  borderBottom={border}
                  pb="5"
                  dangerouslySetInnerHTML={{
                    __html: data ? data.section3.title : "",
                  }}
                />
                <Text
                  px="20"
                  pt="5"
                  pb="6"
                  fontWeight="bold"
                  dangerouslySetInnerHTML={{
                    __html: data ? data.section3.description : "",
                  }}
                />
              </Stack>
            </Parallax>
          </Stack>
        </Stack>
      </YearWrapper>
    </Box>
  );
};

export default Pop2007Desktop;
