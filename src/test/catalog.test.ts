import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";
import { catalog, gamesForWorld, type GameEntry } from "@/games/catalog";
import { routeTree } from "@/routeTree.gen";

const router = () => createRouter({ routeTree, context: { queryClient: new QueryClient() } });

describe("game catalog", () => {
  it("shows Synonyms in Olympus and Math Decide in Hades", () => {
    expect(gamesForWorld("olympus").map((g) => g.id)).toEqual(["synonyms"]);
    expect(gamesForWorld("hades").map((g) => g.id)).toEqual(["math-decide"]);
  });

  it("puts an extra entry into its world automatically", () => {
    const extra: GameEntry = { ...catalog[0]!, id: "extra", world: "hades" };
    expect(gamesForWorld("hades", [...catalog, extra]).map((g) => g.id)).toContain("extra");
    expect(gamesForWorld("olympus", [...catalog, extra]).map((g) => g.id)).not.toContain("extra");
  });

  it("matches world and game URLs", () => {
    expect(router().matchRoutes("/hades").at(-1)?.routeId).toBe("/$world/");
    expect(router().matchRoutes("/olympus/synonyms").at(-1)?.routeId).toBe("/$world/$gameId");
  });
});
