import { Link } from "@types/react-scroll";
/* eslint-disable no-unused-vars */
declare global {
  interface Window {
    onSuccessfulReCaptcha: (token: string | null) => void;
    onExpiredReCaptcha: () => void;
    onErrorReCaptcha: () => void;
    UnityLoader: {
      instantiate: (containerId: string, buildUrl: string) => GameInstance;
    };
    receiveMessageFromUnity: (msg: string) => void;
    FIREBASE_APPCHECK_DEBUG_TOKEN: string | boolean;
  }

  interface GameInstance {
    Module: {
      canvas: HTMLCanvasElement;
    };
    container: HTMLElement;
    SendMessage: (
      targetObject: "[Bridge]",
      functionName: "ReceiveMessageFromPage",
      msg: string
    ) => void;
    Quit: () => void;
  }
}

declare module "locomotive-scroll";

interface ReCaptchaInstance {
  ready: (cb: () => unknown) => unknown;
  execute: (
    siteKey: string,
    options: ReCaptchaExecuteOptions
  ) => Promise<string>;
  render: (id: string, options: ReCaptchaRenderOptions) => any;
}

interface ReCaptchaExecuteOptions {
  action: string;
}

interface ReCaptchaRenderOptions {
  sitekey: string;
  size: "invisible";
}

declare module "react-scroll/modules/components/Link" {
  export interface Link {
    horizontal?: boolean;
  }
}

export {};
