import { useState } from "react";
import QuizCard from "../components/QuizCard";
import { useQuizContext } from "../context/QuizContext";
import { Link } from "react-router-dom";
function QuizPlay() {
  const { setRevealTrue, reduceCounter, addCounter, counter, reveal } =
    useQuizContext();
  return (
    <div className="relative">
      <div className={reveal && counter === 9 ? "blur-sm" : ""}>
        <div className="flex flex-row justify-center items-center px-25 h-screen">
          <div
            className="h-50 w-50 border-8 border-red-500 rounded-4xl flex justify-center items-center shadow-2xl hover:scale-110 duration-100 cursor-pointer mx-15"
            onClick={reduceCounter}
          >
            <i className="fa-regular fa-hand-point-left text-8xl text-red-600"></i>
          </div>
          <div className="flex flex-col justify-center items-center h-screen">
            <QuizCard />
          <div className="w-auto h-25 m-3 flex justify-center items-center">
            <progress className="progress progress-primary w-250 h-4 my-3 transition-all duration-500 ease-in-out" value={(counter + 1) * 10} max="100"></progress>
          </div>
          </div>
          <div
            className="h-50 w-50 rounded-4xl border-8 border-green-500 flex items-center justify-center shadow-2xl hover:scale-110 duration-100 cursor-pointer mx-15"
            onClick={addCounter}
          >
            <i className="fa-regular fa-hand-point-right text-8xl text-green-500"></i>
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
