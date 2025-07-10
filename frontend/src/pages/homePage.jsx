import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen text-gray-800">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center pt-32 pb-16 px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-800">
          Vizag Steel Plant Equipment Delay Log
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          Monitor, Analyze & Reduce Equipment Downtime Efficiently
        </p>
        <Link
          to="/delays"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg shadow"
        >
          Delays Entry
        </Link>
      </div>

      {/* Images Section */}
      <div className="px-6 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <img
                src="https://images.unsplash.com/photo-1727504172743-08f14448fab8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dml6YWclMjBzdGVlbCUyMHBsYW50JTIwY29udHJvbCUyMHJvb218ZW58MHx8MHx8fDA%3D"
                 alt="Equipment"
            className="w-full h-64 object-cover rounded-lg shadow-md"
          />
          <img
          src="https://plus.unsplash.com/premium_photo-1661962751752-cbf6a170c837?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dml6YWclMjBzdGVlbCUyMHBsYW50JTIwY29udHJvbCUyMHJvb218ZW58MHx8MHx8fDA%3D"
            alt="Control Room"
            className="w-full h-64 object-cover rounded-lg shadow-md"
          />
          <img
            src="https://images.unsplash.com/photo-1668243304566-2e78ebd48960?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dml6YWclMjBzdGVlbHBsYW50JTIwZW1wbG95ZWVzfGVufDB8fDB8fHww"
            alt="Employees"
            className="w-full h-64 object-cover rounded-lg shadow-md"
          />
          
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-500 border-t border-gray-200">
        © {new Date().getFullYear()} Vizag Steel Plant · All Rights Reserved
      </footer>
    </div>
  );
};

export default Home;
