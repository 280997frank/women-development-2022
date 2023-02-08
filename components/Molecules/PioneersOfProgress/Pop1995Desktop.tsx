import { FC } from "react";
import { useInView } from "react-intersection-observer";
import { useDocumentData } from "react-firehooks";
import { CollectionReference, doc } from "firebase/firestore";
import { Stack, Text, Box } from "@chakra-ui/react";
import YearWrapper from "@/components/Atoms/PioneerOfProgress/YearWrapper";
import Year from "@/components/Atoms/PioneerOfProgress/Year";
import Title from "@/components/Atoms/PioneerOfProgress/Title";
import { border } from "@/constants/pioneersConstant";
import { useError } from "@/hooks/error";
import { Pop1995 } from "@/types/pioneerOfProgress";
import { Parallax } from "react-scroll-parallax";
interface Props {
  collectionRef: CollectionReference;
}

const Pop1995Desktop: FC<Props> = ({ collectionRef }) => {
  const { inView, ref } = useInView({
    triggerOnce: true,
    threshold: 0,
  });

  const [data, isLoading, error] = useDocumentData(
    inView ? doc(collectionRef as CollectionReference<Pop1995>, "1995") : null,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  useError(error);

  return (
    <Box ref={ref}>
      <YearWrapper year={1995}>
        <Stack w="750px" borderRight={border} borderLeft={border} h="100%">
          <Parallax translateY={[20, -20]} opacity={[2, 0]}>
            <Stack>
              <Year px="8" position="relative" value="1995" />
              <Title
                px="8"
                pb="5"
                borderBottom={border}
                dangerouslySetInnerHTML={{ __html: data ? data.title : "" }}
              />
              <Text
                px="8"
                pt="5"
                pb="10"
                fontWeight="bold"
                dangerouslySetInnerHTML={{
                  __html: data ? data.description : "",
                }}
              />
            </Stack>
          </Parallax>
        </Stack>
      </YearWrapper>
    </Box>
  );
};

export default Pop1995Desktop;
