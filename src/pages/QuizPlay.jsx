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
    const base =
      "font-bold text-5xl lg:text-7xl transition-all duration-500 ease-in-out";
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
    <div className="relative bg-base-200">
      <div className={reveal && counter === 9 ? "blur-sm" : ""}>
        <div className="flex flex-col justify-evenly items-center min-h-screen">
          <div className="flex py-10">
            <i className="fa-solid fa-stopwatch text-5xl lg:text-7xl flex items-center"></i>
            <p className={handleCountdownColor()}>{smallTimer}</p>
          </div>
          <QuizCard />
          <button
            className={`btn btn-accent btn-md lg:btn-lg w-80 h-15 my-2 lg:h-18 lg:w-100 rounded-full text-3xl shadow-xl transition-transform hover:scale-105 duration-100 ease-in-out ${!reveal || counter === 9 ? "invisible" : ""}`}
            onClick={addCounter}
          >
            Next
          </button>
          <progress
            className="progress progress-primary h-4 my-3 transition-all duration-500 ease-in-out w-[90%] lg:w-200"
            value={(counter + 1) * 10}
            max="100"
          ></progress>
        </div>
      </div>
      {reveal && counter === 9 && (
        <button
          className="btn btn-primary lg:btn-lg lg:w-72 w-50 lg:h-20 h-15 rounded-full lg:text-3xl text-2xl shadow-xl transition-transform hover:scale-105 absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          onClick={handleShowResultBtn}
        >
          Result
        </button>
      )}
    </div>
  );
}

export default QuizPlay;
