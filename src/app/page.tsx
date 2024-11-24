import Link from "next/link";

export default function Quizz() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-yellow-500 text-gray-50">
      <h1 className="text-6xl font-extrabold mb-10 text-center drop-shadow-lg">
        Quizz App
      </h1>
      {/* Use Link component for navigation */}
      <Link href="/pages/start-page">
        <button className="relative px-8 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-lg font-semibold rounded-xl shadow-xl transform transition hover:scale-110 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-indigo-300 animate-float">
          Play
        </button>
      </Link>
    </div>
  );
}
