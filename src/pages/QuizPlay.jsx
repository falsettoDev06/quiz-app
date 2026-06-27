import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QuizCard from "../components/QuizCard";
import { useQuizContext } from "../context/QuizContext";

function QuizPlay() {
  const { stats, ui, timer, quiz } = useQuizContext();
  const [showResultBtn, setShowResultBtn] = useState(false);
  const [showQuitWarning, setShowQuitWarning] = useState(false);
  const navigate = useNavigate();

  const handleQuitBtn = () => {
    setShowQuitWarning(true);
  };

  const limit = quiz.getLimit(quiz.difficulty);
  const progressBarValue = ((ui.counter + 1) / limit) * 100;
  const isLastQuestion = ui.counter === limit - 1;

  useEffect(() => {
    if (ui.counter === 0 && !ui.reveal && !timer.isRunning) timer.handleStart();
    if (isLastQuestion && ui.reveal) {
      setShowResultBtn(true);
      ui.setRevealTrue();
    }
  }, [
    ui.counter,
    ui.reveal,
    isLastQuestion,
    timer.isRunning,
    timer.handleStart,
    timer.handleStop,
  ]);

  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center py-6 px-4">
      <div
        className={
          showResultBtn
            ? "blur-sm transition-all w-full flex flex-col items-center"
            : "w-full flex flex-col items-center"
        }
      >
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
              <span className="font-bold text-lg text-primary">
                {stats.score}
              </span>
              <span className="text-sm font-bold uppercase opacity-50">
                Score
              </span>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-base-300/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-base-100 p-8 rounded-3xl w-full max-w-sm text-center shadow-2xl border border-base-200 flex flex-col items-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <i className="fa-solid fa-trophy text-primary text-3xl"></i>
            </div>
            <h2 className="text-2xl font-bold mb-2">Quiz Finished!</h2>
            <p className="text-base-content/70 mb-8">
              You've completed all questions. Check your final score!
            </p>
            <button
              className="btn btn-primary w-full h-14 rounded-full text-lg shadow-lg hover:scale-105 transition-transform"
              onClick={() => navigate("/results")}
            >
              See Results
            </button>
          </div>
        </div>
      )}
      {showQuitWarning && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-base-100 p-8 rounded-3xl w-full max-w-sm text-center shadow-2xl border border-base-300">
            <i className="fa-solid fa-triangle-exclamation text-warning text-5xl mb-4"></i>
            <h2 className="text-2xl font-bold mb-2">Quit Quiz?</h2>
            <p className="text-base-content/70 mb-8">
              Your progress will be lost if you leave now.
            </p>

            <div className="flex flex-col gap-3">
              <button
                className="btn btn-error text-white w-full rounded-full"
                onClick={() => {
                  ui.setCounter(0);
                  ui.setRevealFalse();
                  stats.setScore(0);
                  timer.handleReset();
                  navigate("/difficulties");
                }}
              >
                Yes, Quit
              </button>
              <button
                className="btn btn-ghost w-full rounded-full"
                onClick={() => setShowQuitWarning(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuizPlay;
