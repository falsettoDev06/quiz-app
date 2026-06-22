import { useState } from "react";
import QuizCard from "../components/QuizCard";
function QuizPlay() {
  return (
    <div>
      <div className="flex flex-col justify-center items-center p-25 mb-9">
        <h1 className="font-bold text-9xl">Quiz Play</h1>
      </div>
      <div className="flex flex-col justify-center items-center">
        <QuizCard/>
      </div>
    </div>
  );
}

export default QuizPlay;
