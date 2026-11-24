import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { Game } from "@/data/games";
import { colorClass, shapeClass, themeFor } from "@/data/game-themes";

export function GameShape({ slug }: { slug: string }) {
  const { shape } = themeFor(slug);
  return <span aria-hidden className={`shape ${shapeClass[shape]}`} />;
}

export function GameTile({ game }: { game: Game }) {
  const { color } = themeFor(game.slug);
  return (
    <Link to="/spiel/$slug" params={{ slug: game.slug }} className={`tile ${colorClass[color]}`}>
      <GameShape slug={game.slug} />
      <span className="flex items-end justify-between gap-2">
        <span className="font-rounded text-2xl leading-tight font-extrabold sm:text-3xl">{game.name}</span>
        <ArrowRight aria-hidden className="size-5 shrink-0" />
      </span>
    </Link>
  );
}
