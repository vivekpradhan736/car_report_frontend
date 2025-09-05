import React from "react";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center flex flex-col gap-5">
          <h1 className="text-xl md:text-4xl font-bold text-gray-800 mb-6">
            Welcome to Car Health Report
          </h1>
          <a
            href="/create-report"
            className="px-8 py-4 text-lg font-semibold rounded-lg text-white bg-blue-600 shadow-lg hover:bg-blue-700 transition"
          >
            Create New Report
          </a>
        </div>
      </main>
    </div>
  );
}
