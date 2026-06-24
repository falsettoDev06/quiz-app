import { useState } from "react";
import Button from "./Button";
import { useQuizContext } from "../context/QuizContext";

function QuizCard() {
  const { counter, quizData} = useQuizContext();
  return (
    <div className="card bg-base-100 shadow-xl items-center text-center w-270 h-187 p-16 flex flex-col justify-between">
      <p className="text-5xl h-30 max-h-35 text-center">
        {quizData[counter].id}. {quizData[counter].question}
      </p>
      <div className="flex flex-col justify-center items-center py-6">
        {quizData[counter].options.map((option, i) => (
          <Button
            option={option}
            key={i}
            correct={quizData[counter].correct}
          />
        ))}
      </div>
    </div>
  );
}

export default QuizCard;
