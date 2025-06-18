import type { PuterAPI } from "types";

declare global {
  interface Window {
    puter: PuterAPI;
  }
}

export {};