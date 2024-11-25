"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Quiz = () => {
  const router = useRouter();
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState<string>("");

  useEffect(() => {
    
    const storedQuestions = sessionStorage.getItem("questions");
    if (storedQuestions) {
      setQuestions(JSON.parse(storedQuestions));
    } else {
      router.push("/");
    }

    // Prevent back navigation
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = () => {
      window.history.pushState(null, "", window.location.href);
    };
  }, []);

  const handleAnswerSelect = (answer: string) => {
    if (answered) return; 

    const isCorrect = answer === questions[currentQuestionIndex].correct_answer;
    if (isCorrect) setScore(score + 1);
    setUserAnswers([...userAnswers, answer]);
    setAnswered(true); 
    setCorrectAnswer(questions[currentQuestionIndex].correct_answer); 
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAnswered(false); 
      setCorrectAnswer(""); 
    } else {
      sessionStorage.setItem("score", JSON.stringify(score)); 
      router.push("/pages/user/score-page");
    }
  };

  if (!questions.length) return <div>Loading...</div>;

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-green-400 via-blue-500 to-purple-600 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">{currentQuestion.question}</h1>
      <div className="mb-6 w-full max-w-md">
        {currentQuestion.options.map((option: string, index: number) => {
          let buttonClasses = "w-full px-6 py-4 text-lg font-medium text-white rounded-lg shadow-md mb-4 transform transition duration-200";
          
        
          if (answered) {
            if (option === correctAnswer) {
              buttonClasses += " bg-green-600"; 
            } else if (userAnswers.includes(option) && option !== correctAnswer) {
              buttonClasses += " bg-red-600"; 
            } else {
              buttonClasses += " bg-blue-600"; 
            }
          } else {
            buttonClasses += " bg-blue-600 hover:bg-blue-700";
          }

          return (
            <button
              key={index}
              onClick={() => handleAnswerSelect(option)}
              className={buttonClasses}
              disabled={answered} // Disable options after selection
            >
              {option}
            </button>
          );
        })}
      </div>

      <button
        onClick={handleNextQuestion}
        className="px-8 py-4 bg-yellow-500 text-black text-xl font-semibold rounded-lg shadow-lg transform transition duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-yellow-300"
        disabled={!answered} // Disable the Next button until an answer is selected
      >
        Next
      </button>
    </div>
  );
};

export default Quiz;

