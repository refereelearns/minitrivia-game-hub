import { createFileRoute } from "@tanstack/react-router";
import { GameTile } from "@/components/GameTile";
import { games } from "@/data/games";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "minitrivia – Spieleübersicht" },
      { name: "description", content: "Alle kleinen Daily-Trivia-Spiele von minitrivia an einem Ort." },
      { property: "og:title", content: "minitrivia – Spieleübersicht" },
      { property: "og:description", content: "Alle kleinen Daily-Trivia-Spiele an einem Ort." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="page-shell">
      <main className="mx-auto max-w-3xl px-5 py-8">
        <header className="mb-10">
          <h1 className="font-rounded text-4xl font-extrabold tracking-tight text-ink">minitrivia</h1>
        </header>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
          {games.map((g) => (
            <li key={g.slug}>
              <GameTile game={g} />
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
