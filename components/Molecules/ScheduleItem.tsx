import React, { FC } from "react";
import { Box, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import { MdPlace } from "react-icons/md";

import { TSchedule } from "@/types/physicalExhibition";

const ScheduleItem: FC<{ schedule: TSchedule }> = ({ schedule, ...props }) => {
  const [isDesktop] = useMediaQuery("(min-width: 62em)");

  return (
    <Flex mt={{ base: 6, lg: 4, "2xl": 6 }} gap={{ base: 5 }} {...props}>
      <Box w={{ base: "55%", lg: "60%" }}>
        <Text
          data-testid="place"
          fontWeight={{
            base: "medium",
          }}
          fontSize={{ base: "md", lg: "xs", "2xl": "xl" }}
          lineHeight={{ base: 5, lg: 3, "2xl": 6 }}
          color="#484947"
        >
          {schedule?.place}
        </Text>
        <Text
          data-testid="address"
          mt={{ base: 1 }}
          fontSize={{
            base: "xs",
            "2xl": "md",
          }}
          lineHeight={{
            base: "1.3",
            sm: "0.6875rem",
            "2xl": 4,
          }}
          color="#484947"
        >
          {schedule?.address?.split(",")[0]},
        </Text>
        <Flex
          gap="0.1875rem"
          alignItems="center"
          mt={{ base: "0.1875rem", lg: 1 }}
        >
          <Text
            data-testid="address2"
            fontSize={{
              base: "xs",
              "2xl": "md",
            }}
            lineHeight={{
              base: "1.3",
              sm: "0.6875rem",
              "2xl": 4,
            }}
            color="#484947"
          >
            {schedule?.address?.split(",")[1]}
          </Text>
          <MdPlace size={isDesktop ? 12 : 20} color="red" />
        </Flex>
      </Box>

      <Box w={{ base: "45%", lg: "40%" }}>
        <Text
          data-testid="dates"
          fontWeight={{
            base: "medium",
          }}
          fontSize={{ base: "md", lg: "xs", "2xl": "xl" }}
          lineHeight={{ base: 5, lg: 3, "2xl": 6 }}
          color="#484947"
        >
          {schedule?.dates}
        </Text>
      </Box>
    </Flex>
  );
};

export default ScheduleItem;
