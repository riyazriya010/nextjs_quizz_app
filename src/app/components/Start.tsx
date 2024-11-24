"use client";

import { useRouter } from "next/navigation";
import React, { useState, } from "react";

const Start = () => {
  const [category, setCategory] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("");
  const router = useRouter();

  // Handler for clicking Start Game
  const handlerFunction = async () => {
    // Construct the query parameters
    const queryParams = new URLSearchParams({
      category: category || 'Computer Related', // Default to 'Computer Related' if no category selected
      difficulty: difficulty || 'easy', // Default to 'easy' if no difficulty selected
    }).toString();

    // Sending the data as query parameters to the API
    try {
      console.log('queryParams: ',queryParams)
      const response = await fetch(`/api/questions?${queryParams}`, {
        method: "GET", // Use GET since we're sending data in the URL
      });

      // const result = await response.json();
      // if (response.ok) {
      //   console.log("Data successfully fetched from API:", result);
      // } else {
      //   console.error("Failed to fetch data:", result);
      // }

      const result = await response.json();
      if (response.ok) {
        // Store the questions and navigate to the quiz page
        sessionStorage.setItem("questions", JSON.stringify(result)); // Use session storage to keep questions in session
        router.push("/pages/user/questions-page");
      } else {
        console.error("Failed to fetch data:", result);
      }

    } catch (error) {
      console.error("Error fetching data from API:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-green-400 via-blue-500 to-purple-600 text-white p-6">
      <h1 className="text-5xl font-bold mb-8 text-center drop-shadow-lg">
        Welcome to the Quiz Game
      </h1>

      {/* Category Selection */}
      <div className="mb-6 w-full max-w-md">
        <label className="block text-lg font-medium text-white mb-2">Select Category:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-3 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-lg transform transition duration-200 hover:scale-105"
        >
          <option value="">--Choose Category--</option>
          <option value="Computer Related">Computer Related</option>
          <option value="General Knowledge">General Knowledge</option>
          <option value="Agricultural">Agricultural</option>
        </select>
      </div>

      {/* Difficulty Level Selection */}
      <div className="mb-6 w-full max-w-md">
        <label className="block text-lg font-medium text-white mb-2">Select Difficulty:</label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="w-full p-3 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-lg transform transition duration-200 hover:scale-105"
        >
          <option value="">--Choose Difficulty--</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      {/* Start Game Button */}
      <button
        onClick={handlerFunction}
        className="px-8 py-4 bg-yellow-500 text-black text-xl font-semibold rounded-lg shadow-lg transform transition duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-yellow-300"
      >
        Start Game
      </button>

      {/* Optional: Display the selected values */}
      {/* {category && difficulty && (
        <div className="mt-8 text-lg text-white text-center">
          <p className="font-semibold">Category: {category}</p>
          <p className="font-semibold">Difficulty: {difficulty}</p>
        </div>
      )} */}
    </div>
  );
};

export default Start;
