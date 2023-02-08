import { FC, useMemo, useState, useEffect } from "react";
import {
  Box,
  Stack,
  StackProps,
  Text,
  Img,
  Button,
  HStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { IQuiz } from "@/types/pioneerOfProgress";
import correct from "@/assets/images/correct.png";
import wrong from "@/assets/images/wrong.png";
import { useOnClickTracking } from "@/hooks/tracking";

interface Props {
  quiz: IQuiz;
  isHidden?: boolean;
}

const Quiz: FC<StackProps & Props> = ({ quiz, isHidden = true, ...props }) => {
  const [guess, setGuess] = useState(99);

  const isCorrect = useMemo(
    () => guess === quiz.correct,
    [guess, quiz.correct]
  );

  useEffect(() => {
    if (isHidden) {
      setGuess(99);
    }
  }, [isHidden]);

  useOnClickTracking(isCorrect, "answered-quiz", {
    question: quiz.question,
    answer: quiz.answers[guess],
  });

  return (
    <Stack bgColor="#F7CF2D" p="5" color="#484947" {...props}>
      <Text
        className="question"
        display={isCorrect ? "none" : "block"}
        fontWeight="bold"
        dangerouslySetInnerHTML={{ __html: quiz.question }}
      />
      <Box display={isCorrect ? "block" : "none"}>
        {/* <Text fontSize="lg" fontWeight="bold">
          Fun Fact
        </Text> */}
        <Text
          className="funfact"
          fontSize="xs"
          dangerouslySetInnerHTML={{ __html: quiz.funfact }}
        />
      </Box>
      {quiz.answers.length > 2 ? (
        <Wrap>
          {quiz.answers.map((answer, key) => (
            <WrapItem
              key={key}
              alignItems="center"
              display={
                !isCorrect || (isCorrect && key === quiz.correct)
                  ? "flex"
                  : "none"
              }
            >
              <Button
                className="answerbtn"
                px="4"
                alignSelf="flex-start"
                size="sm"
                sx={{
                  bgColor:
                    guess !== key
                      ? "transparent !important"
                      : "#484947 !important",
                  shadow: "none !important",
                }}
                color={guess !== key ? "#484947" : "#F7CF2D"}
                border="1px solid #484947"
                rounded="none"
                outline="none"
                onClick={() => setGuess(key)}
                mr="2"
              >
                {answer}
              </Button>
              <Img
                w="30px"
                display={guess === key ? "block" : "none"}
                src={key === quiz.correct ? correct.src : wrong.src}
              />
            </WrapItem>
          ))}
        </Wrap>
      ) : (
        <>
          {quiz.answers.map((answer, key) => (
            <HStack
              key={key}
              alignItems="center"
              display={
                !isCorrect || (isCorrect && key === quiz.correct)
                  ? "flex"
                  : "none"
              }
            >
              <Button
                className="answerbtn"
                whiteSpace="normal"
                textAlign="left"
                h="100%"
                py="2"
                px="4"
                alignSelf="flex-start"
                size="sm"
                sx={{
                  bgColor:
                    guess !== key
                      ? "transparent !important"
                      : "#484947 !important",
                  shadow: "none !important",
                }}
                color={guess !== key ? "#484947" : "#F7CF2D"}
                border="1px solid #484947"
                rounded="none"
                outline="none"
                onClick={() => setGuess(key)}
              >
                {answer}
              </Button>
              <Img
                w="30px"
                display={guess === key ? "block" : "none"}
                src={key === quiz.correct ? correct.src : wrong.src}
              />
            </HStack>
          ))}
        </>
      )}
    </Stack>
  );
};

export default Quiz;
