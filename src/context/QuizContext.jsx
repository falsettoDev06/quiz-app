import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";

const QuizContext = createContext();
export const useQuizContext = () => useContext(QuizContext);

export const QuizProvider = ({ children }) => {
  const [quizData, setQuizData] = useState([]);
  const [randomIndex, setRandomIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [difficulty, setDifficulty] = useState("easy");

  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [highest, setHighest] = useState(0);

  const [reveal, setReveal] = useState(false);
  const [counter, setCounter] = useState(0);
  const setRevealTrue = () => setReveal(true);
  const setRevealFalse = () => setReveal(false);

  const [smallTimer, setSmallTimer] = useState(30);
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(null);

  const getLimit = useCallback((diff) => {
    switch (diff) {
      case "easy":
        return 10;
      case "medium":
        return 25;
      case "hard":
        return 50;
      case "impossible":
        return 100;
      default:
        return 10;
    }
  }, []);

  const limit = getLimit(difficulty);

  const addCounter = useCallback(() => {
    setRevealFalse();
    setSmallTimer(30);
    setCounter((prev) => {
      if (prev >= limit - 1) {
        setIsRunning(false);
        return prev;
      }
      return prev + 1;
    });
    setRandomIndex(Math.floor(Math.random() * quizData.length));
  }, [limit, quizData]);
  useEffect(() => {
    if (reveal || counter >= limit - 1) return;

    const timer = setInterval(() => {
      setSmallTimer((prev) => {
        if (prev <= 1) {
          addCounter();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [counter, reveal, limit, addCounter]);

  useEffect(() => {
    if (counter >= limit - 1) {
      setIsRunning(false);
      return;
    }

    if (isRunning) {
      startTimeRef.current = Date.now() - elapsedTime;
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    } else {
      clearInterval(intervalIdRef.current);
    }
    return () => clearInterval(intervalIdRef.current);
  }, [isRunning, counter, limit]);

  const formatTime = () => {
    const totalSeconds = Math.floor(elapsedTime / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleStart = () => setIsRunning(true);
  const handleStop = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setElapsedTime(0);
    setSmallTimer(30);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/${difficulty}Questions.json`);
        const data = await response.json();
        setQuizData(data);
        setRandomIndex(Math.floor(Math.random() * data.length));
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [difficulty]);

  const value = {
    quiz: {
      quizData,
      setDifficulty,
      difficulty,
      randomIndex,
      isLoading,
      getLimit,
    },
    stats: {
      score,
      setScore,
      correct,
      setCorrect,
      incorrect,
      setIncorrect,
      highest,
      setHighest,
    },
    ui: {
      reveal,
      setRevealTrue,
      setRevealFalse,
      counter,
      setCounter,
      addCounter,
    },
    timer: {
      smallTimer,
      isRunning,
      formatTime,
      handleStart,
      handleStop,
      handleReset,
    },
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};
