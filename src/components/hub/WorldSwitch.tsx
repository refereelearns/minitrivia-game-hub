import { Link } from "@tanstack/react-router";
import { worldOrder, worlds, type WorldId } from "@/worlds/config";

export function WorldSwitch({ active }: { active: WorldId }) {
  return (
    <nav aria-label="Choose world" className="flex rounded-full bg-world-surface p-1 shadow-lg backdrop-blur-md">
      {worldOrder.map((id) => {
        const on = id === active;
        return (
          <Link
            key={id}
            to="/$world"
            params={{ world: id }}
            aria-current={on ? "page" : undefined}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors outline-none focus-visible:ring-2 focus-visible:ring-world-accent focus-visible:ring-offset-2 sm:px-5 ${
              on ? "bg-world-accent text-world-accent-ink" : "text-world-surface-ink hover:bg-world-accent/15"
            }`}
          >
            {worlds[id].name}
          </Link>
        );
      })}
    </nav>
  );
}
