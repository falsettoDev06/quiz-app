import { useState } from "react";
import Button from "./Button";
import { useQuizContext } from "../context/QuizContext";

function QuizCard() {
  const { isLoading, easyQuiz, randomIndex } = useQuizContext();
  if (isLoading || !easyQuiz[randomIndex])
    return <span className="text-2xl">Still loading</span>;

  const currentQuestion = easyQuiz[randomIndex];

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
