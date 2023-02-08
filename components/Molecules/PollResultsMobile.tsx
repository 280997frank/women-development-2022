import React, { useEffect, useState, useRef } from "react";
import { Box, Text, Spinner, Flex, useToast } from "@chakra-ui/react";
import { CollectionReference, doc } from "firebase/firestore";
import { useDocumentData } from "react-firehooks";
import { useInView } from "react-intersection-observer";
import { httpsCallable, HttpsCallableResult } from "firebase/functions";

import { functions } from "@/connections/firebase";

import PollResultItem from "@/components/Atoms/PollResultItem";

import { useError } from "@/hooks/error";

import { clamp } from "@/utils";

import type { MobileSectionProps } from "@/types/shapersOfSuccess";

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

const getPollingResults = httpsCallable<void, PollListResponse>(
  functions,
  "getPollingResults"
);

const defaultPercentages = new Array(5)
  .fill(null)
  .map(() => ({ agree: 0, disagree: 0 }));

export default function PollResultMobile({
  collectionRef,
  setActiveKeyArea,
  containerRef,
}: MobileSectionProps) {
  const toast = useToast();
  const [threshold, setThreshold] = useState([0.1]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView({
    triggerOnce: true,
    root: containerRef.current,
    rootMargin: "-40px 0px 100px 0px",
  });
  const [bgColorRef, inBgColorView, entry] = useInView({
    root: containerRef.current,
    rootMargin: "-40px 0px 0px 0px",
    threshold,
  });
  const [data, isLoading, error] = useDocumentData(
    inView
      ? doc(collectionRef as CollectionReference<PollResults>, "pollQuestions")
      : null,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  const [percentages, setPercentages] = useState(defaultPercentages);
  const [pollCount, setPollCount] = useState(0);

  useError(error);

  useEffect(() => {
    if (inBgColorView) {
      setActiveKeyArea(0);
    }
  }, [setActiveKeyArea, inBgColorView]);

  useEffect(() => {
    if (entry && entry.rootBounds && sectionRef.current) {
      const newThreshold = clamp(
        entry.rootBounds.height / sectionRef.current.offsetHeight
      );

      setThreshold((currentThreshold) => {
        if (currentThreshold.includes(newThreshold)) {
          return currentThreshold;
        }

        return [...currentThreshold, newThreshold].sort();
      });
    }
  }, [entry]);

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
    }, 10000);

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

  return (
    <Box ref={ref} py={10} id="result">
      <Box ref={sectionRef}>
        <Box ref={bgColorRef}>
          {isLoading ? (
            <Box textAlign="center" my={12}>
              <Spinner size="xl" />
            </Box>
          ) : (
            <>
              <Flex
                justifyContent="space-between"
                p={8}
                pb={2}
                borderBottom="1px solid #E5B767"
              >
                <Text color="#009481" fontWeight="bold">
                  RESULT
                </Text>
                <Text color="#009481" fontWeight="bold">
                  {pollCount.toLocaleString("en-US")} POLLS
                </Text>
              </Flex>
              <Text
                fontWeight="bold"
                color="#484947"
                mt={4}
                lineHeight="1.25"
                p={8}
              >
                {data?.resultDescription}
              </Text>
              {data?.questions.map((question, index) => (
                <PollResultItem
                  key={question}
                  number={index + 1}
                  question={question}
                  percentage={percentages[index]}
                />
              ))}
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}
