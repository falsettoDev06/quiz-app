import { useState } from "react";
import { useQuizContext } from "../context/QuizContext";

function Button({ option, correct }) {
  const { score, setScore, reveal, setRevealTrue } = useQuizContext();
  const [status, setStatus] = useState("idle");
  function handleClick() {
    if (reveal) return;
    if (option === correct) {
      setStatus("correct");
      setScore((prevScore) => prevScore + 1);
    } else {
      setStatus("incorrect");
      setScore((prevScore) => (prevScore <= 0 ? prevScore : prevScore - 1));
    }
    setRevealTrue();
  }
  function getStatusColor() {
    const base =
      "w-200 h-25 border-4 border-primary rounded-4xl font-bold cursor-pointer my-2 text-3xl hover:scale-105 duration-100";
    if (reveal) {
      if (correct === option) {
        return (
          base.replace("border-primary", "") +
          " border-8 border-green-500 text-green-700"
        );
      } else {
        return (
          base.replace("border-primary", "") +
          " border-8 border-red-500 text-red-700"
        );
      }
    }
    return base;
  }
  return (
    <button className={getStatusColor()} onClick={handleClick}>
      {option}
    </button>
  );
}

export default Button;
