import React from "react";
import { suite } from "uvu";
import * as assert from "uvu/assert";
import {
  render,
  screen,
  cleanup,
  cleanupSuite,
  registerSuite,
} from "@/__tests__/renderer";

import ScheduleItem from "@/components/Molecules/ScheduleItem";

const testComponent = suite("<ScheduleItem />");

testComponent.before((ctx) => {
  registerSuite(ctx);
});

testComponent.after((ctx) => {
  cleanup();
  cleanupSuite(ctx);
});
testComponent("should render place, address, and dates", () => {
  const mockSchedule = {
    place: "Kampung Admiralty – Zone B",
    dates: "18 Jun – 3 Jul 2022",
    address: "676 Woodlands Drive 71, Singapore 730676",
  };

  render(<ScheduleItem schedule={mockSchedule} />);

  assert.is(screen.getByTestId("place").textContent, mockSchedule?.place);
  assert.is(
    screen.getByTestId("address").textContent,
    `${mockSchedule?.address?.split(",")[0]},`
  );
  assert.is(
    screen.getByTestId("address2").textContent,
    mockSchedule?.address?.split(",")[1]
  );
  assert.is(screen.getByTestId("dates").textContent, mockSchedule?.dates);
});

testComponent.run();
