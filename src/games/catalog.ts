/**
 * GAME CATALOG — the single list of all games. World pages read from here.
 * Add a game: append an entry. Its `view` is the game's own module
 * (see src/games/modules/). Change `world` to move it between worlds.
 */
import type { ComponentType } from "react";
import type { WorldId } from "@/worlds/config";
import { PlaceholderGame } from "./modules/PlaceholderGame";

import { MathDecide } from "./math-decide/MathDecide";

export interface GameViewProps {
  game: GameEntry;
}

export interface GameEntry {
  id: string; // stable, used in the URL
  name: string;
  description: string;
  category: string;
  world: WorldId;
  view: ComponentType<GameViewProps>;
}

export const catalog: GameEntry[] = [
  {
    id: "synonyms",
    name: "Synonyms",
    description: "Find the word that means the same. Placeholder — game coming soon.",
    category: "Language",
    world: "olympus",
    view: PlaceholderGame,
  },
  {
    id: "math-decide",
    name: "Math Decide",
    description: "Pick the larger value before time runs out. A fresh challenge every day.",
    category: "Numbers",
    world: "hades",
    view: MathDecide,
  },
];

export function gamesForWorld(world: WorldId, list: GameEntry[] = catalog) {
  return list.filter((g) => g.world === world);
}

export function findGame(id: string, list: GameEntry[] = catalog) {
  return list.find((g) => g.id === id);
}
