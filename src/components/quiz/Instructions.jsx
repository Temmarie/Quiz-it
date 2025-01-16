import React from 'react';
import { useNavigate } from 'react-router-dom';

const Instructions = () => {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate('/quiz'); // Navigate to quiz page
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen  text-indigo-600">
      <h2 className="text-4xl font-bold mb-4">Quiz Instructions</h2>
      <ul className="text-lg mb-6">
        <li className="mb-2">1. Read each question carefully.</li>
        <li className="mb-2">2. Select the best answer from the given options.</li>
        <li className="mb-2">3. Submit the quiz once all questions are answered.</li>
      </ul>
      <button
        className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded-lg  hover:bg-indigo-700"
        onClick={handleStartQuiz}
      >
        Start Quiz
      </button>
    </div>
  );
};

export default Instructions;
