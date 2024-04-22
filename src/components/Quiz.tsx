import classNames from "classnames";
import { useCountdown } from "../hooks/Countdown";
import { useEffect, useState } from "react";
import type { QuestionsType } from "../repo/questions";
import Question from "./Question";

interface QuizProps {
  questions: QuestionsType;
  onFinish?: (answers: number[]) => any;
}

export default function Quiz({ questions, onFinish }: QuizProps) {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const { countdown, isCountdownComplete, startCountdown } = useCountdown({
    startFrom: 30,
    startImmediately: true,
  });

  const nextQuestion = () => {
    if (activeQuestion + 1 < 10) {
      setActiveQuestion(activeQuestion + 1);
      startCountdown();
    } else {
      onFinish?.(answers);
    }
  };

  useEffect(() => {
    if (isCountdownComplete) nextQuestion();
  }, [isCountdownComplete]);

  return (
    <main className="card w-full max-w-[450px] min-h-[350px] flex flex-col">
      <div className="border-b flex justify-between items-center">
        <p className="leading-8 font-bold">Question {activeQuestion + 1}/10</p>

        <p
          className={classNames(
            "transition-colors",
            {
              "text-[#d3840c]": countdown > 19,
            },
            { "text-[#20af00]": countdown <= 19 && countdown > 5 },
            { "text-[#af0000]": countdown <= 5 }
          )}
        >
          {countdown}
        </p>
      </div>

      <form
        onChange={(e) => {
          const answersCopy: number[] = [...answers];
          answersCopy[activeQuestion] = Number(
            (e.target as HTMLInputElement).value
          );

          setAnswers(answersCopy);
        }}
      >
        {questions ? (
          <Question
            disabled={countdown > 19}
            question={questions[activeQuestion]!.question}
            options={questions[activeQuestion]!.options}
            usersAnswer={answers[activeQuestion]}
          />
        ) : undefined}
      </form>

      <button
        onClick={nextQuestion}
        className="bg-black rounded-lg px-4 py-2 text-white"
      >
        {activeQuestion === 9
          ? "Finish Test"
          : answers[activeQuestion] !== undefined
          ? "Save Answer"
          : "Skip Question"}
      </button>
    </main>
  );
}
