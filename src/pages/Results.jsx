import { useEffect } from "react";
import { useQuizContext } from "../context/QuizContext";
import { useNavigate } from "react-router-dom";

function Results() {
  // Destructuring using your new grouped structure
  const { stats, ui, timer, quiz } = useQuizContext();
  const navigate = useNavigate();

  const handlePlayAgain = () => {
    ui.setCounter(0);
    ui.setRevealFalse();
    stats.setScore(0);
    timer.handleReset();
    navigate("/difficulties");
  };

  useEffect(() => {
    if (stats.score > stats.highest) {
      stats.setHighest(stats.score);
    }
  }, [stats.score, stats.highest]);

  const difficultyText = quiz.difficulty;
  const difficultyColor = {
    easy: "text-success",
    medium: "text-warning",
    hard: "text-error",
    impossible: "text-purple-400",}
  
  const formattedDifficulty = difficultyText.charAt(0).toUpperCase() + difficultyText.slice(1);

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-base-200">
      <div className="card w-90 lg:w-96 bg-base-100 shadow-xl p-6 lg:p-10 items-center text-center">
        <h1 className="text-4xl lg:text-6xl font-extrabold text-primary mb-2 lg:mb-4">
          Result
        </h1>

        <div className="my-4 lg:my-8">
          <p className="text-lg lg:text-2xl text-base-content/70">
            Your Final Score
          </p>
          <h2 className="text-8xl lg:text-8xl font-black text-primary">
            {stats.score}
          </h2>
        </div>

        <div className="w-full flex flex-col gap-2 my-4 lg:my-6">
          <div className="flex justify-between w-full text-lg items-center lg:text-2xl text-base-content/70">
            <span>Difficulty:</span>
            <span
              className={`font-bold ${difficultyColor[difficultyText]} text-3xl`}
            >
              {formattedDifficulty}
            </span>
          </div>
          <div className="flex justify-between w-full text-lg items-center lg:text-2xl text-base-content/70">
            <span>Highest Score:</span>
            <span className="font-bold text-base-content text-3xl">
              {stats.highest}
            </span>
          </div>
          <div className="flex justify-between w-full text-lg items-center lg:text-2xl text-base-content/70">
            <span>Incorrect:</span>
            <span className="font-bold text-error text-3xl">
              {stats.incorrect}
            </span>
          </div>
          <div className="flex justify-between w-full text-lg items-center lg:text-2xl text-base-content/70">
            <span>Correct:</span>
            <span className="font-bold text-success text-3xl">
              {stats.correct}
            </span>
          </div>
          <div className="flex justify-between items-center w-full text-lg lg:text-2xl text-base-content/70">
            <span>Time taken:</span>
            <span className="font-bold text-secondary text-3xl">
              {timer.formatTime()}
            </span>
          </div>
        </div>

        <p className="text-lg font-medium text-base-content/50 mb-4 lg:mb-8">
          Ready to test your knowledge again?
        </p>

        <button
          className="btn btn-primary lg:btn-lg lg:w-72 w-50 lg:h-20 h-15 rounded-full lg:text-3xl text-2xl shadow-xl transition-transform hover:scale-105"
          onClick={handlePlayAgain}
        >
          Play Again
        </button>
      </div>
    </div>
  );
}

export default Results;
