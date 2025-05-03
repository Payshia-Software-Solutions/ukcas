import React from 'react';

const LeftSide: React.FC = () => {
  return (
    <div className="bg-yellow-50 p-6 rounded-2xl space-y-4 shadow-md">
      <h2 className="text-2xl text-gray-600 font-bold mb-4">Create New Service</h2>

      <div>
        <label className="block font-semibold text-xl text-gray-500 mb-1">Service Title</label>
        <input
          type="text"
          placeholder="Enter title here"
          className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-inner focus:outline-none focus:ring-2 focus:ring-gray-400 bg-white shadow-md"
        />
      </div>

      <div>
        <label className="block font-semibold text-xl text-gray-500 mb-1">Service Category</label>
        <select
          className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-inner bg-white text-gray-700 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          <option>Choose Category</option>
          <option>Education</option>
          <option>Healthcare</option>
          <option>Consulting</option>
        </select>
      </div>

      <div>
        <label className="block font-semibold text-xl text-gray-500 mb-1">Title Image</label>
        <div className="flex items-center space-x-4 bg-[#fff7e6] p-3 rounded-lg">
          <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center border border-dashed shadow-sm">
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3v18h18" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-md text-gray-500 mb-1">Please upload square image, size less than 100KB</p>
            <input
              type="file"
              className="border px-3 py-1 w-full rounded-lg text-sm bg-white"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block font-semibold text-xl text-gray-500 mb-1">Service Description</label>
        <textarea
          rows={5}
          placeholder="Type Description"
          className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-inner focus:outline-none focus:ring-2 focus:ring-gray-400 bg-white shadow-md"
        ></textarea>
      </div>

      <button className="w-full bg-gray-900 hover:bg-black text-white text-xl font-semibold py-3 rounded-xl shadow-md transition-all duration-300 cursor-pointer flex items-center justify-center space-x-2">
        Done !
      </button>
    </div>
  );
};

export default LeftSide;
