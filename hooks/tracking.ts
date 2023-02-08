import {
  getBrowserVisibilityProp,
  getIsDocumentHidden,
  onClickTracker,
} from "@/utils/tracking";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useGetUser } from "./auth";

export function useOnClickTracking(isClicked: boolean, type: string, data: {}) {
  const dispatch = useDispatch();
  const [isSsrDone, setSsrDone] = useState(false);
  const router = useRouter();
  const { anonymousId, sessionId } = useGetUser();

  useEffect(() => {
    setSsrDone(true);
  }, []);

  useEffect(() => {
    if (isSsrDone && isClicked) {
      onClickTracker({
        anonymousId,
        sessionId,
        type,
        data,
        router:
          data === "/about-exhibition" ? "/about-exhibition" : router.asPath,
      });
    }
  }, [
    dispatch,
    isClicked,
    isSsrDone,
    router,
    type,
    data,
    anonymousId,
    sessionId,
  ]);
}

export function usePageVisibility() {
  const [isVisible, setIsVisible] = useState(getIsDocumentHidden());
  const onVisibilityChange = () => setIsVisible(getIsDocumentHidden());

  useEffect(() => {
    const visibilityChange = getBrowserVisibilityProp();

    document.addEventListener(
      visibilityChange as string,
      onVisibilityChange,
      false
    );

    return () => {
      document.removeEventListener(
        visibilityChange as string,
        onVisibilityChange
      );
    };
  }, []);

  return isVisible;
}
