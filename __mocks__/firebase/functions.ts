import type { Functions } from "firebase/functions";

export function getFunctions() {
  return {} as Functions;
}

export function httpsCallable() {
  return () => Promise.resolve();
}
