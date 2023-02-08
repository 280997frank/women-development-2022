import { FC } from "react";
import { Text, TextProps } from "@chakra-ui/react";

const Title: FC<TextProps> = ({ children, ...props }) => {
  return (
    <Text
      fontSize="xl"
      textTransform="uppercase"
      fontWeight="bold"
      color="#F7CF2D"
      {...props}
    >
      {children}
    </Text>
  );
};

export default Title;
