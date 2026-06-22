import {useState, useEffect} from "react";

function Button({options, isCorrect}){
  const [color, setColor] = useState("text-black");
  const [isClicked, setIsClicked] = useState(false);
  function handleClick(){
    if (isClicked) return;
    if(options == isCorrect){
      setColor("bg-green-500 text-white");
      
    }else{
      setColor("bg-red-500 text-white");
    }
    setIsClicked(true);
  }
  
  return(
    <button className={`w-200 text-3xl h-20 border-4 border-black rounded-4xl font-bold cursor-pointer ${color} m-1.5 ease-in duration-100 `} onClick={handleClick}>{options}</button>
  )
}

export default Button;