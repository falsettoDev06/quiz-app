import { useState } from "react";
import QuizCard from "../components/QuizCard";
import { useQuizContext } from "../context/QuizContext";
import { Link } from "react-router-dom";
function QuizPlay() {
  const { setRevealTrue, reduceCounter, addCounter, counter, reveal } =
    useQuizContext();
  return (
    <div className="relative">
      <div className={reveal ? "blur-sm" : ""}>
        <div className="flex flex-row justify-center items-center px-25 h-screen">
          <div
            className="h-50 w-50 border-8 border-red-500 rounded-4xl flex justify-center items-center shadow-2xl hover:scale-110 duration-100 cursor-pointer mx-15"
            onClick={reduceCounter}
          >
            <i className="fa-regular fa-hand-point-left text-8xl text-red-600"></i>
          </div>
          <QuizCard />
          <div
            className="h-50 w-50 rounded-4xl border-8 border-green-500 flex items-center justify-center shadow-2xl hover:scale-110 duration-100 cursor-pointer mx-15"
            onClick={addCounter}
          >
            <i className="fa-regular fa-hand-point-right text-8xl text-green-500"></i>
          </div>
        </div>
      </div>
      {reveal && <Link to="/results"><button className="bg-blue-500 border-8 border-solid border-blue-700 h-25 w-100 rounded-4xl text-4xl text-white font-bold py-2 px-4 rounded mt-10 cursor-pointer hover:scale-110 duration-100 absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">Result</button></Link>}
    </div>
  );
}

export default QuizPlay;
