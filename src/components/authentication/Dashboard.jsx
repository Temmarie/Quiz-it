import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';

const Dashboard = () => {
  const { user } = useUser();
 
  const fetchLeaderboard = async () => {
  try {
    const { data, error } = await supabase
      .from('quiz_results')
      .select('user_id, sum(score) as total_score')
      .group('user_id')
      .order('total_score', { ascending: false });

    if (error) throw error;

    // Now fetch user details to display names along with scores
    const leaderboard = await Promise.all(
      data.map(async (entry) => {
        const { data: userData } = await supabase
          .from('users') // Assuming users table has a 'users' table
          .select('username')
          .eq('id', entry.user_id);
        
        return { name: userData[0]?.username || 'Unknown', score: entry.total_score };
      })
    );

    setLeaderboard(leaderboard);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
  }
};


  return (
<>
  <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-indigo-100 p-8">
    <h1 className="text-5xl font-extrabold text-indigo-600 mb-8 text-center">Stats</h1>
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">

      {/* User Scoreboard */}
      <div>
        

         {/* Leaderboard Section */}
         <section className="bg-indigo-50 rounded-lg p-6 shadow-md">
            <h2 className="text-2xl font-bold text-indigo-600 mb-4">Leaderboard</h2>
            <ul className="space-y-4">
              {[
                { name: 'Alice', score: 98 },
                { name: 'Bob', score: 92 },
                { name: 'Charlie', score: 85 },
              ].map((player, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow"
                >
                  <span className="font-medium text-lg text-gray-800">{player.name}</span>
                  <span className="text-indigo-600 font-semibold">{player.score} pts</span>
                </li>
              ))}
            </ul>
          </section>
      </div>
    </div>
  </div>
</>

  );
};

export default Dashboard;
