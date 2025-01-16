import React, { useState, useEffect } from "react"; 
import { useLocation } from "react-router-dom";
import axios from "axios";
import Questions from "./Question";

function QuestionsPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");
  const limit = queryParams.get("limit");

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `https://eaxeli.com/api/v1/questions/quiz?categorySlug=${category}`
        );
        setQuestions(response.data.questions.slice(0, limit));
      } catch (error) {
        console.error("Error fetching questions:", error);
        alert("Failed to load questions. Please try again.");
      }
    };

    fetchQuestions();
  }, [category, limit]);

  const handleAnswer = (isCorrect) => {
    setShowFeedback(true);
    if (isCorrect) {
      setFeedbackMessage('Correct!');
      setScore(score + 1);
    } else {
      setFeedbackMessage('Wrong!');
    }

    setTimeout(() => {
      setShowFeedback(false);
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        handleQuizCompletion();
      }
    }, 1000);
  };

  // Function to handle quiz completion
  const handleQuizCompletion = () => {
    setShowScore(true);
    // Save the score to localStorage
    localStorage.setItem("quizResults", JSON.stringify({ category, score }));
  };

  // Calculate the progress percentage
  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="questions-page p-5">
      <h1 className="text-indigo-600 font-bold text-2xl uppercase mb-5">
        {category.replace(/-/g, " ")}
      </h1>

      {showScore ? (
        <div className="score-section bg-indigo-100 p-6 rounded-lg shadow-md text-center">
          <h2 className="text-indigo-700 font-bold text-2xl mb-4">
            Your Score: {score} / {questions.length}
          </h2>
          <button
            onClick={() => window.location.reload()}
            className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700"
          >
            Play Again
          </button>
        </div>
      ) : (
        <>
          {questions.length > 0 ? (
            <div>
              <Questions
                question={questions[currentQuestionIndex]}
                handleAnswer={handleAnswer}
                questionNumber={currentQuestionIndex + 1}
              />
            </div>
          ) : (
            <p className="text-indigo-600 text-center">
              No questions available for the selected category.
            </p>
          )}
        </>
      )}

      <div className="mt-4 text-indigo-500">
        {showFeedback && <p>{feedbackMessage}</p>}
      </div>

      {/* Progress bar container */}
      <div className="w-full bg-indigo-50 rounded-full h-4 mt-4 relative">
        <div className="bg-indigo-500 h-4 rounded-full text-white flex items-center justify-center" style={{ width: `${progressPercentage}%` }}>
          <p className="text-center w-full">{currentQuestionIndex + 1} / {questions.length}</p>
        </div>
      </div> 
    </div>
  );
}

export default QuestionsPage;
