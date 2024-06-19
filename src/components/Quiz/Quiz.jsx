import { useRef, useState } from "react";
import "./Quiz.css";
import { data } from "../../assets/data";

const Quiz = () => {
  // Use to sum answer correct
  let [index, setIndex] = useState(0);
  // Use to next questions
  let [questions, setQuestions] = useState(data[index]); //Default index= 0
  // Lock Screen when click answer correct
  let [lock, setLock] = useState(false);
  // Show Correct Answer When User Chose UnCorrect
  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);

  let option_array = [Option1, Option2, Option3, Option4];

  // Score
  let[score, setScore] = useState(0)
  // Result
  let [result, setResult] = useState(false)

  // Function check answer
  const checkAns = (e, ans) => {
    if (lock === false) {
      if (questions.ans === ans) {
        e.target.classList.add("correct");
        setLock(true);
        setScore(prev=>prev+1)
      } else {
        e.target.classList.add("wrong");
        setLock(true);
        option_array[questions.ans - 1].current.classList.add("correct");
      }
    }
  };

  // Next Question
  const nextQuestion = ()=>{
    if(lock===true){
      if((index + 1)===data.length){
        setResult(true)
        return 0;
      }
      setIndex(++index);
      setQuestions(data[index]);
      setLock(false);
      option_array.map((option)=>{
        option.current.classList.remove("correct");
        option.current.classList.remove("wrong");
        return null;
      })
    }
  }

  // Reset Button
  const resetBtn = ()=>{
    setScore(0);
    setQuestions(data[0]);
    setLock(false);
    setResult(false);
    setIndex(0)

  }

  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />
      {result?
      <>
      {/* Have Score */}
      <h2>You Score {score} out of {data.length}</h2>
      <button onClick={resetBtn}>Reset</button>
      </>:
      <>
        <h2>
        {index + 1}. {questions.question}
      </h2>
      <ul>
        <li ref={Option1} 
          onClick={(e) => {
            checkAns(e, 1);
          }}
        >
          {questions.option1}
        </li>
        <li ref={Option2} 
          onClick={(e) => {
            checkAns(e, 2);
          }}
        >
          {questions.option2}
        </li>
        <li ref={Option3} 
          onClick={(e) => {
            checkAns(e, 3);
          }}
        >
          {questions.option3}
        </li>
        <li ref={Option4} 
          onClick={(e) => {
            checkAns(e, 4);
          }}
        >
          {questions.option4}
        </li>
      </ul>

      <button onClick={nextQuestion}>Next</button>
      <div className="index">{index+1} of {data.length} questions</div>
      
      </>}
      
    </div>
  );
};

export default Quiz;
