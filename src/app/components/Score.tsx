"use client";

const Score = () => {
  const score = JSON.parse(sessionStorage.getItem("score") || "0");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-green-400 via-blue-500 to-purple-600 text-white p-6">
      <h1 className="text-4xl font-bold mb-8">Your Score</h1>
      <p className="text-2xl font-semibold mb-4">You scored {score} out of 5</p>
      <button
        onClick={() => window.location.href = '/'}
        className="px-8 py-4 bg-yellow-500 text-black text-xl font-semibold rounded-lg shadow-lg transform transition duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-yellow-300"
      >
        Play Again
      </button>
    </div>
  );
};

export default Score;
