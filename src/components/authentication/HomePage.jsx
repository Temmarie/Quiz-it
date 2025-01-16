import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate('/instructions'); // Navigate to instructions page
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-indigo-600">
      <h2 className="text-4xl font-bold mb-4">Welcome to the Quiz!</h2>
      <button
        className="mt-6 bg-indigo-500 text-white px-4 py-2 rounded-lg"
        onClick={handleStartQuiz}
      >
        Start Quiz
      </button>
    </div>
  );
};

export default HomePage;
