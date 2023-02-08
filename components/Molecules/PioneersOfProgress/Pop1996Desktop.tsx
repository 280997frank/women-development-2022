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
import { Pop1996 } from "@/types/pioneerOfProgress";
import { Parallax } from "react-scroll-parallax";
interface Props {
  collectionRef: CollectionReference;
}

const Pop1996Desktop: FC<Props> = ({ collectionRef }) => {
  const { inView, ref } = useInView({
    triggerOnce: true,
    threshold: 0,
  });

  const [data, isLoading, error] = useDocumentData(
    inView ? doc(collectionRef as CollectionReference<Pop1996>, "1996") : null,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  useError(error);

  return (
    <Box ref={ref}>
      <YearWrapper year={1996}>
        <Stack w="600px" h="100%" borderRight={border}>
          <Parallax translateY={[-10, 30]} opacity={[2, 0]}>
            <Stack>
              <Year
                position="relative"
                pt="20"
                pr="10"
                alignSelf="end"
                value="1996"
              />
              <Title
                pl="24"
                pb="5"
                borderBottom={border}
                dangerouslySetInnerHTML={{ __html: data ? data.title : "" }}
              />
              <Text
                pl="24"
                pr="8"
                pt="5"
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

export default Pop1996Desktop;
