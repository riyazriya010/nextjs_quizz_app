"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();

  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState<string[]>(["", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");

  useEffect(() => {
    // Check if admin is logged in
    const isAuthenticated = localStorage.getItem("admin-authenticated");
    if (!isAuthenticated) {
      router.push("/pages/admin/login");
    }
  }, [router]);

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!category || !question || !correctAnswer || options.some((opt) => !opt)) {
      alert("Please fill all fields.");
      return;
    }

    const quizData = {
      category,
      difficulty,
      question,
      options,
      correct_answer: correctAnswer,
    };

    try {
      const res = await fetch("/api/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quizData),
      });

      if (res.ok) {
        alert("Quiz added successfully!");
        setCategory("");
        setDifficulty("easy");
        setQuestion("");
        setOptions(["", ""]);
        setCorrectAnswer("");
      } else {
        alert("Failed to add quiz. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting quiz data:", error);
      alert("Error submitting quiz data. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin-authenticated");
    router.push("/pages/admin/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-3xl p-8 bg-white rounded shadow-md">
        <h1 className="mb-6 text-2xl font-bold text-center text-gray-800">Admin Dashboard</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg shadow-sm border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g., Computer Related"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Difficulty</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg shadow-sm border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Question</label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg shadow-sm border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter the question"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Options</label>
            {options.map((option, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  className="flex-grow px-3 py-2 mr-2 border rounded-lg shadow-sm border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder={`Option ${index + 1}`}
                  required
                />
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddOption}
              className="px-4 py-2 mt-2 text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Add Option
            </button>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Correct Answer</label>
            <input
              type="text"
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg shadow-sm border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter the correct answer"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>

        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 mt-4 text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
