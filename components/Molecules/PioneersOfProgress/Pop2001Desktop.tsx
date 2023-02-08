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
import { Pop2001 } from "@/types/pioneerOfProgress";
import { Parallax } from "react-scroll-parallax";
interface Props {
  collectionRef: CollectionReference;
}

const Pop2001Desktop: FC<Props> = ({ collectionRef }) => {
  const { inView, ref } = useInView({
    triggerOnce: true,
    threshold: 0,
  });

  const [data, isLoading, error] = useDocumentData(
    inView ? doc(collectionRef as CollectionReference<Pop2001>, "2001") : null,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  useError(error);

  return (
    <Box ref={ref}>
      <YearWrapper year={2001}>
        <Stack
          h="100%"
          w="560px"
          justifyContent="flex-end"
          borderRight={border}
        >
          <Stack spacing={2} borderLeft={border}>
            <Parallax
              style={{ height: "100%", paddingBottom: "70px" }}
              translateY={[-15, 10]}
              opacity={[1.5, 0]}
            >
              <Stack>
                <Title
                  px="8"
                  pb="2"
                  borderBottom={border}
                  dangerouslySetInnerHTML={{ __html: data ? data.title : "" }}
                />
                <Text
                  px="8"
                  fontWeight="bold"
                  dangerouslySetInnerHTML={{
                    __html: data ? data.description : "",
                  }}
                />
                <Year bottom="0px" right="10" value="2001" />
              </Stack>
            </Parallax>
          </Stack>
        </Stack>
      </YearWrapper>
    </Box>
  );
};

export default Pop2001Desktop;
