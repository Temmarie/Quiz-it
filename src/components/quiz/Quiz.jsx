import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Quiz() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [questionLimit, setQuestionLimit] = useState(20);
  const navigate = useNavigate();

  // Fetch categories on component mount
  useEffect(() => {
    axios
      .get("https://eaxeli.com/api/v1/questions/categories")
      .then((response) => {
        console.log("Categories API response:", response.data);
        setCategories(response.data.data || []);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        alert("Failed to load categories. Please try again later.");
      });
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value.toLowerCase().replace(/\s+/g, "-"));
  };

  const handleStartQuiz = () => {
    if (selectedCategory) {
      navigate(`/questions?category=${selectedCategory}&limit=${questionLimit}`);
    } else {
      alert("Please select a category to start the quiz.");
    }
  };

  return (
    <div className="quiz-section p-5">
      <h1 className="text-indigo-600 font-bold text-xl uppercase mb-3">
        Select a Quiz Category
      </h1>
      <select
        onChange={handleCategoryChange}
        className="w-full p-2 border-2 border-indigo-600 rounded-lg text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
      >
        <option value="">
          {categories.length === 0 ? "Loading categories..." : "Select a category"}
        </option>
        {categories.map((category) => (
          <option key={category._id} value={category._id} className="text-indigo-600">
            {category._id} ({category.count})
          </option>
        ))}
      </select>

      <div className="question-limit mb-4">
        <label htmlFor="question-limit" className="block text-indigo-600 font-medium mb-2">
          Number of Questions:
        </label>
        <select
          id="question-limit"
          value={questionLimit}
          onChange={(e) => setQuestionLimit(parseInt(e.target.value, 10))}
          className="w-full p-2 border-2 border-indigo-600 rounded-lg text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
      </div>

      <button
        onClick={handleStartQuiz}
        className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700"
      >
        Start Quiz
      </button>
    </div>
  );
}

export default Quiz;
