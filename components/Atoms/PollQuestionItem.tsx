import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Box, Heading, Text, HStack, Button, useToast } from "@chakra-ui/react";
import { httpsCallable } from "firebase/functions";

import { functions } from "@/connections/firebase";

type PossibleAnswer = "YES" | "NO" | "";

interface PollPayload {
  question: "1" | "2" | "3" | "4" | "5";
  answer: "YES" | "NO";
  recaptcha: string;
}

interface PollQuestionItemProps {
  number: number;
  question: string;
}

const submitPoll = httpsCallable<PollPayload, { message: string }>(
  functions,
  "submitPoll"
);

export default function PollQuestionItem({
  number,
  question,
}: PollQuestionItemProps) {
  const toast = useToast();
  const [isAgreeing, setAgreeing] = useState(false);
  const [isDisagreeing, setDisagreeing] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<PossibleAnswer>("");

  const createSetState =
    (
      answer: PollPayload["answer"],
      setState: Dispatch<SetStateAction<boolean>>
    ) =>
    () => {
      // setState(true);
      window.grecaptcha.ready(function () {
        window.grecaptcha
          .execute(process.env.NEXT_PUBLIC_RECAPTCHA_V3_SITE_KEY as string, {
            action: "submitPoll",
          })
          .then(
            async (token: string) => {
              try {
                // We do optimistic rendering here so we set the answer immediately
                // without waiting for the submit result
                localStorage.setItem(`answer-${number}`, answer);
                setSelectedAnswer(answer);

                if (!selectedAnswer) {
                  await submitPoll({
                    answer,
                    question: `${number}` as PollPayload["question"],
                    recaptcha: token,
                  });
                }
              } catch (error) {
                if (error instanceof Error) {
                  toast({
                    title: "Submit Poll Error",
                    description: error.message,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                  });
                }

                console.error(error);

                // Undo the answer
                localStorage.removeItem(`answer-${number}`);
                setSelectedAnswer("");
              } finally {
                // setState(false);
              }
            },
            (error) => {
              // setState(false);
              toast({
                title: "reCAPTCHA Error",
                description: error.message,
                status: "error",
                duration: 3000,
                isClosable: true,
              });
            }
          );
      });
    };

  useEffect(() => {
    setSelectedAnswer(
      (localStorage.getItem(`answer-${number}`) || "") as PossibleAnswer
    );
  }, [number]);

  return (
    <Box mb={12}>
      <Heading
        fontSize="md"
        color="#009481"
        borderBottom="1px solid #E5B767"
        pb={2}
        p={8}
      >
        POLLING {number}/5
      </Heading>
      <Heading
        as="h3"
        pt={4}
        p={8}
        fontSize="8xl"
        textShadow="-2px 0 #009481, 0 2px #009481, 2px 0 #009481, 0 -2px #009481"
        color="#e1d4c1"
        letterSpacing={8}
      >
        Q{number}.
      </Heading>
      <Text p={8} w="80%" ml="auto" my={6} color="#484947" fontWeight="500">
        {question}
      </Text>
      <HStack p={8} w="80%" ml="auto">
        <Button
          id="question-yes"
          bgColor={selectedAnswer === "YES" ? "#009481" : "transparent"}
          border="1px solid #E5B767"
          w={24}
          color={selectedAnswer === "YES" ? "white" : "#484947"}
          isLoading={isAgreeing}
          onClick={createSetState("YES", setAgreeing)}
          disabled={isDisagreeing}
        >
          Yes
        </Button>
        <Button
          id="question-no"
          bgColor={selectedAnswer === "NO" ? "#009481" : "transparent"}
          border="1px solid #E5B767"
          outline="green"
          w={24}
          color={selectedAnswer === "NO" ? "white" : "#484947"}
          isLoading={isDisagreeing}
          onClick={createSetState("NO", setDisagreeing)}
          disabled={isAgreeing}
        >
          No
        </Button>
      </HStack>
    </Box>
  );
}
