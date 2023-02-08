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
  Image,
} from "@chakra-ui/react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/states/store";
import { actions as shapersOfSuccessAction } from "@/states/shapers-of-success/slices";
import logo from "@/assets/images/logoPhotos.png";
import { isMobileOnly } from "react-device-detect";
import { useOnClickTracking } from "@/hooks/tracking";

const ModalShapersOfSuccess: FC = () => {
  const dispatch = useDispatch();
  const { isOpen, content, type } = useSelector(
    (state: RootState) => ({
      isOpen: state.shapersOfSuccess.isOpen,
      content: state.shapersOfSuccess.content,
      type: state.shapersOfSuccess.type,
    }),
    shallowEqual
  );

  useOnClickTracking(isOpen, "modal-content", { content, type });

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        dispatch(shapersOfSuccessAction.clear());
      }}
      size="6xl"
      // size="full"
      isCentered
    >
      <ModalOverlay bgColor={{ base: "black", md: "rgba(0, 0, 0, 0.4)" }} />
      <ModalContent
        w="auto"
        // minH={{base: "100vh"}}
        // maxH={{ base: "100%", lg: "calc(100% - 7.5rem)" }}
        // h="300px"
        // paddingTop="50px"
        // paddingBottom="1rem"
      >
        <ModalCloseButton
          pos="absolute"
          top={{ base: "-10", md: "0" }}
          right={{ base: "5", md: "-10" }}
          // w={{ base: "50px", md: "30px" }}
          // h={{ base: "50px", md: "30px" }}
          bgColor="transparent"
          borderRadius="full"
          border="1px solid white"
          color="white"
        />
        {type === "image" ? (
          <picture>
            <source srcSet={content} type="image/jpeg" />
            <Image
              maxH="80vh"
              loading="lazy"
              src={content}
              cursor="pointer"
              alt=""
              ignoreFallback
            />
          </picture>
        ) : (
          // <AspectRatio ratio={16 / 9}>
          <video
            style={{ maxHeight: "80vh" }}
            controls
            controlsList="nodownload"
            playsInline
            autoPlay
            src={content}
          />
          // </AspectRatio>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalShapersOfSuccess;
