'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const CertificateVerification = () => {
  const [showDetails, setShowDetails] = useState(false);

  // Dummy data for testing display
  const data = {
    user: {
      name: "John Doe",
      image: "/assets/images/user.jpg", 
      course: {
        name: "React Development",
        duration: "6 Months",
        completionDate: "01 Dec 2025",
        learningpartner: "GA",
      }
    }
  };

  const handleSearch = () => {
    setShowDetails(true); // Simulate showing the certificate details
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/assets/images/certificate.webp')" }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 bg-gray-200 bg-opacity-95 p-16 rounded-xl shadow-lg w-full max-w-xl text-center">
        <Image
          src="/assets/images/samplelogo.png"
          alt="Logo"
          width={180}
          height={120}
          className="mx-auto mb-6"
          priority
        />
        
        <h2 className="text-3xl font-bold mb-6">Certificate Verification</h2>

        {/* Display certificate details or input form based on state */}
        {showDetails ? (
          <div className="text-left mb-6">
            {/* Display user image */}
            <div className="mb-6 flex justify-center">
              <Image
                src={data.user.image} // User Image
                alt="User Image"
                width={150}
                height={150}
                className="rounded-full"
              />
            </div>

            {/* Certificate Details Section with Border */}
            <div className="border border-white p-4 rounded-md shadow-md bg-white">
              <div className="flex flex-wrap justify-start ml-1">
                <div className="w-full md:w-1/2 mb-4 text-xl font-semibold text-gray-800">
                  <p className="text-black">Name</p>
                  <hr className="border-gray-400 mt-1" />
                  <p className="text-black">Course</p>
                  <hr className="border-gray-400 mt-1" />
                  <p className="text-black">Duration</p>
                  <hr className="border-gray-400 mt-1" />
                  <p className="text-black">Completion Date</p>
                  <hr className="border-gray-400 mt-1" />
                  <p className="text-black">Learning Partner</p>
                  <hr className="border-gray-400 mt-1" />
                </div>
                <div className="w-full md:w-1/2 mb-4 text-xl font-semibold text-gray-800">
                  <p className="text-black">: {data.user.name}</p>
                  <hr className="border-gray-400 mt-1" />
                  <p className="text-black">: {data.user.course.name}</p>
                  <hr className="border-gray-400 mt-1" />
                  <p className="text-black">: {data.user.course.duration}</p>
                  <hr className="border-gray-400 mt-1" />
                  <p className="text-black">: {data.user.course.completionDate}</p>
                  <hr className="border-gray-400 mt-1" />
                  <p className="text-black">: {data.user.course.learningpartner}</p>
                  <hr className="border-gray-400 mt-1" />
                </div>
              </div>
            </div>
            <br />
          </div>
          
        ) : (
          <p className="text-gray-700 text-base mb-8">
            Please enter the GA certificate number as it appears on the front of the certificate.
          </p>
        )}
        
        {!showDetails && (
          <div>
            <input
              type="text"
              placeholder="Certificate Number"
              className="w-full text-xl px-6 py-4 border border-white-400 rounded-lg mb-8 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              onClick={handleSearch}
              className="w-full text-xl bg-red-600 hover:bg-red-800 text-white font-semibold py-4 rounded-lg transition cursor-pointer"
            >
              Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificateVerification;
