import React, { FC } from "react";
import { Box, BoxProps, Heading, Text } from "@chakra-ui/react";
import { yearsImg } from "@/constants/shapersOfSuccessConstantImage";

const Year: FC<
  BoxProps & {
    value: string;
  }
> = ({ value, ...props }) => {
  return (
    <Box position="relative" {...props}>
      <Heading
        fontSize={window.innerWidth < 1400 ? "7xl" : "8xl"}
        color="#e1d4c1"
        w="80%"
        textShadow="-2px 0 #009481, 0 2px #009481, 2px 0 #009481, 0 -2px #009481"
      >
        {value}
      </Heading>
    </Box>
  );
};

export default Year;
