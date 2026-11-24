import { createFileRoute, Link } from "@tanstack/react-router";
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
    <main className="mx-auto min-h-screen max-w-3xl px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">minitrivia</h1>
      </header>
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {games.map((g) => (
          <li key={g.slug}>
            <Link
              to="/spiel/$slug"
              params={{ slug: g.slug }}
              className="flex aspect-square items-center justify-center rounded-lg border bg-card p-4 text-center font-medium text-card-foreground transition-colors hover:bg-accent"
            >
              {g.name}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
