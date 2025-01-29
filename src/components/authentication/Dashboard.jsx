import React, { useState, useEffect } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import { supabase } from "/supabaseClient";

const Dashboard = () => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [quizResults, setQuizResults] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [averageScore, setAverageScore] = useState(0);

  // Fetch user quiz results from Supabase
  useEffect(() => {
    const fetchQuizResults = async () => {
      if (!user || !user.id) {
        console.error("User is not logged in or invalid user object.");
        return;
      }

      try {
        const { data, error } = await supabase
          .from("quiz_results")
          .select("*")
          .eq("user_id", user.id);

        if (error) {
          throw error;
        }

        setQuizResults(data);

        // Calculate average score
        const avgScore =
          data.length > 0
            ? Math.round(
                data.reduce((acc, result) => acc + result.score, 0) / data.length
              )
            : 0;
        setAverageScore(avgScore);
      } catch (error) {
        console.error("Error fetching quiz results:", error);
      }
    };

    fetchQuizResults();
  }, [user]);

  // Fetch leaderboard data
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const { data: quizResults, error } = await supabase
          .from("quiz_results")
          .select("user_id, score")
          .order("score", { ascending: false })
          .limit(10);
  
        if (error) throw error;
  
        const enrichedLeaderboard = await Promise.all(
          quizResults.map(async (entry) => {
            try {
              const response = await fetch(
                `http://localhost:3000/api/user/${entry.user_id}`
              );
  
              if (!response.ok) throw new Error("Failed to fetch user");
  
              const userData = await response.json();
  
              return {
                ...entry,
                username: userData.username || "Anonymous",
                profileImage: userData.profileImage,
              };
            } catch (err) {
              console.error("Error fetching user:", err);
              return { ...entry, username: "Unknown User" };
            }
          })
        );
  
        setLeaderboard(enrichedLeaderboard);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };
  
    fetchLeaderboard();
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-indigo-100 p-8">
      <h1 className="text-5xl font-extrabold text-indigo-600 mb-8 text-center">
        Leader Board Stats
      </h1>

      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-8">
        {/* User Quiz Stats Section */}
        

        {/* Leaderboard Section */}
        <section className="bg-indigo-50 rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-bold text-indigo-600 mb-4">Leaderboard</h2>
          <ul className="space-y-4">
            {leaderboard.length > 0 ? (
              leaderboard.map((entry, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow"
                >
                  <span className="font-medium text-lg text-gray-800">
                     {entry.username} {/* Show partial user ID */}
                  </span>
                  <span className="text-indigo-600 font-semibold">
                    {entry.score} pts
                  </span>
                </li>
              ))
            ) : (
              <p className="text-center text-indigo-400">No leaderboard data available.</p>
            )}
          </ul>
        </section>

        {/* User Quiz History Section */}

      </div>
    </div>
  );
};

export default Dashboard;
