import React from "react";

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left - Logo */}
        <div className="text-2xl font-bold text-blue-600">CarHealth</div>

        {/* Middle - Nav Links */}
        <nav className="hidden md:flex space-x-8 gap-3">
          <a
            href="/"
            className="text-gray-700 hover:text-blue-600 transition font-medium"
          >
            Home
          </a>
          <a
            href="/create-report"
            className="text-gray-700 hover:text-blue-600 transition font-medium"
          >
            Create Report
          </a>
          <a
            href="/history"
            className="text-gray-700 hover:text-blue-600 transition font-medium"
          >
            History
          </a>
        </nav>

        {/* Right - Login / User */}
        <div>
          {/* If logged out */}
          <a
            href="/login"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </a>

          {/* Example: If logged in, replace with username */}
          {/* <span className="text-gray-700 font-medium">Hello, Vivek</span> */}
        </div>
      </div>
    </header>
  );
}
