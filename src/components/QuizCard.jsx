import Button from "./Button";
import { useState } from "react";
//array of questions and answers

const questions = [
  {
    id: 1,
    question: "Who is the first president of the United States?",
  },
];

const answers = [
  {
    id: 1,
    correct: "George Washington",
    options: ["John Adams", "Thomas Jefferson", "James Madison", "George Washington"],
  }
]

function QuizCard() {
  const [counter, setCounter] = useState(0);


  return (
    <div className="w-275 h-175 shadow-xl rounded-4xl p-16 flex flex-col justify-between">
      <p className="text-5xl h-30">
        {questions[counter].id}. {questions[counter].question}
      </p>
      <div className="flex flex-col justify-center items-center py-6">
        <Button options={answers[counter].options[0]} isCorrect={answers[counter].correct}/>
        <Button options={answers[counter].options[1]} isCorrect={answers[counter].correct}/>
        <Button options={answers[counter].options[2]} isCorrect={answers[counter].correct}/>
        <Button options={answers[counter].options[3]} isCorrect={answers[counter].correct}/>
      </div>
    </div>
  );
}

export default QuizCard;
