import { FC } from "react";
import { useInView } from "react-intersection-observer";
import { useDocumentData } from "react-firehooks";
import { CollectionReference, doc } from "firebase/firestore";
import { Text, Stack, Box } from "@chakra-ui/react";
import YearWrapper from "@/components/Atoms/PioneerOfProgress/YearWrapper";
import Year from "@/components/Atoms/PioneerOfProgress/Year";
import Title from "@/components/Atoms/PioneerOfProgress/Title";
import { border } from "@/constants/pioneersConstant";
import { useError } from "@/hooks/error";
import { Pop1978 } from "@/types/pioneerOfProgress";
import { Parallax } from "react-scroll-parallax";
interface Props {
  collectionRef: CollectionReference;
}

const Pop1978Desktop: FC<Props> = ({ collectionRef }) => {
  const { inView, ref } = useInView({
    triggerOnce: true,
    threshold: 0,
  });

  const [data, isLoading, error] = useDocumentData(
    inView ? doc(collectionRef as CollectionReference<Pop1978>, "1978") : null,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  useError(error);

  return (
    <Box ref={ref}>
      <YearWrapper year={1978}>
        <Stack w="500px" borderRight={border} h="100%">
          <Parallax translateY={[20, -20]} opacity={[2, 0]}>
            <Title
              borderBottom={border}
              pl="100px"
              pr="8"
              pt="20"
              pb="5"
              dangerouslySetInnerHTML={{ __html: data ? data.title : "" }}
            />
            <Text
              pt="5"
              fontWeight="bold"
              pl="100px"
              pr="8"
              dangerouslySetInnerHTML={{ __html: data ? data.description : "" }}
            />
            <Year value="1978" position="relative" pl="60px" />
          </Parallax>
        </Stack>
      </YearWrapper>
    </Box>
  );
};

export default Pop1978Desktop;
