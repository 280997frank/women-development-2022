import React from "react";
import { matchMedia, setMedia } from "mock-match-media";
import { suite } from "uvu";
import {
  cleanup,
  cleanupSuite,
  registerSuite,
  render,
  screen,
  setup,
} from "@/__tests__/renderer";

import ShareYourHopesPage from "@/pages/share-your-hopes";

const testComponent = suite("<ShareYourHopesPage />");

testComponent.before((ctx) => {
  registerSuite(ctx);
  const viewportWidth = 1920;
  setMedia({
    width: viewportWidth + "px",
    type: "screen",
  });
  window.matchMedia = matchMedia;
});

testComponent.after.each(() => {
  cleanup();
});

testComponent.after((ctx) => {
  cleanupSuite(ctx);
});

testComponent.skip("Render logo, video, and links", () => {
  render(<ShareYourHopesPage />);
  screen.getByText("Share");
  screen.getByText("Your Hopes");
  screen.getByRole("button", { name: /add a message/i });
});

testComponent.skip("Show About modal after click About button", async () => {
  const { user } = setup(<ShareYourHopesPage />);
  await user.click(screen.getByRole("button", { name: /add a message/i }));

  screen.getByRole("heading", { name: /SHare Your Hopes/i });
});

testComponent.run();
