import { createContext, useContext, useState, useEffect, useRef } from "react";

const quizData = [
  {
    id: 1,
    question: "Which planet is known as the 'Red Planet'?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correct: "Mars",
  },
  {
    id: 2,
    question: "What is the only fruit that has its seeds on the outside?",
    options: ["Apple", "Strawberry", "Banana", "Pineapple"],
    correct: "Strawberry",
  },
  {
    id: 3,
    question: "Which animal is known as the 'Ship of the Desert'?",
    options: ["Camel", "Elephant", "Horse", "Donkey"],
    correct: "Camel",
  },
  {
    id: 4,
    question: "What is the smallest country in the world by land area?",
    options: ["Monaco", "Vatican City", "San Marino", "Malta"],
    correct: "Vatican City",
  },
  {
    id: 5,
    question: "Which superhero is known as the 'Caped Crusader'?",
    options: ["Superman", "Iron Man", "Batman", "Spider-Man"],
    correct: "Batman",
  },
  {
    id: 6,
    question: "What is the hardest natural substance on Earth?",
    options: ["Gold", "Iron", "Diamond", "Quartz"],
    correct: "Diamond",
  },
  {
    id: 7,
    question: "Which company is famous for the slogan 'Just Do It'?",
    options: ["Adidas", "Puma", "Nike", "Reebok"],
    correct: "Nike",
  },
  {
    id: 8,
    question: "How many hearts does an octopus have?",
    options: ["One", "Two", "Three", "Four"],
    correct: "Three",
  },
  {
    id: 9,
    question: "Which language has the most native speakers in the world?",
    options: ["English", "Spanish", "Mandarin Chinese", "Hindi"],
    correct: "Mandarin Chinese",
  },
  {
    id: 10,
    question: "What is the largest mammal to ever live?",
    options: ["African Elephant", "Blue Whale", "Giraffe", "Colossal Squid"],
    correct: "Blue Whale",
  },
];

const QuizContext = createContext();

export const useQuizContext = () => useContext(QuizContext);

export const QuizProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [counter, setCounter] = useState(0);

  const setRevealTrue = () => setReveal(true);
  const setRevealFalse = () => setReveal(false);
  const [reveal, setReveal] = useState(false);

  const [smallTimer, setSmallTimer] = useState(30);

  //Stopwatch states
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
    quizData,
    isRunning,
    formatTime,
    handleStart,
    handleStop,
    handleReset,
  };
  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};
