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
        <h1 className="lg:text-9xl text-6xl font-black text-primary mb-6 drop-shadow-md">
          Quiz Time
        </h1>
        <p className="lg:text-xl text-lg text-base-content/70 lg:mb-12 mb-6">
          Test your knowledge, challenge yourself, and aim for the top score.
          Are you ready to begin your journey?
        </p>

        <button
          className="btn btn-primary lg:btn-lg lg:w-72 w-50 lg:h-20 h-15 rounded-full lg:text-3xl text-2xl shadow-xl transition-transform hover:scale-105"
          onClick={handleStartBtn}
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
}

export default Welcome;
