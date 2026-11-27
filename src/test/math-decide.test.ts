import { describe, expect, it } from "vitest";
import { answer, done, lives, questionsFor, today, type Run } from "@/games/math-decide/daily";
import { bank } from "@/games/math-decide/questions";

describe("Math Decide", () => {
  it("has 15 fresh pairs each Berlin day and a stable order within the day", () => {
    expect(today(new Date("2026-11-27T23:00Z"))).toBe("2026-11-28");
    expect(today(new Date("2027-06-01T22:00Z"))).toBe("2027-06-02");
    let previous: string[] = [];
    for (let i = 0; i < 370; i++) {
      const date = new Date(Date.UTC(2026, 10, 27 + i)).toISOString().slice(0, 10);
      const set = questionsFor(date);
      expect(set).toEqual(questionsFor(date));
      expect(set).toHaveLength(15);
      const pairs = set.map((q) => [...q.labels].sort().join("|"));
      pairs.forEach((pair, j) => expect(pair).not.toEqual(previous[j]));
      previous = pairs;
    }
  });
  it("keeps the approved first edition and correct dice and fraction winners", () => {
    const set = questionsFor("2026-11-27");
    set.forEach((q, i) => expect([...q.labels].sort()).toEqual([...bank[i]![0]!.labels].sort()));
    expect(bank[3]![0]!.values).toEqual([4 / 36, 3 / 36]);
    expect(bank[11]![0]!.values[0]).toBeGreaterThan(bank[11]![0]!.values[1]);
  });
  it("scores speed, locks after a choice and ends at three losses", () => {
    let run: Run = {
      day: "2026-11-27",
      questions: bank.map((row) => row[0]!),
      answers: [],
      deadline: 10000,
    };
    run = answer(run, 1, 3000);
    expect(run.answers[0]!.points).toBe(68);
    expect(answer(run, 0, 5000)).toBe(run);
    for (let i = 0; i < 3; i++) run = answer({ ...run, deadline: 10000 }, 0, 10000);
    expect(lives(run)).toBe(0);
    expect(done(run)).toBe(true);
    expect(run.answers[3]!.side).toBeNull();
  });
});
