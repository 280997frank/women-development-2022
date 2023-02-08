import React, { FC } from "react";
import { Text, TextProps } from "@chakra-ui/react";

const Title: FC<TextProps> = ({ children, color = "#009481", ...props }) => {
  return (
    <Text
      fontSize={window.innerHeight < 768 ? "1.25rem" : "1.75rem"}
      textTransform="uppercase"
      fontWeight="bold"
      color={color}
      lineHeight="2rem"
      {...props}
      dangerouslySetInnerHTML={{ __html: (children as string) ?? "" }}
    />
  );
};

export default Title;
