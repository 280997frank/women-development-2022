import { FC } from "react";
import { useInView } from "react-intersection-observer";
import { useDocumentData } from "react-firehooks";
import { CollectionReference, doc } from "firebase/firestore";
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
import YearWrapper from "@/components/Atoms/PioneerOfProgress/YearWrapper";
import Year from "@/components/Atoms/PioneerOfProgress/Year";
import Title from "@/components/Atoms/PioneerOfProgress/Title";
import { border } from "@/constants/pioneersConstant";
import { useError } from "@/hooks/error";
import { Pop2016 } from "@/types/pioneerOfProgress";
import VideoModal from "@/components/Atoms/PioneerOfProgress/VideoModal";
import { Parallax } from "react-scroll-parallax";
interface Props {
  collectionRef: CollectionReference;
}

const Pop2016Desktop: FC<Props> = ({ collectionRef }) => {
  const { inView, ref } = useInView({
    triggerOnce: true,
    threshold: 0,
  });
  const [isHeightLowerThan600] = useMediaQuery(
    "screen and (max-height: 610px)"
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, isLoading, error] = useDocumentData(
    inView ? doc(collectionRef as CollectionReference<Pop2016>, "2016") : null,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  useError(error);
  return (
    <Box ref={ref}>
      <YearWrapper year={2016}>
        <Box w="850px" borderRight={border} pos="relative">
          <Grid
            templateAreas={`"desc ."
                            "year video"`}
            templateColumns={"600px 250px"}
            templateRows={"auto 1fr"}
          >
            <GridItem area="desc">
              <Stack borderRight={border}>
                <Parallax translateY={[-10, 0]} opacity={[2, 0]}>
                  <Title
                    px="8"
                    pb="5"
                    borderBottom={border}
                    pt="30px"
                    dangerouslySetInnerHTML={{ __html: data ? data.title : "" }}
                  />
                  <Text
                    pt="5"
                    px="8"
                    fontWeight="bold"
                    dangerouslySetInnerHTML={{
                      __html: data ? data.description : "",
                    }}
                  />
                </Parallax>
              </Stack>
            </GridItem>
            <GridItem area="year">
              <Year value="2016" left="-15px" />
            </GridItem>
            <GridItem
              area="video"
              justifySelf="end"
              alignItems="end"
              pr="10"
              pt="5"
              w={isHeightLowerThan600 ? "350px" : "400px"}
            >
              <Parallax translateX={[-20, 10]} opacity={[2, 0]}>
                <Img
                  cursor="pointer"
                  onClick={onOpen}
                  src={data?.video.thumbnail}
                  mb="2"
                />
                <Text
                  fontSize="sm"
                  className="caption"
                  dangerouslySetInnerHTML={{
                    __html: data ? data.video.caption : "",
                  }}
                />
              </Parallax>
            </GridItem>
          </Grid>
        </Box>
        {data && (
          <VideoModal
            isOpen={isOpen}
            onClose={onClose}
            videoSrc={data.video.videoSrc}
          />
        )}
      </YearWrapper>
    </Box>
  );
};

export default Pop2016Desktop;
