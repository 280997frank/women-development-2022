import { FC } from "react";
import { useInView } from "react-intersection-observer";
import { useDocumentData } from "react-firehooks";
import { CollectionReference, doc } from "firebase/firestore";
import { Stack, Text, Box, useMediaQuery } from "@chakra-ui/react";
import YearWrapper from "@/components/Atoms/PioneerOfProgress/YearWrapper";
import Year from "@/components/Atoms/PioneerOfProgress/Year";
import Title from "@/components/Atoms/PioneerOfProgress/Title";
import { border } from "@/constants/pioneersConstant";
import { Pop1961 } from "@/types/pioneerOfProgress";
import { useError } from "@/hooks/error";
import ImageModal from "@/components/Atoms/PioneerOfProgress/ImageModal";
import { Parallax } from "react-scroll-parallax";

interface Props {
  collectionRef: CollectionReference;
}

const Pop1961Desktop: FC<Props> = ({ collectionRef }) => {
  const { inView, ref } = useInView({
    triggerOnce: true,
    threshold: 0,
  });
  const [isHeightLowerThan600] = useMediaQuery(
    "screen and (max-height: 610px)"
  );

  const [data, isLoading, error] = useDocumentData(
    inView ? doc(collectionRef as CollectionReference<Pop1961>, "1961") : null,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  useError(error);

  return (
    <Box ref={ref} overflow="hidden">
      <YearWrapper year={1961}>
        <Parallax opacity={[3, -1]}>
          <Stack
            w="580px"
            border={border}
            borderWidth="2px"
            borderColor="#F7CF2D"
            px="10"
            h="100%"
          >
            <Year
              sx={{
                "&>img": {
                  maxW: "180px",
                },
              }}
              position="relative"
              value="1961"
            />
            <Title
              fontSize="2xl"
              dangerouslySetInnerHTML={{ __html: data ? data.title : "" }}
            />
            <Text
              fontWeight="bold"
              dangerouslySetInnerHTML={{ __html: data ? data.description : "" }}
            />
            <ImageModal
              w={isHeightLowerThan600 ? "45%" : "60%"}
              thumbnail={data?.image}
              image={data?.imageModal}
            />
          </Stack>
        </Parallax>
      </YearWrapper>
    </Box>
  );
};

export default Pop1961Desktop;
