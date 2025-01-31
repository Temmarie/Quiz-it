import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useUser, useAuth } from "@clerk/clerk-react";
import axios from "axios";
import Questions from "./Question";
import { supabase } from "/supabaseClient"; 

function QuestionsPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category") || "general"; // Fallback to prevent errors
  const limit = queryParams.get("limit") || 20; 

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const { isSignedIn, user } = useUser();
  const { getToken } = useAuth();

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
      setFeedbackMessage("Correct!");
      setScore(score + 1);
    } else {
      setFeedbackMessage("Wrong!");
    }

    setTimeout(() => {
      setShowFeedback(false);
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setShowScore(true);
        if (isSignedIn) {
          saveScoreToDatabase();
        }
      }
    }, 1000);
  };

  // Save score to database only if user is signed in
  const saveScoreToDatabase = async () => {
    try {
      if (!user) return;

      const jwtToken = await getToken({ template: "supabase" });
      await supabase.auth.setSession({ access_token: jwtToken });

      const { error } = await supabase
        .from("quiz_results")
        .insert([
          {
            user_id: user.id,
            category,
            score: Math.round((score / questions.length) * 100),
            date: new Date().toISOString(),
          },
        ]);

      if (error) {
        throw error;
      }
   
    } catch (error) {
      console.error("Error saving quiz result:", error);
    }
  };

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

          {!isSignedIn && (
            <p className="text-red-500">Sign in to save your score and appear on the leaderboard.</p>
          )}

          <div className="flex justify-center gap-4">
            <button
              onClick={() => window.location.reload()}
              className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 capitalize"
            >
              Play Again
            </button>
            <Link to="/quiz" className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 capitalize">
              Select New Category
            </Link>
          </div>
        </div>
      ) : (
        <>
          {questions.length > 0 ? (
            <Questions question={questions[currentQuestionIndex]} handleAnswer={handleAnswer} />
          ) : (
            <p className="text-indigo-600 text-center">No questions available.</p>
          )}
        </>
      )}

      {showFeedback && <p className="mt-4 text-indigo-600">{feedbackMessage}</p>}
    </div>
  );
}

export default QuestionsPage;
