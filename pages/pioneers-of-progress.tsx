import { FC } from "react";
import { useMediaQuery } from "@chakra-ui/react";

import Layout from "@/components/Templates/Layout";
import PioneersOfProgressDesktop from "@/components/Organisms/PioneersOfProgressDesktop";
import PioneersOfProgressMobile from "@/components/Organisms/PioneersOfProgressMobile";

import { useAuthentication } from "@/hooks/auth";
import { useOnClickTracking } from "@/hooks/tracking";

const PioneersOfProgress: FC = () => {
  const isReady = useAuthentication();
  const [isDesktop] = useMediaQuery("(min-width: 62em)");

  useOnClickTracking(true, "page", "pioneers-of-progress");

  return (
    <Layout title="Pioneers of Progress" setLogoAtTop={!isDesktop}>
      {isReady &&
        (isDesktop ? (
          <PioneersOfProgressDesktop />
        ) : (
          <PioneersOfProgressMobile />
        ))}
    </Layout>
  );
};

export default PioneersOfProgress;
