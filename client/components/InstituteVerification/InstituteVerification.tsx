"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';


type InstituteSuggestion = {
  id: string;
  slug: string;
  name: string;
  address: string;
  username: string;
};


type Institute = {
  name: string;
  address: string;
  mobile_number?: string;
};

const InstituteVerificationClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchInput, setSearchInput] = useState('');
  const [institute, setInstitute] = useState<Institute | null>(null); // Proper type for institute
  const [suggestions, setSuggestions] = useState<InstituteSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const username = searchParams.get('username');
    if (username) {
      fetchInstituteByUsername(username);
    }
  }, [searchParams]);

  const fetchInstituteByUsername = async (username: string) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/v2/institute/slug/${username}`);
      if (!response.ok) {
        throw new Error('Institute not found');
      }
      const data = await response.json();
      setInstitute(data);
      setSearchInput(username);
    } catch {
      setError('Institute not found. Please check the ID and try again.');
      setInstitute(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (username: string) => {
    router.push(`/institute-verification?username=${username}`);
  };

  const handleBackButton = () => {
    setInstitute(null);
    setSearchInput('');
    router.push('/institute-verification');
  };

  const fetchSuggestions = async (value: string) => {
    if (value.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/v2/institute/search?value=${value}`);
      if (response.ok) {
        const data = await response.json();
        setSuggestions(data);
      } else {
        setSuggestions([]);
      }
    } catch {
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);
    fetchSuggestions(value);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <div className="relative z-10 bg-opacity-95 p-16 rounded-xl w-full max-w-6xl text-center mt-60 mb-10">
        
        {/* Logo */}
        <div className="mb-6">
          <Image
            src="/assets/logo/logo1.png"
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
            <div className="border border-[#74323B] p-6 rounded-md  bg-[#E7C7C9] shadow-[#74323B] shadow-lg">
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
                  <p>: {institute.mobile_number || 'N/A'}</p>
                </div>
              </div>
            </div>
            
            {/* Back Button */}
            <div className="mt-6 text-center">
              <button
                onClick={handleBackButton}
                className="bg-[#7C2B33] hover:bg-[#74323B] text-white font-semibold py-3 px-8 rounded-lg transition cursor-pointer"
              >
                Back to Search
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className="text-black text-xl mb-8 font-semibold">
              Enter the Institute name or ID to verify its authenticity.
            </p>

            {/* Styled input with search icon */}
            <div className="relative w-full mb-8">
              <span className="absolute inset-y-0 right-6 pl-4 flex items-center pointer-events-none text-gray-500 text-xl">
                🔍
              </span>
              <input
                type="text"
                placeholder="Search by name or ID"
                value={searchInput}
                onChange={handleInputChange}
                className="w-full text-xl pl-12 pr-4 py-4 rounded-full shadow-md bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#74323B]"
              />
            </div>

            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div className="mb-8">
                <h3 className="text-left text-xl font-semibold mb-4 text-[#74323B]">Suggestions:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {suggestions.map((inst) => (
                    <div 
                      key={inst.id}
                      onClick={() => handleSuggestionClick(inst.slug)}
                      className="border border-[#74323B] p-4 rounded-md shadow-md bg-[#E7C7C9] cursor-pointer hover:shadow-lg transition-shadow"
                    >
                      <h4 className="text-xl font-bold text-[#74323B]">{inst.name}</h4>
                      <p className="text-md text-[#74323B] mt-1">{inst.address}</p>
                      <p className="text-sm text-gray-700 mt-1">ID: {inst.username}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {loading && (
              <p className="text-[#74323B] mb-4">Loading...</p>
            )}

            {error && (
              <p className="text-red-600 mb-4">{error}</p>
            )}

            {/* Institute description */}
            <p className="text-black text-lg mt-6 leading-relaxed text-left">
              These records represent institutions officially accredited by the United Kingdom College of Advanced Studies. Verifying an institute ID ensures the institution&apos;s authenticity, current accreditation status, and alignment with our academic and professional quality standards.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default InstituteVerificationClient;
