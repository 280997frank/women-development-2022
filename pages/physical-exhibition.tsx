import React, { FC } from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { collection, CollectionReference, doc } from "firebase/firestore";
import { useDocumentData } from "react-firehooks";

import Layout from "@/components/Templates/Layout";
import HeaderSchedule from "@/components/Molecules/HeaderSchedule";
import ScheduleItem from "@/components/Molecules/ScheduleItem";

import { db } from "@/connections/firebase";

import { useAuthentication } from "@/hooks/auth";
import { useWindowSize } from "@/hooks/utils";

import { TPhysicalExhibition } from "@/types/physicalExhibition";
import { useOnClickTracking } from "@/hooks/tracking";

const physicalExhibition = collection(
  db,
  "physical-exhibition"
) as CollectionReference<TPhysicalExhibition>;

const PhysicalExhibition: FC = () => {
  const isReady = useAuthentication();
  const { innerHeight } = useWindowSize();
  const [data] = useDocumentData(
    isReady ? doc(physicalExhibition, "ufcJJCpbyCGnmsy1v406") : null,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  useOnClickTracking(true, "page", "physical-exhibition");

  return (
    <Layout title="Physical Exhibition" headerBgColor="#F7F5E8" setLogoAtTop>
      <Box
        backgroundColor="#F7F5E8"
        w="100%"
        h={{ base: `calc(${innerHeight}px - 6rem)`, lg: "100vh" }}
        overflowY="auto"
        alignItems={{ lg: "center" }}
        display={{ lg: "flex" }}
        position="relative"
      >
        <Flex
          direction={{ base: "column", lg: "row" }}
          px={{ base: "1.875rem", lg: 10, "2xl": "2.8125rem" }}
          pt={{ lg: 5 }}
          pb={{ base: 8, lg: 0 }}
          gap={{ lg: 5, xl: "3.4375rem", "2xl": "6.25rem" }}
          align={{ lg: "center" }}
        >
          <Text
            fontWeight="bold"
            fontSize="1.75rem"
            lineHeight="2.125rem"
            color="#255B8B"
            display={{ base: "block", lg: "none" }}
          >
            {data?.title}
          </Text>
          <Box w={{ base: "100%", lg: "60%" }}>
            <Image
              data-testid="image"
              mt={{ base: 6, lg: 0 }}
              w="100%"
              h="auto"
              src="https://firebasestorage.googleapis.com/v0/b/women-development-2022.appspot.com/o/visual-desktop.png?alt=media&token=775343c2-7b39-475a-9e28-89f4cc268fd9"
              alt=""
            />
          </Box>
          <Flex
            direction="column"
            width={{ base: "100%", lg: "35%" }}
            mt={{ base: 3.5, lg: 0 }}
          >
            <Text
              data-testid="title"
              fontWeight={{ lg: "bold" }}
              fontSize={{ lg: "2.375rem", "2xl": "5xl" }}
              lineHeight={{ lg: "3.0625rem", "2xl": "3.75rem" }}
              color="#255B8B"
              display={{ base: "none", lg: "block" }}
            >
              {data?.title}
            </Text>
            <Text
              data-testid="description"
              w={{ base: "100%" }}
              mt={{ base: 6, lg: 4, "2xl": "2.375rem" }}
              fontWeight={{ base: "medium", lg: "medium" }}
              fontSize={{ base: "xl" }}
              lineHeight={{ base: 6 }}
              letterSpacing={{ lg: "0.0125rem" }}
              color="#484947"
            >
              {data?.description}
            </Text>
            <HeaderSchedule data-testid="header-schedule" />
            {data?.schedules.map((schedule, index) => (
              <ScheduleItem
                data-testid="schedule-item"
                key={index}
                schedule={schedule}
              />
            ))}
          </Flex>
        </Flex>
      </Box>
    </Layout>
  );
};

export default PhysicalExhibition;
