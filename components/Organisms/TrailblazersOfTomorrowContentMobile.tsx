import { Fragment, ReactElement } from "react";
import { useDocumentData } from "react-firehooks";
import { Box, Heading, Image, Text, chakra, Flex } from "@chakra-ui/react";
import { collection, CollectionReference, doc } from "firebase/firestore";

import MilestoneSelection from "@/components/Molecules/MilestoneSelection";

import { db } from "@/connections/firebase";

import { TTrailblazersOfTomorrow } from "@/types/trailblazersOfTomorrow";

import { useWindowSize } from "@/hooks/utils";

import { ImQuotesLeft, ImQuotesRight } from "react-icons/im";

interface RenderVideoPlayerProps {
  videoURL: string;
}

const RenderVideoPlayer = ({
  videoURL,
}: RenderVideoPlayerProps): ReactElement => {
  return (
    <video
      width="100%"
      height="100%"
      autoPlay
      muted
      playsInline
      style={{
        mixBlendMode: "darken",
      }}
    >
      <source src={videoURL} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

const trailblazersOfTomorrow = collection(
  db,
  "trailblazers-of-tomorrow"
) as CollectionReference<TTrailblazersOfTomorrow>;

const TrailblazersOfTomorrowContentMobile = () => {
  const { innerHeight } = useWindowSize();
  const [data] = useDocumentData(doc(trailblazersOfTomorrow, "1"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  return (
    <Box
      backgroundColor="#E5E5E5"
      height={`calc(${innerHeight}px - 6rem)`}
      maxH="-webkit-fill-available"
      overflowY="auto"
      // mt={24}
    >
      <MilestoneSelection
        pageName="trailblazers"
        data={[{ name: "intro" }, { name: "quotes" }, { name: "testimonials" }]}
      />
      <Box id="intro">
        <Box position="relative">
          <Box>
            {data !== undefined && data.videoUrl && (
              <RenderVideoPlayer videoURL={data.videoUrl} />
            )}
          </Box>
        </Box>
        <Heading
          px={8}
          mt="2rem"
          fontSize={{ base: "2rem", sm: "3rem" }}
          lineHeight="4rem"
          color="#255B8B"
          textTransform="capitalize"
          letterSpacing="-1px"
          mb="1rem"
        >
          {data?.title}
        </Heading>
        <Image src={data && data.thumbnail} alt="thumbnail" width="100%" />
        <Text
          px={8}
          fontWeight="bold"
          fontSize={{ base: "5.5rem", sm: "6rem" }}
          textShadow="-2px 0 #255B8B, 0 2px #255B8B, 2px 0 #255B8B, 0 -2px #255B8B"
          color="#E5E5E5"
          textAlign="right"
          display={{ base: "block", lg: "none" }}
          textTransform="uppercase"
        >
          {data?.subtitle && data?.subtitle[0]}
        </Text>
        <chakra.hr bgColor="white" h="2px" id="quotes" />

        {data?.body &&
          data.body.map((item, index) => {
            return (
              <Fragment key={index}>
                <Box
                  ml="1rem"
                  mr="1rem"
                  pt={4}
                  pr={8}
                  pb="2rem"
                  pl={4}
                  id={index === 4 ? "testimonial" : ""}
                  borderLeft={index % 2 === 0 ? "2px solid white" : "unset"}
                  borderRight={index % 2 === 1 ? "2px solid white" : "unset"}
                >
                  <Flex
                    fontWeight="bold"
                    fontSize={item.size === "large" ? "lg" : "sm"}
                    color="#255B8B"
                    mb="1rem"
                    flexDir="column"
                  >
                    {index === 1 && (
                      <Flex flexDir="column" mb="32px">
                        <Text
                          fontWeight="bold"
                          fontSize="64px"
                          textShadow="-2px 0 #255B8B, 0 2px #255B8B, 2px 0 #255B8B, 0 -2px #255B8B"
                          color="#E5E5E5"
                          textAlign="left"
                          display={{ base: "block", lg: "none" }}
                          textTransform="uppercase"
                          lineHeight="78px"
                        >
                          AND
                        </Text>
                        <Text
                          fontWeight="bold"
                          fontSize="64px"
                          textShadow="-2px 0 #255B8B, 0 2px #255B8B, 2px 0 #255B8B, 0 -2px #255B8B"
                          color="#E5E5E5"
                          textAlign={{ base: "right", sm: "left" }}
                          pl={{ sm: "55px" }}
                          display={{ base: "block", lg: "none" }}
                          textTransform="uppercase"
                          lineHeight="78px"
                        >
                          BEYOND
                        </Text>
                      </Flex>
                    )}

                    <Text
                      sx={{
                        svg: {
                          display: "unset",
                        },
                      }}
                      fontWeight={item.size === "large" ? "700" : "600"}
                      fontSize={item.size === "large" ? "24px" : "20px"}
                      lineHeight={item.size === "large" ? "29px" : "24px"}
                      color="#235786"
                    >
                      <ImQuotesLeft
                        color="#255B8B"
                        fontWeight={item.size === "large" ? "700" : "600"}
                        fontSize={item.size === "large" ? "21px" : "14px"}
                      />{" "}
                      {item.content.replaceAll(`“`, "").replaceAll(`”`, "")}{" "}
                      <ImQuotesRight
                        color="#255B8B"
                        fontWeight={item.size === "large" ? "700" : "600"}
                        fontSize={item.size === "large" ? "21px" : "14px"}
                      />
                    </Text>
                  </Flex>
                  <Text
                    fontSize={item.size === "large" ? "20px" : "16px"}
                    lineHeight={item.size === "large" ? "24px" : "20px"}
                    color="#235786"
                    dangerouslySetInnerHTML={{ __html: item.author }}
                  />
                </Box>
                <chakra.hr bgColor="white" h="2px" />
              </Fragment>
            );
          })}
      </Box>
    </Box>
  );
};

export default TrailblazersOfTomorrowContentMobile;
