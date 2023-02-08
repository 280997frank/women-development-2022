import { FC } from "react";
import { useInView } from "react-intersection-observer";
import { useDocumentData } from "react-firehooks";
import { CollectionReference, doc } from "firebase/firestore";
import { Stack, Text, Img, Grid, GridItem, Box } from "@chakra-ui/react";
import YearWrapper from "@/components/Atoms/PioneerOfProgress/YearWrapper";
import Year from "@/components/Atoms/PioneerOfProgress/Year";
import Title from "@/components/Atoms/PioneerOfProgress/Title";
import { border } from "@/constants/pioneersConstant";
import { useError } from "@/hooks/error";
import { Pop2009 } from "@/types/pioneerOfProgress";
import ImageModal from "@/components/Atoms/PioneerOfProgress/ImageModal";
import { Parallax } from "react-scroll-parallax";
interface Props {
  collectionRef: CollectionReference;
}

const Pop2009Desktop: FC<Props> = ({ collectionRef }) => {
  const { inView, ref } = useInView({
    triggerOnce: true,
    threshold: 0,
  });

  const [data, isLoading, error] = useDocumentData(
    inView ? doc(collectionRef as CollectionReference<Pop2009>, "2009") : null,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  useError(error);

  return (
    <Box ref={ref}>
      <YearWrapper year={2009}>
        <Stack
          w="500px"
          borderRight={border}
          pos="relative"
          justifyContent="flex-end"
          pb="120px"
          spacing={0}
        >
          <Box flex="1">&nbsp;</Box>
          <Parallax translateY={[-20, 10]} opacity={[2, 0]}>
            <Stack>
              <Title
                px="16"
                pb="5"
                borderBottom={border}
                dangerouslySetInnerHTML={{
                  __html: data ? data.section1.title : "",
                }}
              />
              <Text
                px="16"
                pt="5"
                fontWeight="bold"
                dangerouslySetInnerHTML={{
                  __html: data ? data.section1.description : "",
                }}
              />
            </Stack>
          </Parallax>

          <Year bottom="0" left="-60px" value="2009" />
        </Stack>
        <Stack w="500px">
          <Parallax translateY={[20, -5]} opacity={[2, 0]}>
            <Stack>
              <ImageModal
                size="5xl"
                mt="10"
                p="8"
                pb="0"
                borderTop={border}
                thumbnail={data?.section2.image}
                image={data?.section2.imageModal}
              />
              <Text
                px="8"
                className="caption"
                dangerouslySetInnerHTML={{
                  __html: data ? data.section2.caption : "",
                }}
              />
            </Stack>
          </Parallax>
          {/* <Year left="41%" bottom="0" value="2009" /> */}
        </Stack>
        <Box borderRight={border} w="700px">
          <Grid
            templateAreas={`"borderLeft quote"
        "profile profile"
        "profile profile"`}
            templateColumns={"100px 600px"}
            templateRows={"80px auto 1fr"}
          >
            <GridItem area="borderLeft" borderLeft={border}>
              &nbsp;
            </GridItem>
            <GridItem area="quote" pr="16">
              <Parallax translateX={[-15, 5]} opacity={[2, 0]}>
                <Stack>
                  <Text
                    fontWeight="bold"
                    color="#F7CF2D"
                    sx={{
                      textIndent: "-0.75em",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: data ? data.section4.quote : "",
                    }}
                  />
                  <Text
                    fontSize="sm"
                    dangerouslySetInnerHTML={{
                      __html: data ? data.section4.author : "",
                    }}
                  />
                </Stack>
              </Parallax>
            </GridItem>
            <GridItem
              area="profile"
              borderRight={border}
              borderLeft={border}
              pt="10"
            >
              <Parallax translateY={[20, 0]} opacity={[2, 0]}>
                <Stack p="8" spacing={8} direction="row" borderTop={border}>
                  <Stack>
                    <Title
                      dangerouslySetInnerHTML={{
                        __html: data ? data.section3.title : "",
                      }}
                    />
                    <Text
                      pb="5"
                      fontSize="sm"
                      fontWeight="500"
                      dangerouslySetInnerHTML={{
                        __html: data ? data.section3.subtitle : "",
                      }}
                    />
                    <Text
                      fontSize="sm"
                      dangerouslySetInnerHTML={{
                        __html: data ? data.section3.bio : "",
                      }}
                    />
                  </Stack>
                  <ImageModal
                    size="xl"
                    w="150px"
                    thumbnail={data?.section3.image}
                    image={data?.section3.imageModal}
                  />
                </Stack>
              </Parallax>
            </GridItem>
          </Grid>
        </Box>
      </YearWrapper>
    </Box>
  );
};

export default Pop2009Desktop;
