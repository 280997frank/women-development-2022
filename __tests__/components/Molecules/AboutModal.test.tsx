import React from "react";
import { suite } from "uvu";
import {
  render,
  screen,
  cleanup,
  cleanupSuite,
  registerSuite,
} from "@/__tests__/renderer";

import AboutModal from "@/components/Molecules/AboutModal";

const testComponent = suite("<AboutModal />");

testComponent.before((ctx) => {
  registerSuite(ctx);
});

testComponent.after((ctx) => {
  cleanup();
  cleanupSuite(ctx);
});

testComponent("Render modal content (image, title, and sponsors)", () => {
  render(<AboutModal isOpen onClose={() => {}} />);
  screen.getByRole("img", { name: /celebrating sg women/i });
  /* screen.getByRole("heading", { name: /about the exhibition/i });
  screen.getByText(/supported by:/i);
  screen.getByRole("img", { name: /women and family: an ntuc initiative/i });
  screen.getByRole("img", { name: /women's integration network/i });
  screen.getByRole("img", {
    name: /singapore council of women's organisations/i,
  });
  screen.getByRole("img", {
    name: /ministry of social and family development/i,
  }); */
});

testComponent.run();
