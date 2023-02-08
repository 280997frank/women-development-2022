import { FC } from "react";
import { useInView } from "react-intersection-observer";
import { useDocumentData } from "react-firehooks";
import { CollectionReference, doc } from "firebase/firestore";
import { Stack, Text, Grid, GridItem, Box } from "@chakra-ui/react";
import YearWrapper from "@/components/Atoms/PioneerOfProgress/YearWrapper";
import Year from "@/components/Atoms/PioneerOfProgress/Year";
import Title from "@/components/Atoms/PioneerOfProgress/Title";
import { border } from "@/constants/pioneersConstant";
import { useError } from "@/hooks/error";
import { Pop1968 } from "@/types/pioneerOfProgress";
import ImageModal from "@/components/Atoms/PioneerOfProgress/ImageModal";
import { Parallax } from "react-scroll-parallax";

interface Props {
  collectionRef: CollectionReference;
}

const Pop1968Desktop: FC<Props> = ({ collectionRef }) => {
  const { inView, ref } = useInView({
    triggerOnce: true,
    threshold: 0,
  });

  const [data, isLoading, error] = useDocumentData(
    inView ? doc(collectionRef as CollectionReference<Pop1968>, "1968") : null,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  useError(error);

  return (
    <Box ref={ref}>
      <YearWrapper year={1968}>
        <Stack w="500px" spacing={0} pos="relative">
          <Parallax translateX={[10, -20]} opacity={[2, 0]}>
            <Year value="1968" right="-40px" top="-50px" />
          </Parallax>
          <Grid
            templateColumns="100% 70%"
            templateRows={"1fr 25% 100px"}
            templateAreas={`"desc empty"
            "img empty"
            "img caption"`}
            h="100%"
          >
            <GridItem area="desc">
              <Parallax translateY={[-20, 30]} opacity={[2, 0]}>
                <Title
                  pt="40px"
                  px="10"
                  pb="5"
                  borderBottom={border}
                  dangerouslySetInnerHTML={{ __html: data ? data.title : "" }}
                />
                <Text
                  px="10"
                  py="5"
                  fontWeight="bold"
                  dangerouslySetInnerHTML={{
                    __html: data ? data.description : "",
                  }}
                />
              </Parallax>
            </GridItem>
            <GridItem area="img">
              <Parallax
                style={{
                  height: "100%",
                }}
                translateY={[-20, 10]}
                opacity={[2, 0]}
              >
                <ImageModal
                  px="10"
                  h="100%"
                  w="100%"
                  objectFit="cover"
                  thumbnail={data?.image}
                  image={data?.imageModal}
                />
              </Parallax>
            </GridItem>
            <GridItem area="empty" borderLeft={border}>
              &nbsp;
            </GridItem>
            <GridItem alignSelf="end" area="caption" pt="2">
              <Parallax translateX={[10, -20]} opacity={[2, 0]}>
                <Text
                  className="caption"
                  fontSize="sm"
                  dangerouslySetInnerHTML={{ __html: data ? data.caption : "" }}
                />
              </Parallax>
            </GridItem>
          </Grid>
        </Stack>
      </YearWrapper>
    </Box>
  );
};

export default Pop1968Desktop;
