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
import "firebase/firestore";

import PhysicalExhibition from "@/pages/physical-exhibition";

const testComponent = suite("<PhysicalExhibition />");

testComponent.before((ctx) => {
  registerSuite(ctx);
});

testComponent.after((ctx) => {
  cleanup();
  cleanupSuite(ctx);
});

testComponent.skip("Render title, description, and image", () => {
  render(<PhysicalExhibition />);
  /* assert.is(
    screen.getByTestId("title").textContent,
    "Visit us at these locations near you!"
  );
  assert.is(
    screen.getByTestId("description").textContent,
    "The Celebrating SG Women Exhibition will be held at different locations island-wide. Come experience the interactive displays and multimedia installations with your loved ones! "
  ); */
  assert.is(
    screen.getByTestId("image").getAttribute("src"),
    "https://firebasestorage.googleapis.com/v0/b/women-development-2022.appspot.com/o/visual-desktop.png?alt=media&token=775343c2-7b39-475a-9e28-89f4cc268fd9"
  );
  assert.is(screen.getAllByTestId("header-schedule").length, 1);
  // assert.is(screen.getAllByTestId("schedule-item").length, 2);
});

testComponent.run();
