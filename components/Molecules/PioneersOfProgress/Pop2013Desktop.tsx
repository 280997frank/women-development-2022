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
import Hotspot from "@/components/Atoms/PioneerOfProgress/Hotspot";
import Title from "@/components/Atoms/PioneerOfProgress/Title";
import { border } from "@/constants/pioneersConstant";
import { useError } from "@/hooks/error";
import { Pop2013 } from "@/types/pioneerOfProgress";
import Quiz from "@/components/Atoms/PioneerOfProgress/Quiz";
import { useOnClickTracking } from "@/hooks/tracking";
import { Parallax } from "react-scroll-parallax";

interface Props {
  collectionRef: CollectionReference;
}

const Pop2013Desktop: FC<Props> = ({ collectionRef }) => {
  const { inView, ref } = useInView({
    triggerOnce: true,
    threshold: 0,
  });
  const [showQuiz, setShowQuiz] = useState(false);
  const [isHeightLowerThan600] = useMediaQuery(
    "screen and (max-height: 610px)"
  );

  const [data, isLoading, error] = useDocumentData(
    inView ? doc(collectionRef as CollectionReference<Pop2013>, "2013") : null,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  useError(error);

  useOnClickTracking(showQuiz, "show-quiz", "pioneers-of-progress-2013");

  return (
    <Box ref={ref}>
      <YearWrapper year={2013}>
        <Stack w="550px">
          <Stack borderRight={border} pt="100px">
            <Parallax translateY={[20, -10]} opacity={[2, 0]}>
              <Stack>
                <Year pl="14" pos="relative" value="2013" />
                <Title
                  borderBottom={border}
                  pb="5"
                  pl="20"
                  pr="8"
                  dangerouslySetInnerHTML={{
                    __html: data ? data.section1.title : "",
                  }}
                />
                <Text
                  pt="5"
                  pl="20"
                  pr="8"
                  fontWeight="bold"
                  dangerouslySetInnerHTML={{
                    __html: data ? data.section1.description : "",
                  }}
                />
              </Stack>
            </Parallax>
          </Stack>
        </Stack>
        <Stack w="500px">
          <Stack borderRight={border} pt="200px">
            <Parallax translateY={[-20, 10]}>
              <Stack>
                <Text
                  pt="20"
                  px="20"
                  borderTop={border}
                  fontWeight="bold"
                  color="#F7CF2D"
                  sx={{ textIndent: "-0.75em" }}
                  dangerouslySetInnerHTML={{
                    __html: data ? data.section2.quote : "",
                  }}
                />
                <Text
                  px="20"
                  pb="10"
                  fontSize="sm"
                  dangerouslySetInnerHTML={{
                    __html: data ? data.section2.author : "",
                  }}
                />
              </Stack>
            </Parallax>
          </Stack>
        </Stack>
        <Box w={isHeightLowerThan600 ? "350px" : "500px"}>
          <Parallax opacity={[2, 0]}>
            <Grid
              templateAreas={`"hotspot img caption"
          ". img ."
          ". quiz ."`}
              templateColumns="20px 80% 65%"
              templateRows={
                isHeightLowerThan600 ? "50px 70px 1fr" : "50px 140px 1fr"
              }
            >
              <GridItem area="hotspot" pl="4" zIndex={2} alignSelf="end">
                <Hotspot onClick={() => setShowQuiz(!showQuiz)} />
              </GridItem>
              <GridItem area="img" zIndex={1}>
                <Img src={data?.section3.image} />
              </GridItem>
              <GridItem area="caption">
                <Text
                  className="caption"
                  dangerouslySetInnerHTML={{
                    __html: data ? data.section3.caption : "",
                  }}
                />
              </GridItem>
              <GridItem area="quiz" justifyContent="end" pl="10px">
                <Stack
                  direction="row"
                  opacity={showQuiz ? 1 : 0}
                  transition="opacity 1s ease-in"
                >
                  {data && (
                    <Quiz
                      borderBottomRadius="xl"
                      pt="100px"
                      quiz={data.section3.quiz}
                    />
                  )}

                  <Title
                    pt="50px"
                    transform=""
                    sx={{
                      writingMode: "vertical-lr",
                      textOrientation: "mixed",
                    }}
                  >
                    DO YOU KNOW?
                  </Title>
                </Stack>
              </GridItem>
            </Grid>
          </Parallax>
        </Box>
      </YearWrapper>
    </Box>
  );
};

export default Pop2013Desktop;
