import { FC } from "react";
import { useInView } from "react-intersection-observer";
import { useDocumentData } from "react-firehooks";
import { CollectionReference, doc } from "firebase/firestore";
import { Parallax } from "react-scroll-parallax";
import {
  Box,
  Stack,
  useMediaQuery,
  Text,
  Img,
  useDisclosure,
} from "@chakra-ui/react";
import YearWrapper from "@/components/Atoms/PioneerOfProgress/YearWrapper";
import Year from "@/components/Atoms/PioneerOfProgress/Year";
import Title from "@/components/Atoms/PioneerOfProgress/Title";
import VideoModal from "@/components/Atoms/PioneerOfProgress/VideoModal";
import { border } from "@/constants/pioneersConstant";
import { Pop1959 } from "@/types/pioneerOfProgress";
import { useError } from "@/hooks/error";
import ImageModal from "@/components/Atoms/PioneerOfProgress/ImageModal";

interface Pop1959DesktopProps {
  collectionRef: CollectionReference;
}

const Pop1959Desktop: FC<Pop1959DesktopProps> = ({ collectionRef }) => {
  const { inView, ref } = useInView({
    triggerOnce: true,
    threshold: 0,
  });
  const [isHeightLowerThan600] = useMediaQuery(
    "screen and (max-height: 610px)"
  );

  const { isOpen, onClose, onOpen } = useDisclosure();

  const [data, isLoading, error] = useDocumentData(
    inView ? doc(collectionRef as CollectionReference<Pop1959>, "1959") : null,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  useError(error);

  return (
    <Box ref={ref}>
      <YearWrapper year={1959}>
        <Year left="9%" top="50%" value="1959" />
        <Text
          fontSize={window.innerWidth < 1400 ? "3xl" : "4xl"}
          color="#F7CF2D"
          transform="translate(-40px,10.5vh) rotate(90deg)"
          fontWeight="bold"
          position="absolute"
          as="h1"
          zIndex="sticky"
        >
          Pioneers
          <br /> of Progress
        </Text>
        <Box
          borderRight={border}
          w="350px"
          bg={`url(${data?.section1.image}) no-repeat 120% 90%`}
          position="relative"
          sx={{
            "@media (max-height: 750px)": {
              backgroundPositionX: "148%",
            },
            "@media (max-height: 577px)": {
              backgroundPositionX: "208%",
            },
          }}
        ></Box>
        <Stack w="450px" borderRight={border}>
          <Parallax opacity={[2, 0]} translateY={["-20", "50"]}>
            <Title
              px="8"
              py="5"
              borderBottom={border}
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
          </Parallax>
        </Stack>
        <Stack spacing={5} w="350px" borderRight={border} h="100%">
          <Box h="calc(100% - 180px)" borderTop={border} mt="10" pt="8" px="12">
            <ImageModal
              w="100%"
              h="100%"
              objectFit="cover"
              objectPosition="top"
              image={data?.section2.imageModal}
              thumbnail={data?.section2.image}
            />
          </Box>
          <Box h="180px">
            <Text
              px="12"
              fontSize="sm"
              className="caption"
              dangerouslySetInnerHTML={{
                __html: data ? data.section2.caption : "",
              }}
            />
          </Box>
        </Stack>
        <Stack w="600px" spacing={10} pos="relative" borderRight={border}>
          <Parallax opacity={[2, 0]} translateY={["-20", "40"]}>
            <Box px="8" pt="16" pr={isHeightLowerThan600 ? "35%" : "30%"}>
              <Img
                src={data?.section3.thumbnail}
                cursor="pointer"
                onClick={onOpen}
              />
            </Box>
            <Text
              className="caption"
              px="8"
              pb="6"
              fontSize="sm"
              borderBottom={border}
              pr={"30%"}
              dangerouslySetInnerHTML={{
                __html: data ? data.section3.caption : "",
              }}
            />
            <Year right="-4%" bottom="0%" value="1959" />
          </Parallax>
        </Stack>
        <Stack w="600px" borderRight={border}>
          <Parallax opacity={[2, 0]} translateY={["50", "0"]}>
            <Stack position="relative" borderTop={border} mt="10">
              <Stack p="8" mr="180px">
                <Title>{data?.section4.title}</Title>
                <Text
                  fontSize="sm"
                  fontWeight="500"
                  dangerouslySetInnerHTML={{
                    __html: data ? data.section4.subtitle : "",
                  }}
                />
                <Text
                  fontSize="sm"
                  dangerouslySetInnerHTML={{
                    __html: data ? data.section4.bio : "",
                  }}
                />
              </Stack>
              <ImageModal
                size="xl"
                position="absolute"
                w="200px"
                right="0"
                image={data?.section4.imageModal}
                thumbnail={data?.section4.image}
              />
            </Stack>
          </Parallax>
        </Stack>
        <Stack
          w="400px"
          spacing={5}
          borderRight={border}
          h="100%"
          pos="relative"
          justifyContent="flex-end"
          pb="50px"
        >
          <Parallax translateY={[-50, 0]} opacity={[2, 0]}>
            <Title borderBottom={border} px="8" pb="5">
              {data?.section5.title}
            </Title>
            <Text
              px="8"
              fontWeight="bold"
              dangerouslySetInnerHTML={{
                __html: data ? data.section5.description : "",
              }}
            />
          </Parallax>
        </Stack>
        {data && (
          <VideoModal
            isOpen={isOpen}
            onClose={onClose}
            videoSrc={data.section3.videoSrc}
          />
        )}
      </YearWrapper>
    </Box>
  );
};

export default Pop1959Desktop;
