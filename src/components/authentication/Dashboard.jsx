import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';

const Dashboard = () => {
  const { user } = useUser();
  const [quizResults, setQuizResults] = useState([]);

  useEffect(() => {
    // Get all quiz results from localStorage
    const storedResults = localStorage.getItem("quizResults");
    if (storedResults) {
      setQuizResults(JSON.parse(storedResults)); // Parse and set the results
    }
  }, []);

  return (
    <>
      <h1 className="text-4xl font-extrabold text-indigo-600 mb-6">Dashboard</h1>
      <div className="min-h-screen bg-indigo-50 items-center justify-center">
        <div className="bg-white p-5">
          <p className="text-lg text-gray-700 mb-6 font-bold text-indigo-800 capitalize">
            Hello {user ? user.username : user.firstName}! Here's your scoreboard
          </p>
          {/* User Scoreboard */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-indigo-600 mb-4">Your Scores</h2>
            <ul className="space-y-4 text-indigo-400">
              {quizResults.length > 0 ? (
                quizResults.map((result, index) => (
                  <li key={index} className="flex justify-between text-lg">
                    <span>{result.category}</span>
                    <span>{result.score} / 100</span>
                  </li>
                ))
              ) : (
                <li>No quiz results available.</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
