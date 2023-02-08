import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Img,
  chakra,
} from "@chakra-ui/react";
import { useOnClickTracking } from "@/hooks/tracking";

interface MultimediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "video" | "image";
  src: {
    png?: string;
    jpg?: string;
    webp?: string;
    mp4?: string;
    webm?: string;
  };
}

export default function MultimediaModal({
  isOpen,
  onClose,
  type,
  src,
}: MultimediaModalProps) {
  useOnClickTracking(isOpen, "modal-content", { content: src, type: type });
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton top="-3rem" />
        <ModalBody p={0}>
          {isOpen &&
            (type === "image" ? (
              <picture>
                <source srcSet={src.webp} type="image/webp" />
                <source srcSet={src.jpg} type="image/jpg" />
                <Img src={src.png} alt="" />
              </picture>
            ) : (
              <chakra.video
                playsInline
                muted
                autoPlay
                loop
                controls
                controlsList="nodownload"
                w="full"
              >
                <source src={src.webm} type="video/webm" />
                <source src={src.mp4} type="video/mp4" />
              </chakra.video>
            ))}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
