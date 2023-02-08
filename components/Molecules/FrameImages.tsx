import React, {
  useState,
  useRef,
  /* MouseEvent */ KeyboardEvent,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import cx from "classnames";
import { Box } from "@chakra-ui/react";
// import { useMediaQuery } from '@react-hook/media-query'
import { useSwipeable } from "react-swipeable";

// import Image from 'components/Atoms/Image'

// import { TAnimationName /* TImgSource */ } from "types";

import { wdFrameImages } from "@/constants/uiConfig";

export type TAnimationName = "pioneers" | "shapers" | "trailblazers" | "";

type TFrameImagesProps = {
  animationName: TAnimationName;
};

declare global {
  interface Window {
    Modernizr: {
      webp: boolean;
    };
  }
}

const FrameImages = ({ animationName }: TFrameImagesProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const nodeRef = useRef<HTMLDivElement | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [imageUrlList, setImageUrlList] = useState<string[]>([]);
  const [isDragging, setDraggingStatus] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(0);
  const [sliderRailLength, setSliderRailLength] = useState(0);
  // const isTouchScreen = useMediaQuery('(hover: none) and (pointer: coarse)')
  const handlers = useSwipeable({
    onSwiping: (event) => {
      const { dir } = event;
      let movement = 0;
      console.log("swiping");

      if (dir === "Left") {
        movement = 1;
      } else if (dir === "Right") {
        movement = -1;
      }

      const newIndex = activeImage + movement;

      if (newIndex < 0) {
        setActiveImage(0);
      } else if (newIndex > imgQty - 1) {
        setActiveImage(imgQty - 1);
      } else {
        setActiveImage(newIndex);
      }
    },
  });

  /* const scrollImage = (event: MouseEvent) => {
    const step = event.currentTarget.getAttribute('data-step')

    const newIndex = activeImage + Number(step)

    if (newIndex < 0) {
      setActiveImage(0)
    } else if (newIndex > imgQty - 1) {
      setActiveImage(imgQty - 1)
    } else {
      setActiveImage(newIndex)
    }
  } */

  const imgQty = useMemo(
    () => (animationName ? wdFrameImages[animationName].length : 0),
    [animationName]
  );

  const scrollImage = useCallback(
    (newIndex: number) => {
      if (newIndex < 0) {
        setActiveImage(0);
      } else if (newIndex > imgQty - 1) {
        setActiveImage(imgQty - 1);
      } else {
        setActiveImage(newIndex);
      }
    },
    [imgQty]
  );

  const moveSlider = useCallback(
    (newSliderPosition: number) => {
      if (newSliderPosition < 0) {
        setSliderPosition(0);
      } else if (newSliderPosition > sliderRailLength) {
        setSliderPosition(sliderRailLength);
      } else {
        setSliderPosition(newSliderPosition);
      }
    },
    [sliderRailLength]
  );

  useEffect(() => {
    const railLength = railRef.current ? railRef.current.clientWidth : 0;
    const thumbWidth = nodeRef.current ? nodeRef.current.clientWidth : 0;
    const trackLength = railLength - thumbWidth;

    setSliderRailLength(trackLength);
  }, []);

  useEffect(() => {
    setSliderPosition(0);
    setActiveImage(0);
    const slideContainer = document.getElementById("slide-container");

    if (canvasRef.current) {
      canvasRef.current.width = 1440;
      canvasRef.current.height = 720;
    }

    if (slideContainer && animationName) {
      slideContainer.focus();

      const imageListToUse = window.Modernizr.webp ? 0 : 1;
      const imageList = wdFrameImages[animationName].map(
        (src) => src[imageListToUse].srcSet
      );
      setImageUrlList(imageList);
      imageList.forEach((src) => {
        const img = new window.Image();
        img.src = src;
      });
    }
  }, [animationName]);

  useEffect(() => {
    if (imageUrlList.length && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");

      if (context) {
        const img = new window.Image(
          canvasRef.current.width,
          canvasRef.current.height
        );

        /* window.requestAnimationFrame(() => {
          img.src = imageUrlList[activeImage]
          context.drawImage(img, 0, 0)
        }) */

        img.src = imageUrlList[activeImage];
        img.onload = function () {
          if (canvasRef.current) {
            context.drawImage(
              img,
              0,
              0,
              canvasRef.current.width,
              canvasRef.current.height
            );
          }
        };
      }
    }
  }, [imageUrlList, activeImage]);

  useEffect(() => {
    if (isDragging) {
      const newIndex = Math.ceil((sliderPosition * imgQty) / sliderRailLength);
      scrollImage(newIndex);
    }
  }, [imgQty, isDragging, scrollImage, sliderPosition, sliderRailLength]);

  return (
    <Box
      {...handlers}
      as="figure"
      id="slide-container"
      width="100%"
      height="0"
      opacity="0"
      pt="0"
      transition="opacity 0.5s linear"
      bgColor="#f3eee5"
      userSelect="none"
      sx={{
        "-webkit-tap-highlight-color": "transparent",
        "-webkit-touch-callout": "none",
      }}
      className={cx("image is-2by1 frame-images", {
        "is-active": animationName,
      })}
      tabIndex={0}
      onKeyDown={(e: KeyboardEvent) => {
        let step = 0;

        switch (e.key) {
          case "ArrowRight":
            step = 1;
            break;
          case "ArrowLeft":
            step = -1;
            break;
        }

        const newIndex = activeImage + step;
        const newSliderPosition = (newIndex * sliderRailLength) / imgQty;

        scrollImage(newIndex);
        moveSlider(newSliderPosition);
      }}
      onWheel={(e) => {
        // if (!isTouchScreen) {
        const step = e.deltaY > 0 ? 1 : -1;
        const newIndex = activeImage + step;
        const newSliderPosition = (newIndex * sliderRailLength) / imgQty;

        scrollImage(newIndex);
        moveSlider(newSliderPosition);
        // }
      }}
    >
      <canvas className="has-ratio" ref={canvasRef}>
        Your browser does not support canvas.
      </canvas>
    </Box>
  );
};

export default FrameImages;
