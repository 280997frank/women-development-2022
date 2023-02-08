import { FC, Dispatch, SetStateAction } from "react";
import {
  Text,
  Grid,
  GridItem,
  Box,
  Stack,
  useMediaQuery,
  useDisclosure,
  Img,
} from "@chakra-ui/react";
import { useInView } from "react-intersection-observer";
import { useDocumentData } from "react-firehooks";
import { CollectionReference, doc } from "firebase/firestore";
import YearWrapper from "@/components/Atoms/PioneerOfProgress/YearWrapper";
import Year from "@/components/Atoms/PioneerOfProgress/Year";
import Title from "@/components/Atoms/PioneerOfProgress/Title";
import { border } from "@/constants/pioneersConstant";
import { useError } from "@/hooks/error";
import { Pop2019 } from "@/types/pioneerOfProgress";
import VideoModal from "@/components/Atoms/PioneerOfProgress/VideoModal";
import { Parallax } from "react-scroll-parallax";
interface Props {
  collectionRef: CollectionReference;
  setScrollBox: Dispatch<SetStateAction<boolean>>;
}

const Pop2019Desktop: FC<Props> = ({ collectionRef, setScrollBox }) => {
  const { inView, ref } = useInView({
    triggerOnce: true,
    threshold: 0,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isHeightLowerThan600] = useMediaQuery(
    "screen and (max-height: 610px)"
  );
  const [isHeightLowerThan750] = useMediaQuery(
    "screen and (max-height: 750px)"
  );

  const [data, isLoading, error] = useDocumentData(
    inView ? doc(collectionRef as CollectionReference<Pop2019>, "2019") : null,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  useError(error);

  return (
    <Box ref={ref}>
      <YearWrapper year={2019}>
        <Stack w="500px" pos="relative" borderRight={border}>
          <Parallax translateY={[-15, 10]} opacity={[2, 0]}>
            <Stack pt="25%">
              <Title
                px="8"
                borderBottom={border}
                pb="5"
                dangerouslySetInnerHTML={{
                  __html: data ? data.section1.title : "",
                }}
              />
              <Text
                px="8"
                py="5"
                fontWeight="bold"
                dangerouslySetInnerHTML={{
                  __html: data ? data.section1.description : "",
                }}
              />
            </Stack>
          </Parallax>
          <Year value="2019" top="75%" right="-30px" />
        </Stack>
        <Box w="1000px">
          <Grid
            h="100%"
            templateAreas={`"desc empty empty"
          "video video caption"`}
            templateColumns={"50% 10% 40%"}
            templateRows={"60% 1fr"}
          >
            <GridItem
              area="desc"
              overflowY="auto"
              onMouseOver={() => {
                if (isHeightLowerThan750) {
                  setScrollBox(false);
                }
              }}
              onMouseOut={() => setScrollBox(true)}
              sx={{
                "::-webkit-scrollbar": {
                  width: "5px",
                },
                "::-webkit-scrollbar-track": {
                  borderRadius: "10px",
                },
                "::-webkit-scrollbar-thumb": {
                  background: "#f5f5f5",
                  borderRadius: "10px",
                },
              }}
            >
              <Stack>
                <Title
                  px="8"
                  pt={isHeightLowerThan600 ? "6" : "16"}
                  pb="5"
                  borderBottom={border}
                  dangerouslySetInnerHTML={{
                    __html: data ? data.section2.title : "",
                  }}
                />
                <Text
                  px="8"
                  pt="5"
                  fontWeight="bold"
                  dangerouslySetInnerHTML={{
                    __html: data ? data.section2.description : "",
                  }}
                />
              </Stack>
            </GridItem>
            <GridItem
              area="video"
              alignSelf="end"
              justifySelf="end"
              pr="4"
              pt="8"
            >
              <Img
                onClick={onOpen}
                cursor="pointer"
                src={data?.section2.video.thumbnail}
                w={isHeightLowerThan600 ? "250px" : "350px"}
                mb="2"
              />
            </GridItem>
            <GridItem borderLeft={border} area="empty">
              &nbsp;
            </GridItem>
            <GridItem area="caption" alignSelf="end">
              <Text
                className="caption"
                fontSize="sm"
                dangerouslySetInnerHTML={{
                  __html: data ? data.section2.video.caption : "",
                }}
              />
            </GridItem>
          </Grid>
        </Box>
        {data && (
          <VideoModal
            isOpen={isOpen}
            onClose={onClose}
            videoSrc={data.section2.video.videoSrc}
          />
        )}
      </YearWrapper>
    </Box>
  );
};

export default Pop2019Desktop;
