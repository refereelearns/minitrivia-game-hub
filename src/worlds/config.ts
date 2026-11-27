/**
 * WORLD CONFIG — the one place to change a world's name, title, colors,
 * landscape motif and transition. Swap an image by replacing the asset
 * pointer imports below (wide = desktop, tall = phone crop).
 */
import olympusWide from "@/assets/worlds/olympus-wide.jpg.asset.json";
import olympusTall from "@/assets/worlds/olympus-tall.jpg.asset.json";
import hadesWide from "@/assets/worlds/hades-wide.jpg.asset.json";
import hadesTall from "@/assets/worlds/hades-tall.jpg.asset.json";
import type { TransitionConfig } from "./transitions";

export type WorldId = "olympus" | "hades";

export interface WorldConfig {
  id: WorldId;
  name: string;
  title: string;
  tagline: string;
  /** Landscape layer. `tall` is used on portrait/phone screens. */
  landscape: {
    wide: string;
    tall: string;
    alt: string;
    /** Focus point of the crop, e.g. "center 60%". */
    objectPosition: string;
  };
  /** Optional foreground layer (e.g. a climber), rendered above the landscape. */
  foreground?: { src: string; alt: string; className: string };
  /** CSS colors exposed as --world-* variables (oklch). */
  colors: {
    ink: string; // headline + text on the scene
    inkMuted: string;
    accent: string; // switch + focus ring
    accentInk: string;
    surface: string; // cards / panels (translucent)
    surfaceInk: string;
    scrim: string; // gradient over the landscape for legibility
  };
  transition: TransitionConfig;
}

export const worlds: Record<WorldId, WorldConfig> = {
  olympus: {
    id: "olympus",
    name: "Olympus",
    title: "Climb today's summit",
    tagline: "Bright minds, thin air. Pick a challenge and start the ascent.",
    landscape: {
      wide: olympusWide.url,
      tall: olympusTall.url,
      alt: "Snow-covered alpine peaks above a sea of clouds at sunrise",
      objectPosition: "center 60%",
    },
    colors: {
      ink: "oklch(0.22 0.04 255)",
      inkMuted: "oklch(0.32 0.04 255)",
      accent: "oklch(0.27 0.06 255)",
      accentInk: "oklch(0.98 0.01 90)",
      surface: "oklch(0.98 0.01 240 / 0.78)",
      surfaceInk: "oklch(0.22 0.04 255)",
      scrim:
        "linear-gradient(180deg, oklch(0.93 0.03 240 / 0.75) 0%, oklch(0.93 0.03 240 / 0.15) 45%, oklch(0.3 0.04 250 / 0.35) 100%)",
    },
    transition: { kind: "fade", durationMs: 700 },
  },
  hades: {
    id: "hades",
    name: "Hades",
    title: "Dwelve into the deep",
    tagline: "Cold logic, slow embers. Every answer takes you further down.",
    landscape: {
      wide: hadesWide.url,
      tall: hadesTall.url,
      alt: "A deep basalt canyon with a faint red glow far below",
      objectPosition: "center 50%",
    },
    colors: {
      ink: "oklch(0.96 0.01 30)",
      inkMuted: "oklch(0.82 0.02 30)",
      accent: "oklch(0.55 0.17 28)",
      accentInk: "oklch(0.98 0.01 30)",
      surface: "oklch(0.2 0.01 30 / 0.72)",
      surfaceInk: "oklch(0.95 0.01 30)",
      scrim:
        "linear-gradient(180deg, oklch(0.12 0.01 30 / 0.8) 0%, oklch(0.12 0.01 30 / 0.2) 45%, oklch(0.1 0.02 25 / 0.6) 100%)",
    },
    transition: { kind: "fade", durationMs: 900 },
  },
};

export const worldOrder: WorldId[] = ["olympus", "hades"];
export const defaultWorld: WorldId = "olympus";

export function isWorldId(value: string): value is WorldId {
  return value in worlds;
}

export function worldStyle(world: WorldConfig): Record<string, string> {
  const c = world.colors;
  return {
    "--world-ink": c.ink,
    "--world-ink-muted": c.inkMuted,
    "--world-accent": c.accent,
    "--world-accent-ink": c.accentInk,
    "--world-surface": c.surface,
    "--world-surface-ink": c.surfaceInk,
  };
}
