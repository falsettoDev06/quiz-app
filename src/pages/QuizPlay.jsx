import { useState } from "react";
import QuizCard from "../components/QuizCard";
import { useQuizContext } from "../context/QuizContext";
import { Link } from "react-router-dom";
function QuizPlay() {
  const { setRevealTrue, reduceCounter, addCounter, counter, reveal, useTimer, smallTimer } =
    useQuizContext();

  const handleCountdownColor = () => {
  const base = "font-bold text-7xl transition-all duration-500 ease-in-out";
  if (smallTimer <= 10) {
    return base + " text-red-500 scale-110";
  }
  return base + " text-white";
};
  return (
    <div className="relative">
      <div className={reveal && counter === 9 ? "blur-sm" : ""}>
        <div className="flex flex-row justify-center items-center px-25 h-screen">
          <div className="flex flex-col justify-center items-center h-screen">
            <p className={handleCountdownColor()}>{smallTimer}</p>
            <QuizCard />
          <div className="w-auto h-25 m-3 flex justify-center items-center">
            <progress className="progress progress-primary w-250 h-4 my-3 transition-all duration-500 ease-in-out" value={(counter + 1) * 10} max="100"></progress>
          </div>
          </div>
        </div>
      </div>
      {reveal && counter === 9 && <Link to="/results"><button className="btn btn-primary btn-lg w-72 h-20 rounded-full text-3xl shadow-xl transition-transform hover:scale-105 absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
            Result
          </button></Link>}
    </div>
  );
}

export default QuizPlay;
