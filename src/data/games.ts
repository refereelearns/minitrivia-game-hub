export type Game = { name: string; slug: string };

// Zentrale Spieleliste: Jeder Eintrag erzeugt automatisch eine Kachel und eine Seite unter /spiel/<slug>.
export const games: Game[] = [
  { name: "Spiel A", slug: "spiel-a" },
  { name: "Spiel B", slug: "spiel-b" },
  { name: "Spiel C", slug: "spiel-c" },
];

export const findGame = (slug: string) => games.find((g) => g.slug === slug);
