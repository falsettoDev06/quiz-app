import {createContext, useContext, useState} from "react";

const QuizContext = createContext();

export const useQuizContext = () => useContext(QuizContext);

export const QuizProvider = ({children}) => {
  const [score, setScore] = useState(0);
  const [reveal, setReveal] = useState(false);
  const revealAnswer = () => {
    setReveal(true);
  }
  const value = {
    score,
    setScore,
    reveal,
    setReveal,
    revealAnswer
  }
  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  )
}