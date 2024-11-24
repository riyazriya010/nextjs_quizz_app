// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// const Quiz = () => {
//   const router = useRouter();
//   const [questions, setQuestions] = useState<any[]>([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [userAnswers, setUserAnswers] = useState<string[]>([]);
//   const [score, setScore] = useState(0);

//   useEffect(() => {
//     // Retrieve questions from session storage
//     const storedQuestions = sessionStorage.getItem("questions");
//     if (storedQuestions) {
//       setQuestions(JSON.parse(storedQuestions));
//     } else {
//       router.push("/"); // Redirect to start if questions are not found
//     }

//     // Prevent back navigation
//     window.history.pushState(null, "", window.location.href);
//     window.onpopstate = () => {
//       window.history.pushState(null, "", window.location.href);
//     };
//   }, []);

//   const handleAnswerSelect = (answer: string) => {
//     const isCorrect = answer === questions[currentQuestionIndex].correct_answer;
//     if (isCorrect) setScore(score + 1);
//     setUserAnswers([...userAnswers, answer]);
//   };

//   const handleNextQuestion = () => {
//     if (currentQuestionIndex + 1 < questions.length) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     } else {
//       sessionStorage.setItem("score", JSON.stringify(score)); // Save score in session
//       router.push("/pages/score-page");
//     }
//   };

//   if (!questions.length) return <div>Loading...</div>;

//   const currentQuestion = questions[currentQuestionIndex];

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-green-400 via-blue-500 to-purple-600 text-white p-6">
//       <h1 className="text-3xl font-bold mb-6">{currentQuestion.question}</h1>
//       <div className="mb-6 w-full max-w-md">
//         {currentQuestion.options.map((option: string, index: number) => (
//           <button
//             key={index}
//             onClick={() => handleAnswerSelect(option)}
//             className="w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 text-lg font-medium text-white rounded-lg shadow-md mb-4 transform transition duration-200 hover:scale-105"
//           >
//             {option}
//           </button>
//         ))}
//       </div>

//       <button
//         onClick={handleNextQuestion}
//         className="px-8 py-4 bg-yellow-500 text-black text-xl font-semibold rounded-lg shadow-lg transform transition duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-yellow-300"
//       >
//         Next
//       </button>
//     </div>
//   );
// };

// export default Quiz;



"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Quiz = () => {
  const router = useRouter();
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false); // Track if the question was answered
  const [correctAnswer, setCorrectAnswer] = useState<string>(""); // Track the correct answer

  useEffect(() => {
    // Retrieve questions from session storage
    const storedQuestions = sessionStorage.getItem("questions");
    if (storedQuestions) {
      setQuestions(JSON.parse(storedQuestions));
    } else {
      router.push("/"); // Redirect to start if questions are not found
    }

    // Prevent back navigation
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = () => {
      window.history.pushState(null, "", window.location.href);
    };
  }, []);

  const handleAnswerSelect = (answer: string) => {
    if (answered) return; // Prevent selecting another option after one is clicked

    const isCorrect = answer === questions[currentQuestionIndex].correct_answer;
    if (isCorrect) setScore(score + 1);
    setUserAnswers([...userAnswers, answer]);
    setAnswered(true); // Disable further changes
    setCorrectAnswer(questions[currentQuestionIndex].correct_answer); // Set the correct answer
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAnswered(false); // Reset for the next question
      setCorrectAnswer(""); // Clear the correct answer for the next question
    } else {
      sessionStorage.setItem("score", JSON.stringify(score)); // Save score in session
      router.push("/pages/score-page");
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
          
          // Apply green or red color depending on correctness
          if (answered) {
            if (option === correctAnswer) {
              buttonClasses += " bg-green-600"; // Correct answer
            } else if (userAnswers.includes(option) && option !== correctAnswer) {
              buttonClasses += " bg-red-600"; // Incorrect answer
            } else {
              buttonClasses += " bg-blue-600"; // Default color
            }
          } else {
            buttonClasses += " bg-blue-600 hover:bg-blue-700"; // Default hover for unselected options
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

