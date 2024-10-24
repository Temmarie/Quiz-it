import React from 'react';
import { useUser } from '@clerk/clerk-react';


const Dashboard = () => {
  
  const { user } = useUser();
  
  return (
    <div className="min-h-screen bg-purple-50 flex flex-col items-center justify-center">
      <div className="bg-white shadow-lg rounded-xl p-10 w-full max-w-lg">
        <h1 className="text-4xl font-extrabold text-purple-600 mb-6">Dashboard</h1>
        <p className="text-lg text-gray-700 mb-6 font-bold text-purple-800 capitalize">
          Hello {user ? user.username : user.fisrtName}!
        </p>
        <p>  List of possible quizes go here as well as a score board for the signed in user.</p>
      </div>
    </div>
  );
};

export default Dashboard;