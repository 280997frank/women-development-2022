import { FC } from "react";
import { Box, BoxProps, Img } from "@chakra-ui/react";
import { yearsImg } from "@/constants/pioneersConstant";

const Year: FC<
  BoxProps & {
    value: string;
  }
> = ({ value, ...props }) => {
  return (
    <Box position="absolute" {...props}>
      <Img maxW="200px" src={yearsImg[value].src} />
    </Box>
  );
};

export default Year;
