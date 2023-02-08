import { FC } from "react";
import { Stack, BoxProps, Img } from "@chakra-ui/react";
import { yearsImg } from "@/constants/pioneersConstant";

const YearMobile: FC<
  BoxProps & {
    value: string;
    imageWidth?: string;
    isRight?: boolean;
  }
> = ({ value, imageWidth = "250px", isRight = false, ...props }) => {
  return (
    <Stack px="2rem" {...props}>
      <Img
        alignSelf={isRight ? "end" : "start"}
        maxW={{ base: "230px", sm: imageWidth }}
        w={imageWidth}
        src={yearsImg[value].src}
      />
    </Stack>
  );
};

export default YearMobile;
