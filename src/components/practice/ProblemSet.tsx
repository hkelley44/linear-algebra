"use client";

import { useState } from "react";
import { PracticeProblem } from "@/lib/types/content";
import { MathText } from "@/components/ui/Math";

/**
 * Renders a set of practice problems with immediate inline feedback.
 * Each problem shows: question, input mechanism, submit, then feedback.
 */
export function ProblemSet({ problems }: { problems: PracticeProblem[] }) {
  if (problems.length === 0) return null;

  return (
    <div className="mt-12 pt-8 border-t-2 border-stone-200">
      <h3 className="font-sans text-xl font-bold text-stone-800 mb-6">
        Practice Problems
      </h3>
      <div className="space-y-8">
        {problems.map((problem, i) => (
          <ProblemCard key={problem.id} problem={problem} index={i + 1} />
        ))}
      </div>
    </div>
  );
}

function ProblemCard({ problem, index }: { problem: PracticeProblem; index: number }) {
  switch (problem.type) {
    case "multiple-choice":
      return <MultipleChoiceCard problem={problem} index={index} />;
    case "free-response":
      return <FreeResponseCard problem={problem} index={index} />;
    case "select-all":
      return <SelectAllCard problem={problem} index={index} />;
  }
}

function DifficultyBadge({ difficulty }: { difficulty: string }) {
  const colors = {
    basic: "bg-green-100 text-green-700",
    standard: "bg-blue-100 text-blue-700",
    challenge: "bg-purple-100 text-purple-700",
  };
  return (
    <span
      className={`font-sans text-xs px-2 py-0.5 rounded-full ${colors[difficulty as keyof typeof colors] ?? colors.standard}`}
    >
      {difficulty}
    </span>
  );
}

function SourceBadge({ source }: { source?: "axler" | "custom" }) {
  if (!source) return null;
  return (
    <span className="font-sans text-xs px-2 py-0.5 rounded-full bg-stone-100 text-stone-500">
      {source === "axler" ? "Axler" : "Custom"}
    </span>
  );
}

