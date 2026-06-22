import { useState } from "react";
import Button from "./Button";

function QuizCard({questions, answers}) {
  const [counter, setCounter] = useState(0);
  const [reveal, setReveal] = useState(false);
  
  
  return (
    <div className="300 h-200 shadow-xl rounded-4xl p-16 flex flex-col justify-between">
      <p className="text-5xl h-30">
        {questions[counter].id}. {questions[counter].question}
      </p>
      <div className="flex flex-col justify-center items-center py-6">
        {answers[counter].options.map((option, i) => (
          <Button
            option={option}
            key={i}
            correct={answers[counter].correct}
          />
        ))}
      </div>
    </div>
  );
}

export default QuizCard;
