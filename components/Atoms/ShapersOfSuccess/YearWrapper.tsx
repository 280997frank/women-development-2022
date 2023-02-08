import React, { FC, useEffect } from "react";
import { Flex, FlexProps, Box } from "@chakra-ui/react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useInView } from "react-intersection-observer";
import { Element } from "react-scroll";
import { actions } from "@/states/shapers-of-success/sosSlice";
import { RootState } from "@/states/store";
import { Parallax } from "react-scroll-parallax";

const YearWrapper: FC<FlexProps & { year: string }> = ({
  year,
  children,
  ...props
}) => {
  const dispatch = useDispatch();
  const { activeYears } = useSelector(
    (state: RootState) => ({
      activeYears: state.shapersOfSuccessProgress.activeYears,
    }),
    shallowEqual
  );

  const { ref, inView, entry } = useInView({
    threshold: 0.1,
  });

  const pushYear = () => {
    if (activeYears.indexOf(year) === -1) {
      const currentYears = [...activeYears];
      // if (currentYears.length > 3) {
      //   currentYears.shift();
      // }
      currentYears.push(year);
      dispatch(actions.setActiveYears(currentYears));
    }
  };

  const removeYear = () => {
    const oldYears = [...activeYears];
    const removeIndex = oldYears.indexOf(year);
    if (removeIndex > -1) {
      oldYears.splice(removeIndex, 1);
      dispatch(actions.setActiveYears(oldYears));
    }
  };

  useEffect(() => {
    if (inView) {
      pushYear();
    } else {
      removeYear();
    }
    // eslint-disable-next-line
  }, [inView]);

  return (
    // <Parallax>
    <Element
      name={year.toString()}
      style={{ height: "100%", maxHeight: "800px" }}
    >
      <Flex ref={ref} h="100%" {...props} pos="relative">
        {children}
      </Flex>
    </Element>
    // </Parallax>
  );
};

export default YearWrapper;
