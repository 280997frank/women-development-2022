import { Box, Flex, Text } from "@chakra-ui/react";
import React, { FC } from "react";

const HeaderSchedule: FC = ({ ...props }) => {
  return (
    <Flex mt={{ base: 16 }} gap={{ base: 5 }} {...props}>
      <Box w={{ base: "55%", lg: "60%" }}>
        <Text
          data-testid="location"
          fontWeight={{ base: "semibold" }}
          fontSize={{ base: "2xl", lg: "lg", "2xl": "2xl" }}
          lineHeight={{ base: "1.8125rem", lg: 5, "2xl": 7 }}
          color="#255B8B"
        >
          Location
        </Text>
      </Box>

      <Box w={{ base: "45%", lg: "40%" }}>
        <Text
          data-testid="event-dates"
          fontWeight={{ base: "semibold" }}
          fontSize={{ base: "2xl", lg: "lg", "2xl": "2xl" }}
          lineHeight={{ base: "1.8125rem", lg: 5, "2xl": 7 }}
          color="#255B8B"
        >
          Event Dates
        </Text>
      </Box>
    </Flex>
  );
};

export default HeaderSchedule;
