import React from "react";
import { useMediaQuery } from "@chakra-ui/react";

import Layout from "@/components/Templates/Layout";
import ShapersOfSuccessMobile from "@/components/Organisms/ShapersOfSuccessMobile";
import ShapersOfSuccessDesktop from "@/components/Organisms/ShapersOfSuccessDesktop";

import { useAuthentication } from "@/hooks/auth";
import { useOnClickTracking } from "@/hooks/tracking";

const ShapersOfSuccessPage = () => {
  const isReady = useAuthentication();
  const [isDesktop] = useMediaQuery("(min-width: 62em)");

  useOnClickTracking(true, "page", "shapers-of-success");

  return (
    <Layout title="Shapers of Success" setLogoAtTop={!isDesktop}>
      {isReady &&
        (isDesktop ? <ShapersOfSuccessDesktop /> : <ShapersOfSuccessMobile />)}
    </Layout>
  );
};

export default ShapersOfSuccessPage;
