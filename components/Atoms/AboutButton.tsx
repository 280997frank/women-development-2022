import React from "react";
import { Button, Img } from "@chakra-ui/react";

import plusIcon from "@/assets/images/plus.svg";

import type { FC } from "react";
import type { ButtonProps } from "@chakra-ui/react";

const AboutButton: FC<ButtonProps> = (props) => {
  return (
    <Button
      {...props}
      bgColor="brand.yellow"
      borderRadius="2.5rem"
      color="white"
      pr={2}
      h="3.5rem"
      w="10rem"
      justifyContent="space-between"
    >
      About the
      <br />
      Exhibition
      <Img src={plusIcon.src} alt="" />
    </Button>
  );
};

export default AboutButton;
