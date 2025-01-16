import React from "react";

function Questions({ question, handleAnswer, questionNumber }) {
  return (
    <div>
      <h2 className="text-indigo-800 font-semibold mb-3">
         {questionNumber}: {question.question}
      </h2>
      <div className="options flex flex-col justify-evenly mb-2">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(index === question.correctIndex)}
            className="bg-indigo-600 text-white px-3 py-2 rounded-lg mb-3"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Questions;
