import React, { useState, useEffect } from 'react';
import { UserButton, useUser } from '@clerk/clerk-react';

const Profile = () => {
  const { user } = useUser();

  const [quizResults, setQuizResults] = useState([]);

  useEffect(() => {
    // Get quiz results from localStorage
    const storedResults = localStorage.getItem("quizResults");
    if (storedResults) {
      setQuizResults(JSON.parse(storedResults)); // Parse results directly
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-indigo-100 p-8">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-indigo-950 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold capitalize">Welcome,  {user ? user.username : user.firstName}!</h1>
            
              <p className="mt-2 text-indigo-200">
                Manage your profile and view your quiz stats.
              </p>
            </div>
            <UserButton />
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 space-y-6">
          {/* User Info */}
          <section className="bg-indigo-50 rounded-lg p-6 shadow-md">
            <h2 className="text-2xl font-bold text-indigo-600 mb-4">Your Profile</h2>
            <div className="flex items-center space-x-6">
              <img
                src={user.imageUrl}
                alt="Profile"
                className="w-24 h-24 rounded-full shadow-md"
              />
              <div>
                <p className="text-lg font-semibold text-indigo-800">{user.firstName} {user.lastName}</p>
                <p className="text-sm text-indigo-500">{user.emailAddress}</p>
              </div>
            </div>
          </section>

          {/* Quiz Stats */}
          <section className="bg-indigo-100 rounded-lg p-6 shadow-md">
            <h2 className="text-2xl font-bold text-indigo-600 mb-4">Quiz Statistics</h2>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-indigo-50 p-4 rounded-lg shadow">
                <p className="text-3xl font-bold text-indigo-600">45</p>
                <p className="text-sm text-gray-600">Quizzes Taken</p>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg shadow">
                <p className="text-3xl font-bold text-indigo-600">87%</p>
                <p className="text-sm text-gray-600">Average Score</p>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg shadow">
                <p className="text-3xl font-bold text-indigo-600">5</p>
                <p className="text-sm text-gray-600">Categories Mastered</p>
              </div>
            </div>
          </section>

          <div className="bg-indigo-50 rounded-lg p-6 shadow-md">

          <h2 className="text-3xl font-bold text-indigo-600 mb-6">Your Scores</h2>
        
          <ul className="space-y-4 text-indigo-700">
            {quizResults.length > 0 ? (
              quizResults.map((result, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-white p-4 rounded-md shadow-sm hover:shadow-lg transition-shadow"
                >
                  <span className="font-medium text-lg">{result.category}</span>
                  <span className="text-indigo-500 text-lg font-semibold">{result.score} / 100</span>
                </li>
              ))
            ) : (
              <li className="text-center text-indigo-400">No quiz results available.</li>
            )}
          </ul>
        </div>

         
        </div>
      </div>
    </div>
  );
};

export default Profile;
