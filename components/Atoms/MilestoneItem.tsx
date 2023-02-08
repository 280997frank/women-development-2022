import React from "react";
import { Flex, Box, Text, Button } from "@chakra-ui/react";

export interface MilestoneItemProps {
  name: string;
  pageName?: string;
  onClose: () => void;
  isSeparator?: boolean;
}

export default function MilestoneItem({
  name,
  pageName,
  onClose,
  isSeparator,
}: MilestoneItemProps) {
  if (isSeparator) {
    return (
      <Flex w="full" alignItems="center">
        <Box
          flex="1"
          borderBottom={
            pageName === "pioneers" ? "1px solid black" : "1px solid white"
          }
          h={0}
        />
        <Text
          color={pageName === "pioneers" ? "black" : "white"}
          fontWeight="400"
          fontSize="xs"
          textTransform="uppercase"
          flex="1"
          textAlign="center"
        >
          {name.replace(/-/g, " ")}
        </Text>
        <Box
          flex="1"
          borderBottom={
            pageName === "pioneers" ? "1px solid black" : "1px solid white"
          }
          h={0}
        />
      </Flex>
    );
  }

  return (
    <Button
      // as="a"
      variant="unstyled"
      sx={pageName === "pioneers" ? { color: "black" } : { color: "white" }}
      fontWeight="400"
      fontSize="xl"
      // href={`#${name}`}
      textTransform="capitalize"
      onClick={onClose}
    >
      {name.replace(/-/g, " ")}
    </Button>
  );
}
