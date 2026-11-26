import { worldOrder, worlds, type WorldId } from "@/worlds/config";
import { WorldTransitionLayer } from "@/worlds/transitions";

/** Layer 1 (+2): landscapes and optional foreground figures, one stack per world. */
export function LandscapeLayer({ active }: { active: WorldId }) {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {worldOrder.map((id) => {
        const w = worlds[id];
        return (
          <WorldTransitionLayer key={id} active={id === active} config={w.transition}>
            <picture className="block h-full" style={{ viewTransitionName: id === active ? `portal-${id}` : undefined }}>
              <source media="(min-aspect-ratio: 4/5)" srcSet={w.landscape.wide} />
              <img
                src={w.landscape.tall}
                alt=""
                className="h-full w-full object-cover"
                style={{ objectPosition: w.landscape.objectPosition }}
                fetchPriority={id === active ? "high" : "low"}
              />
            </picture>
            <div className="absolute inset-0" style={{ background: w.colors.scrim }} />
            {w.foreground && <img src={w.foreground.src} alt="" className={w.foreground.className} />}
          </WorldTransitionLayer>
        );
      })}
    </div>
  );
}
