import { useState } from "react";
import { useQuizContext } from "../context/QuizContext";
function Button({ option, correct,}) {
  const { score, setScore, reveal, setRevealTrue} = useQuizContext();
  const [status, setStatus] = useState("idle");
  function handleClick() {
    if (reveal) return;
    if (option === correct) {
      setStatus("correct");
      setScore(prevScore => prevScore + 1);
    } else {
      setStatus("incorrect");
      setScore(prevScore => prevScore <= 0? prevScore : prevScore - 1);
    }
    setRevealTrue();
  }
  function getStatusColor(currentStatus, reveal) {
    const base =
      "w-200 h-25 border-4 border-primary rounded-4xl font-bold cursor-pointer my-2 text-3xl hover:scale-105 duration-100";
    if (reveal) {
      return `${base} ${correct === option ? "bg-green-200 border-8 border-solid border-green-400 text-black" : "bg-red-500 border-8 border-solid border-red-700 text-white"}`;
    }else if (!reveal){
      return base
    }
    else if (currentStatus === "idle") {
      return base;
    } else if (currentStatus === "correct") {
      return `${base} bg-green-200 border-8 border-solid border-green-400 text-black`;
    } else if (currentStatus === "incorrect") {
      return `${base} bg-red-500 border-8 border-solid border-red-700 text-white`;
    }
  }
  return (
    <button className={getStatusColor(status, reveal)} onClick={handleClick}>
      {option}
    </button>
  );
}

export default Button;
