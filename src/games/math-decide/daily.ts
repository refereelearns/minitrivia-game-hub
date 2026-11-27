import { bank, editions, type Question } from "./questions";

const berlin = new Intl.DateTimeFormat("sv-SE", {
  timeZone: "Europe/Berlin",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});
export function today(now = new Date()) {
  return berlin.format(now);
}

function mix(n: number) {
  n = Math.imul(n ^ (n >>> 16), 0x45d9f3b);
  n = Math.imul(n ^ (n >>> 16), 0x45d9f3b);
  return (n ^ (n >>> 16)) >>> 0;
}

export function questionsFor(day: string): Question[] {
  const offset = Math.floor((Date.parse(day) - Date.UTC(2026, 10, 27)) / 86400000);
  return (
    editions[day] ??
    bank.map((variants, slot) => {
      // Each three-day block starts at a slot-specific phase. Reverse or keep
      // the remaining order per block. Adjacent days never repeat a variant.
      const phase = Math.abs(offset + slot) % variants.length;
      const block = Math.floor((offset + slot) / variants.length);
      const reverse = mix(block * 31 + slot) % 2;
      const pick = reverse && phase ? variants.length - phase : phase;
      const initialPhase = slot % variants.length;
      const initialReverse = mix(Math.floor(slot / variants.length) * 31 + slot) % 2;
      const first = initialReverse && initialPhase ? variants.length - initialPhase : initialPhase;
      return variants[(pick - first + variants.length) % variants.length]!;
    })
  ).map((question, slot) =>
    mix(offset * 31 + slot) % 2
      ? {
          ...question,
          labels: [question.labels[1], question.labels[0]] as const,
          values: [question.values[1], question.values[0]] as const,
        }
      : question,
  );
}

export const limit = 10000;
export interface Answer {
  side: number | null;
  elapsed: number;
  points: number;
}
export interface Run {
  day: string;
  questions: Question[];
  answers: Answer[];
  deadline: number | null;
  roundMs?: number;
}
export function lives(run: Run) {
  return 3 - run.answers.filter((a) => a.points === 0).length;
}
export function done(run: Run) {
  return lives(run) === 0 || run.answers.length === run.questions.length;
}
export function winner(q: Question) {
  return q.values[0] > q.values[1] ? 0 : 1;
}
export function answer(run: Run, side: number | null, now: number): Run {
  if (run.deadline === null || done(run)) return run;
  const remaining = Math.min(limit, Math.max(0, run.deadline - now));
  if (!remaining) side = null;
  const points =
    side === winner(run.questions[run.answers.length]!)
      ? 50 + Math.round((25 * remaining) / limit)
      : 0;
  return {
    ...run,
    deadline: null,
    answers: [...run.answers, { side, elapsed: limit - remaining, points }],
  };
}
