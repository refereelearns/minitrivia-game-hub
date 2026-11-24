import { games } from "./games";

export type TileColor = "apricot" | "mint" | "sun";
export type TileShape = "star" | "circle" | "wave";

// Wiederverwendbare Auswahl: neue Spiele erhalten Farbe und Form automatisch nach ihrer Position.
const colors: TileColor[] = ["apricot", "mint", "sun"];
const shapes: TileShape[] = ["star", "circle", "wave", "circle", "star"];

export function themeFor(slug: string) {
  const i = Math.max(0, games.findIndex((g) => g.slug === slug));
  return { color: colors[i % colors.length]!, shape: shapes[i % shapes.length]! };
}

// Vollständige Klassennamen, damit Tailwind sie erkennt.
export const colorClass: Record<TileColor, string> = {
  apricot: "tile-apricot",
  mint: "tile-mint",
  sun: "tile-sun",
};
export const shapeClass: Record<TileShape, string> = {
  star: "shape-star",
  circle: "shape-circle",
  wave: "shape-wave",
};
