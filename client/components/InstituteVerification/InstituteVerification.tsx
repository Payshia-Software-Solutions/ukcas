"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

// Dummy Institute Data
const dummyInstitutes = [
  {
    instituteId: 'GA001',
    name: 'Global Academy',
    address: '123 Main Street, Colombo',
    contact: '+94 77 123 4567',
  },
  {
    instituteId: 'GA002',
    name: 'CodeHub Institute',
    address: '456 Tech Park, Kandy',
    contact: '+94 71 987 6543',
  },
];

const InstituteVerificationClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [instituteIdInput, setInstituteIdInput] = useState('');
  const [institute, setInstitute] = useState<{
    instituteId: string;
    name: string;
    address: string;
    contact: string;
  } | null>(null);

  useEffect(() => {
    const id = searchParams.get('instituteId');
    if (id) {
      const matched = dummyInstitutes.find(inst => inst.instituteId === id);
      if (matched) {
        setInstitute(matched);
        setInstituteIdInput(id);
      }
    }
  }, [searchParams]);

  const handleSearch = () => {
    const matched = dummyInstitutes.find(inst => inst.instituteId === instituteIdInput.trim());
    if (matched) {
      setInstitute(matched);
      router.push(`/institute-verification?instituteId=${instituteIdInput.trim()}`);
    } else {
      setInstitute(null);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <div className="relative z-10 bg-[#F5E9EA] bg-opacity-95 p-16 rounded-xl shadow-lg w-full max-w-6xl text-center mt-60 mb-10 border-2 border-[#74323B] shadow-[#74323B]">
        
        {/* Logo */}
        <div className="mb-6">
          <Image
            src="/assets/images/samplelogo.jpeg"
            alt="Logo"
            width={160}
            height={100}
            className="mx-auto"
            priority
          />
        </div>

        <h2 className="text-6xl font-bold text-center mb-6 text-[#74323B]">Institute Verification</h2>

        {institute ? (
          <div className="text-left mb-6">
            <div className="border border-[#74323B] p-6 rounded-md shadow-md bg-[#E7C7C9] shadow-[#74323B] shadow-lg">
              <div className="flex flex-wrap justify-start ml-1">
                <div className="w-full md:w-1/2 mb-6 text-3xl font-bold text-[#74323B]">
                  <p>Institute Name</p>
                  <hr className="border-[#74323B] my-4" />
                  <p>Address</p>
                  <hr className="border-[#74323B] my-4" />
                  <p>Contact Number</p>
                </div>
                <div className="w-full md:w-1/2 mb-6 text-3xl font-semibold text-[#74323B]">
                  <p>: {institute.name}</p>
                  <hr className="border-[#74323B] my-4" />
                  <p>: {institute.address}</p>
                  <hr className="border-[#74323B] my-4" />
                  <p>: {institute.contact}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <p className="text-black text-xl mb-8 font-semibold">
  Please enter the Institute ID exactly as it appears on the verification document.
</p>

{/* Styled input with search icon */}
<div className="relative w-full mb-8">
  <span className="absolute inset-y-0 right-6 pl-4 flex items-center pointer-events-none text-gray-500 text-xl">
    🔍
  </span>
  <input
    type="text"
    placeholder="Institute ID"
    value={instituteIdInput}
    onChange={(e) => setInstituteIdInput(e.target.value)}
    className="w-full text-xl pl-12 pr-4 py-4 rounded-full shadow-md bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#74323B]"
  />
</div>

{/* Search button */}
<button
  onClick={handleSearch}
  className="w-1/2 text-xl bg-[#7C2B33] hover:bg-[#74323B] text-white font-semibold py-4 rounded-lg transition cursor-pointer"
>
  Search
</button>

{/* Institute description */}
<p className="text-black text-lg mt-6 leading-relaxed text-left">
These records represent institutions officially accredited by the United Kingdom College of Advanced Studies. Verifying an institute ID ensures the institution`&apos; authenticity, current accreditation status, and alignment with our academic and professional quality standards.
</p>

          </>
        )}
      </div>
    </div>
  );
};

export default InstituteVerificationClient;
