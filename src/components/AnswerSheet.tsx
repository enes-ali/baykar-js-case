import { QuestionsType } from "../repo/questions";
import OptionLetter from "./OptionLetter";

interface AnswerSheetProps {
  questions: QuestionsType;
  answers: number[];
}

export default function AnswerSheet({ questions, answers }: AnswerSheetProps) {
  return (
    <main className="flex flex-col gap-4 card">
      <h2 className="text-2xl text-center font-bold">Your Answers</h2>

      {Array(10)
        .fill(0)
        .map((_, questionIndex) => {
          const actualAnswer = questions![questionIndex].answer;
          const usersAnswer = answers[questionIndex];

          return (
            <div className="flex gap-2">
              <p className="font-bold w-7">{questionIndex + 1}-)</p>

              {["A", "B", "C", "D"].map((letter, letterIndex) => (
                <OptionLetter
                  answerResult={
                    letterIndex === usersAnswer
                      ? actualAnswer === usersAnswer
                        ? "correct"
                        : "incorrect"
                      : letterIndex === actualAnswer
                      ? "actual"
                      : undefined
                  }
                >
                  {letter}
                </OptionLetter>
              ))}
            </div>
          );
        })}
    </main>
  );
}
