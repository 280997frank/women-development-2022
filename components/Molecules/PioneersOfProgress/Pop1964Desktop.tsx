import { FC } from "react";
import { useInView } from "react-intersection-observer";
import { useDocumentData } from "react-firehooks";
import { CollectionReference, doc } from "firebase/firestore";
import { Box, Text, Grid, GridItem, Center } from "@chakra-ui/react";
import YearWrapper from "@/components/Atoms/PioneerOfProgress/YearWrapper";
import Year from "@/components/Atoms/PioneerOfProgress/Year";
import Title from "@/components/Atoms/PioneerOfProgress/Title";
import { border } from "@/constants/pioneersConstant";
import { useError } from "@/hooks/error";
import { Pop1964 } from "@/types/pioneerOfProgress";
import ImageModal from "@/components/Atoms/PioneerOfProgress/ImageModal";
import { Parallax } from "react-scroll-parallax";

interface Props {
  collectionRef: CollectionReference;
}

const Pop1964Desktop: FC<Props> = ({ collectionRef }) => {
  const { inView, ref } = useInView({
    triggerOnce: true,
    threshold: 0,
  });

  const [data, isLoading, error] = useDocumentData(
    inView ? doc(collectionRef as CollectionReference<Pop1964>, "1964") : null,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  useError(error);

  return (
    <Box ref={ref}>
      <YearWrapper year={1964}>
        <Box w="1000px" borderRight={border}>
          <Grid
            h="100%"
            templateColumns="100px 300px 150px 350px 100px"
            templateRows="1fr 20px 15px 30% 15%"
            templateAreas={`"desc desc desc . ."
            "desc desc desc box box"
            ". . . . ."
            "year year img img ."
            ". caption img img ."`}
          >
            <GridItem area="desc" borderRight={border}>
              <Parallax translateY={[40, -20]} opacity={[2, 0]}>
                <Title
                  px="8"
                  py="2"
                  borderBottom={border}
                  dangerouslySetInnerHTML={{ __html: data ? data.title : "" }}
                />
                <Text
                  fontWeight="bold"
                  px="8"
                  py="5"
                  dangerouslySetInnerHTML={{
                    __html: data ? data.description : "",
                  }}
                />
              </Parallax>
            </GridItem>
            <GridItem area="box" borderTop={border}>
              &nbsp;
            </GridItem>
            <GridItem area="year">
              <Center>
                <Parallax translateY={[-20, 20]} opacity={[2, 0]}>
                  <Year pt="60px" position="relative" value="1964" />
                </Parallax>
              </Center>
            </GridItem>
            <GridItem area="img" pl="5">
              <Parallax
                style={{ height: "100%" }}
                translateX={[20, -10]}
                opacity={[2, 0]}
              >
                <ImageModal
                  maxW="auto"
                  h="100%"
                  thumbnail={data?.image}
                  image={data?.imageModal}
                />
              </Parallax>
            </GridItem>
            <GridItem area="caption" alignSelf="end">
              <Parallax translateY={[-20, 20]} opacity={[2, 0]}>
                <Text
                  className="caption"
                  dangerouslySetInnerHTML={{ __html: data ? data.caption : "" }}
                />
              </Parallax>
            </GridItem>
          </Grid>
        </Box>
      </YearWrapper>
    </Box>
  );
};

export default Pop1964Desktop;
