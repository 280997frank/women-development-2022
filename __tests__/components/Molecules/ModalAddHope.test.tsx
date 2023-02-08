import React from "react";
import { suite } from "uvu";
import {
  render,
  screen,
  cleanup,
  cleanupSuite,
  registerSuite,
} from "@/__tests__/renderer";
import { store } from "@/states/store";
import { actions } from "@/states/hope/share-hope/slices";

import ModalAddHope from "@/components/Molecules/ModalAddHope";

const testComponent = suite("<ModalAddHope />");

testComponent.before((ctx) => {
  registerSuite(ctx);
  store.dispatch(actions.setStream(true));
});

testComponent.after((ctx) => {
  cleanup();
  store.dispatch(actions.setStream(false));
  cleanupSuite(ctx);
});

testComponent("Render modal content (title and form inputs)", () => {
  render(<ModalAddHope />);
  screen.getByRole("heading", { name: /share your hopes/i });
  screen.getByRole("img", { name: /take a photo/i });
  screen.getByRole("textbox");
  screen.getByRole("button", { name: /submit/i });
});

testComponent.run();
