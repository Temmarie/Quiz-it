import React, { useState, useEffect } from "react"; 
import { useLocation, Link } from "react-router-dom";
import { useUser, useAuth } from "@clerk/clerk-react"; // Import useAuth hook
import axios from "axios";
import Questions from "./Question";
import { supabase } from '/supabaseClient'; // Import Supabase client

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

  const { user } = useUser();
  const { getToken } = useAuth(); // Use the useAuth hook

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
  const handleQuizCompletion = async () => {
    const jwtToken = await getToken({ template: 'supabase' }); // Use the template name you configured in Clerk
    await supabase.auth.setSession({ access_token: jwtToken });
  
    setShowScore(true);
  
    if (!user || !user.id) {
      console.error("User is not logged in or invalid user object.");
      alert("You must be logged in to save your quiz results.");
      return;
    }
  
    // Save the quiz result to Supabase
    try {
      const { data, error } = await supabase
        .from('quiz_results')
        .insert([
          {
            user_id: user.id, // Ensure user.id is a text value
            category,
            score: Math.round((score / questions.length) * 100),
            date: new Date().toISOString,
          },
        ]);

      if (error) {
        throw error;
      }

      console.log('Quiz result saved:', data);
    } catch (error) {
      console.error("Error saving quiz result:", error);
      alert("Failed to save quiz result. Please try again.");
    }
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

          <div className="flex justify-around justify-center">
            <button
              onClick={() => window.location.reload()}
              className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 capitalize"
            >
              Play {category.replace(/-/g, " ")} Again
            </button>
            <Link to="/quiz" className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 capitalize">
              Select new category
            </Link>
          </div>
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

      <div className="mt-4 text-indigo-600">
        {showFeedback && <p>{feedbackMessage}</p>}
      </div>

      {/* Progress bar container */}
      <div className="w-full bg-indigo-50 rounded-full h-4 mt-4 relative">
        <div className="bg-indigo-600 h-4 rounded-full text-white flex items-center justify-center" style={{ width: `${progressPercentage}%` }}>
          <p className="text-center w-full">{currentQuestionIndex + 1} / {questions.length}</p>
        </div>
      </div> 
    </div>
  );
}

export default QuestionsPage;