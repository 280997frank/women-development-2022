import { FC, Dispatch, SetStateAction, useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useDocumentData } from "react-firehooks";
import { CollectionReference, doc } from "firebase/firestore";
import {
  Box,
  Stack,
  Grid,
  Text,
  GridItem,
  Flex,
  useMediaQuery,
} from "@chakra-ui/react";
import YearWrapper from "@/components/Atoms/PioneerOfProgress/YearWrapper";
import Year from "@/components/Atoms/PioneerOfProgress/Year";
import Hotspot from "@/components/Atoms/PioneerOfProgress/Hotspot";
import { border } from "@/constants/pioneersConstant";
import Title from "@/components/Atoms/PioneerOfProgress/Title";
import Quiz from "@/components/Atoms/PioneerOfProgress/Quiz";
import { useError } from "@/hooks/error";
import { Pop1960 } from "@/types/pioneerOfProgress";
import ImageModal from "@/components/Atoms/PioneerOfProgress/ImageModal";
import { useOnClickTracking } from "@/hooks/tracking";
import { Parallax } from "react-scroll-parallax";

interface Props {
  collectionRef: CollectionReference;
}

const Pop1960Desktop: FC<Props> = ({ collectionRef }) => {
  const { inView, ref, entry } = useInView({
    triggerOnce: true,
    threshold: 0,
  });

  const [isHeightLowerThan600] = useMediaQuery(
    "screen and (max-height: 610px)"
  );
  const [isHeightLowerThan750] = useMediaQuery(
    "screen and (max-height: 750px)"
  );
  const [showQuiz, setShowQuiz] = useState(false);

  const [data, isLoading, error] = useDocumentData(
    inView ? doc(collectionRef as CollectionReference<Pop1960>, "1960") : null,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  useError(error);

  useOnClickTracking(showQuiz, "show-quiz", "pioneers-of-progress-1960");

  return (
    <Box ref={ref}>
      <YearWrapper year={1960}>
        <Stack
          w={isHeightLowerThan600 ? "450px" : "550px"}
          justifyContent="center"
        >
          <Parallax translateX={[0, -20]} opacity={[2, 0]}>
            <Year
              left={isHeightLowerThan600 ? "-16%" : "-14%"}
              top={isHeightLowerThan600 ? "0" : "7%"}
              value="1960"
              pos="relative"
            />
          </Parallax>
          <Parallax speed={15} translateX={[20, -20]} opacity={[2, 0]}>
            <Stack px="5">
              {/* <Img src={data?.section1.image} /> */}
              <ImageModal
                image={data?.section1.imageModal}
                thumbnail={data?.section1.image}
              />
              <Text
                className="caption"
                dangerouslySetInnerHTML={{
                  __html: data ? data.section1.caption : "",
                }}
              />
            </Stack>
          </Parallax>
        </Stack>
        <Box borderLeft={border} w="700px" pos="relative">
          <Year h="100%" value="1960" top="-28px" left="90px" />
          <Parallax translateY={[10, -10]} opacity={[2, 0]}>
            <Grid
              borderTop={border}
              pt={isHeightLowerThan600 ? "4" : "8"}
              pr="8"
              pl="4"
              mt="8"
              h="100%"
              templateColumns={"40px auto 300px"}
              templateRows={"45px 45% 1fr"}
              templateAreas={`"hotspot . caption"
        ". img img"
        ". quiz quiz"`}
              overflowY="hidden"
            >
              <GridItem area="hotspot" zIndex="2">
                <Hotspot onClick={() => setShowQuiz(!showQuiz)} />
              </GridItem>
              <GridItem area="caption">
                <Text
                  className="caption"
                  dangerouslySetInnerHTML={{
                    __html: data ? data.section2.caption : "",
                  }}
                />
              </GridItem>
              <GridItem area="img" zIndex={1}>
                <ImageModal
                  w="100%"
                  h="100%"
                  objectFit="cover"
                  image={data?.section2.imageModal}
                  thumbnail={data?.section2.image}
                />
              </GridItem>
              <GridItem area="quiz">
                <Flex
                  transform={showQuiz ? "translateY(0)" : "translateY(-101%)"}
                  transition="transform 0.5s ease-out"
                >
                  <Title flexShrink={0} fontSize="2xl" w="25%" lineHeight="7">
                    DO YOU KNOW?
                  </Title>
                  {data ? (
                    <Quiz
                      sx={{
                        ".funfact": {
                          fontSize: isHeightLowerThan600 ? "0.5rem" : "0.7rem",
                        },
                      }}
                      borderBottomRadius="xl"
                      flex="1"
                      quiz={data.section2.quiz}
                      isHidden={!showQuiz}
                    />
                  ) : null}
                </Flex>
              </GridItem>
            </Grid>
          </Parallax>
        </Box>
      </YearWrapper>
    </Box>
  );
};

export default Pop1960Desktop;
