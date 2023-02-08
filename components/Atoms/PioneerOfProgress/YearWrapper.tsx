import { FC, useEffect } from "react";
import { Flex, FlexProps } from "@chakra-ui/react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useInView } from "react-intersection-observer";
import { Element } from "react-scroll";
import { actions } from "@/states/pioneersOfProgress/slices";
import { RootState } from "@/states/store";

const YearWrapper: FC<FlexProps & { year: number }> = ({
  year,
  children,
  ...props
}) => {
  const dispatch = useDispatch();
  const { years } = useSelector(
    (state: RootState) => ({
      years: state.pioneerOfProgress.activeYears,
    }),
    shallowEqual
  );

  const { ref, inView, entry } = useInView({
    threshold: 0.2,
  });

  const pushYear = () => {
    if (years.indexOf(year) === -1) {
      const currentYears = [...years];
      // if (currentYears.length > 3) {
      //   currentYears.shift();
      // }
      currentYears.push(year);
      dispatch(actions.setActiveYears(currentYears));
    }
  };

  const removeYear = () => {
    const oldYears = [...years];
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
    <Element
      name={year.toString()}
      style={{ height: "100%", maxHeight: "800px" }}
    >
      <Flex ref={ref} h="100%" {...props} pos="relative">
        {children}
      </Flex>
    </Element>
  );
};

export default YearWrapper;
