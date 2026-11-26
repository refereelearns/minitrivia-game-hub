/**
 * WORLD TRANSITION — encapsulates how landscapes change between worlds.
 * Replace this component or set TRANSITIONS_ENABLED = false; navigation,
 * catalog and game modules don't depend on it. Reduced-motion users always
 * get an instant switch.
 */
import type { ReactNode } from "react";

export type TransitionConfig = { kind: "fade"; durationMs: number } | { kind: "none" };

export const TRANSITIONS_ENABLED = true;

interface Props {
  active: boolean;
  config: TransitionConfig;
  children: ReactNode;
}

/** One stacked layer per world; only the active one is visible. */
export function WorldTransitionLayer({ active, config, children }: Props) {
  const animated = TRANSITIONS_ENABLED && config.kind === "fade";
  return (
    <div
      aria-hidden={!active}
      className={`absolute inset-0 ${animated ? "transition-opacity ease-out motion-reduce:transition-none" : ""} ${active ? "opacity-100" : "opacity-0"}`}
      style={animated ? { transitionDuration: `${config.durationMs}ms` } : undefined}
    >
      {children}
    </div>
  );
}
