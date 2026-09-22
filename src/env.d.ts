/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare global {
  interface Window {
    dataLayer: unknown[];
    track?: (event: string, params?: Record<string, unknown>) => void;
  }
}

export {};
