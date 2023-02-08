import { FC } from "react";
import {
  AspectRatio,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  chakra,
} from "@chakra-ui/react";
import { useOnClickTracking } from "@/hooks/tracking";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
}

const VideoModal: FC<Props> = ({ isOpen, onClose, videoSrc }) => {
  useOnClickTracking(isOpen, "modal-content", {
    content: videoSrc,
    type: "video",
  });
  return (
    <Modal size="4xl" isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton zIndex={1} />
        <AspectRatio ratio={16 / 9}>
          {isOpen && (
            <chakra.video
              playsInline
              muted
              autoPlay
              loop
              controls
              controlsList="nodownload"
              w="full"
              src={videoSrc}
            />
          )}
        </AspectRatio>
      </ModalContent>
    </Modal>
  );
};

export default VideoModal;
