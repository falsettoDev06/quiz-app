import {useQuizContext} from "../context/QuizContext";
import ModeCard from "../components/ModeCard";
function Mode(){

  return(
    <div className="flex flex-col justify-evenly py-5 bg-base-200 min-h-screen">
      <div className="text-center">
        <h1 className="lg:text-9xl text-4xl font-bold text-primary m-3  drop-shadow-md">Choose a Mode</h1>
        <p className="text-lg text-base-content/50">Select a mode that matches  <br></br> your challenge
        </p>
      </div>
      <div className="flex flex-col gap-3 items-center p-2">
        <ModeCard mode="Easy"></ModeCard>
        <ModeCard mode="Medium"></ModeCard>
        <ModeCard mode="Hard"></ModeCard>
        <ModeCard mode="Impossible"></ModeCard>
      </div>
      <div className="flex justify-center">
        <div className="flex p-3 w-75 h-25 bg-base-100">
          <div>

          </div>
          <div>

          </div>
          <div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Mode