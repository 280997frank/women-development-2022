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

import HeaderSchedule from "@/components/Molecules/HeaderSchedule";

const testComponent = suite("<HeaderSchedule />");

testComponent.before((ctx) => {
  registerSuite(ctx);
});

testComponent.after((ctx) => {
  cleanup();
  cleanupSuite(ctx);
});
testComponent("should render location and event-dates", () => {
  render(<HeaderSchedule />);
  assert.is(screen.getByTestId("location").textContent, "Location");
  assert.is(screen.getByTestId("event-dates").textContent, "Event Dates");
});

testComponent.run();
