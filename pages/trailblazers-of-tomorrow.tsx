import { useMediaQuery } from "@chakra-ui/react";

import TrailblazersOfTomorrowContentDesktop from "@/components/Organisms/TrailblazersOfTomorrowContentDesktop";
import Layout from "@/components/Templates/Layout";
import TrailblazersOfTomorrowContentMobile from "@/components/Organisms/TrailblazersOfTomorrowContentMobile";

import { useAuthentication } from "@/hooks/auth";
import { useOnClickTracking } from "@/hooks/tracking";

const TailblazersOfTomorrow = () => {
  const isReady = useAuthentication();
  const [isDesktop] = useMediaQuery("(min-width: 62em)");

  useOnClickTracking(true, "page", "trailblazers-of-tomorrow");

  return (
    <Layout title="Trailblazers of Tomorrow" setLogoAtTop={!isDesktop}>
      {isReady &&
        (isDesktop ? (
          <TrailblazersOfTomorrowContentDesktop />
        ) : (
          <TrailblazersOfTomorrowContentMobile />
        ))}
    </Layout>
  );
};

export default TailblazersOfTomorrow;
