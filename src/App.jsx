import "./App.css";
import { Routes, Route } from "react-router-dom";

//pages
import Welcome from "./pages/Welcome";
import Results from "./pages/Results";
import QuizPlay from "./pages/QuizPlay";

//context
import { QuizProvider } from "./context/QuizContext";

function App() {
  return (
    <div className="App">
      <QuizProvider>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/quizplay" element={<QuizPlay />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </QuizProvider>
    </div>
  );
}

export default App;
