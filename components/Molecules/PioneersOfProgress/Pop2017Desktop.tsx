import { FC } from "react";
import {
  Text,
  Img,
  Grid,
  GridItem,
  Box,
  Stack,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import { useInView } from "react-intersection-observer";
import { useDocumentData } from "react-firehooks";
import { CollectionReference, doc } from "firebase/firestore";
import YearWrapper from "@/components/Atoms/PioneerOfProgress/YearWrapper";
import Year from "@/components/Atoms/PioneerOfProgress/Year";
import Title from "@/components/Atoms/PioneerOfProgress/Title";
import { border } from "@/constants/pioneersConstant";
import { useError } from "@/hooks/error";
import { Pop2017 } from "@/types/pioneerOfProgress";
import VideoModal from "@/components/Atoms/PioneerOfProgress/VideoModal";
import ImageModal from "@/components/Atoms/PioneerOfProgress/ImageModal";
import { Parallax } from "react-scroll-parallax";
interface Props {
  collectionRef: CollectionReference;
}

const Pop2017Desktop: FC<Props> = ({ collectionRef }) => {
  const { inView, ref } = useInView({
    triggerOnce: true,
    threshold: 0,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isHeightLowerThan520] = useMediaQuery(
    "screen and (max-height: 587px)"
  );

  const [data, isLoading, error] = useDocumentData(
    inView ? doc(collectionRef as CollectionReference<Pop2017>, "2017") : null,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  useError(error);
  return (
    <Box ref={ref}>
      <YearWrapper year={2017}>
        <Box w={isHeightLowerThan520 ? "950px" : "1100px"} borderRight={border}>
          <Grid
            h="100%"
            templateAreas={`"year year img"
                            "desc desc img"
                            "video caption caption"`}
            templateColumns={
              isHeightLowerThan520 ? "420px 100px 430px" : "520px 100px 480px"
            }
            templateRows={"15% 40% 55%"}
          >
            <GridItem area="year" borderRight={border}>
              <Parallax translateX={[-5, 10]} opacity={[2, 0]}>
                <Year pl="8" transform="translateY(-20px)" value="2017" />
              </Parallax>
            </GridItem>
            <GridItem area="desc" borderRight={border}>
              <Parallax translateY={[20, -10]} opacity={[2, 0]}>
                <Stack>
                  <Title
                    pl="150px"
                    pb="5"
                    borderBottom={border}
                    dangerouslySetInnerHTML={{
                      __html: data ? data.section1.title : "",
                    }}
                  />
                  <Text
                    pl="150px"
                    pt="5"
                    pr="8"
                    fontWeight="bold"
                    dangerouslySetInnerHTML={{
                      __html: data ? data.section1.description : "",
                    }}
                  />
                </Stack>
              </Parallax>
            </GridItem>
            <GridItem alignSelf="end" pr="1rem" pb="45px" pl="150px">
              <Parallax opacity={[2, 0]}>
                <Img
                  cursor="pointer"
                  onClick={onOpen}
                  src={data?.section1.video.thumbnail}
                  w={isHeightLowerThan520 ? "250px" : "350px"}
                  // w={window.innerHeight < 600 ? "300px" : "350px"}
                  mb="2"
                />
              </Parallax>
            </GridItem>
            <GridItem area="caption" alignSelf="end" pb="50px">
              <Parallax opacity={[2, 0]}>
                <Text
                  className="caption"
                  dangerouslySetInnerHTML={{
                    __html: data ? data.section1.video.caption : "",
                  }}
                />
              </Parallax>
            </GridItem>
            <GridItem area="img" p="8" px={isHeightLowerThan520 ? "16" : "8"}>
              <Parallax translateY={[10, -20]} opacity={[2, 0]}>
                <ImageModal
                  thumbnail={data?.section1.image}
                  image={data?.section1.imageModal}
                  mb="2"
                />
                <Text
                  className="caption"
                  dangerouslySetInnerHTML={{
                    __html: data ? data.section1.caption : "",
                  }}
                />
              </Parallax>
            </GridItem>
          </Grid>
        </Box>
        <Stack w="700px" borderRight={border}>
          <Parallax translateY={[20, -15]} opacity={[2, 0]}>
            <Stack>
              <Year value="2017" alignSelf="end" pr="10" pos="relative" />
              <Stack borderTop={border} p="5" direction="row">
                <Stack>
                  <Title
                    dangerouslySetInnerHTML={{
                      __html: data ? data.section2.title : "",
                    }}
                  />
                  <Text
                    fontWeight="500"
                    fontSize="sm"
                    dangerouslySetInnerHTML={{
                      __html: data ? data.section2.subtitle : "",
                    }}
                  />
                  <Text
                    fontSize="sm"
                    dangerouslySetInnerHTML={{
                      __html: data ? data.section2.bio : "",
                    }}
                  />
                </Stack>
                <ImageModal
                  size="2xl"
                  w="200px"
                  thumbnail={data?.section2.image}
                  image={data?.section2.imageModal}
                />
              </Stack>
            </Stack>
          </Parallax>

          <Stack
            flex="1"
            alignItems="center"
            justifyContent="center"
            pl="20%"
            pr="4"
          >
            <Parallax translateX={[10, -15]} opacity={[2, 0]}>
              <Stack>
                <Text
                  color="#F7CF2D"
                  sx={{ textIndent: "-0.75em" }}
                  fontWeight="bold"
                  dangerouslySetInnerHTML={{
                    __html: data ? data.section2.quote : "",
                  }}
                />
                <Text
                  fontSize="sm"
                  dangerouslySetInnerHTML={{
                    __html: data ? data.section2.author : "",
                  }}
                />
              </Stack>
            </Parallax>
          </Stack>
        </Stack>
        {data && (
          <VideoModal
            isOpen={isOpen}
            onClose={onClose}
            videoSrc={data.section1.video.videoSrc}
          />
        )}
      </YearWrapper>
    </Box>
  );
};

export default Pop2017Desktop;
