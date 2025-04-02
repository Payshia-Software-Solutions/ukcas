'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const CertificateVerification = () => {
  const router = useRouter();

  const handleSearch = () => {
    router.push('/verified-certificate');
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
      <div className="relative z-10 bg-gray-200 bg-opacity-95 p-12 rounded-xl shadow-lg w-full max-w-lg text-center">
        {/* Updated Image component */}
        <Image 
          src="/assets/images/samplelogo.png" 
          alt="Logo" 
          width={150} 
          height={100} 
          className="mx-auto mb-4" 
          priority
        />

        <h2 className="text-2xl font-bold mb-4">Certificate Verification</h2>

        <p className="text-gray-700 text-base mb-8">
          Please enter the GA certificate number as it appears on the front of the certificate.
        </p>

        <input
          type="text"
          placeholder="Certificate Number"
          className="w-full text-lg px-5 py-3 border border-white-400 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-white"
        />

        <button
          onClick={handleSearch}
          className="w-full text-lg bg-red-600 hover:bg-red-800 text-white font-semibold py-3 rounded-lg transition cursor-pointer"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default CertificateVerification;
