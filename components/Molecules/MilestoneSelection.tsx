import React from "react";
import { Box, Text, IconButton, chakra, useDisclosure } from "@chakra-ui/react";
import { IoIosArrowDown } from "react-icons/io";

import { useWindowSize } from "@/hooks/utils";

import MilestoneItem, {
  MilestoneItemProps,
} from "@/components/Atoms/MilestoneItem";

interface MilestoneSelectionProps {
  pageName: "pioneers" | "shapers" | "trailblazers";
  data: Omit<MilestoneItemProps, "onClose">[];
}

const theme = {
  pioneers: {
    title: "Pioneers of Progress",
    color: "#F7CF2D",
  },
  shapers: {
    title: "Shapers of Success",
    color: "#009481",
  },
  trailblazers: {
    title: "Trailblazers of Tomorrow",
    color: "#235786",
  },
};

export default function MilestoneSelection({
  pageName,
  data,
}: MilestoneSelectionProps) {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const { innerHeight } = useWindowSize();

  return (
    <Box
      bgColor={theme[pageName].color}
      position="fixed"
      w="full"
      zIndex="2"
      sx={{ touchAction: "none" }}
    >
      <Box pos="relative" onClick={onToggle}>
        <Text
          color={pageName === "pioneers" ? "black" : "white"}
          fontWeight="bold"
          flex="1"
          textAlign="center"
          py={2}
        >
          {theme[pageName].title}
        </Text>
        <IconButton
          variant="unstyled"
          d="flex"
          aria-label="Toggle drawer"
          pos="absolute"
          right={{ base: 0, sm: 4 }}
          top="50%"
          w={4}
          transform={`translateY(-50%)`}
          icon={<IoIosArrowDown />}
          // onClick={onToggle}
          fontSize="2xl"
          color={pageName === "pioneers" ? "black" : "white"}
          _focus={{
            boxShadow: "none",
          }}
          sx={{
            svg: {
              transform: `${isOpen ? "rotate(180deg)" : "none"}`,
              transition: "0.25s",
            },
          }}
        />
      </Box>
      <Box
        bgColor={theme[pageName].color}
        // h={isOpen ? "calc(100vh - 6rem - 2.5rem)" : 0}
        h={isOpen ? `calc(${innerHeight}px - 6rem - 2.5rem)` : 0}
        maxH="-webkit-fill-available"
        transition="0.25s"
        overflowY="auto"
      >
        <chakra.ul>
          {data.map((props) => (
            <chakra.li
              key={props.name}
              d="flex"
              justifyContent="center"
              alignItems="center"
              h="2.5rem"
              my={2}
            >
              <MilestoneItem
                {...props}
                onClose={() => {
                  setTimeout(() => {
                    const element = document.getElementById(props.name);
                    element?.scrollIntoView();
                    window.scroll(0, window.scrollY - 6 * 16);
                    onClose();
                  }, 400);
                }}
                pageName={pageName}
              />
            </chakra.li>
          ))}
        </chakra.ul>
      </Box>
    </Box>
  );
}
