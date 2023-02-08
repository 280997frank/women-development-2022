import React, { useEffect, useState, useRef } from "react";
import { Box, Heading, Text, Spinner } from "@chakra-ui/react";
import { CollectionReference, doc } from "firebase/firestore";
import { useDocumentData } from "react-firehooks";
import { useInView } from "react-intersection-observer";
import Script from "next/script";

import PollQuestionItem from "@/components/Atoms/PollQuestionItem";

import { useError } from "@/hooks/error";

import { clamp } from "@/utils";

import type { MobileSectionProps } from "@/types/shapersOfSuccess";

interface PollQuestions {
  title: string;
  description: string;
  questions: string[];
}

export default function PollQuestionMobile({
  collectionRef,
  setActiveKeyArea,
  containerRef,
}: MobileSectionProps) {
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
      ? doc(
          collectionRef as CollectionReference<PollQuestions>,
          "pollQuestions"
        )
      : null,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

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

  return (
    <>
      <Box ref={ref} pt={10} id="questions">
        <Box ref={sectionRef}>
          <Box ref={bgColorRef}>
            {isLoading ? (
              <Box textAlign="center" my={12}>
                <Spinner size="xl" />
              </Box>
            ) : (
              <>
                <Heading color="#009481" fontSize="1.5rem" p={8}>
                  {data?.title}
                </Heading>
                <Text
                  fontWeight="bold"
                  color="#484947"
                  mt={4}
                  mb={8}
                  lineHeight="1.25"
                  p={8}
                >
                  {data?.description}
                </Text>
                {data?.questions.map((question, index) => (
                  <PollQuestionItem
                    key={question}
                    number={index + 1}
                    question={question}
                  />
                ))}
              </>
            )}
          </Box>
        </Box>
      </Box>
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_V3_SITE_KEY}`}
      />
    </>
  );
}
