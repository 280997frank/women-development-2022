import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { FC, ReactNode } from "react";
import { isTablet, useMobileOrientation } from "react-device-detect";

import BestViewIcon from "@/assets/images/bestview.png";

interface BestViewProps {
  children: ReactNode;
}

const BestView: FC<BestViewProps> = ({ children }) => {
  const { isLandscape, isPortrait } = useMobileOrientation();

  if (isTablet && isLandscape) {
    return (
      <Box position="fixed" left="0" top="0" w="100vw" h="100vh">
        <Flex
          h="100%"
          flexDir="column"
          backgroundColor="#f7f2e4"
          justifyContent="center"
          alignItems="center"
        >
          <Text fontWeight="bold" fontSize={{ base: "24px", lg: "2rem" }}>
            PLEASE ROTATE YOUR DEVICE
          </Text>
          <Image
            my={{ base: "2rem", lg: "5rem" }}
            w={{ base: "8rem", lg: "15rem" }}
            src={BestViewIcon.src}
            alt="best view icon"
          />
          <Text fontSize={{ base: "14px", lg: "1.5rem" }}>
            For best experience, please turn
          </Text>
          <Text fontSize={{ base: "14px", lg: "1.5rem" }}>
            {`your device to ${isPortrait ? "landscape" : "portrait"} mode`}
          </Text>
        </Flex>
      </Box>
    );
  } else {
    return <>{children}</>;
  }
};

export default BestView;
