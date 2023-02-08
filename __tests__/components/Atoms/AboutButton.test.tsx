import React from "react";
import { suite } from "uvu";
import {
  render,
  screen,
  cleanup,
  registerSuite,
  cleanupSuite,
} from "@/__tests__/renderer";

import AboutButton from "@/components/Atoms/AboutButton";

const testComponent = suite("<AboutButton />");

testComponent.before((ctx) => {
  registerSuite(ctx);
});

testComponent.after((ctx) => {
  cleanup();
  cleanupSuite(ctx);
});

testComponent("Render button text", () => {
  render(<AboutButton />);
  screen.getByRole("button", { name: /about the exhibition/i });
});

testComponent.run();
