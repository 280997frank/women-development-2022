import { FC, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useDocumentData } from "react-firehooks";
import { CollectionReference, doc } from "firebase/firestore";
import {
  Box,
  Stack,
  Text,
  useMediaQuery,
  Grid,
  GridItem,
  Img,
} from "@chakra-ui/react";
import YearWrapper from "@/components/Atoms/PioneerOfProgress/YearWrapper";
import Year from "@/components/Atoms/PioneerOfProgress/Year";
import Title from "@/components/Atoms/PioneerOfProgress/Title";
import Hotspot from "@/components/Atoms/PioneerOfProgress/Hotspot";
import { border } from "@/constants/pioneersConstant";
import { useError } from "@/hooks/error";
import { Pop1994 } from "@/types/pioneerOfProgress";
import Quiz from "@/components/Atoms/PioneerOfProgress/Quiz";
import ImageModal from "@/components/Atoms/PioneerOfProgress/ImageModal";
import { useOnClickTracking } from "@/hooks/tracking";
import { Parallax } from "react-scroll-parallax";
interface Props {
  collectionRef: CollectionReference;
}
const Pop1994Desktop: FC<Props> = ({ collectionRef }) => {
  const { inView, ref } = useInView({
    triggerOnce: true,
    threshold: 0,
  });
  const [showQuiz, setShowQuiz] = useState(false);
  const [isHeightLowerThan600] = useMediaQuery(
    "screen and (max-height: 610px)"
  );

  const [data, isLoading, error] = useDocumentData(
    inView ? doc(collectionRef as CollectionReference<Pop1994>, "1994") : null,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  useError(error);

  useOnClickTracking(showQuiz, "show-quiz", "pioneers-of-progress-1994");

  return (
    <Box ref={ref}>
      <YearWrapper year={1994}>
        <Stack w="500px" pos="relative" borderRight={border} pt="200px">
          <Year value="1994" top="0" right="-25px" />
          <Parallax translateY={[20, -20]} opacity={[2, 0]}>
            <Title
              px="8"
              dangerouslySetInnerHTML={{
                __html: data ? data.section1.title : "",
              }}
            />
            <Text
              px="8"
              pt="5"
              borderTop={border}
              fontWeight="bold"
              dangerouslySetInnerHTML={{
                __html: data ? data.section1.description : "",
              }}
            />
          </Parallax>
        </Stack>
        <Stack
          w={isHeightLowerThan600 ? "450px" : "500px"}
          pt={isHeightLowerThan600 ? "80px" : "120px"}
          borderRight={border}
        >
          <Parallax translateY={[-20, 10]} opacity={[2, 0]}>
            <ImageModal
              size="5xl"
              pt="8"
              borderTop={border}
              px="8"
              thumbnail={data?.section2.image}
              image={data?.section2.imageModal}
            />
            <Text
              className="caption"
              px="8"
              dangerouslySetInnerHTML={{
                __html: data ? data.section2.caption : "",
              }}
            />
          </Parallax>
        </Stack>
        <Stack w="500px" borderRight={border}>
          <Parallax translateY={[20, -10]} opacity={[2, 0]}>
            <Stack opacity="1" position="relative" borderTop={border} mt="30%">
              <Stack p="8">
                <Title
                  dangerouslySetInnerHTML={{
                    __html: data ? data.section3.title : "",
                  }}
                />
                <Text
                  fontSize="sm"
                  fontWeight="bold"
                  dangerouslySetInnerHTML={{
                    __html: data ? data.section3.subtitle : "",
                  }}
                />
                <Text
                  dangerouslySetInnerHTML={{
                    __html: data ? data.section3.bio : "",
                  }}
                />
              </Stack>
              <ImageModal
                size="xl"
                thumbnail={data?.section3.image}
                image={data?.section3.imageModal}
                position="absolute"
                w="200px"
                top="-170px"
                right="0"
              />
            </Stack>
          </Parallax>
        </Stack>
        <Stack w="600px" pos="relative">
          <Parallax translateY={[15, -15]} opacity={[2, 0]}>
            <Text
              pl="20"
              pt="8"
              pr="8"
              fontWeight="bold"
              color="#F7CF2D"
              sx={{
                textIndent: "-0.75em",
              }}
              borderTop={border}
              mt="10"
              dangerouslySetInnerHTML={{
                __html: data ? data.section4.quote : "",
              }}
            />
            <Text
              fontSize="sm"
              pl="20"
              dangerouslySetInnerHTML={{
                __html: data ? data.section4.author : "",
              }}
            />
          </Parallax>
          <Year bottom="5%" left="-40px" value="1994" />
        </Stack>
        <Stack w="700px">
          <Grid
            h="100%"
            templateColumns={"250px 170px 280px"}
            templateRows={"1fr 210px 10px"}
            templateAreas={`"year year ."
        "img quiz quiz"
        "hotspot . ."`}
          >
            <GridItem area="year" borderLeft={border}>
              <Parallax translateY={[-20, 20]} opacity={[2, 0]}>
                <Year mt="70px" ml="30px" position="relative" value="1994" />
              </Parallax>
            </GridItem>
            <GridItem area="img" alignSelf="end" justifySelf="end" zIndex={1}>
              <Img maxW="450px" src={data?.section5.image} />
              <Text
                className="caption"
                dangerouslySetInnerHTML={{
                  __html: data ? data.section5.caption : "",
                }}
              />
            </GridItem>
            <GridItem
              area="quiz"
              alignSelf="end"
              justifySelf="end"
              w="600px"
              pr="10"
              pt="50px"
              borderTop={border}
            >
              <Stack
                transition="all 1.5s ease-in"
                opacity={showQuiz ? 1 : 0}
                transform={showQuiz ? "translateY(-1.4em)" : "translateY(0)"}
              >
                <Title mb="2" fontSize="2xl" pl="190px">
                  DO YOU KNOW?
                </Title>
                {data && (
                  <Quiz
                    pl="190px"
                    borderRightRadius="xl"
                    quiz={data.section5.quiz}
                  />
                )}
              </Stack>
            </GridItem>
            <GridItem pl="100px" zIndex={2} area="hotspot" alignSelf="end">
              <Hotspot onClick={() => setShowQuiz(!showQuiz)} />
            </GridItem>
          </Grid>
        </Stack>
      </YearWrapper>
    </Box>
  );
};

export default Pop1994Desktop;
