import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QuizCard from "../components/QuizCard";
import { useQuizContext } from "../context/QuizContext";

function QuizPlay() {
  const { stats, ui, timer, quiz } = useQuizContext();
  const [showResultBtn, setShowResultBtn] = useState(false);
  const navigate = useNavigate();

  const handleQuitBtn = () => {
    ui.setCounter(0);
    ui.setRevealFalse();
    stats.setScore(0);
    timer.handleReset();
    navigate("/difficulties");
  };

  const limit = quiz.getLimit(quiz.difficulty);
  const progressBarValue = ((ui.counter + 1) / limit) * 100;
  const isLastQuestion = ui.counter === limit - 1;

  useEffect(() => {
    if (ui.counter === 0 && !ui.reveal && !timer.isRunning) timer.handleStart();
    if (isLastQuestion && ui.reveal) {
      timer.handleStop();
      setShowResultBtn(true);
      ui.setRevealTrue();
    }
  }, [ui.counter, ui.reveal, isLastQuestion, timer.isRunning, timer.handleStart, timer.handleStop]);

  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center py-6 px-4">
      <div className={showResultBtn ? "blur-sm transition-all w-full flex flex-col items-center" : "w-full flex flex-col items-center"}>
        
        <div className="w-full max-w-4xl flex justify-between items-center mb-6">
          <button className="btn btn-circle btn-ghost" onClick={handleQuitBtn}>
            <i className="fa-solid fa-arrow-left text-xl"></i>
          </button>
          
          <div className="flex flex-col items-end gap-0.5">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg">{timer.smallTimer}s</span>
              <i className="fa-solid fa-stopwatch text-primary"></i>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-primary">{stats.score}</span>
              <span className="text-sm font-bold uppercase opacity-50">Score</span>
            </div>
            <div className="text-sm font-semibold opacity-70 mt-1">
              Q: {ui.counter + 1} / {limit}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center w-full max-w-4xl">
          <QuizCard />

          <button
            className={`btn btn-accent btn-lg w-full max-w-sm mt-10 rounded-full text-xl shadow-xl transition-all ${
              !ui.reveal || isLastQuestion ? "invisible" : ""
            }`}
            onClick={ui.addCounter}
          >
            Next
          </button>

          <progress
            className={`progress progress-primary h-4 w-full max-w-lg mt-6 ${
              progressBarValue > 0 ? "transition-all duration-500" : ""
            }`}
            value={progressBarValue}
            max="100"
          ></progress>
        </div>
      </div>

      {showResultBtn && (
        <button
          className="btn btn-primary btn-lg rounded-full text-2xl shadow-xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 hover:scale-105"
          onClick={() => navigate("/results")}
        >
          See Results
        </button>
      )}
    </div>
  );
}

export default QuizPlay;