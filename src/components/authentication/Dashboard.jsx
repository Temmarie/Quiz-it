import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useUser();

  // Example of quiz subjects and user scores
  const [quizSubjects, setQuizSubjects] = useState([
    { subject: 'Math', score: 85 },
    { subject: 'English', score: 75 },
    { subject: 'Science', score: 90 },
  ]);

  return (
    <>
      <h1 className="text-4xl font-extrabold text-purple-600 mb-6">Dashboard</h1>
      <div>
        <div>
          <p className="text-lg text-gray-700 mb-6 font-bold text-purple-800 capitalize">
            Hello {user ? user.username : user.firstName}!
          </p>
          {/* User Scoreboard */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-purple-600 mb-4">Your Scores</h2>
            <ul className="space-y-4">
              {quizSubjects.map((quiz, index) => (
                <li key={index} className="flex justify-between text-lg">
                  <span>{quiz.subject}</span>
                  <span>{quiz.score}%</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quiz Subjects List */}
          <div>
            <h2 className="text-2xl font-bold text-purple-600 mb-4">Available Quizzes</h2>
            <ul className="space-y-4">
              {quizSubjects.map((quiz, index) => (
                <li key={index}>
                  <Link
                    to={`/instructions/${quiz.subject.toLowerCase()}`}
                    className="text-purple-800 underline"
                  >
                    Start {quiz.subject} Quiz
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
