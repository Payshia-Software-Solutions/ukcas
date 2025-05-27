"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { FaHome, FaPhoneAlt } from "react-icons/fa";

type Institute = {
  id: string;
  name: string;
  slug: string;
  address: string;
  mobile_number: string;
  img_url: string;
  description: string;
  mini_description: string;
  terms_and_conditions: string;
  created_by: string;
  updated_by: string;
  created_at: string;
  updated_at: string;
};

const InstituteVerificationClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchInput, setSearchInput] = useState("");
  const [institute, setInstitute] = useState<Institute | null>(null);
  const [suggestions, setSuggestions] = useState<Institute[]>([]);
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
      if (!response.ok) throw new Error("Institute not found");
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

  const handleSuggestionClick = (slug: string) => {
    router.push(`/institute-verification?username=${slug}`);
  };

  const handleBackButton = () => {
    setInstitute(null);
    setSearchInput("");
    router.push("/institute-verification");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="relative z-10 bg-opacity-95 p-6 sm:p-10 md:p-16 rounded-xl w-full max-w-6xl text-center mt-32 mb-10">
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
            <div className="relative bg-white border border-gray-100 rounded-xl p-6 shadow-lg mb-6">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-1 rounded-full shadow text-sm font-medium">
                ✅ Verified Institute
              </div>

              <div className="mt-8 text-center mb-6">
                <h3 className="text-3xl font-bold text-gray-800 mb-2">
                  {institute.name}
                </h3>
                <p className="text-sm text-gray-600">{institute.address}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-pink-50 rounded-lg p-4 border flex items-center">
                  <div className="p-2 bg-pink-100 rounded-lg mr-4">
                    <FaHome className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500">ADDRESS</h4>
                    <p className="text-md font-medium text-gray-800">{institute.address}</p>
                  </div>
                </div>

                <div className="bg-pink-50 rounded-lg p-4 border flex items-center">
                  <div className="p-2 bg-pink-100 rounded-lg mr-4">
                    <FaPhoneAlt className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500">CONTACT</h4>
                    <p className="text-md font-medium text-gray-800">{institute.mobile_number || "N/A"}</p>
                  </div>
                </div>
              </div>

              <div className="text-left mb-4">
                <h4 className="font-semibold text-[#74323B] text-lg mb-2">Mini Description</h4>
                <p className="text-gray-700">{institute.mini_description || "N/A"}</p>
              </div>

              <div className="text-left mb-4">
                <h4 className="font-semibold text-[#74323B] text-lg mb-2">Full Description</h4>
                <p className="text-gray-700">{institute.description || "N/A"}</p>
              </div>

              <div className="text-left mb-4">
                <h4 className="font-semibold text-[#74323B] text-lg mb-2">Terms & Conditions</h4>
                <p className="text-gray-700">{institute.terms_and_conditions || "N/A"}</p>
              </div>

              <button
                onClick={handleBackButton}
                className="mt-6 bg-[#74323B] hover:bg-[#9A3642] text-white text-sm px-6 py-3 rounded-lg transition duration-300"
              >
                ← Back to Search
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className="text-black text-lg sm:text-xl mb-6 font-semibold">
              Enter the Institute name or ID to verify its authenticity.
            </p>

            <div className="relative w-full mb-6">
              <span className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <Image
                  src="/assets/images/search.png"
                  alt="Search Icon"
                  width={24}
                  height={24}
                />
              </span>
              <input
                type="text"
                placeholder="Search by name or ID"
                value={searchInput}
                onChange={handleInputChange}
                className="w-full text-base sm:text-lg pl-6 pr-12 py-3 rounded-full shadow-md bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#74323B]"
              />
            </div>

            {suggestions.length > 0 && (
              <div className="mb-8">
                <h3 className="text-left text-lg font-semibold mb-2 text-[#74323B]">
                  Suggestions:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {suggestions.map((inst) => (
                    <div
                      key={inst.id}
                      onClick={() => handleSuggestionClick(inst.slug)}
                      className="border border-[#74323B] p-4 rounded-lg bg-[#E7C7C9] cursor-pointer hover:shadow-lg transition"
                    >
                      <h4 className="text-lg font-bold text-[#74323B]">{inst.name}</h4>
                      <p className="text-sm text-[#74323B]">{inst.address}</p>
                      <p className="text-xs text-gray-600">ID: {inst.slug}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {loading && <p className="text-[#74323B] mb-4">Loading...</p>}
            {error && <p className="text-red-600 mb-4">{error}</p>}

            <p className="text-black text-sm sm:text-lg mt-4 text-left leading-relaxed">
              These records represent institutions officially accredited by the United Kingdom
              College of Advanced Studies. Verifying an institute ID ensures the institution’s
              authenticity and accreditation status aligned with our academic standards.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default InstituteVerificationClient;
