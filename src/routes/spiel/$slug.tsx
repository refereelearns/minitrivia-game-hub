import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { findGame } from "@/data/games";

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
  return (
    <main className="mx-auto min-h-screen max-w-3xl px-4 py-8">
      <Link to="/" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
        ← Zur Spieleübersicht
      </Link>
      <h1 className="mt-4 mb-6 text-2xl font-bold">{game.name}</h1>
      {/* Hier wird später das jeweilige Spiel eingesetzt. */}
      <section aria-label="Spielbereich" className="min-h-80 rounded-lg border border-dashed" />
    </main>
  );
}
