import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useInView } from "react-intersection-observer";
import { useDocumentData } from "react-firehooks";
import { CollectionReference, doc } from "firebase/firestore";
import { Box, Button, Flex, Heading, Text, useToast } from "@chakra-ui/react";
import YearWrapper from "@/components/Atoms/ShapersOfSuccess/YearWrapper";
import Title from "@/components/Atoms/ShapersOfSuccess/Title";
import { border } from "@/constants/pioneersConstant";
import { useError } from "@/hooks/error";
import { httpsCallable, HttpsCallableResult } from "firebase/functions";
import { functions } from "@/connections/firebase";
import { DesktopSectionProps } from "@/types/shapersOfSuccess";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "@/states/store";

interface InitialValues {
  question?: string;
  answer?: string;
  recaptcha?: string;
}

interface PollResults {
  title: string;
  description: string;
  resultDescription: string;
  questions: string[];
}

interface PollListResponse {
  message: string;
  data: {
    "1": { count: number; answer: "YES" | "NO" }[];
    "2": { count: number; answer: "YES" | "NO" }[];
    "3": { count: number; answer: "YES" | "NO" }[];
    "4": { count: number; answer: "YES" | "NO" }[];
    "5": { count: number; answer: "YES" | "NO" }[];
  };
}

const submitPoll = httpsCallable<InitialValues, { message: string }>(
  functions,
  "submitPoll"
);

const getPollingResults = httpsCallable<void, PollListResponse>(
  functions,
  "getPollingResults"
);

interface PollQuestions {
  title: string;
  description: string;
  questions: string[];
}

const defaultPercentages = new Array(5)
  .fill(null)
  .map(() => ({ agree: 0, disagree: 0 }));

