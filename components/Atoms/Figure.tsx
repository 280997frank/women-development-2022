import React, { ReactNode } from "react";
import { chakra, BoxProps } from "@chakra-ui/react";

interface FigureProps extends BoxProps {
  children: ReactNode;
  caption?: string;
}

export default function Figure({ children, caption, ...rest }: FigureProps) {
  return (
    <chakra.figure {...rest}>
      {children}
      {caption && (
        <chakra.figcaption
          fontSize="xs"
          fontWeight="400"
          color="#484947"
          mt={2}
          dangerouslySetInnerHTML={{ __html: caption }}
        />
      )}
    </chakra.figure>
  );
}
