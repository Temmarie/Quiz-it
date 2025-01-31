import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate("/instructions"); // Navigate to instructions page
  };

  return (
    <div className="flex flex-col min-h-screen text-indigo-600 p-3">
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <h2 className="text-4xl font-bold mb-4">Welcome to Quiz It!</h2>
        <p className="text-lg max-w-xl mb-6">
          Dive into the world of fun and exciting quizzes across a wide range of categories like General Knowledge, History, Science, Technology, and so much more! Test your brainpower, challenge your knowledge, and learn fascinating new facts along the way.
        </p>
        <p className="text-lg max-w-xl mb-6">
          No need to log in to get started—just pick a category and play! Want to track your progress and compete with others? Log in to unlock your personalized dashboard with a scoreboard to see how you rank in your favorite categories.
        </p>
        <button
          className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          onClick={handleStartQuiz}
        >
          Start Quiz
        </button>
      </div>

      {/* Footer Section */}
      <footer className="w-full bg-indigo-100 py-4 text-sm text-indigo-800 text-center">
        © {new Date().getFullYear()} Quiz It. All Rights Reserved.
      </footer>
    </div>
  );
};

export default HomePage;
