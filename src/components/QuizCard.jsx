import { useState } from "react";
import Button from "./Button";
import { useQuizContext } from "../context/QuizContext";
function QuizCard() {
  const { counter, quizData} = useQuizContext();
  return (
    <div className="w-300 h-210 shadow-xl rounded-4xl p-16 flex flex-col justify-between">
      <p className="text-5xl h-30 max-h-35">
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
