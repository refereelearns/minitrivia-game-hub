import { createFileRoute, redirect } from "@tanstack/react-router";
import { defaultWorld } from "@/worlds/config";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: "/$world", params: { world: defaultWorld } });
  },
  head: () => ({
    meta: [
      { title: "minitrivia — daily trivia in two worlds" },
      { name: "description", content: "Small daily trivia games across Olympus and Hades." },
      { property: "og:title", content: "minitrivia" },
      { property: "og:description", content: "Small daily trivia games across Olympus and Hades." },
    ],
  }),
});
