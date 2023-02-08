import React, { FC } from "react";
import {
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Text,
  AspectRatio,
  Img,
  Box,
  Flex,
} from "@chakra-ui/react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/states/store";
import { actions as hopeAction } from "@/states/hope/slices";
import logo from "@/assets/images/logoPhotos.png";
import { isMobileOnly } from "react-device-detect";

const ModalHope: FC = () => {
  const dispatch = useDispatch();
  const { isOpen, title, content, image } = useSelector(
    (state: RootState) => ({
      isOpen: state.hope.isOpen,
      title: state.hope.title,
      content: state.hope.content,
      image: state.hope.image,
    }),
    shallowEqual
  );

  const backgroundImage = {
    backgroundImage: "url(" + process.env.NEXT_PUBLIC_IMAGE_URL + image + ")",
    backgroundSize: "auto 100%",
    backgroundPosition: "center",
    overflow: "hidden",
    height: "100%",
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        dispatch(hopeAction.clear());
      }}
      // size="4xl"
      isCentered={!isMobileOnly}
    >
      <ModalOverlay bgColor={{ base: "black", md: "rgba(0, 0, 0, 0.4)" }} />
      <ModalContent
        bgColor="transparent"
        w={{ base: "80vw", md: "50vw", lg: "25vw" }}
        // minH={{base: "100vh"}}
        // maxH={{ base: "100%", lg: "calc(100% - 7.5rem)" }}
        // h="300px"
        // paddingTop="50px"
        // paddingBottom="1rem"
      >
        <ModalCloseButton
          pos="absolute"
          top={{ base: "-60px", lg: "0" }}
          right={{ base: "0", lg: "-10" }}
          w={{ base: "50px", lg: "30px" }}
          h={{ base: "50px", lg: "30px" }}
          bgColor="transparent"
          borderRadius="full"
          border="1px solid white"
          color="white"
        />
        <ModalBody p={0} textAlign="center">
          <AspectRatio ratio={9 / 16}>
            <Box {...backgroundImage}>
              {/*    /!* <Flex flexDir="column" justifyContent="space-between" h="100%">*/}
              {/*      <Box pt="10%" pl="30%" pr="30%">*/}
              {/*        <Img textAlign="center" src={logo.src} />*/}
              {/*      </Box>*/}
              {/*      <Box zIndex={100} pb="20px" pt={5}>*/}
              {/*        <Text fontWeight="bold" color="white" textAlign="center">*/}
              {/*          {title}*/}
              {/*        </Text>*/}
              {/*        <Text color="white" textAlign="center">*/}
              {/*          {content}*/}
              {/*        </Text>*/}
              {/*      </Box>*/}
              {/*    </Flex> *!/*/}
            </Box>
          </AspectRatio>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalHope;