export default function SosPollingDesktop({
  collectionRef,
  setActiveKeyArea,
}: DesktopSectionProps) {
  const { inView, ref } = useInView({
    triggerOnce: false,
    threshold: 0,
  });

  const [bgColorRef, inBgColorView] = useInView({
    rootMargin: "0px 100px 0px 100px",
  });

  const [isAgreeing1, setIsAgreeing1] = useState(false);
  const [isDisAgreeing1, setDisAgreeing1] = useState(false);
  const [isAgreeing2, setIsAgreeing2] = useState(false);
  const [isDisAgreeing2, setDisAgreeing2] = useState(false);
  const [isAgreeing3, setIsAgreeing3] = useState(false);
  const [isDisAgreeing3, setDisAgreeing3] = useState(false);
  const [isAgreeing4, setIsAgreeing4] = useState(false);
  const [isDisAgreeing4, setDisAgreeing4] = useState(false);
  const [isAgreeing5, setIsAgreeing5] = useState(false);
  const [isDisAgreeing5, setDisAgreeing5] = useState(false);

  const toast = useToast();

  const [isSelectedQuestion, setIsSelectedQuestion] = useState({
    "1": false,
    "2": false,
    "3": false,
    "4": false,
    "5": false,
  });

  // const { isOpen, onClose, onOpen } = useDisclosure();

  const [data, isLoading, error] = useDocumentData(
    inView
      ? doc(
          collectionRef as CollectionReference<PollQuestions>,
          "pollQuestions"
        )
      : null,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const [dataResult, isLoadingResult, errorResult] = useDocumentData(
    inView
      ? doc(collectionRef as CollectionReference<PollResults>, "pollQuestions")
      : null,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  useError(error);
  useError(errorResult);

  useEffect(() => {
    if (inBgColorView) {
      setActiveKeyArea("POLLING");
    }
  }, [setActiveKeyArea, inBgColorView]);

  const handleSubmitPoll = (
    question: string,
    answer: string,
    setState: Dispatch<SetStateAction<boolean>>
  ) => {
    // setState(true);
    window.grecaptcha.ready(function () {
      window.grecaptcha
        .execute(process.env.NEXT_PUBLIC_RECAPTCHA_V3_SITE_KEY as string, {
          action: "submitPoll",
        })
        .then(
          async (token: string) => {
            try {
              if (!window.localStorage.getItem(question)) {
                // We explicitly don't use `await` here because we don't wait for the submit result
                submitPoll({
                  answer,
                  question,
                  recaptcha: token,
                });
              }

              window.localStorage.setItem(question, answer);
            } catch (error) {
              if (error instanceof Error) {
                toast({
                  title: "Submit Score Error",
                  description: error.message,
                  status: "error",
                  duration: 3000,
                  isClosable: true,
                });
              }

              console.error(error);
              window.localStorage.removeItem(question);
            } finally {
              setIsSelectedQuestion({
                ...isSelectedQuestion,
                [question]: false,
              });
              // setState(false);
            }
          },
          (error) => {
            setIsSelectedQuestion({ ...isSelectedQuestion, [question]: false });
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

  const [percentages, setPercentages] = useState(defaultPercentages);
  const [pollCount, setPollCount] = useState(0);

  useEffect(() => {
    function processPollingResults({
      data,
    }: HttpsCallableResult<PollListResponse>) {
      let totalCount = 0;
      const percentages_ = Object.values(data.data).map((answers) => {
        const yesAnswers = answers.filter(({ answer }) => answer === "YES");
        const yesCount = yesAnswers
          .map(({ count }) => count)
          .reduce((prev, current) => prev + current, 0);

        const noAnswers = answers.filter(({ answer }) => answer === "NO");
        const noCount = noAnswers
          .map(({ count }) => count)
          .reduce((prev, current) => prev + current, 0);

        totalCount += yesCount + noCount;

        if (yesCount === 0 && noCount === 0) {
          return {
            agree: 0,
            disagree: 0,
          };
        }

        return {
          agree: (yesCount / (yesCount + noCount)) * 100,
          disagree: (noCount / (yesCount + noCount)) * 100,
        };
      });

      setPercentages(percentages_);
      setPollCount(totalCount);
    }

    let intervalId = window.setInterval(() => {
      getPollingResults()
        .then(processPollingResults)
        .catch((error) =>
          console.error(`Failed to fetch poll results: ${error.message}`)
        );
    }, 2000);

    getPollingResults()
      .then(processPollingResults)
      .catch((error) =>
        toast({
          title: "Failed to retrieve poll results",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        })
      );

    return () => {
      clearInterval(intervalId);
    };
  }, [toast]);

  const { activeYears } = useSelector(
    (state: RootState) => ({
      activeYears: state.shapersOfSuccessProgress.activeYears,
    }),
    shallowEqual
  );

  const rightContent = useMemo(() => {
    const lastActive = activeYears[0];
    if (activeYears.includes("POLLING")) {
      return "0px";
    } else if (lastActive !== "POLLING") {
      return "1000px";
    }
  }, [activeYears]);

  const titleContent = useMemo(() => {
    const lastActive = activeYears[0];
    if (activeYears.includes("POLLING")) {
      return 0;
    } else if (lastActive !== "POLLING") {
      return "-100px";
    }
  }, [activeYears]);

  const posContent = useMemo(() => {
    const lastActive = activeYears[0];
    if (activeYears.includes("POLLING")) {
      return "relative";
    } else if (lastActive !== "POLLING") {
      return "absolute";
    }
  }, [activeYears]);

  const topContent = useMemo(() => {
    const lastActive = activeYears[0];
    if (activeYears.includes("POLLING")) {
      return 0;
    }
  }, [activeYears]);

  const leftContent = useMemo(() => {
    const lastActive = activeYears[0];
    if (activeYears.includes("POLLING")) {
      return 0;
    } else if (lastActive !== "POLLING") {
      return -300;
    }
  }, [activeYears]);

  const opacityContent = useMemo(() => {
    const lastActive = activeYears[0];
    if (activeYears.includes("POLLING")) {
      return 1;
    } else if (lastActive !== "POLLING") {
      return 0;
    }
  }, [activeYears]);

  return (
    <Box ref={ref}>
      <Box ref={bgColorRef}>
        <YearWrapper year="POLLING" w="400vw">
          <Box
            w="20%"
            zIndex={1}
            borderLeft="5px solid #E5B767"
            // borderRight={border}
            h="80vh"
            minH="80vh"
            maxH="80vh"
            pos={posContent}
            top={topContent}
            left={leftContent}
            // w={widthContent}
            transition="all 0.5s linear"
            opacity={opacityContent}
            // minH={{ lg: "90vh", "2xl": "80vh" }}
          >
            <Title
              color="#009481"
              pl={10}
              pr={10}
              pb={10}
              pt="20vh"
              borderBottom={border}
            >
              {data?.title}
            </Title>
            <Text
              pl={10}
              fontSize={window.innerWidth < 1400 ? "1rem" : "1.25rem"}
              pt={5}
              fontWeight="bold"
              pr={10}
              color="#484947"
              pb={20}
            >
              {data?.description}
            </Text>
          </Box>
          <Box pos="relative">
            <Box
              borderLeft={border}
              h="80%"
              transition="all 0.5s linear"
              pos="absolute"
              left={rightContent}
            />
          </Box>
          <Box
            w="30%"
            pl={titleContent}
            transition="all 0.5s linear"
            pos={posContent}
            top={topContent}
            left={leftContent}
            opacity={opacityContent}
          >
            <Flex flexDir="row" borderBottom={border} pb={5}>
              <Text
                color="#009481"
                pl={10}
                transition="all 0.5s linear"
                fontWeight="bold"
              >
                POLL
                <span style={{ fontWeight: "normal", marginLeft: "5px" }}>
                  1/5
                </span>
              </Text>
            </Flex>
            <Heading
              as="h3"
              pt={4}
              px="10%"
              fontSize="8xl"
              textShadow="-2px 0 #009481, 0 2px #009481, 2px 0 #009481, 0 -2px #009481"
              color="#e1d4c1"
              letterSpacing={8}
            >
              Q1.
            </Heading>
            <Flex flexDir="column" pl="10vw">
              <Text
                color="#484947"
                w="70%"
                fontSize={window.innerWidth < 1400 ? "1rem" : "1.25rem"}
                pt={10}
              >
                {data?.questions[0]}
              </Text>
              <Flex w="70%" flexDir="row" justifyContent="space-between" pt={5}>
                <Button
                  bgColor={
                    window.localStorage.getItem("1") === "YES"
                      ? "#009481"
                      : "transparent"
                  }
                  color={
                    window.localStorage.getItem("1") === "YES"
                      ? "white"
                      : "#484947"
                  }
                  disabled={isDisAgreeing1}
                  isLoading={isAgreeing1}
                  onClick={() => handleSubmitPoll("1", "YES", setIsAgreeing1)}
                  _active={{
                    bg: "#009481",
                  }}
                  border="1px solid #E5B767"
                  _hover={{
                    bg: "#009481",
                    color: "#FFF",
                    border: "none",
                  }}
                  px="50px"
                  borderRadius="none"
                >
                  Yes
                </Button>
                <Button
                  bgColor={
                    window.localStorage.getItem("1") === "NO"
                      ? "#009481"
                      : "transparent"
                  }
                  color={
                    window.localStorage.getItem("1") === "NO"
                      ? "white"
                      : "#484947"
                  }
                  disabled={isAgreeing1}
                  isLoading={isDisAgreeing1}
                  onClick={() => handleSubmitPoll("1", "NO", setDisAgreeing1)}
                  _active={{
                    bg: "#009481",
                  }}
                  border="1px solid #E5B767"
                  _hover={{
                    bg: "#009481",
                    color: "#FFF",
                    border: "none",
                  }}
                  px="50px"
                  borderRadius="none"
                >
                  No
                </Button>
              </Flex>
            </Flex>
          </Box>
          <Box pos="relative">
            <Box
              borderLeft={border}
              h="80%"
              transition="all 0.5s linear"
              pos="absolute"
              left={rightContent}
            />
          </Box>
          <Box
            w="30%"
            pos={posContent}
            top={topContent}
            left={leftContent}
            // w={widthContent}
            transition="all 0.5s linear"
            opacity={opacityContent}
          >
            <Flex
              flexDir="row"
              borderBottom={border}
              pb={5}
              // borderRight={border}
              pt="20vh"
            >
              <Text color="#009481" pl={10} fontWeight="bold">
                POLL
                <span style={{ fontWeight: "normal", marginLeft: "5px" }}>
                  2/5
                </span>
              </Text>
            </Flex>
            <Box h="5vh" />
            <Heading
              as="h3"
              pt={4}
              px="10%"
              fontSize="8xl"
              textShadow="-2px 0 #009481, 0 2px #009481, 2px 0 #009481, 0 -2px #009481"
              color="#e1d4c1"
              letterSpacing={8}
            >
              Q2.
            </Heading>
            <Flex flexDir="column" pl="10vw">
              <Text
                color="#484947"
                w="70%"
                fontSize={window.innerWidth < 1400 ? "1rem" : "1.25rem"}
                pt={10}
              >
                {data?.questions[1]}
              </Text>
              <Flex w="70%" flexDir="row" justifyContent="space-between" pt={5}>
                <Button
                  bgColor={
                    window.localStorage.getItem("2") === "YES"
                      ? "#009481"
                      : "transparent"
                  }
                  color={
                    window.localStorage.getItem("2") === "YES"
                      ? "white"
                      : "#484947"
                  }
                  disabled={isDisAgreeing2}
                  isLoading={isAgreeing2}
                  onClick={() => handleSubmitPoll("2", "YES", setIsAgreeing2)}
                  _active={{
                    bg: "#009481",
                  }}
                  border="1px solid #E5B767"
                  _hover={{
                    bg: "#009481",
                    color: "#FFF",
                    border: "none",
                  }}
                  px="50px"
                  borderRadius="none"
                >
                  Yes
                </Button>
                <Button
                  bgColor={
                    window.localStorage.getItem("2") === "NO"
                      ? "#009481"
                      : "transparent"
                  }
                  color={
                    window.localStorage.getItem("2") === "NO"
                      ? "white"
                      : "#484947"
                  }
                  disabled={isAgreeing2}
                  isLoading={isDisAgreeing2}
                  onClick={() => handleSubmitPoll("2", "NO", setDisAgreeing2)}
                  _active={{
                    bg: "#009481",
                  }}
                  border="1px solid #E5B767"
                  _hover={{
                    bg: "#009481",
                    color: "#FFF",
                    border: "none",
                  }}
                  px="50px"
                  borderRadius="none"
                >
                  No
                </Button>
              </Flex>
            </Flex>
          </Box>
          <Box pos="relative">
            <Box
              borderLeft={border}
              h="40%"
              transition="all 0.5s linear"
              pos="absolute"
              left={rightContent}
            />
          </Box>
          <Box
            w="25%"
            borderRight={border}
            minH="80vh"
            maxH="80vh"
            opacity={opacityContent}
            transition="all 0.5s linear"
          >
            <Flex flexDir="row" borderBottom={border} pb={5} pt={20}>
              <Text color="#009481" pl={10} fontWeight="bold">
                POLL
                <span style={{ fontWeight: "normal", marginLeft: "5px" }}>
                  3/5
                </span>
              </Text>
            </Flex>
            <Box ml="-100px">
              <Heading
                as="h3"
                pt={window.innerWidth < 1400 ? "50px" : "100px"}
                px="10%"
                fontSize="8xl"
                textShadow="-2px 0 #009481, 0 2px #009481, 2px 0 #009481, 0 -2px #009481"
                color="#e1d4c1"
                letterSpacing={8}
              >
                Q3.
              </Heading>
              <Flex flexDir="column" pl="10vw">
                <Text
                  color="#484947"
                  w="70%"
                  fontSize={window.innerWidth < 1400 ? "1rem" : "1.25rem"}
                  pt={10}
                >
                  {data?.questions[2]}
                </Text>
                <Flex
                  w="70%"
                  flexDir="row"
                  justifyContent="space-between"
                  pt={5}
                >
                  <Button
                    bgColor={
                      window.localStorage.getItem("3") === "YES"
                        ? "#009481"
                        : "transparent"
                    }
                    color={
                      window.localStorage.getItem("3") === "YES"
                        ? "white"
                        : "#484947"
                    }
                    disabled={isDisAgreeing3}
                    isLoading={isAgreeing3}
                    onClick={() => handleSubmitPoll("3", "YES", setIsAgreeing3)}
                    _active={{
                      bg: "#009481",
                    }}
                    border="1px solid #E5B767"
                    _hover={{
                      bg: "#009481",
                      color: "#FFF",
                      border: "none",
                    }}
                    px="50px"
                    borderRadius="none"
                  >
                    Yes
                  </Button>
                  <Button
                    bgColor={
                      window.localStorage.getItem("3") === "NO"
                        ? "#009481"
                        : "transparent"
                    }
                    color={
                      window.localStorage.getItem("3") === "NO"
                        ? "white"
                        : "#484947"
                    }
                    disabled={isAgreeing3}
                    isLoading={isDisAgreeing3}
                    onClick={() => handleSubmitPoll("3", "NO", setDisAgreeing3)}
                    _active={{
                      bg: "#009481",
                    }}
                    border="1px solid #E5B767"
                    _hover={{
                      bg: "#009481",
                      color: "#FFF",
                      border: "none",
                    }}
                    px="50px"
                    borderRadius="none"
                  >
                    No
                  </Button>
                </Flex>
              </Flex>
            </Box>
          </Box>
          <Box
            w="30%"
            borderRight={border}
            minH="80vh"
            maxH="80vh"
            opacity={opacityContent}
            transition="all 0.5s linear"
          >
            <Flex flexDir="row" borderBottom={border} pb={5} pt="5vh">
              <Text color="#009481" pl={10} fontWeight="bold">
                POLL
                <span style={{ fontWeight: "normal", marginLeft: "5px" }}>
                  4/5
                </span>
              </Text>
            </Flex>
            <Heading
              as="h3"
              pt={4}
              px="10%"
              fontSize="8xl"
              textShadow="-2px 0 #009481, 0 2px #009481, 2px 0 #009481, 0 -2px #009481"
              color="#e1d4c1"
              letterSpacing={8}
            >
              Q4.
            </Heading>
            <Flex flexDir="column" pl="10vw">
              <Text
                color="#484947"
                w="70%"
                fontSize={window.innerWidth < 1400 ? "1rem" : "1.25rem"}
                pt={10}
              >
                {data?.questions[3]}
              </Text>
              <Flex w="70%" flexDir="row" justifyContent="space-between" pt={5}>
                <Button
                  bgColor={
                    window.localStorage.getItem("4") === "YES"
                      ? "#009481"
                      : "transparent"
                  }
                  color={
                    window.localStorage.getItem("4") === "YES"
                      ? "white"
                      : "#484947"
                  }
                  disabled={isDisAgreeing4}
                  isLoading={isAgreeing4}
                  onClick={() => handleSubmitPoll("4", "YES", setIsAgreeing4)}
                  _active={{
                    bg: "#009481",
                  }}
                  border="1px solid #E5B767"
                  _hover={{
                    bg: "#009481",
                    color: "#FFF",
                    border: "none",
                  }}
                  px="50px"
                  borderRadius="none"
                >
                  Yes
                </Button>
                <Button
                  bgColor={
                    window.localStorage.getItem("4") === "NO"
                      ? "#009481"
                      : "transparent"
                  }
                  color={
                    window.localStorage.getItem("4") === "NO"
                      ? "white"
                      : "#484947"
                  }
                  disabled={isAgreeing4}
                  isLoading={isDisAgreeing4}
                  onClick={() => handleSubmitPoll("4", "NO", setDisAgreeing4)}
                  _active={{
                    bg: "#009481",
                  }}
                  border="1px solid #E5B767"
                  _hover={{
                    bg: "#009481",
                    color: "#FFF",
                    border: "none",
                  }}
                  px="50px"
                  borderRadius="none"
                >
                  No
                </Button>
              </Flex>
            </Flex>
          </Box>
          <Box
            w="30%"
            pt="20vh"
            borderRight="5px solid #E5B767"
            minH="80vh"
            maxH="80vh"
            opacity={opacityContent}
            transition="all 0.5s linear"
          >
            <Flex flexDir="row" borderBottom={border} pb={5}>
              <Text color="#009481" pl={10} fontWeight="bold">
                POLL
                <span style={{ fontWeight: "normal", marginLeft: "5px" }}>
                  5/5
                </span>
              </Text>
            </Flex>
            <Heading
              as="h3"
              pt={4}
              px="10%"
              fontSize="8xl"
              textShadow="-2px 0 #009481, 0 2px #009481, 2px 0 #009481, 0 -2px #009481"
              color="#e1d4c1"
              letterSpacing={8}
            >
              Q5.
            </Heading>
            <Flex flexDir="column" pl="10vw">
              <Text
                color="#484947"
                w="70%"
                fontSize={window.innerWidth < 1400 ? "1rem" : "1.25rem"}
                pt={10}
              >
                {data?.questions[4]}
              </Text>
              <Flex w="70%" flexDir="row" justifyContent="space-between" pt={5}>
                <Button
                  bgColor={
                    window.localStorage.getItem("5") === "YES"
                      ? "#009481"
                      : "transparent"
                  }
                  color={
                    window.localStorage.getItem("5") === "YES"
                      ? "white"
                      : "#484947"
                  }
                  disabled={isDisAgreeing5}
                  isLoading={isAgreeing5}
                  onClick={() => handleSubmitPoll("5", "YES", setIsAgreeing5)}
                  _active={{
                    bg: "#009481",
                  }}
                  border="1px solid #E5B767"
                  _hover={{
                    bg: "#009481",
                    color: "#FFF",
                    border: "none",
                  }}
                  px="50px"
                  borderRadius="none"
                >
                  Yes
                </Button>
                <Button
                  bgColor={
                    window.localStorage.getItem("5") === "NO"
                      ? "#009481"
                      : "transparent"
                  }
                  color={
                    window.localStorage.getItem("5") === "NO"
                      ? "white"
                      : "#484947"
                  }
                  disabled={isAgreeing5}
                  isLoading={isDisAgreeing5}
                  onClick={() => handleSubmitPoll("5", "NO", setDisAgreeing5)}
                  _active={{
                    bg: "#009481",
                  }}
                  border="1px solid #E5B767"
                  _hover={{
                    bg: "#009481",
                    color: "#FFF",
                    border: "none",
                  }}
                  px="50px"
                  borderRadius="none"
                >
                  No
                </Button>
              </Flex>
            </Flex>
          </Box>
          <Box
            w={window.innerWidth < 1400 ? "35%" : "50%"}
            borderRight={border}
            minH="80vh"
            maxH="80vh"
          >
            <Text
              pl={5}
              color="#009481"
              pb={5}
              borderBottom={border}
              fontWeight="bold"
            >
              POLL RESULTS
            </Text>
            <Text pl={10} pt={10} fontWeight="bold">
              {dataResult?.resultDescription}
            </Text>
            <Flex
              flexDir="column"
              pl={10}
              pt={10}
              pr={10}
              gap={window.innerWidth < 1400 ? 5 : 10}
            >
              <Flex flexDir="row" gap={window.innerWidth < 1400 ? 5 : 10}>
                <Text
                  w={window.innerWidth < 1400 ? "10%" : "20%"}
                  alignSelf="start"
                  color="#009481"
                  fontSize={window.innerWidth < 1400 ? "4xl" : "6xl"}
                  fontWeight="700"
                >
                  Q1.
                </Text>
                <Box w={window.innerWidth < 1400 ? "100%" : "70%"}>
                  <Text pb={2}>{dataResult?.questions[0]}</Text>
                  <Box
                    h={8}
                    bgImage={`linear-gradient(to right, #2942CD calc(${percentages[0].agree}% - 2rem), #D64A52 calc(${percentages[0].agree}% + 2rem))`}
                  />
                  <Flex justifyContent="space-between">
                    <Text color="#484947" fontWeight="600">
                      {Math.round(percentages[0].agree)}% Yes
                    </Text>
                    <Text color="#484947" fontWeight="600">
                      {Math.round(percentages[0].disagree)}% No
                    </Text>
                  </Flex>
                </Box>
              </Flex>

              <Flex flexDir="row" gap={window.innerWidth < 1400 ? 5 : 10}>
                <Text
                  w={window.innerWidth < 1400 ? "10%" : "20%"}
                  alignSelf="start"
                  color="#009481"
                  fontSize={window.innerWidth < 1400 ? "4xl" : "6xl"}
                  fontWeight="700"
                >
                  Q2.
                </Text>
                <Box w={window.innerWidth < 1400 ? "100%" : "70%"}>
                  <Text pb={2}>{dataResult?.questions[1]}</Text>
                  <Box
                    h={8}
                    bgImage={`linear-gradient(to right, #2942CD calc(${percentages[1].agree}% - 2rem), #D64A52 calc(${percentages[1].agree}% + 2rem))`}
                  />
                  <Flex justifyContent="space-between">
                    <Text color="#484947" fontWeight="600">
                      {Math.round(percentages[1].agree)}% Yes
                    </Text>
                    <Text color="#484947" fontWeight="600">
                      {Math.round(percentages[1].disagree)}% No
                    </Text>
                  </Flex>
                </Box>
              </Flex>

              <Flex flexDir="row" gap={window.innerWidth < 1400 ? 5 : 10}>
                <Text
                  w={window.innerWidth < 1400 ? "10%" : "20%"}
                  alignSelf="start"
                  color="#009481"
                  fontSize={window.innerWidth < 1400 ? "4xl" : "6xl"}
                  fontWeight="700"
                >
                  Q3.
                </Text>
                <Box w={window.innerWidth < 1400 ? "100%" : "70%"}>
                  <Text pb={2}>{dataResult?.questions[2]}</Text>
                  <Box
                    h={8}
                    bgImage={`linear-gradient(to right, #2942CD calc(${percentages[2].agree}% - 2rem), #D64A52 calc(${percentages[2].agree}% + 2rem))`}
                  />
                  <Flex justifyContent="space-between">
                    <Text color="#484947" fontWeight="600">
                      {Math.round(percentages[2].agree)}% Yes
                    </Text>
                    <Text color="#484947" fontWeight="600">
                      {Math.round(percentages[2].disagree)}% No
                    </Text>
                  </Flex>
                </Box>
              </Flex>
            </Flex>
          </Box>

          <Box
            w={window.innerWidth < 1400 ? "35%" : "50%"}
            borderRight="5px solid #E5B767"
            minH="80vh"
            maxH="80vh"
          >
            <Text
              pl={5}
              pt={10}
              color="#009481"
              fontSize="1rem"
              fontWeight="bold"
              borderBottom={border}
            >
              {pollCount.toLocaleString("en-US")} POLLS
            </Text>
            <Flex
              flexDir="column"
              pt={10}
              gap={window.innerWidth < 1400 ? 5 : 10}
              pr={10}
            >
              <Flex
                pl={10}
                flexDir="row"
                gap={window.innerWidth < 1400 ? 5 : 10}
              >
                <Text
                  w={window.innerWidth < 1400 ? "10%" : "20%"}
                  alignSelf="start"
                  color="#009481"
                  fontSize={window.innerWidth < 1400 ? "4xl" : "6xl"}
                  fontWeight="700"
                >
                  Q4.
                </Text>
                <Box w={window.innerWidth < 1400 ? "100%" : "70%"}>
                  <Text pb={2}>{dataResult?.questions[3]}</Text>
                  <Box
                    h={8}
                    bgImage={`linear-gradient(to right, #2942CD calc(${percentages[3].agree}% - 2rem), #D64A52 calc(${percentages[3].agree}% + 2rem))`}
                  />
                  <Flex justifyContent="space-between">
                    <Text color="#484947" fontWeight="600">
                      {Math.round(percentages[3].agree)}% Yes
                    </Text>
                    <Text color="#484947" fontWeight="600">
                      {Math.round(percentages[3].disagree)}% No
                    </Text>
                  </Flex>
                </Box>
              </Flex>

              <Flex
                pt={10}
                pl={10}
                flexDir="row"
                align="end"
                gap={window.innerWidth < 1400 ? 5 : 10}
              >
                <Text
                  w={window.innerWidth < 1400 ? "10%" : "20%"}
                  pb={2}
                  alignSelf="start"
                  color="#009481"
                  fontSize={window.innerWidth < 1400 ? "4xl" : "6xl"}
                  fontWeight="700"
                >
                  Q5.
                </Text>
                <Box w={window.innerWidth < 1400 ? "100%" : "70%"}>
                  <Text>{dataResult?.questions[4]}</Text>
                  <Box
                    h={8}
                    bgImage={`linear-gradient(to right, #2942CD calc(${percentages[4].agree}% - 2rem), #D64A52 calc(${percentages[4].agree}% + 2rem))`}
                  />
                  <Flex justifyContent="space-between">
                    <Text color="#484947" fontWeight="600">
                      {Math.round(percentages[4].agree)}% Yes
                    </Text>
                    <Text color="#484947" fontWeight="600">
                      {Math.round(percentages[4].disagree)}% No
                    </Text>
                  </Flex>
                </Box>
              </Flex>
            </Flex>
          </Box>
          <Box w="20vw" />
        </YearWrapper>
      </Box>
    </Box>
  );
}
