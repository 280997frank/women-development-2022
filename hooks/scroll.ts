import { useEffect, useState } from "react";

interface useScrollbarOptions {
  isRounded?: boolean;
  root?: HTMLElement | Window | null;
}

export function useScrollbar(
  options?: useScrollbarOptions
): [number, number, boolean, boolean] {
  const { isRounded = true, root = window } = options || {};
  const [xPosition, setXPosition] = useState(0);
  const [yPosition, setYPosition] = useState(0);
  const [isAtHorizontalEnd, setAtHorizontalEnd] = useState(false);
  const [isAtVerticalEnd, setAtVerticalEnd] = useState(false);

  useEffect(() => {
    let ticking = false;
    let animationFrameId = 0;

    if (root) {
    }

    function onScroll() {
      if (!ticking) {
        animationFrameId = window.requestAnimationFrame(function () {
          if (window.innerWidth + window.scrollX >= document.body.scrollWidth) {
            setAtHorizontalEnd(true);
          } else {
            setAtHorizontalEnd(false);
          }

          if (
            window.innerHeight + window.scrollY >=
            document.body.scrollHeight
          ) {
            setAtVerticalEnd(true);
          } else {
            setAtVerticalEnd(false);
          }

          if (isRounded) {
            setXPosition(
              Math.round(
                root instanceof Window ? root.scrollX : root?.scrollLeft || 0
              )
            );
            setYPosition(
              Math.round(
                root instanceof Window ? root.scrollY : root?.scrollTop || 0
              )
            );
          } else {
            setXPosition(
              root instanceof Window ? root.scrollX : root?.scrollLeft || 0
            );
            setYPosition(
              root instanceof Window ? root.scrollY : root?.scrollTop || 0
            );
          }

          ticking = false;
        });

        ticking = true;
      }
    }

    root?.addEventListener("scroll", onScroll, false);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      root?.removeEventListener("scroll", onScroll, false);
    };
  }, [isRounded, root]);

  return [xPosition, yPosition, isAtHorizontalEnd, isAtVerticalEnd];
}
