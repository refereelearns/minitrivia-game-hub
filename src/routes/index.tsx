import { createFileRoute, Link } from "@tanstack/react-router";
import { worldOrder, worlds } from "@/worlds/config";

export const Route = createFileRoute("/")({
  component: WorldSelection,
  head: () => ({
    meta: [
      { title: "minitrivia — daily trivia in two worlds" },
      { name: "description", content: "Small daily trivia games across Olympus and Hades." },
      { property: "og:title", content: "minitrivia" },
      { property: "og:description", content: "Small daily trivia games across Olympus and Hades." },
    ],
  }),
});

function WorldSelection() {
  return (
    <main className="relative grid min-h-dvh grid-rows-2 bg-slate-950 text-white sm:grid-cols-2 sm:grid-rows-1">
      <h1 className="pointer-events-none absolute left-6 top-5 z-10 font-display text-3xl font-bold tracking-tight text-white drop-shadow-md">
        minitrivia<span className="sr-only"> — Choose your world</span>
      </h1>
      {worldOrder.map((id) => {
        const world = worlds[id];
        return (
          <Link
            key={id}
            to="/$world"
            params={{ world: id }}
            viewTransition
            aria-label={`Play ${world.name}`}
            className="group relative isolate flex min-h-56 items-end overflow-hidden px-8 py-8 outline-offset-[-5px] focus-visible:outline-2 sm:px-[5vw] sm:py-[10vh]"
            style={{ backgroundColor: id === "olympus" ? "#456279" : "#422422" }}
          >
            <picture className="absolute inset-0 -z-10 block overflow-hidden" style={{ viewTransitionName: `portal-${id}` }}>
              <source media="(min-width: 640px)" srcSet={world.landscape.tall} />
              <img src={world.landscape.wide} alt="" className="size-full object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-105" style={{ objectPosition: world.landscape.objectPosition }} />
            </picture>
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-transparent to-black/25" />
            <div>
              <h2 className="font-display text-5xl font-bold tracking-tight sm:text-7xl">{world.name}</h2>
              <span className="mt-4 inline-flex items-center gap-4 rounded-full bg-white px-6 py-2 font-semibold text-slate-950">Play <span aria-hidden="true">→</span></span>
            </div>
          </Link>
        );
      })}
    </main>
  );
}