function MultipleChoiceCard({
  problem,
  index,
}: {
  problem: Extract<PracticeProblem, { type: "multiple-choice" }>;
  index: number;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const isCorrect = selected === problem.correctAnswer;

  const handleSubmit = () => {
    if (selected) setSubmitted(true);
  };

  const handleReset = () => {
    setSelected(null);
    setSubmitted(false);
    setShowHint(false);
  };

  return (
    <div className="bg-white border border-stone-200 rounded-lg p-5">
      <div className="flex items-center gap-2 mb-3">
        <span className="font-sans text-sm font-semibold text-stone-400">
          Problem {index}
        </span>
        <DifficultyBadge difficulty={problem.difficulty} />
        <SourceBadge source={problem.source} />
      </div>
      <div className="mb-4 text-stone-800">
        <MathText text={problem.question} />
      </div>
      <div className="space-y-2 mb-4">
        {problem.choices.map((choice) => {
          let borderColor = "border-stone-200";
          let bgColor = "bg-white";
          if (submitted && choice.label === problem.correctAnswer) {
            borderColor = "border-green-500";
            bgColor = "bg-green-50";
          } else if (submitted && choice.label === selected && !isCorrect) {
            borderColor = "border-red-500";
            bgColor = "bg-red-50";
          } else if (!submitted && choice.label === selected) {
            borderColor = "border-blue-500";
            bgColor = "bg-blue-50";
          }

          return (
            <button
              key={choice.label}
              onClick={() => !submitted && setSelected(choice.label)}
              disabled={submitted}
              className={`w-full text-left px-4 py-2.5 border rounded-md font-sans text-sm transition-colors ${borderColor} ${bgColor} ${submitted ? "cursor-default" : "hover:border-stone-400 cursor-pointer"}`}
            >
              <span className="font-semibold mr-2 text-stone-400">
                {choice.label}.
              </span>
              <MathText text={choice.text} />
            </button>
          );
        })}
      </div>

      {!submitted && (
        <div className="flex items-center gap-3">
          <button
            onClick={handleSubmit}
            disabled={!selected}
            className="font-sans text-sm px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            Check Answer
          </button>
          {problem.hint && !showHint && (
            <button
              onClick={() => setShowHint(true)}
              className="font-sans text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
            >
              Show Hint
            </button>
          )}
        </div>
      )}

      {showHint && !submitted && problem.hint && (
        <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-md text-sm text-amber-800">
          <span className="font-sans font-semibold">Hint: </span>
          <MathText text={problem.hint} />
        </div>
      )}

      {submitted && (
        <div
          className={`mt-4 p-4 rounded-md border ${isCorrect ? "bg-green-50 border-green-300" : "bg-red-50 border-red-300"}`}
        >
          <div className={`font-sans font-semibold text-sm mb-2 ${isCorrect ? "text-green-700" : "text-red-700"}`}>
            {isCorrect ? "Correct!" : "Not quite."}
          </div>
          <div className="text-sm text-stone-700">
            <MathText text={problem.explanation} />
          </div>
          <button
            onClick={handleReset}
            className="mt-3 font-sans text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}

function FreeResponseCard({
  problem,
  index,
}: {
  problem: Extract<PracticeProblem, { type: "free-response" }>;
  index: number;
}) {
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const normalized = answer.trim().toLowerCase();
  const isCorrect = problem.acceptedAnswers.some(
    (a) => a.toLowerCase() === normalized
  );

  const handleSubmit = () => {
    if (answer.trim()) setSubmitted(true);
  };

  const handleReset = () => {
    setAnswer("");
    setSubmitted(false);
    setShowHint(false);
  };

  return (
    <div className="bg-white border border-stone-200 rounded-lg p-5">
      <div className="flex items-center gap-2 mb-3">
        <span className="font-sans text-sm font-semibold text-stone-400">
          Problem {index}
        </span>
        <DifficultyBadge difficulty={problem.difficulty} />
        <SourceBadge source={problem.source} />
      </div>
      <div className="mb-4 text-stone-800">
        <MathText text={problem.question} />
      </div>
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          value={answer}
          onChange={(e) => !submitted && setAnswer(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          disabled={submitted}
          placeholder="Your answer..."
          className="font-sans text-sm flex-1 px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:border-blue-500 disabled:bg-stone-50"
        />
      </div>

      {!submitted && (
        <div className="flex items-center gap-3">
          <button
            onClick={handleSubmit}
            disabled={!answer.trim()}
            className="font-sans text-sm px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            Check Answer
          </button>
          {problem.hint && !showHint && (
            <button
              onClick={() => setShowHint(true)}
              className="font-sans text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
            >
              Show Hint
            </button>
          )}
        </div>
      )}

      {showHint && !submitted && problem.hint && (
        <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-md text-sm text-amber-800">
          <span className="font-sans font-semibold">Hint: </span>
          <MathText text={problem.hint} />
        </div>
      )}

      {submitted && (
        <div
          className={`mt-4 p-4 rounded-md border ${isCorrect ? "bg-green-50 border-green-300" : "bg-red-50 border-red-300"}`}
        >
          <div className={`font-sans font-semibold text-sm mb-2 ${isCorrect ? "text-green-700" : "text-red-700"}`}>
            {isCorrect ? "Correct!" : "Not quite."}
          </div>
          <div className="text-sm text-stone-700">
            <MathText text={problem.explanation} />
          </div>
          <button
            onClick={handleReset}
            className="mt-3 font-sans text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}

function SelectAllCard({
  problem,
  index,
}: {
  problem: Extract<PracticeProblem, { type: "select-all" }>;
  index: number;
}) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [submitted, setSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const correctSet = new Set(problem.correctAnswers);
  const isCorrect =
    selected.size === correctSet.size &&
    [...selected].every((s) => correctSet.has(s));

  const toggle = (label: string) => {
    if (submitted) return;
    const next = new Set(selected);
    if (next.has(label)) next.delete(label);
    else next.add(label);
    setSelected(next);
  };

  const handleSubmit = () => {
    if (selected.size > 0) setSubmitted(true);
  };

  const handleReset = () => {
    setSelected(new Set());
    setSubmitted(false);
    setShowHint(false);
  };

  return (
    <div className="bg-white border border-stone-200 rounded-lg p-5">
      <div className="flex items-center gap-2 mb-3">
        <span className="font-sans text-sm font-semibold text-stone-400">
          Problem {index}
        </span>
        <DifficultyBadge difficulty={problem.difficulty} />
        <SourceBadge source={problem.source} />
      </div>
      <div className="mb-2 text-stone-800">
        <MathText text={problem.question} />
      </div>
      <p className="font-sans text-xs text-stone-400 mb-4">Select all that apply.</p>
      <div className="space-y-2 mb-4">
        {problem.choices.map((choice) => {
          const isSelected = selected.has(choice.label);
          const isRight = correctSet.has(choice.label);
          let borderColor = "border-stone-200";
          let bgColor = "bg-white";

          if (submitted) {
            if (isRight) {
              borderColor = "border-green-500";
              bgColor = "bg-green-50";
            } else if (isSelected && !isRight) {
              borderColor = "border-red-500";
              bgColor = "bg-red-50";
            }
          } else if (isSelected) {
            borderColor = "border-blue-500";
            bgColor = "bg-blue-50";
          }

          return (
            <button
              key={choice.label}
              onClick={() => toggle(choice.label)}
              disabled={submitted}
              className={`w-full text-left px-4 py-2.5 border rounded-md font-sans text-sm transition-colors ${borderColor} ${bgColor} ${submitted ? "cursor-default" : "hover:border-stone-400 cursor-pointer"}`}
            >
              <span className="font-semibold mr-2 text-stone-400">
                {choice.label}.
              </span>
              <MathText text={choice.text} />
            </button>
          );
        })}
      </div>

      {!submitted && (
        <div className="flex items-center gap-3">
          <button
            onClick={handleSubmit}
            disabled={selected.size === 0}
            className="font-sans text-sm px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            Check Answer
          </button>
          {problem.hint && !showHint && (
            <button
              onClick={() => setShowHint(true)}
              className="font-sans text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
            >
              Show Hint
            </button>
          )}
        </div>
      )}

      {showHint && !submitted && problem.hint && (
        <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-md text-sm text-amber-800">
          <span className="font-sans font-semibold">Hint: </span>
          <MathText text={problem.hint} />
        </div>
      )}

      {submitted && (
        <div
          className={`mt-4 p-4 rounded-md border ${isCorrect ? "bg-green-50 border-green-300" : "bg-red-50 border-red-300"}`}
        >
          <div className={`font-sans font-semibold text-sm mb-2 ${isCorrect ? "text-green-700" : "text-red-700"}`}>
            {isCorrect ? "Correct!" : "Not quite."}
          </div>
          <div className="text-sm text-stone-700">
            <MathText text={problem.explanation} />
          </div>
          <button
            onClick={handleReset}
            className="mt-3 font-sans text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}
