import { useState } from "react";
import { useQuizContext } from "../context/QuizContext";

function Button({ option, correct }) {
  const { stats, ui } = useQuizContext();
  
  const [status, setStatus] = useState("idle");

  function handleClick() {
    if (ui.reveal) return;
    if (option === correct) {
      setStatus("correct");
      stats.setScore((prevScore) => prevScore + 1);
      stats.setCorrect((prevCorrect) => prevCorrect + 1);
    } else {
      setStatus("incorrect");
      stats.setIncorrect((prevIncorrect) => prevIncorrect + 1);
    }
    ui.setRevealTrue();
  }

  function getStatusColor() {
    const base =
      "w-85 h-15 lg:w-200 lg:h-25 rounded-2xl lg:rounded-4xl font-bold cursor-pointer my-2 text-xl lg:text-3xl transition-transform hover:scale-105 duration-100";
    if (!ui.reveal) {
      return `${base} border-2 lg:border-4 border-primary`;
    }

    const isCorrect = correct === option;
    const colorClass = isCorrect
      ? "border-green-500 text-green-700"
      : "border-red-500 text-red-700";

    return `${base} border-4 lg:border-8 ${colorClass}`;
  }

  return (
    <button className={getStatusColor()} onClick={handleClick}>
      {option}
    </button>
  );
}

export default Button;