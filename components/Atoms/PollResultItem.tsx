import React from "react";
import { Box, Heading, Text, Flex } from "@chakra-ui/react";

interface PollResultItemProps {
  number: number;
  question: string;
  percentage: { agree: number; disagree: number };
}

export default function PollResultItem({
  number,
  question,
  percentage,
}: PollResultItemProps) {
  return (
    <Box
      pb={8}
      py={4}
      p={8}
      sx={{
        "&:not(:last-child)": {
          borderBottom: "1px solid #E5B767",
        },
      }}
    >
      <Heading as="h3" fontSize="8xl" color="#009481" letterSpacing={8}>
        Q{number}.
      </Heading>
      <Text my={6} color="#484947" fontWeight="600">
        {question}
      </Text>
      {/* <Box h={8} bgImage="linear-gradient(270deg, #D64A52 0%, #2942CD 100%);" /> */}
      <Box
        h={8}
        bgImage={`linear-gradient(to right, #2942CD calc(${percentage.agree}% - 2rem), #D64A52 calc(${percentage.agree}% + 2rem))`}
      />
      <Flex justifyContent="space-between">
        <Text color="#484947" fontWeight="600">
          {Math.round(percentage.agree)}% Agree
        </Text>
        <Text color="#484947" fontWeight="600">
          {Math.round(percentage.disagree)}% Disagree
        </Text>
      </Flex>
    </Box>
  );
}
