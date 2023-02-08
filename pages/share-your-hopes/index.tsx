import {
  Grid,
  Box,
  Flex,
  Text,
  Button,
  Image,
  AspectRatio,
  Skeleton,
  useToast,
  useMediaQuery,
} from "@chakra-ui/react";
import { nanoid } from "nanoid/non-secure";
import React, { FC, useState, useCallback, useRef, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { isMobileOnly } from "react-device-detect";
import { useDispatch } from "react-redux";
import { httpsCallable } from "firebase/functions";

import ModalHope from "@/components/Molecules/ModalHope";
import ModalAddHope from "@/components/Molecules/ModalAddHope";
import Layout from "@/components/Templates/Layout";

import { actions as hopeAction } from "@/states/hope/slices";
import { actions as shareHopeAction } from "@/states/hope/share-hope/slices";

import { functions } from "@/connections/firebase";

import { useAuthentication } from "@/hooks/auth";
import { useWindowSize } from "@/hooks/utils";

// import logo from "@/assets/images/logoPhotos.png";
import Add from "@/assets/images/Add.png";
import { useOnClickTracking } from "@/hooks/tracking";

interface IGetPhotos {
  title: string;
  content: string;
  image: string;
  overlayColor?: string;
}

interface GetPhotosPayload {
  noOfPhotos?: number;
  pageNumber?: number;
}

interface IResultAPIGetPhotos {
  status: string;
  message: string;
  data: IGetPhotos[];
}

const getPhotos = httpsCallable<GetPhotosPayload, IResultAPIGetPhotos>(
  functions,
  "getPhotos"
);

const skeletonIds: string[] = [];

for (let i = 0; i < 10; i++) {
  skeletonIds.push(nanoid());
}

const colors = [
  "rgba(255, 224, 172, 0.5)",
  "rgba(168, 236, 195, 0.5)",
  "rgba(136, 191, 255, 0.5)",
  "rgba(255, 175, 102, 0.5)",
  "rgba(255, 178, 188, 0.5)",
  "rgba(133, 232, 238, 0.5)",
];

function getRandomColor() {
  const randomColor = Math.floor(Math.random() * 6);
  const overlayColor = `linear(${colors[randomColor]} 0%, ${colors[randomColor]} 60%, rgba(27, 75, 118, 0.5) 100%)`;

  return overlayColor;
}

const ShareYourHopesPage: FC = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const { innerHeight } = useWindowSize();
  const [isDesktop] = useMediaQuery("(min-width: 62em)");
  const upperPartRef = useRef<HTMLDivElement>(null);
  const [hopes, setHopes] = useState<IGetPhotos[]>();
  const [hasMore, setHasMore] = useState(true);
  // const [noData, setNoData] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  const auth = useAuthentication();

  useOnClickTracking(true, "page", "share-your-hopes");

  const handleGetPhotos = useCallback(async () => {
    return getPhotos({ pageNumber })
      .then((result) => {
        if (result.data) {
          const photos = result.data;
          if (result.data.data?.length === 0) {
            setHasMore(false);
          } else {
            setPageNumber((prevState) => prevState + 1);
            setHopes([
              ...(hopes ?? []),
              ...photos.data.map((fields) => ({
                ...fields,
                overlayColor: getRandomColor(),
              })),
            ]);
          }
        }
      })
      .catch((error) =>
        toast({
          title: "Get Photos Error",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        })
      );
  }, [hopes, toast, pageNumber]);

  useEffect(() => {
    if (auth && pageNumber === 1) {
      handleGetPhotos();
    }
  }, [auth, handleGetPhotos, pageNumber]);

  const imageClick = useCallback(
    (item: any) => {
      dispatch(
        hopeAction.setStream({
          isOpen: true,
          title: item.title,
          content: item.content,
          image: item.image,
        })
      );
    },
    [dispatch]
  );

  const shareHope = useCallback(() => {
    dispatch(shareHopeAction.setStream(true));
  }, [dispatch]);

  const handleGenerateSkeleton = (count: number) => {
    let skeleton = [];
    for (let i = 0; i < count; i++) {
      skeleton.push(
        <Skeleton
          height="180"
          width={{ base: "50vw", lg: "140px" }}
          mr={{ base: 0, lg: 5 }}
          mb={5}
          key={skeletonIds[i]}
        />
      );
    }
    return skeleton;
  };

  const renderUpperPart = useCallback(() => {
    return (
      <Box
        w={{ base: "100vw", lg: "25vw" }}
        pos={{ lg: "relative" }}
        bgColor={{ base: "white", lg: "#F7F5E8" }}
        pt={{ base: "50px", lg: "0px" }}
        mx={{ base: "0", lg: "3vw" }}
      >
        <Flex flexDir="column">
          <Box
            // pos={{ md: "absolute" }}
            // top={0}
            px={{ base: "2rem", lg: "0px" }}
            pb={{ base: "50px", lg: "0px" }}
          >
            <Text
              fontWeight="bold"
              color="#255B8B"
              fontSize="3rem"
              lineHeight="58.51px"
            >
              Share
            </Text>
            <Text
              fontWeight="bold"
              color="#255B8B"
              fontSize="3rem"
              lineHeight="58.51px"
            >
              Your Hopes
            </Text>
            <Text lineHeight="1.8rem" color="#484947" mt={5} fontSize="1.5rem">
              Tell us about your aspirations for Singapore women.
            </Text>
          </Box>
          <Flex
            position={{ base: "fixed", lg: "absolute" }}
            top="85%"
            left={{ lg: "10%" }}
            width={{ base: "100%", lg: "0%" }}
            display="flex"
            justifyContent="center"
            zIndex={{ base: 100, lg: 0 }}
          >
            <Box
              width={{
                base: "70%",
                lg: "95%",
                "2xl": "82%",
              }}
              pt={{ base: "10px", md: "20px", lg: "0px" }}
              pb={{ base: "10px", md: "20px", lg: "0px" }}
              borderRadius={{ base: "full", lg: "0" }}
              textAlign={{ base: "center", lg: "left" }}
              bgColor={{ base: "white", lg: "transparent" }}
            >
              <Button
                data-testid="btn-add-message"
                padding="0"
                onClick={() => shareHope()}
                leftIcon={
                  <Box height={{ base: "35px", lg: "50px" }} mr="2px">
                    <Image
                      src={Add.src}
                      alt="back"
                      width={{ base: "35px", lg: "50px" }}
                    />
                  </Box>
                }
                bgColor="transparent"
                _active={{
                  boxShadow: "none",
                  bg: "transparent",
                }}
                _hover={{
                  bg: "transparent",
                }}
                _focus={{
                  boxShadow: "none",
                }}
                zIndex={10}
              >
                <Text
                  color="#255B8B"
                  fontSize={{ base: "15px", lg: "18px" }}
                  display="block"
                >
                  Add a message
                </Text>
              </Button>
            </Box>
          </Flex>
        </Flex>
      </Box>
    );
  }, [shareHope]);

  const renderPhotoGallery = useCallback(
    () => (
      <Box
        id="gallery-container"
        ref={upperPartRef}
        w={{ base: "100vw", lg: "75vw" }}
        flex="1"
        overflowY={{ lg: "auto" }}
      >
        {
          /* hopes && !loading */ auth && (
            <InfiniteScroll
              dataLength={(hopes || []).length} //This is important field to render the next data
              next={handleGetPhotos}
              hasMore={hasMore}
              scrollableTarget="gallery-container"
              height={upperPartRef.current?.clientHeight || 0}
              loader={
                <Grid key="loader" templateColumns="repeat(5, 1fr)">
                  {handleGenerateSkeleton(isMobileOnly ? 2 : 5)}
                </Grid>
              }
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              {!isDesktop && renderUpperPart()}
              <Grid
                templateColumns={{
                  base: "repeat(2, 1fr)",
                  md: "repeat(2, 1fr)",
                  lg: "repeat(5, 1fr)",
                }}
                // overflowY="auto"
              >
                {hopes?.map((item, index) => {
                  return (
                    <AspectRatio
                      ratio={9 / 16}
                      bgColor="black"
                      key={index}
                      onClick={() => imageClick(item)}
                      cursor="pointer"
                    >
                      <Flex align="center" pos="relative">
                        <Box
                          pos="absolute"
                          top={0}
                          bgGradient={item.overlayColor}
                          w="100%"
                          h="100%"
                          zIndex={50}
                        />
                        <Image
                          zIndex={0}
                          loading="lazy"
                          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${item.image}`}
                          alt=""
                        />
                      </Flex>
                    </AspectRatio>
                  );
                })}
              </Grid>
            </InfiniteScroll>
          )
        }
      </Box>
    ),
    [
      auth,
      handleGetPhotos,
      hasMore,
      hopes,
      imageClick,
      isDesktop,
      renderUpperPart,
    ]
  );

  return (
    <Layout title="Share Your Hopes" setLogoAtTop>
      <Flex
        // gap={{ base: 0, md: 8 }}
        pt={{ /* base: "90px", */ lg: "70px" }}
        pl={{ lg: "50px" }}
        h={{ base: `calc(${innerHeight}px - 6rem)`, lg: "100vh" }}
        bgColor="#F7F5E8"
        maxW="100vw"
        // pb={{ md: 2 }}
        flexDir={{ base: "column", lg: "row" }}
      >
        {isDesktop && (
          <>
            {renderPhotoGallery()}
            {renderUpperPart()}
          </>
        )}
        {!isDesktop && renderPhotoGallery()}
        <ModalHope />
        <ModalAddHope />
      </Flex>
    </Layout>
  );
};

export default ShareYourHopesPage;
