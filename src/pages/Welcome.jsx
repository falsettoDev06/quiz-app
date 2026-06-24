import { useNavigate } from "react-router-dom";
import { useQuizContext } from "../context/QuizContext";

function Welcome() {
  const { handleStart } = useQuizContext();
  const navigate = useNavigate();
  const handleStartBtn = () => {
    handleStart();
    navigate("/quizplay");
  };
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen bg-base-200">
      <div className="text-center max-w-2xl px-6">
        <h1 className="text-8xl font-black text-primary mb-6 drop-shadow-md">
          Quiz Time
        </h1>

        <p className="text-xl text-base-content/70 mb-12">
          Test your knowledge, challenge yourself, and aim for the top score.
          Are you ready to begin your journey?
        </p>

        <button
          className="btn btn-primary btn-lg w-72 h-20 rounded-full text-3xl shadow-xl transition-transform hover:scale-105"
          onClick={handleStartBtn}
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
}

export default Welcome;
