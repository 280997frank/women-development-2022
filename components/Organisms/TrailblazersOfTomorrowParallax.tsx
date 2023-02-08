/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useMemo, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  Box,
  Flex,
  FlexProps,
  Image,
  Stack,
  Text,
  TextProps,
  useMediaQuery,
} from "@chakra-ui/react";
import { Element } from "react-scroll";

import { actions } from "@/states/pioneersOfProgress/slices";
import { RootState } from "@/states/store";

import futureMBS from "@/assets/images/trailblazers/futureMBS.png";
import { TTrailblazersOfTomorrow } from "@/types/trailblazersOfTomorrow";
import { useInView } from "react-intersection-observer";
import { Parallax } from "react-scroll-parallax";

const border = "1px solid #fff";

const Title: FC<TextProps> = ({ top, left, children, ...props }) => {
  const [lgHeight] = useMediaQuery("(min-height: 60.5em");
  const [mdHeight] = useMediaQuery("(min-height: 40em");

  return (
    <Text
      fontWeight="700"
      fontSize={lgHeight ? "8rem" : mdHeight ? "6.25rem" : "4rem"}
      lineHeight="5rem"
      letterSpacing="0.1em"
      color="#e5e5e5"
      textShadow="-1px -1px 0 #235786, 1px -1px 0 #235786, -1px 1px 0 #235786, 1px 1px 0 #235786;"
      position="absolute"
      left={left}
      top={top}
      {...props}
    >
      {children}
    </Text>
  );
};
const YearWrapper: FC<FlexProps & { year: number }> = ({
  year,
  children,
  ...props
}) => {
  const dispatch = useDispatch();
  const { years } = useSelector(
    (state: RootState) => ({
      years: state.trailblazersOfTomorrow.activeYears,
    }),
    shallowEqual
  );

  const { ref, inView, entry } = useInView({
    threshold: 0.2,
  });

  const pushYear = () => {
    if (years.indexOf(year) === -1) {
      const currentYears = [...years];
      currentYears.push(year);
      dispatch(actions.setActiveYears(currentYears));
    }
  };

  const removeYear = () => {
    const oldYears = [...years];
    const removeIndex = oldYears.indexOf(year);
    if (removeIndex > -1) {
      oldYears.splice(removeIndex, 1);
      dispatch(actions.setActiveYears(oldYears));
    }
  };

  useEffect(() => {
    if (inView) {
      pushYear();
    } else {
      removeYear();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <Element name={year.toString()}>
      <Flex ref={ref} h="75vh" {...props} pos="relative">
        {children}
      </Flex>
    </Element>
  );
};
const TrailblazersOfTomorrowParallax: FC<{
  data?: TTrailblazersOfTomorrow;
}> = ({ data }) => {
  const [lgHeight] = useMediaQuery("(min-height: 60.5em)");
  const [mdHeight] = useMediaQuery("(min-height: 40em)");
  const [xxlWidth] = useMediaQuery("(min-width: 96em)");
  const [xlWidth] = useMediaQuery("(min-width: 80em)");

  // redux
  const { activeYears } = useSelector(
    (state: RootState) => ({
      activeYears: state.trailblazersOfTomorrow.activeYears,
    }),
    shallowEqual
  );

  const leftAnd = useMemo(() => {
    const lastActive = activeYears[activeYears.length - 1];
    if (lastActive === 2022) {
      return "18%";
    } else if (lastActive === 2023) {
      return "123%";
    } else if (lastActive === 2024 || lastActive === 2025) {
      return xlWidth ? "315%" : "310%";
    } else if (lastActive === 2026) {
      return lgHeight ? "493%" : "499%";
    } else if (lastActive === 2027) {
      return xlWidth ? "624%" : "612%";
    }
  }, [activeYears]);
  const topAnd = useMemo(() => {
    const lastActive = activeYears[activeYears.length - 1];
    if (lastActive === 2022) {
      return lgHeight ? "88%" : mdHeight ? "85%" : "83%";
    } else if (lastActive === 2023) {
      return "15%";
    } else if (lastActive === 2024 || lastActive === 2025) {
      return lgHeight ? "33%" : mdHeight ? "30%" : "15%";
    } else if (lastActive === 2026) {
      return lgHeight ? "85%" : mdHeight ? "75%" : "80%";
    } else if (lastActive === 2027) {
      return "25%";
    }
  }, [activeYears]);
  const left2022 = useMemo(() => {
    const lastActive = activeYears[activeYears.length - 1];
    if (lastActive === 2022) {
      return xxlWidth ? "300px" : xlWidth ? "280px" : "29%";
    } else if (lastActive === 2023) {
      return "106.5%";
    } else if (lastActive === 2024 || lastActive === 2025) {
      return "298.3%";
    } else if (lastActive === 2026) {
      return "486.8%";
    } else if (lastActive === 2027) {
      return xxlWidth ? "608%" : "605.9%";
    }
  }, [activeYears]);
  const top2022 = useMemo(() => {
    const lastActive = activeYears[activeYears.length - 1];
    if (lastActive === 2022) {
      return "0%";
    } else if (lastActive === 2023) {
      return "0%";
    } else if (lastActive === 2024 || lastActive === 2025) {
      return lgHeight ? "33%" : mdHeight ? "15%" : "10%";
    } else if (lastActive === 2026) {
      return lgHeight ? "65%" : mdHeight ? "55%" : "65%";
    } else if (lastActive === 2027) {
      return "5%";
    }
  }, [activeYears]);
  const leftBeyond = useMemo(() => {
    const lastActive = activeYears[activeYears.length - 1];
    if (lastActive === 2022) {
      return xxlWidth ? "43%" : "45%";
    } else if (lastActive === 2023) {
      return "172%";
    } else if (lastActive === 2024 || lastActive === 2025) {
      return "361%";
    } else if (lastActive === 2026) {
      return "541%";
    } else if (lastActive === 2027) {
      return xxlWidth ? "664%" : "645.5%";
    }
  }, [activeYears]);
  const topBeyond = useMemo(() => {
    const lastActive = activeYears[activeYears.length - 1];
    if (lastActive === 2022) {
      return lgHeight ? "88%" : mdHeight ? "85%" : "83%";
    } else if (lastActive === 2023) {
      return "75%";
    } else if (lastActive === 2024 || lastActive === 2025) {
      return lgHeight ? "35%" : mdHeight ? "40%" : "35%";
    } else if (lastActive === 2026) {
      return lgHeight ? "80%" : mdHeight ? "80%" : "80%";
    } else if (lastActive === 2027) {
      return "80%";
    }
  }, [activeYears]);

  return (
    <Flex h="75vh">
      <YearWrapper year={2022}>
        <Title top={top2022} left={left2022} transition="all 1.5s linear">
          2022
        </Title>
        <Title top={topAnd} left={leftAnd} transition="all 1.5s linear">
          AND
        </Title>
        <Title top={topBeyond} left={leftBeyond} transition="all 1.5s linear">
          BEYOND
        </Title>
        <Box borderRight={border} w="600px" pr="4.125rem" position="relative">
          <Image
            top={lgHeight ? "350px" : mdHeight ? "250px" : "200px"}
            left={lgHeight ? "-40px" : mdHeight ? "-220px" : "-250px"}
            position="absolute"
            objectFit="cover"
            objectPosition="right"
            height={lgHeight ? "268px" : mdHeight ? "168px" : "158px"}
            src={futureMBS.src}
            alt=""
          />
        </Box>
        <Stack w="860px" h="100%" borderRight={border}>
          <Parallax
            opacity={[3, 0]}
            translateY={[lgHeight ? "157px" : "124px", "60px"]}
          >
            <Box px="5rem" pt="2.5rem" borderTop={border}>
              <Text
                fontWeight="600"
                fontSize={mdHeight ? "1.25rem" : "0.875rem"}
                lineHeight="1.5rem"
                color="#235786"
                dangerouslySetInnerHTML={{
                  __html: data?.body[0]?.content ?? "",
                }}
              />
              <Text
                fontWeight="bold"
                fontSize={lgHeight ? "1.59rem" : mdHeight ? "1.25rem" : "1rem"}
                lineHeight="1.8125rem"
                color="#235786"
                mt="24px !important"
                dangerouslySetInnerHTML={{
                  __html: data?.body[0]?.author ?? "",
                }}
              />
            </Box>
          </Parallax>
        </Stack>
      </YearWrapper>

      <YearWrapper year={2023}>
        <Stack w="976px" h="100%" borderRight={border}>
          <Parallax
            opacity={[3, 0]}
            translateY={[
              lgHeight ? "140px" : mdHeight ? "90px" : "40px",
              lgHeight ? "240px" : mdHeight ? "190px" : "140px",
            ]}
          >
            <Box px="5rem" pt="2.5rem" borderTop={border}>
              <Text
                fontWeight="600"
                fontSize={mdHeight ? "1.25rem" : "0.875rem"}
                lineHeight="1.5rem"
                color="#235786"
              >
                {data?.body?.[1]?.content}
              </Text>
              <Text
                mt="1.5rem"
                fontWeight="500"
                fontSize={lgHeight ? "1.59rem" : mdHeight ? "1.25rem" : "1rem"}
                lineHeight="1.8125rem"
                color="#235786"
                dangerouslySetInnerHTML={{
                  __html: data?.body?.[1]?.author || "",
                }}
              />
            </Box>
          </Parallax>
        </Stack>
        <Stack w="902px" h="100%" borderRight={border}>
          <Parallax
            opacity={[3, 0]}
            translateY={[
              lgHeight ? "280px" : mdHeight ? "190px" : "170px",
              lgHeight ? "180px" : mdHeight ? "90px" : "70px",
            ]}
          >
            <Box px="5rem" pt="2.5rem" borderTop={border}>
              <Text
                fontWeight="600"
                fontSize={mdHeight ? "1.25rem" : "0.875rem"}
                lineHeight="1.5rem"
                color="#235786"
              >
                {data?.body?.[2]?.content}
              </Text>
              <Text
                mt="1.5rem"
                fontWeight="500"
                fontSize={lgHeight ? "1.59rem" : mdHeight ? "1.25rem" : "1rem"}
                lineHeight="1.8125rem"
                color="#235786"
                dangerouslySetInnerHTML={{
                  __html: data?.body?.[2]?.author || "",
                }}
              />
            </Box>
          </Parallax>
        </Stack>
      </YearWrapper>

      <YearWrapper year={2024}>
        <Stack w="1088px" h="100%" borderRight={border}>
          <Parallax
            opacity={[3, 0]}
            translateY={[
              lgHeight ? "160px" : mdHeight ? "140px" : "120px",
              lgHeight ? "260px" : mdHeight ? "240px" : "220px",
            ]}
          >
            <Box px="5rem" pt="2.5rem" borderTop={border}>
              <Text
                fontWeight="600"
                fontSize={mdHeight ? "1.25rem" : "0.875rem"}
                lineHeight="1.5rem"
                color="#235786"
              >
                {data?.body?.[3]?.content}
              </Text>
              <Text
                mt="1.5rem"
                fontWeight="500"
                fontSize={lgHeight ? "1.59rem" : mdHeight ? "1.25rem" : "1rem"}
                lineHeight="1.8125rem"
                color="#235786"
                dangerouslySetInnerHTML={{
                  __html: data?.body?.[3]?.author || "",
                }}
              />
            </Box>
          </Parallax>
        </Stack>
        <Stack w="947px" h="100%" borderRight={border}>
          <Parallax
            opacity={[3, 0]}
            translateY={[
              lgHeight ? "370px" : mdHeight ? "330px" : "250px",
              lgHeight ? "340px" : mdHeight ? "300px" : "220px",
            ]}
          >
            <Box px="5rem" pt="0.8rem" borderTop={border}>
              <Text
                fontWeight="600"
                fontSize={mdHeight ? "1.25rem" : "0.875rem"}
                lineHeight="1.5rem"
                color="#235786"
              >
                {data?.body?.[4]?.content}
              </Text>
              <Text
                mt="1.5rem"
                fontWeight="500"
                fontSize={lgHeight ? "1.59rem" : mdHeight ? "1.25rem" : "1rem"}
                lineHeight="1.8125rem"
                color="#235786"
                dangerouslySetInnerHTML={{
                  __html: data?.body?.[4]?.author || "",
                }}
              />
            </Box>
          </Parallax>
        </Stack>
      </YearWrapper>

      <YearWrapper year={2025}>
        <Stack w="833px" h="100%" borderRight={border}>
          <Parallax opacity={[3, 0]}>
            <Box
              px="5rem"
              pb={mdHeight ? "2.5rem" : "1.5rem"}
              borderBottom={border}
            >
              <Text
                fontWeight="600"
                fontSize={mdHeight ? "1.25rem" : "0.875rem"}
                lineHeight="1.5rem"
                color="#235786"
              >
                {data?.body?.[5]?.content}
              </Text>
              <Text
                mt={mdHeight ? "1.5rem" : "0.5rem"}
                fontWeight="500"
                fontSize={lgHeight ? "1.59rem" : mdHeight ? "1.25rem" : "1rem"}
                lineHeight="1.8125rem"
                color="#235786"
                dangerouslySetInnerHTML={{
                  __html: data?.body?.[5]?.author || "",
                }}
              />
            </Box>
          </Parallax>
        </Stack>
        <Stack w="813px" h="100%" borderRight={border}>
          <Parallax
            opacity={[3, 0]}
            translateY={[
              mdHeight ? "380px" : "300px",
              mdHeight ? "280px" : "200px",
            ]}
          >
            <Box px="5rem" pb="2.5rem" borderBottom={border}>
              <Text
                fontWeight="600"
                fontSize={mdHeight ? "1.25rem" : "0.875rem"}
                lineHeight="1.5rem"
                color="#235786"
              >
                {data?.body?.[6]?.content}
              </Text>
              <Text
                mt="1.5rem"
                fontWeight="500"
                fontSize={lgHeight ? "1.59rem" : mdHeight ? "1.25rem" : "1rem"}
                lineHeight="1.8125rem"
                color="#235786"
                dangerouslySetInnerHTML={{
                  __html: data?.body?.[6]?.author || "",
                }}
              />
            </Box>
          </Parallax>
        </Stack>
      </YearWrapper>

      <YearWrapper year={2026}>
        <Stack w="892px" h="100%" borderRight={border}>
          <Parallax
            opacity={[3, 0]}
            translateY={[
              lgHeight ? "100px" : mdHeight ? "20px" : "0px",
              lgHeight ? "200px" : mdHeight ? "120px" : "100px",
            ]}
          >
            <Box px="5rem" pb="2.5rem" borderBottom={border}>
              <Text
                fontWeight="600"
                fontSize={mdHeight ? "1.25rem" : "0.875rem"}
                lineHeight="1.5rem"
                color="#235786"
              >
                {data?.body?.[7]?.content}
              </Text>
              <Text
                mt="1.5rem"
                fontWeight="500"
                fontSize={lgHeight ? "1.59rem" : mdHeight ? "1.25rem" : "1rem"}
                lineHeight="1.8125rem"
                color="#235786"
                dangerouslySetInnerHTML={{
                  __html: data?.body?.[7]?.author || "",
                }}
              />
            </Box>
          </Parallax>
        </Stack>
        <Stack w="872px" h="100%" borderRight={border}>
          <Parallax
            opacity={[3, 0]}
            translateY={[
              lgHeight ? "380px" : mdHeight ? "260px" : "240px",
              lgHeight ? "280px" : mdHeight ? "160px" : "140px",
            ]}
          >
            <Box px="5rem" pt="2.5rem" borderTop={border}>
              <Text
                fontWeight="600"
                fontSize={mdHeight ? "1.25rem" : "0.875rem"}
                lineHeight="1.5rem"
                color="#235786"
              >
                {data?.body?.[8]?.content}
              </Text>
              <Text
                mt="1.5rem"
                fontWeight="500"
                fontSize={lgHeight ? "1.59rem" : mdHeight ? "1.25rem" : "1rem"}
                lineHeight="1.8125rem"
                color="#235786"
                dangerouslySetInnerHTML={{
                  __html: data?.body?.[8]?.author || "",
                }}
              />
            </Box>
          </Parallax>
        </Stack>
      </YearWrapper>

      <YearWrapper year={2027}>
        <Stack
          w={{ lg: "602px", "2xl": "742px" }}
          h="100%"
          borderRight={border}
        >
          <Parallax
            opacity={[3, 0]}
            translateY={[
              lgHeight ? "280px" : mdHeight ? "180px" : "140px",
              lgHeight ? "340px" : mdHeight ? "248px" : "200px",
            ]}
          >
            <Box px="2rem" pb="2.5rem" borderBottom={border}>
              <Text
                fontWeight="600"
                fontSize={mdHeight ? "1.25rem" : "0.875rem"}
                lineHeight="1.5rem"
                color="#235786"
              >
                {data?.body?.[9]?.content}
              </Text>
              <Text
                mt="1.5rem"
                fontWeight="500"
                fontSize={lgHeight ? "1.59rem" : mdHeight ? "1.25rem" : "1rem"}
                lineHeight="1.8125rem"
                color="#235786"
                dangerouslySetInnerHTML={{
                  __html: data?.body?.[9]?.author || "",
                }}
              />
            </Box>
          </Parallax>
        </Stack>
        <Stack
          w={{ lg: "675px", "2xl": "1075px" }}
          h="100%"
          borderRight={border}
        >
          <Parallax
            opacity={[3, 0]}
            translateY={[
              lgHeight ? "0px" : mdHeight ? "0px" : "0px",
              lgHeight ? "80px" : mdHeight ? "65px" : "80px",
            ]}
          >
            <Box px="3rem" pt="2.5rem" borderTop={border}>
              <Text
                fontWeight="600"
                fontSize={mdHeight ? "1.25rem" : "0.875rem"}
                lineHeight="1.5rem"
                color="#235786"
              >
                {data?.body?.[10]?.content}
              </Text>
              <Text
                fontWeight="bold"
                fontSize={lgHeight ? "1.59rem" : mdHeight ? "1.25rem" : "1rem"}
                lineHeight="1.8125rem"
                color="#235786"
                mt="24px !important"
                dangerouslySetInnerHTML={{
                  __html: data?.body?.[10]?.author || "",
                }}
              />
            </Box>
          </Parallax>
        </Stack>
      </YearWrapper>
    </Flex>
  );
};

export default TrailblazersOfTomorrowParallax;
