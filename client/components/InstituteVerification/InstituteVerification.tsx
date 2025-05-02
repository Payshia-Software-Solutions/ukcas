"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { FaHome, FaPhoneAlt } from "react-icons/fa";

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

  const [searchInput, setSearchInput] = useState("");
  const [institute, setInstitute] = useState<Institute | null>(null);
  const [suggestions, setSuggestions] = useState<InstituteSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const username = searchParams.get("username");
    if (username) {
      fetchInstituteByUsername(username);
    }
  }, [searchParams]);

  const fetchInstituteByUsername = async (username: string) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5000/api/v2/institute/slug/${username}`
      );
      if (!response.ok) {
        throw new Error("Institute not found");
      }
      const data = await response.json();
      setInstitute(data);
      setSearchInput(username);
    } catch {
      setError("Institute not found. Please check the ID and try again.");
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
    setSearchInput("");
    router.push("/institute-verification");
  };

  const fetchSuggestions = async (value: string) => {
    if (value.length < 2) {
      setSuggestions([]);
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5000/api/v2/institute/search?value=${value}`
      );
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
    <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="relative z-10 bg-opacity-95 p-6 sm:p-10 md:p-16 rounded-xl w-full max-w-6xl text-center mt-32 mb-10">
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

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-6 text-[#74323B]">
          Institute Verification
        </h2>

        {institute ? (
          <div>
            <div className="relative bg-white border border-gray-100 rounded-xl p-4 sm:p-6 shadow-lg mb-6">
              {/* Verified badge */}
              <div className="absolute -top-4 sm:-top-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-3 sm:px-4 py-1 rounded-full flex items-center space-x-1 shadow-md text-xs sm:text-sm">
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-semibold">Verified Institute</span>
              </div>

              <div className="mt-8 text-center mb-8">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                  {institute.name}
                </h3>
                <p className="text-sm sm:text-base text-gray-500">
                  {institute.address}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-r from-pink-50 to-white rounded-lg p-4 sm:p-6 border border-pink-100 flex items-center">
                  <div className="p-2 bg-pink-100 rounded-lg mr-4 shrink-0">
                    <FaHome className="w-5 h-5 sm:w-8 sm:h-8" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-gray-500 mb-1">
                      ADDRESS
                    </h4>
                    <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 break-words">
                      {institute.address}
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-pink-50 to-white rounded-lg p-4 sm:p-6 border border-blue-100 flex items-center">
                  <div className="p-2 bg-pink-100 rounded-lg mr-4 shrink-0">
                    <FaPhoneAlt className="w-5 h-5 sm:w-8 sm:h-8" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-gray-500 mb-1">
                      CONTACT NUMBER
                    </h4>
                    <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-800">
                      {institute.mobile_number || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-100 rounded-lg p-4 sm:p-6 mb-4 text-left">
                <div className="flex items-center">
                  <svg
                    className="h-8 w-8 sm:h-10 sm:w-10 text-green-600 mr-4 shrink-0"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm-3.54-4.46a1 1 0 0 1 1.42-1.42L12 16.34l5.54-5.54a1 1 0 0 1 1.42 1.42l-6.25 6.25a1 1 0 0 1-1.42 0l-2.83-2.83z" />
                  </svg>
                  <div>
                    <h4 className="font-bold text-green-800 text-sm sm:text-base mb-1">
                      Accreditation Confirmed
                    </h4>
                    <p className="text-green-700 text-xs sm:text-sm">
                      This institution has been officially verified and is
                      currently accredited by the United Kingdom College of
                      Advanced Studies.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-4">
                <button
                  onClick={handleBackButton}
                  className="bg-[#74323B] hover:bg-[#9A3642] text-white text-sm sm:text-base px-6 py-3 rounded-lg transition duration-300"
                >
                  ← Back to Search
                </button>
              </div>
            </div>

            <div className="text-center mt-6">
              <a
                href="#"
                className="text-[#74323B] hover:text-[#9A3642] text-xs sm:text-sm font-medium inline-flex items-center"
              >
                🖨️ Print Verification Certificate
              </a>
            </div>
          </div>
        ) : (
          <>
            <p className="text-black text-lg sm:text-xl mb-8 font-semibold">
              Enter the Institute name or ID to verify its authenticity.
            </p>

            <div className="relative w-full mb-8">
              <span className="absolute inset-y-0 right-6 flex items-center text-gray-400">
                🔍
              </span>
              <input
                type="text"
                placeholder="Search by name or ID"
                value={searchInput}
                onChange={handleInputChange}
                className="w-full text-base sm:text-xl pl-6 pr-12 py-3 sm:py-4 rounded-full shadow-md bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#74323B]"
              />
            </div>

            {suggestions.length > 0 && (
              <div className="mb-8">
                <h3 className="text-left text-lg sm:text-xl font-semibold mb-4 text-[#74323B]">
                  Suggestions:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {suggestions.map((inst) => (
                    <div
                      key={inst.id}
                      onClick={() => handleSuggestionClick(inst.slug)}
                      className="border border-[#74323B] p-4 rounded-lg shadow-md bg-[#E7C7C9] cursor-pointer hover:shadow-lg transition"
                    >
                      <h4 className="text-lg font-bold text-[#74323B]">
                        {inst.name}
                      </h4>
                      <p className="text-sm text-[#74323B]">{inst.address}</p>
                      <p className="text-xs text-gray-600">ID: {inst.username}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {loading && <p className="text-[#74323B] mb-4">Loading...</p>}

            {error && <p className="text-red-600 mb-4">{error}</p>}

            <p className="text-black text-sm sm:text-lg mt-6 text-left leading-relaxed">
              These records represent institutions officially accredited by the
              United Kingdom College of Advanced Studies. Verifying an institute
              ID ensures the institution&apos;s authenticity and current accreditation
              status aligned with our academic and professional standards.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default InstituteVerificationClient;
