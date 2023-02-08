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
import { Pop2011 } from "@/types/pioneerOfProgress";
import { Parallax } from "react-scroll-parallax";
interface Props {
  collectionRef: CollectionReference;
}

const Pop2011Desktop: FC<Props> = ({ collectionRef }) => {
  const { inView, ref } = useInView({
    triggerOnce: true,
    threshold: 0,
  });

  const [data, isLoading, error] = useDocumentData(
    inView ? doc(collectionRef as CollectionReference<Pop2011>, "2011") : null,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  useError(error);

  return (
    <Box ref={ref}>
      <YearWrapper year={2011}>
        <Stack w="450px">
          <Stack borderRight={border} pt="50px">
            <Parallax translateY={[-20, 0]} opacity={[2, 0]}>
              <Stack>
                <Title
                  borderBottom={border}
                  px="8"
                  pb="5"
                  dangerouslySetInnerHTML={{ __html: data ? data.title : "" }}
                />
                <Text
                  px="8"
                  py="5"
                  fontWeight="bold"
                  dangerouslySetInnerHTML={{
                    __html: data ? data.description : "",
                  }}
                />
                <Year pl="8" pos="relative" value="2011" />
              </Stack>
            </Parallax>
          </Stack>
        </Stack>
      </YearWrapper>
    </Box>
  );
};

export default Pop2011Desktop;
