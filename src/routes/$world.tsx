import { Link, Outlet, createFileRoute, notFound } from "@tanstack/react-router";
import { LandscapeLayer } from "@/components/hub/LandscapeLayer";
import { WorldSwitch } from "@/components/hub/WorldSwitch";
import { isWorldId, worlds, worldStyle } from "@/worlds/config";

export const Route = createFileRoute("/$world")({
  beforeLoad: ({ params }) => {
    if (!isWorldId(params.world)) throw notFound();
    return { worldConfig: worlds[params.world] };
  },
  component: WorldLayout,
});

function WorldLayout() {
  const { worldConfig: w } = Route.useRouteContext();
  return (
    <div style={worldStyle(w)} className="relative min-h-dvh text-world-ink transition-colors duration-700 motion-reduce:transition-none">
      <LandscapeLayer active={w.id} />
      {/* Layer 3: real UI */}
      <header className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 pt-4 sm:px-8 sm:pt-6">
        <Link to="/" aria-label="minitrivia — Choose your world" className="font-display text-2xl font-bold tracking-tight outline-none focus-visible:underline sm:text-3xl">
          minitrivia
        </Link>
        <WorldSwitch active={w.id} />
      </header>
      <main className="mx-auto max-w-6xl px-4 pb-10 sm:px-8">
        <Outlet />
      </main>
    </div>
  );
}
