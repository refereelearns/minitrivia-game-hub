import { useCallback, useEffect, useRef, useState } from "react";
import { Heart } from "lucide-react";
import { answer, done, limit, lives, questionsFor, today, winner, type Run } from "./daily";
import "./game.css";

const key = (day: string) => "minitrivia:math-decide:v1:" + day;
function read(day: string): Run | null {
  const saved = localStorage.getItem(key(day));
  return saved ? JSON.parse(saved) : null;
}
function Formula({ text }: { text: string }) {
  const [base, exponent] = text.split("^");
  return (
    <>
      {base}
      {exponent && <sup>{exponent}</sup>}
    </>
  );
}
type Move = "start" | "next" | number | null;

export function MathDecide() {
  const [day, setDay] = useState("");
  const [run, setRun] = useState<Run | null>(null);
  const [error, setError] = useState(false);
  const [now, setNow] = useState(Date.now);
  const pending = useRef(false);

  const sync = useCallback(() => {
    try {
      const date = today();
      setRun(read(date));
      setDay(date);
      setNow(Date.now());
      setError(false);
    } catch {
      setError(true);
    }
  }, []);
  useEffect(() => {
    sync();
    const refresh = () => {
      if (today() !== day) sync();
    };
    const timer = window.setInterval(refresh, 1000);
    window.addEventListener("storage", sync);
    window.addEventListener("focus", sync);
    return () => {
      clearInterval(timer);
      window.removeEventListener("storage", sync);
      window.removeEventListener("focus", sync);
    };
  }, [day, sync]);

  const move = useCallback(
    async (action: Move) => {
      if (pending.current || !day) return;
      pending.current = true;
      const at = Date.now();
      const update = () => {
        if (today() !== day) return sync();
        const saved = read(day);
        // A stale tab or a second click may only act on the round it displayed.
        if (saved?.deadline !== run?.deadline || saved?.answers.length !== run?.answers.length)
          return sync();
        let next: Run;
        if (action === "start" && !saved) {
          next = { day, questions: questionsFor(day), answers: [], deadline: at + limit };
        } else if (saved && !done(saved) && action === "next" && saved.deadline === null) {
          next = { ...saved, deadline: at + limit };
        } else if (
          saved &&
          saved.deadline !== null &&
          (action === null || typeof action === "number")
        ) {
          next = answer(saved, action, at);
        } else return;
        localStorage.setItem(key(day), JSON.stringify(next));
        setRun(next);
        setNow(Date.now());
      };
      try {
        if (navigator.locks) await navigator.locks.request(key(day), update);
        else update();
      } catch {
        setError(true);
      } finally {
        pending.current = false;
      }
    },
    [day, run, sync],
  );

  useEffect(() => {
    if (!run?.deadline) return;
    const deadline = run.deadline;
    const tick = () => {
      const time = Date.now();
      setNow(time);
      if (time >= deadline) void move(null);
    };
    tick();
    const timer = window.setInterval(tick, 80);
    const press = (event: KeyboardEvent) => {
      if (event.repeat || event.altKey || event.metaKey || event.ctrlKey) return;
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        void move(event.key === "ArrowLeft" ? 0 : 1);
      }
    };
    window.addEventListener("keydown", press);
    return () => {
      clearInterval(timer);
      window.removeEventListener("keydown", press);
    };
  }, [run, move]);

  if (error)
    return (
      <p>
        Browser storage is unavailable. Enable it to save your daily attempt.{" "}
        <button onClick={sync}>Retry</button>
      </p>
    );
  if (!day) return <p>Loading today’s challenge…</p>;
  if (!run)
    return (
      <section className="md-game">
        <p className="md-date">Daily challenge · {day}</p>
        <p>15 comparisons. Three lives. Pick a card or use ← and → within 15 seconds.</p>
        <p>
          Earn 50 points per correct answer and up to 25 more for speed. A wrong answer or timeout
          costs one heart.
        </p>
        <button className="md-action" onClick={() => void move("start")}>
          Play today’s challenge →
        </button>
        <small>One run per browser. New questions at midnight in Berlin.</small>
      </section>
    );

  const score = run.answers.reduce((sum, a) => sum + a.points, 0);
  if (done(run))
    return (
      <section className="md-game">
        <h2>{lives(run) === 0 ? "Out of lives" : "Challenge complete"}</h2>
        <strong className="md-total">{score} pts</strong>
        <p>
          {run.answers.filter((a) => a.points).length} correct · {run.answers.length} of{" "}
          {run.questions.length} rounds played
        </p>
        <small>Next challenge at midnight in Berlin.</small>
        <h3>Your run &amp; solutions</h3>
        <ol className="md-review">
          {run.answers.map((a, i) => {
            const q = run.questions[i]!;
            return (
              <li key={i}>
                <b>
                  {i + 1}. {a.points ? "Correct" : a.side === null ? "Timed out" : "Incorrect"}
                </b>{" "}
                · {(a.elapsed / 1000).toFixed(1)} s · +{a.points} pts
                <p>{q.prompt}</p>
                <div>
                  <Formula text={q.labels[0]} /> vs. <Formula text={q.labels[1]} />
                </div>
                <div>
                  Your choice: <Formula text={a.side === null ? "No answer" : q.labels[a.side]!} />
                </div>
                <div>
                  Solution:{" "}
                  <strong>
                    <Formula text={q.labels[winner(q)]} />
                  </strong>
                </div>
                <details>
                  <summary>Why?</summary>
                  {q.solution}
                </details>
              </li>
            );
          })}
        </ol>
      </section>
    );

  const active = run.deadline !== null;
  const index = run.answers.length - (active ? 0 : 1);
  const q = run.questions[index]!;
  const last = run.answers[index]!;
  const remaining = Math.min(
    limit,
    Math.max(0, active ? run.deadline! - now : limit - last.elapsed),
  );
  return (
    <section className="md-game">
      <div className="md-stats">
        <b>
          Round {index + 1} / {run.questions.length}
        </b>
        <span className="md-hearts" role="img" aria-label={lives(run) + " lives left"}>
          {[1, 2, 3].map((n) => (
            <Heart key={n} aria-hidden className={n <= lives(run) ? "full" : ""} />
          ))}
        </span>
        <b>{score} pts</b>
      </div>
      <div key={index} className={"md-clock" + (active && remaining <= 3000 ? " urgent" : "")}>
        <div>
          Decision time <b>{(Math.ceil(remaining / 100) / 10).toFixed(1)} s</b>
        </div>
        <progress value={remaining} max={limit} aria-label="Time remaining" />
      </div>
      <h2>{q.prompt}</h2>
      <div className="md-choices">
        {q.labels.map((label, i) => (
          <button
            key={i}
            disabled={!active}
            className={
              !active && i === winner(q) ? "correct" : !active && i === last.side ? "miss" : ""
            }
            onClick={() => void move(i)}
          >
            <small aria-hidden>{i === 0 ? "←" : "→"}</small>
            <Formula text={label} />
          </button>
        ))}
      </div>
      {!active && (
        <div role="status">
          <b>
            {last.points
              ? "Correct · +" + last.points + " pts"
              : last.side === null
                ? "Time’s up · one life lost"
                : "Incorrect · one life lost"}
          </b>
          <p>{q.solution}</p>
          <button className="md-action" onClick={() => void move("next")}>
            Next round →
          </button>
        </div>
      )}
    </section>
  );
}
