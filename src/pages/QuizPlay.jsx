import { useState } from "react";
import QuizCard from "../components/QuizCard";
import { useQuizContext } from "../context/QuizContext";
const questions = [
  {
    id: 1,
    question: "Who is the first president of the United States?",
  },
];

const answers = [
  {
    id: 1,
    correct: "George Washington",
    options: ["John Adams", "Thomas Jefferson", "James Madison", "George Washington"],
  }
]

function QuizPlay() {
  const {score} = useQuizContext();
  
  return (
    <div>
      <div className="flex flex-row justify-between items-center p-10 mb-9">
        <h1 className="font-bold text-7xl text-blue-600">QUIZ ni BRON</h1>
        <h2 className="font-bold text-3xl">Score{score}</h2>
      </div>
      <div className="flex flex-col justify-center items-center">
        <QuizCard questions={questions} answers={answers} score={score}/>
      </div>
    </div>
  );
}

export default QuizPlay;
