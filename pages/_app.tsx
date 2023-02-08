import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { PersistGate as PersistGateClient } from "redux-persist/integration/react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { ReactNode } from "react";

import { store, persistor } from "@/states/store";

import "../styles/globals.css";
import "../styles/locomotive.css";
import "../styles/frameImages.css";

const customTheme = extendTheme({
  colors: {
    brand: {
      cream: "#FFFEE5",
      red: "#E4032E",
      turquoise: "#6EB1A3",
      blue: "#4C70BA",
      yellow: "#E6B243",
      orange: "#FB9646",
      grey: "#484947",
      green: "#009E91",
      pioneer: "#F7CF2D",
    },
    pioneer: {
      50: "#F7CF2D",
      200: "#F7CF2D",
      500: "#F7CF2D",
    },
  },
  fonts: {
    heading: "Montserrat, sans-serif",
    body: "Montserrat, sans-serif",
  },
});

const PersistGateServer = ({ children }: { children: ReactNode }) => {
  return children;
};

function MyApp({ Component, pageProps }: AppProps) {
  let runtime = process.env.RUNTIME;
  let PersistGate = PersistGateServer as unknown as typeof PersistGateClient;
  if (runtime === "browser") {
    PersistGate = PersistGateClient;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ChakraProvider theme={customTheme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </PersistGate>
    </Provider>
  );
}
export default MyApp;
