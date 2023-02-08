import { FC } from "react";
import { Center, Text, CenterProps, Img } from "@chakra-ui/react";
import speaker from "@/assets/images/Speaker.svg";
import muteSound from "@/assets/images/pop/Sound On_=False, Colour=Yellow.png";

type Props = {
  onClick: () => void;
  type?: "click" | "audio";
  isPlaying?: boolean;
};

const Hotspot: FC<Props & CenterProps> = ({
  onClick,
  type = "click",
  isPlaying,
  ...props
}) => {
  return (
    <Center
      w={window.innerWidth >= 768 ? "120px" : "90px"}
      h={window.innerWidth >= 768 ? "120px" : "90px"}
      rounded="full"
      bgColor="#F7CF2D"
      cursor="pointer"
      onClick={onClick}
      {...props}
    >
      {type === "click" && (
        <Text fontSize="md" color="#484947">
          CLICK <br /> HERE
        </Text>
      )}
      {type === "audio" && (
        <Img src={isPlaying ? muteSound.src : speaker.src} />
      )}
    </Center>
  );
};

export default Hotspot;
