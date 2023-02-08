import { FC, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useDocumentData } from "react-firehooks";
import { CollectionReference, doc } from "firebase/firestore";
import {
  Stack,
  Text,
  Img,
  Grid,
  GridItem,
  Box,
  useMediaQuery,
} from "@chakra-ui/react";
import YearWrapper from "@/components/Atoms/PioneerOfProgress/YearWrapper";
import Year from "@/components/Atoms/PioneerOfProgress/Year";
import Title from "@/components/Atoms/PioneerOfProgress/Title";
import Hotspot from "@/components/Atoms/PioneerOfProgress/Hotspot";
import { border } from "@/constants/pioneersConstant";
import { useError } from "@/hooks/error";
import { Pop2000 } from "@/types/pioneerOfProgress";
import Quiz from "@/components/Atoms/PioneerOfProgress/Quiz";
import ImageModal from "@/components/Atoms/PioneerOfProgress/ImageModal";
import { useOnClickTracking } from "@/hooks/tracking";
import { Parallax } from "react-scroll-parallax";
interface Props {
  collectionRef: CollectionReference;
}

const Pop2000Desktop: FC<Props> = ({ collectionRef }) => {
  const { inView, ref } = useInView({
    triggerOnce: true,
    threshold: 0,
  });
  const [isHeightLowerThan600] = useMediaQuery(
    "screen and (max-height: 610px)"
  );
  const [showQuiz, setShowQuiz] = useState(false);

  const [data, isLoading, error] = useDocumentData(
    inView ? doc(collectionRef as CollectionReference<Pop2000>, "2000") : null,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  useError(error);

  useOnClickTracking(showQuiz, "show-quiz", "pioneers-of-progress-2000");

  return (
    <Box ref={ref} zIndex={1}>
      <YearWrapper year={2000}>
        <Stack w="520px">
          <Stack borderRight={border}>
            <Parallax translateY={[10, -20]} opacity={[2, 0]}>
              <Stack>
                <Title
                  mt="10"
                  px="8"
                  pb="5"
                  borderBottom={border}
                  dangerouslySetInnerHTML={{
                    __html: data ? data.section1.title : "",
                  }}
                />
                <Text
                  px="8"
                  pt="5"
                  fontWeight="bold"
                  dangerouslySetInnerHTML={{
                    __html: data ? data.section1.description : "",
                  }}
                />
                <Year
                  alignSelf="end"
                  py="8"
                  pr="10"
                  position="relative"
                  value="2000"
                />
              </Stack>
            </Parallax>
          </Stack>
        </Stack>
        <Box w="1100px">
          <Grid
            templateColumns={"610px 490px 350px"}
            templateRows={"40% auto 1fr"}
            templateAreas={`"img img quiz"
                            "caption caption ."
                            "desc year ."`}
          >
            <GridItem area="img" alignSelf="end">
              <Parallax opacity={[1.5, 0]}>
                <Stack alignItems="center">
                  <Hotspot
                    transform="translateX(-50px) translateY(50px)"
                    zIndex={2}
                    position="absolute"
                    onClick={() => setShowQuiz(!showQuiz)}
                  />
                  <Img
                    transform="translateX(30px)"
                    w={isHeightLowerThan600 ? "200px" : "280px"}
                    src={data?.section3.image}
                    zIndex={1}
                  />
                </Stack>
              </Parallax>
            </GridItem>
            <GridItem area="caption">
              <Text
                fontSize="sm"
                pb="2"
                className="caption"
                textAlign="center"
                dangerouslySetInnerHTML={{
                  __html: data ? data.section3.caption : "",
                }}
              />
            </GridItem>
            <GridItem area="quiz" alignSelf="end" justifySelf="end" w="850px">
              <Stack opacity={showQuiz ? 1 : 0} transition="opacity 1s ease-in">
                <Title pl="140px" fontSize="2xl">
                  DO YOU KNOW?
                </Title>
                {data && (
                  <Quiz
                    borderRightRadius="xl"
                    pl="140px"
                    quiz={data.section3.quiz}
                  />
                )}
              </Stack>
            </GridItem>
            <GridItem area="desc" borderRight={border}>
              <Parallax opacity={[1.5, 0]} translateY={[0, 20]}>
                <Title
                  px="8"
                  pb="2"
                  borderBottom={border}
                  dangerouslySetInnerHTML={{
                    __html: data ? data.section2.title : "",
                  }}
                />
                <Text
                  px="8"
                  pt="2"
                  fontWeight="bold"
                  dangerouslySetInnerHTML={{
                    __html: data ? data.section2.description : "",
                  }}
                />
              </Parallax>
            </GridItem>
            <GridItem area="year">
              <Year position="relative" pl="10" value="2000" />
            </GridItem>
          </Grid>
        </Box>
      </YearWrapper>
    </Box>
  );
};

export default Pop2000Desktop;
