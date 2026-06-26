import { useQuizContext } from "../context/QuizContext";
import DifficultyCard from "../components/DifficultyCard";

function Difficulties() {
  return (
    <div className="flex flex-col justify-evenly py-5 bg-base-200 min-h-screen">
      <div className="text-center">
        <h1 className="lg:text-9xl text-4xl font-bold text-primary m-3  drop-shadow-md">
          Choose a Difficulty
        </h1>
        <p className="text-lg text-base-content/50">
          Select a difficulty that matches <br></br> your challenge
        </p>
      </div>
      <div className="flex flex-col gap-3 items-center p-2">
        <DifficultyCard difficulty="easy"></DifficultyCard>
        <DifficultyCard difficulty="medium"></DifficultyCard>
        <DifficultyCard difficulty="hard"></DifficultyCard>
        <DifficultyCard difficulty="impossible"></DifficultyCard>
      </div>
      <div className="flex justify-center mt-6">
        <div className="flex items-center p-4 w-75 h-auto bg-base-200 border border-base-300 rounded-2xl shadow-sm">
          <div className="text-primary mr-3 text-xl">
            <i className="fa-solid fa-circle-info"></i>
          </div>

          <p className="text-sm font-medium text-base-content/70">
            You can always change the difficulty later.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Difficulties;
