import { useState, useEffect } from "react";

export function useWindowSize() {
  const [innerHeight, setInnerHeight] = useState(0);
  const [innerWidth, setInnerWidth] = useState(0);

  useEffect(() => {
    function onResize() {
      setInnerHeight(window.innerHeight);
      setInnerWidth(window.innerWidth);
    }

    onResize();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return { innerHeight, innerWidth };
}
