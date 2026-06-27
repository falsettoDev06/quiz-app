import { useNavigate } from "react-router-dom";
import { useQuizContext } from "../context/QuizContext";

function DifficultyCard({ difficulty }) {
  const { quiz, timer, ui } = useQuizContext();
  const navigate = useNavigate();

  const config = {
    easy: {
      border: "border-green-400",
      bg: "bg-green-400/20",
      text: "text-success",
      icon: "fa-leaf",
      numberOfQuestions: 10,
      message: "Basic lang to saindo promise.",
    },
    medium: {
      border: "border-yellow-400",
      bg: "bg-yellow-400/20",
      text: "text-warning",
      icon: "fa-bolt",
      numberOfQuestions: 25,
      message: "Slight lang ang sakit.",
    },
    hard: {
      border: "border-red-400",
      bg: "bg-red-400/20",
      text: "text-error",
      icon: "fa-fire",
      numberOfQuestions: 50,
      message: "Iyah maurag ka bagay kaya mo ini.",
    },
    impossible: {
      border: "border-purple-400",
      bg: "bg-purple-400/20",
      text: "text-purple-400",
      icon: "fa-skull",
      numberOfQuestions: 100,
      message: "Arog kang maging kamo ni LANS.",
    },
  };

  const safeDifficulty = config[difficulty] ? difficulty : "easy";
  const { border, bg, text, icon, numberOfQuestions, message } = config[safeDifficulty];

  const handleDifficulty = () => {
    ui.setCounter(0);
    ui.setRevealFalse();
    quiz.setDifficulty(safeDifficulty);
    timer.handleReset();
    navigate("/quizplay");
  };

  return (
    <div
      onClick={handleDifficulty}
      className={`card flex flex-row justify-between items-center p-4 rounded-2xl w-90 h-30 border-3 ${border} ${bg} cursor-pointer lg:w-113 lg:h-40 lg:p-6`}
    >
      <div className="flex flex-row items-center gap-3">
        <div className={`w-15 h-15 rounded-full border flex items-center justify-center ${border} ${bg} lg:w-20 lg:h-20`}>
          <i className={`fa-solid ${icon} ${text} text-3xl lg:text-4xl`}></i>
        </div>

        <div className="flex flex-col justify-center">
          <h1 className={`text-xl font-bold uppercase ${text} lg:text-2xl`}>
            {safeDifficulty}
          </h1>
          <p className={`text-sm font-semibold ${text} lg:text-base`}>
            {numberOfQuestions} Questions
          </p>
          <p className="text-xs text-base-content/70 lg:text-sm">{message}</p>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <div className={`w-10 h-10 rounded-full border flex items-center justify-center ${border} ${bg} lg:w-14 lg:h-14`}>
          <i className={`fa-solid fa-angle-right ${text} text-3xl lg:text-4xl`}></i>
        </div>
      </div>
    </div>
  );
}

export default DifficultyCard;