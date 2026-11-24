import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { findGame } from "@/data/games";
import { colorClass, themeFor } from "@/data/game-themes";
import { GameShape } from "@/components/GameTile";

export const Route = createFileRoute("/spiel/$slug")({
  loader: ({ params }) => {
    const game = findGame(params.slug);
    if (!game) throw notFound();
    return game;
  },
  head: ({ loaderData }) => {
    const title = loaderData ? `${loaderData.name} – minitrivia` : "Spiel nicht gefunden – minitrivia";
    return {
      meta: [
        { title },
        { name: "description", content: `${loaderData?.name ?? "Spiel"} auf minitrivia spielen.` },
        { property: "og:title", content: title },
        { property: "og:description", content: "Ein kleines Daily-Trivia-Spiel auf minitrivia." },
      ],
    };
  },
  component: GamePage,
});

function GamePage() {
  const game = Route.useLoaderData();
  const { color } = themeFor(game.slug);
  return (
    <div className="page-shell">
      <main className="mx-auto max-w-3xl px-5 py-8">
        <header className={`tile ${colorClass[color]} aspect-auto gap-6 hover:transform-none active:transform-none`}>
          <div className="flex items-center justify-between">
            <Link to="/" className="back-link text-sm font-semibold underline-offset-4 hover:underline">
              ← Zur Spieleübersicht
            </Link>
            <GameShape slug={game.slug} />
          </div>
          <h1 className="font-rounded text-3xl font-extrabold">{game.name}</h1>
        </header>
        {/* Hier wird später das jeweilige Spiel eingesetzt. */}
        <section aria-label="Spielbereich" className="mt-6 min-h-80 rounded-[1.75rem] border-2 border-dashed border-ink/30" />
      </main>
    </div>
  );
}
