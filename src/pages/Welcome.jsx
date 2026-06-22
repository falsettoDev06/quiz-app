import "../css/welcome.css";
import { Link } from "react-router-dom";
function Welcome() {
  return (
    <div className="flex justify-center items-center h-screen flex-col ">
      <h1 className="text-9xl font-bold text-blue-600 my-25">Welcome</h1>
      <Link to="/quizplay">
        <button className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded-4xl w-75 h-24 text-4xl cursor-pointer">
          Start
        </button>
      </Link>
    </div>
  );
}

export default Welcome;
