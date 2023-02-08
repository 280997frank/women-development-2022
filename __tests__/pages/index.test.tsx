import React from "react";
import { matchMedia, setMedia } from "mock-match-media";
import { suite } from "uvu";
import * as assert from "uvu/assert";
import {
  render,
  screen,
  cleanup,
  setup,
  cleanupSuite,
  registerSuite,
} from "@/__tests__/renderer";

import Homepage from "@/pages";

const testComponent = suite("<Homepage />");

testComponent.before((ctx) => {
  registerSuite(ctx);
  const viewportWidth = 1920;
  setMedia({
    width: viewportWidth + "px",
    type: "screen",
  });
  window.matchMedia = matchMedia;
  window.innerWidth = viewportWidth;
  window.innerHeight = 1080;
});

testComponent.after.each(() => {
  cleanup();
});

testComponent.after((ctx) => {
  cleanupSuite(ctx);
});

testComponent.skip("Render logo, video, and links", () => {
  render(<Homepage />);
  // screen.getByRole("img", { name: /celebrating sg women/i });
  screen.getByText(/sorry, your browser doesn't support embedded videos\./i);
  // screen.getByText(/shapersof success/i);
  // screen.getByText(/trailblazersof tomorrow/i);
  // screen.getByText(/pioneersof progress/i);
});

/* testComponent("Show About modal after click About button", async () => {
  const { user } = setup(<Homepage />);
  await user.click(
    screen.getByRole("button", { name: /about the exhibition/i })
  );

  screen.getByRole("img", { name: /celebrating sg women/i });
  screen.getByRole("heading", { name: /about the exhibition/i });
  screen.getByText(/supported by:/i);
  screen.getByRole("img", { name: /women and family: an ntuc initiative/i });
  screen.getByRole("img", { name: /women's integration network/i });
  screen.getByRole("img", {
    name: /singapore council of women's organisations/i,
  });
  screen.getByRole("img", {
    name: /ministry of social and family development/i,
  });
}); */

/* testComponent("Show sidebar after click burger button", async () => {
  const { user } = setup(<Homepage />);
  await user.click(screen.getByRole("img", { name: /open sidebar/i }));

  const linksToPioneers = await screen.findAllByRole("link", {
    name: /pioneers of progress/i,
  });
  const linksToShapers = await screen.findAllByRole("link", {
    name: /shapers of success/i,
  });
  const linksToTrailblazers = await screen.findAllByRole("link", {
    name: /trailblazers of tomorrow/i,
  });

  assert.is(
    linksToPioneers.length,
    2,
    "There should be 2 links: one in sidebar, another on main section"
  );
  assert.is(
    linksToShapers.length,
    2,
    "There should be 2 links: one in sidebar, another on main section"
  );
  assert.is(
    linksToTrailblazers.length,
    2,
    "There should be 2 links: one in sidebar, another on main section"
  );

  screen.getByRole("link", { name: /home/i });
  screen.getByRole("link", { name: /share your hopes/i });
  screen.getByRole("link", { name: /physical exhibition/i });
  screen.getByRole("img", { name: /facebook/i });
  screen.getByRole("img", { name: /instagram/i });
}); */

testComponent.run();
