import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { MathDecide } from "@/games/math-decide/MathDecide";
import { questionsFor, winner } from "@/games/math-decide/daily";

afterEach(() => {
  cleanup();
  localStorage.clear();
  vi.useRealTimers();
});

it("warns at three seconds, restores a timeout, and locks the completed daily run", () => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-11-27T12:00Z"));
  const first = render(<MathDecide />);
  fireEvent.click(screen.getByText(/Play today/));
  act(() => {
    vi.advanceTimersByTime(7040);
  });
  expect(document.querySelector(".md-clock.urgent")).toBeTruthy();
  first.unmount();
  vi.setSystemTime(new Date("2026-11-27T12:01Z"));
  render(<MathDecide />);
  expect(screen.getByText(/Time’s up/)).toBeTruthy();
  for (let i = 1; i < 3; i++) {
    fireEvent.click(screen.getByText(/Next round/));
    fireEvent.click(
      document.querySelectorAll(".md-choices button")[1 - winner(questionsFor("2026-11-27")[i]!)]!,
    );
  }
  expect(screen.getByText("Out of lives")).toBeTruthy();
  expect(document.querySelectorAll(".md-review li")).toHaveLength(3);
  cleanup();
  render(<MathDecide />);
  expect(screen.getByText("Out of lives")).toBeTruthy();
  act(() => {
    vi.setSystemTime(new Date("2026-11-27T23:00Z"));
    vi.advanceTimersByTime(1000);
  });
  expect(screen.getByText(/Play today/)).toBeTruthy();
});

it("shows the score and all 15 solutions after a perfect run", () => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-11-27T12:00Z"));
  render(<MathDecide />);
  fireEvent.click(screen.getByText(/Play today/));
  const rounds = questionsFor("2026-11-27");
  rounds.forEach((q, i) => {
    if (i > 0) fireEvent.click(screen.getByText(/Next round/));
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    fireEvent.click(document.querySelectorAll(".md-choices button")[winner(q)]!);
  });
  expect(screen.getByText("Challenge complete")).toBeTruthy();
  expect(screen.getAllByText("50 for accuracy + 18 for speed = 68 pts")).toHaveLength(15);
  expect(screen.getByText("1020 pts")).toBeTruthy();
  expect(document.querySelectorAll(".md-review details")).toHaveLength(15);
});
