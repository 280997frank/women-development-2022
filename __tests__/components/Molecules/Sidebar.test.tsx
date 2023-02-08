import React from "react";
import { suite } from "uvu";
import {
  render,
  screen,
  cleanup,
  cleanupSuite,
  registerSuite,
} from "@/__tests__/renderer";

import Sidebar from "@/components/Molecules/Sidebar";

const testComponent = suite("<Sidebar />");

testComponent.before((ctx) => {
  registerSuite(ctx);
});

testComponent.after((ctx) => {
  cleanup();
  cleanupSuite(ctx);
});

testComponent("Render links", () => {
  render(<Sidebar isOpen onClose={() => {}} />);
  screen.getByRole("link", { name: /home/i });
  screen.getByRole("link", { name: /pioneers of progress/i });
  screen.getByRole("link", { name: /shapers of success/i });
  screen.getByRole("link", { name: /trailblazers of tomorrow/i });
  screen.getByRole("link", { name: /share your hopes/i });
  screen.getByRole("link", { name: /physical exhibition/i });
  screen.getByRole("img", { name: /facebook/i });
  screen.getByRole("img", { name: /instagram/i });
});

testComponent.run();
