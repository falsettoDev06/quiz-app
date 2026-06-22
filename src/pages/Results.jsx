import { useQuizContext } from "../context/QuizContext";
import { Link } from "react-router-dom";
function Results() {
  const { score } = useQuizContext();
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="h-250 w-250 border-15 border-blue-500 rounded-4xl shadow-2xl flex flex-col justify-start items-center">
        <h1 className="text-9xl font-bold text-blue-600 my-15">Results</h1>
        <h1 className="text-7xl font-bold text-blue-600 my-15">
          Score: {score}
        </h1>
        <p className="text-2xl font-bold text-gray-400">Want to play again?</p>
        <Link to="/quizplay">
          <button className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded-4xl w-75 h-24 text-4xl cursor-pointer">
            Play Again
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Results;
