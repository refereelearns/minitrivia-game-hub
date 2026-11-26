import { Link, createFileRoute } from "@tanstack/react-router";
import { gamesForWorld } from "@/games/catalog";
import { isWorldId, worlds } from "@/worlds/config";

export const Route = createFileRoute("/$world/")({
  head: ({ params }) => {
    const w = isWorldId(params.world) ? worlds[params.world] : undefined;
    const title = w ? `${w.name} — minitrivia` : "minitrivia";
    const desc = w ? `${w.title}. ${w.tagline}` : "Daily trivia games.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  component: WorldPage,
});

function WorldPage() {
  const { worldConfig: w } = Route.useRouteContext();
  const games = gamesForWorld(w.id);
  return (
    <div className="flex min-h-[calc(100dvh-5rem)] flex-col justify-between gap-10 pt-10 sm:pt-16">
      <section className="max-w-xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-world-ink-muted">{w.name}</p>
        <h1 className="mt-2 font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-7xl">{w.title}</h1>
        <p className="mt-4 max-w-md text-lg text-world-ink-muted">{w.tagline}</p>
      </section>
      <section aria-label={`${w.name} games`}>
        {games.length === 0 ? (
          <p className="rounded-2xl bg-world-surface p-5 text-world-surface-ink backdrop-blur-md">No games here yet.</p>
        ) : (
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-[repeat(auto-fill,minmax(15rem,1fr))]">
            {games.map((g) => (
              <li key={g.id}>
                <Link
                  to="/$world/$gameId"
                  params={{ world: w.id, gameId: g.id }}
                  className="block h-full rounded-2xl bg-world-surface p-5 text-world-surface-ink shadow-lg backdrop-blur-md transition-transform outline-none hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-world-accent motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                >
                  <span className="text-xs font-semibold uppercase tracking-wider opacity-70">{g.category}</span>
                  <span className="mt-1 block font-display text-2xl font-semibold">{g.name}</span>
                  <span className="mt-1 block text-sm opacity-80">{g.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
