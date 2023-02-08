import { FC } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Image,
  ImageProps,
  useDisclosure,
} from "@chakra-ui/react";
import { IImageModal } from "@/types/pioneerOfProgress";
import { useOnClickTracking } from "@/hooks/tracking";

interface Props {
  size?: string;
  image: IImageModal | undefined;
  thumbnail: string | undefined;
}

const ImageModal: FC<Props & ImageProps> = ({
  size = "md",
  image,
  thumbnail,
  ...props
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  useOnClickTracking(isOpen && image !== undefined, "modal-content", {
    content: image ? image.jpg : "",
    type: "image",
  });
  return (
    <>
      <Image
        size="md"
        src={thumbnail}
        onClick={onOpen}
        cursor="pointer"
        alt=""
        ignoreFallback
        {...props}
      />
      <Modal size="6xl" isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w="auto">
          <ModalCloseButton zIndex={1} />
          <picture>
            <source srcSet={image?.webp} type="image/webp" />
            <source srcSet={image?.jpg} type="image/jpeg" />
            <Image
              maxH="80vh"
              loading="lazy"
              src={image?.jpg}
              cursor="pointer"
              alt=""
              ignoreFallback
            />
          </picture>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ImageModal;
