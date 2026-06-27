import { useEffect } from "react";
import { useQuizContext } from "../context/QuizContext";
import Button from "./Button";

function QuizCard() {
  const { quiz, timer, ui } = useQuizContext();

  // Hooks must run unconditionally (Rules of Hooks)
  useEffect(() => {
    const currentQuestion = quiz.quizData?.[quiz.randomIndex];
    if (!currentQuestion) return;

    if (timer.smallTimer === 0 && !ui.reveal) {
      ui.addCounter();
    }
  }, [
    timer.smallTimer,
    ui.reveal,
    ui.addCounter,
    quiz.quizData,
    quiz.randomIndex,
  ]);

  if (quiz.isLoading || !quiz.quizData[quiz.randomIndex]) {
    return <span className="text-2xl">Still loading</span>;
  }

  const currentQuestion = quiz.quizData[quiz.randomIndex];

  return (
    <div className="card bg-base-100 shadow-xl items-center text-center w-90 h-auto lg:w-270 lg:h-187 py-10 lg:p-16 flex flex-col justify-start lg:justify-between">
      <p className="text-2xl h-20 lg:text-5xl lg:h-27 lg:max-h-35 text-center">
        {currentQuestion.question}
      </p>
      <div className="flex flex-col justify-center items-center py-3 lg:py-6">
        {currentQuestion.options.map((option, i) => (
          <Button option={option} key={i} correct={currentQuestion.correct} />
        ))}
      </div>
    </div>
  );
}

export default QuizCard;
