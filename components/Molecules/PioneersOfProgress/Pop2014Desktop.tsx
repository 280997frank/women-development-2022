import { FC } from "react";
import { useInView } from "react-intersection-observer";
import { useDocumentData } from "react-firehooks";
import { CollectionReference, doc } from "firebase/firestore";
import {
  Text,
  useMediaQuery,
  Grid,
  GridItem,
  Box,
  Stack,
} from "@chakra-ui/react";
import YearWrapper from "@/components/Atoms/PioneerOfProgress/YearWrapper";
import Year from "@/components/Atoms/PioneerOfProgress/Year";
import Title from "@/components/Atoms/PioneerOfProgress/Title";
import { border } from "@/constants/pioneersConstant";
import { useError } from "@/hooks/error";
import { Pop2014 } from "@/types/pioneerOfProgress";
import ImageModal from "@/components/Atoms/PioneerOfProgress/ImageModal";
import { Parallax } from "react-scroll-parallax";
interface Props {
  collectionRef: CollectionReference;
}

const Pop2014Desktop: FC<Props> = ({ collectionRef }) => {
  const { inView, ref } = useInView({
    triggerOnce: true,
    threshold: 0,
  });
  const [isHeightLowerThan600] = useMediaQuery(
    "screen and (max-height: 610px)"
  );

  const [data, isLoading, error] = useDocumentData(
    inView ? doc(collectionRef as CollectionReference<Pop2014>, "2014") : null,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  useError(error);
  return (
    <Box ref={ref}>
      <YearWrapper year={2014}>
        <Box w={isHeightLowerThan600 ? "900px" : "1000px"} borderRight={border}>
          <Grid
            h="100%"
            templateAreas={`"year empty"
                              "title img"
                              "empty1 img"
                              "desc img"
                              "borderLeft img"`}
            templateColumns={isHeightLowerThan600 ? "65% 35%" : "58% 42%"}
            templateRows={"120px 150px 10px 100px 1fr"}
          >
            <GridItem area="year" justifySelf="end" borderRight={border}>
              <Year value="2014" position="relative" pt="50px" pr="20" />
            </GridItem>
            <GridItem area="title" borderLeft={border} borderRight={border}>
              <Parallax translateY={[-10, 10]} opacity={[2, 0]}>
                <Title
                  pt="10"
                  pl="100px"
                  pr="20"
                  dangerouslySetInnerHTML={{
                    __html: data ? data.section1.title : "",
                  }}
                />
              </Parallax>
            </GridItem>
            <GridItem area="desc" borderLeft={border} alignSelf="end">
              <Parallax translateY={[-10, 10]} opacity={[2, 0]}>
                <Text
                  fontSize="sm"
                  fontWeight="bold"
                  borderTop={border}
                  pl="100px"
                  pt="4"
                  pr="20"
                  dangerouslySetInnerHTML={{
                    __html: data ? data.section1.description : "",
                  }}
                />
              </Parallax>
            </GridItem>
            <GridItem area="empty">&nbsp;</GridItem>
            <GridItem area="empty1" borderLeft={border}>
              &nbsp;
            </GridItem>
            <GridItem area="img" alignSelf="end">
              <Parallax translateY={[-20, 0]} opacity={[1.5, 0]}>
                <Stack px="8" pt="8" borderTop={border}>
                  <ImageModal
                    size="xl"
                    thumbnail={data?.section2.image}
                    image={data?.section2.imageModal}
                  />
                  <Text
                    className="caption"
                    fontSize="sm"
                    dangerouslySetInnerHTML={{
                      __html: data ? data.section2.caption : "",
                    }}
                  />
                </Stack>
              </Parallax>
            </GridItem>
            <GridItem area="borderLeft" borderLeft={border}>
              &nbsp;
            </GridItem>
          </Grid>
        </Box>
      </YearWrapper>
    </Box>
  );
};

export default Pop2014Desktop;
