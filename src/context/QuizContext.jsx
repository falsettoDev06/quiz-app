import { createContext, useContext, useState } from "react";

const QuizContext = createContext();

export const useQuizContext = () => useContext(QuizContext);
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
export const QuizProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [counter, setCounter] = useState(0);
  const setRevealTrue = () => setReveal(true);
  const setRevealFalse = () => setReveal(false);
  const [reveal, setReveal] = useState(false);
  const reduceCounter = () => {
    setRevealFalse();
    setCounter((prev) => (prev === 0 ? prev : prev - 1));
  };
  const addCounter = () => {
    setRevealFalse();
    setCounter((prev) => (prev === 9 ? prev : prev + 1));
  };
  const value = {
    setScore,
    setRevealTrue,
    setRevealFalse,
    reduceCounter,
    addCounter,
    score,
    counter,
    quizData,
    reveal,
    setCounter,
  };
  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};
