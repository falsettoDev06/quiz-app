import { createContext, useContext, useState, useEffect, useRef } from "react";

const QuizContext = createContext();

export const useQuizContext = () => useContext(QuizContext);

export const QuizProvider = ({ children }) => {
  //Quizes states
  const [easyQuiz, setEasyQuiz] = useState([]);


  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [highest, setHighest] = useState(0);
  const [counter, setCounter] = useState(0);
  const [randomIndex, setRandomIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const setRevealTrue = () => setReveal(true);
  const setRevealFalse = () => setReveal(false);
  const [reveal, setReveal] = useState(false);

  //Stopwatch states
  const [smallTimer, setSmallTimer] = useState(30);
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(null);


  useEffect(() => {
    if (reveal) return;
    const startTime = Date.now();

    const timer = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const remaining = 30 - elapsed;

      if (remaining <= 0) {
        setCounter((c) => (c === 9 ? c : c + 1));
        setSmallTimer(30);
        setRevealFalse();
      } else {
        setSmallTimer(remaining);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [counter, reveal, setReveal]);

  const reduceCounter = () => {
    setRevealFalse();
    setCounter((prev) => (prev === 0 ? prev : prev - 1));
  };
  const addCounter = () => {
    setRevealFalse();
    randomizeQuestion();
    setCounter((prev) => (prev === 9 ? prev : prev + 1));
  };

  //Stopwatch
  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now() - elapsedTime;
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    } else {
      clearInterval(intervalIdRef.current);
    }
  }, [isRunning]);
  const formatTime = () => {
    const minutes = Math.floor(counter / 60);
    const seconds = counter % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };
  const padZero = (num) => {
    return (num < 10 ? "0" : "") + num;
  };
  const handleStart = () => {
    setIsRunning(true);
  };
  const handleStop = () => {
    setIsRunning(false);
  };
  const handleReset = () => {
    setIsRunning(false);
    setElapsedTime(0);
  };

  //easy mode quiz
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch("/easyQuestions.json");
        const data = await response.json();
        setEasyQuiz(data);
        setRandomIndex(Math.floor(Math.random() * data.length));
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false); // Only set to false when data is actually ready
      }
    };
    loadData();
  }, []);

  const randomizeQuestion = () => {
    if (easyQuiz && easyQuiz.length > 0) {
      const nextIndex = Math.floor(Math.random() * easyQuiz.length);
      setRandomIndex(nextIndex);
    }
  };
  const value = {
    setScore,
    setRevealTrue,
    setRevealFalse,
    reduceCounter,
    addCounter,
    setCounter,
    score,
    reveal,
    counter,
    smallTimer,
    isRunning,
    formatTime,
    handleStart,
    handleStop,
    handleReset,
    easyQuiz,
    randomizeQuestion,
    randomIndex,
    isLoading,
    setCorrect,
    setIncorrect,
    correct,
    incorrect,
    highest,
    setHighest,
  };
  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};
