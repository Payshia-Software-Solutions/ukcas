import React from 'react';

const RightSide: React.FC = () => {
  return (
    <div className="bg-yellow-50 p-6 rounded-lg space-y-4 shadow-sm">
      <h2 className="text-2xl font-bold mb-4 text-gray-600">Current Services</h2>

      {[1, 2, 3, 4, 5].map((item) => (
        <div
          key={item}
          className="bg-white rounded-xl shadow p-4 flex items-start space-x-4 hover:shadow-md transition shadow-lg cursor-pointer"
        >
          <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center border shadow-sm">
            <svg
              className="w-6 h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3v18h18"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-gray-700">Service 1</h3>
            <p className="text-sm text-gray-600">
              The United Kingdom has a diverse landscape of institutions, including renowned...
            </p>
            <a
              href="#"
              className="text-blue-600 text-xs font-semibold hover:underline justify-end flex items-center mt-2"
            >
              See more &gt;&gt;
            </a>
          </div>
        </div>
      ))}

      <button className="text-gray-500 font-semibold text-md flex items-center justify-center w-full mt-4 cursor-pointer hover:text-gray-600 transition duration-300">
        Load More
        <svg
          className="w-4 h-4 ml-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M19 9l-7 7-7-7"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default RightSide;
