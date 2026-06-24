import { useEffect, useState } from "react";
import QuizCard from "../components/QuizCard";
import { useQuizContext } from "../context/QuizContext";
import { useNavigate } from "react-router-dom";

function QuizPlay() {
  const {
    addCounter,
    counter,
    reveal,
    smallTimer,
    handleStop,
    handleStart,
    isRunning,
  } = useQuizContext();

  const handleCountdownColor = () => {
    const base = "font-bold text-7xl transition-all duration-500 ease-in-out";
    if (smallTimer <= 10) {
      return base + " text-red-500 scale-110";
    }
    return base + " text-white";
  };

  const navigate = useNavigate();
  const handleShowResultBtn = () => {
    navigate("/results");
  };

  useEffect(() => {
    if (counter === 0 && !reveal && !isRunning) {
      handleStart();
    }
    if (counter === 9 && reveal) {
      handleStop();
    }
  }, [counter, reveal, handleStop, handleStart]);

  return (
    <div className="relative">
      <div className={reveal && counter === 9 ? "blur-sm" : ""}>
        <div className="flex flex-row justify-center items-center px-25 h-screen">
          <div className="h-50 w-50 rounded-4xl border-8 border-green-500 mx-15 invisible"></div>
          <div className="flex flex-col justify-center items-center h-screen">
            <p className={handleCountdownColor()}>{smallTimer}</p>
            <QuizCard />
            <div className="w-auto h-25 m-3 flex justify-center items-center">
              <progress
                className="progress progress-primary w-250 h-4 my-3 transition-all duration-500 ease-in-out"
                value={(counter + 1) * 10}
                max="100"
              ></progress>
            </div>
          </div>
          <div
            className={`h-50 w-50 rounded-4xl border-8 border-green-500 flex items-center justify-center shadow-2xl hover:scale-110 duration-100 cursor-pointer mx-15 ${!reveal ? "invisible" : ""}`}
            onClick={addCounter}
          >
            <i className="fa-solid fa-caret-right text-8xl text-green-500"></i>
          </div>
        </div>
      </div>
      {reveal && counter === 9 && (
        <button
          className="btn btn-primary btn-lg w-72 h-20 rounded-full text-3xl shadow-xl transition-transform hover:scale-105 absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          onClick={handleShowResultBtn}
        >
          Result
        </button>
      )}
    </div>
  );
}

export default QuizPlay;
