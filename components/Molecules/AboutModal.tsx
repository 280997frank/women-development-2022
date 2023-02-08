import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Img,
} from "@chakra-ui/react";
import React from "react";

import AboutContent from "@/components/Atoms/AboutContent";

import pngLogo from "@/assets/images/women-development-logo.png";
import webpLogo from "@/assets/images/women-development-logo.webp";

import type { FC } from "react";

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal: FC<AboutModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      scrollBehavior="inside"
      isCentered
    >
      <ModalOverlay />
      <ModalContent borderRadius="2xl">
        <ModalCloseButton
          top="-6%"
          right="-10%"
          borderRadius="50%"
          border="1px solid white"
          w="3.25rem"
          h="3.25rem"
          color="white"
          fontSize="2xl"
        />
        <ModalBody
          bgColor="brand.cream"
          borderRadius="inherit"
          p={8}
          maxH={{ xl: "85vh", "2xl": "unset" }}
          sx={{
            "&::-webkit-scrollbar": {
              width: "0.5rem",
            },
            "&::-webkit-scrollbar-track": {
              width: "0.5rem",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#c0be9a",
              borderRadius: "1rem",
            },
            scrollbarWidth: "thin",
            scrollbarColor: "#c0be9a transparent",
          }}
        >
          <picture>
            <source srcSet={webpLogo.src} type="image/webp" />
            <Img
              src={pngLogo.src}
              color="brand.red"
              fontWeight="bold"
              fontSize="5xl"
              alt="Celebrating SG Women"
              htmlWidth={pngLogo.width}
              htmlHeight={pngLogo.height}
              w="90%"
              m="auto"
            />
          </picture>
          <AboutContent />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AboutModal;
