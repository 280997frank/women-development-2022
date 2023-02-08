import React from "react";
import { suite } from "uvu";
import {
  render,
  screen,
  cleanup,
  cleanupSuite,
  registerSuite,
} from "@/__tests__/renderer";

import AboutContent from "@/components/Atoms/AboutContent";

const testComponent = suite("<AboutContent />");

testComponent.before((ctx) => {
  registerSuite(ctx);
});

testComponent.after((ctx) => {
  cleanup();
  cleanupSuite(ctx);
});

testComponent("Render about content (title, and sponsors)", () => {
  render(<AboutContent />);
  // screen.getByRole("img", { name: /celebrating sg women/i });
  screen.getByRole("heading", { name: /about the exhibition/i });
  screen.getByText(/supported by:/i);
  screen.getByRole("img", { name: /ntuc women and family/i });
  screen.getByRole("img", { name: /pa women's integration network/i });
  screen.getByRole("img", {
    name: /singapore council of women's organisations/i,
  });
  screen.getByRole("img", {
    name: /ministry of social and family development/i,
  });
});

testComponent.run();
