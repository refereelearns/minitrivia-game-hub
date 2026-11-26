import type { GameViewProps } from "../catalog";

/** Stand-in game module. Real games get their own file in this folder. */
export function PlaceholderGame({ game }: GameViewProps) {
  return (
    <p className="text-sm opacity-80">
      “{game.name}” isn’t playable yet. This space is reserved for the game.
    </p>
  );
}
