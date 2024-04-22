import { useEffect, useState } from "react";
import "./App.css";
import { QuestionsType, getQuestions } from "./repo/questions";
import Quiz from "./components/Quiz";
import AnswerSheet from "./components/AnswerSheet";

function App() {
  const [questions, setQuestions] = useState<QuestionsType>();
  const [answers, setAnswers] = useState<number[]>();

  useEffect(() => {
    (async () => setQuestions(await getQuestions()))();
  }, []);

  return (
    <div className="min-h-screen grid place-content-center px-4">
      {questions && !answers ? (
        <Quiz
          questions={questions}
          onFinish={(answers) => setAnswers(answers)}
        />
      ) : (
        <></>
      )}

      {answers ? (
        <AnswerSheet answers={answers} questions={questions} />
      ) : undefined}
    </div>
  );
}

export default App;
