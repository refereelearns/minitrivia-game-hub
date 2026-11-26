import { Link, createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { findGame } from "@/games/catalog";

export const Route = createFileRoute("/$world/$gameId")({
  beforeLoad: ({ params }) => {
    const game = findGame(params.gameId);
    if (!game) throw notFound();
    // The catalog decides the world; a mismatching URL goes to the right one.
    if (game.world !== params.world) {
      throw redirect({ to: "/$world/$gameId", params: { world: game.world, gameId: game.id } });
    }
  },
  head: ({ params }) => {
    const game = findGame(params.gameId);
    const title = game ? `${game.name} — minitrivia` : "Game — minitrivia";
    const desc = game?.description ?? "A minitrivia game.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  component: GamePage,
});

function GamePage() {
  const { worldConfig: w } = Route.useRouteContext();
  const { gameId } = Route.useParams();
  const game = findGame(gameId)!;
  const View = game.view;
  return (
    <div className="pt-8 sm:pt-14">
      <Link
        to="/$world"
        params={{ world: game.world }}
        className="inline-flex items-center gap-1 rounded-full bg-world-surface px-4 py-2 text-sm font-semibold text-world-surface-ink backdrop-blur-md outline-none focus-visible:ring-2 focus-visible:ring-world-accent"
      >
        ← Back to {w.name}
      </Link>
      <article className="mt-6 max-w-2xl rounded-3xl bg-world-surface p-6 text-world-surface-ink shadow-xl backdrop-blur-md sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-wider opacity-70">{game.category}</p>
        <h1 className="mt-1 font-display text-4xl font-bold sm:text-5xl">{game.name}</h1>
        <p className="mt-3 text-lg opacity-85">{game.description}</p>
        <div className="mt-8 border-t border-current/15 pt-6">
          <View game={game} />
        </div>
      </article>
    </div>
  );
}
