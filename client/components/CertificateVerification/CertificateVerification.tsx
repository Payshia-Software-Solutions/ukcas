"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import config from "@/config";

interface Certificate {
  id: number;
  student_id: string;
  certificate_id: string;
  student_name_initial: string;
  student_name_full: string;
  issued_date: string;
  email: string;
  student_grade: string;
  organization: string;
  created_by: string;
  updated_by: string;
  created_at: string;
  updated_at: string;
}

const CertificateVerificationClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [certificateIdInput, setCertificateIdInput] = useState("");
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [suggestions, setSuggestions] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const id = searchParams.get("certificateId");
    if (id) {
      fetchCertificateById(id);
    }
  }, [searchParams]);

  const fetchCertificateById = async (id: string) => {
    if (!id.trim()) return;
    try {
      setLoading(true);
      const response = await axios.get(`${config.API_BASE_URL}/certificates/search?value=${id}`);
      const certificates = response.data;
      const exactMatch = certificates.find((cert: Certificate) => cert.certificate_id === id);
      if (exactMatch) {
        setCertificate(exactMatch);
        setCertificateIdInput(id);
      } else {
        setCertificate(null);
      }
    } catch (error) {
      console.error("Error fetching certificate:", error);
      setCertificate(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchSuggestions = async (value: string) => {
    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`${config.API_BASE_URL}/certificates/search?value=${value}`);
      setSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  let debounceTimeout: NodeJS.Timeout;
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCertificateIdInput(value);

    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      fetchSuggestions(value);
      if (value.trim()) {
        router.push(`/certificate-verification?certificateId=${value.trim()}`);
      }
    }, 300);
  };

  const selectCertificate = (cert: Certificate) => {
    setCertificateIdInput(cert.certificate_id);
    setCertificate(cert);
    setSuggestions([]);
    router.push(`/certificate-verification?certificateId=${cert.certificate_id}`);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Not available";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleBackButton = () => {
    setCertificate(null);
    setSuggestions([]);
    setCertificateIdInput("");
    router.push("/certificate-verification");
  };

  const handleKeyDown = (e: React.KeyboardEvent, cert: Certificate) => {
    if (e.key === "Enter" || e.key === " ") {
      selectCertificate(cert);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && certificateIdInput.trim()) {
      router.push(`/certificate-verification?certificateId=${certificateIdInput.trim()}`);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-20">
      <div className="relative z-10 bg-opacity-95 p-6 md:p-10 rounded-xl w-full max-w-6xl mx-auto text-center mt-32 md:mt-40 mb-10">
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

        <h2 className="text-3xl md:text-5xl font-bold text-center mb-10 text-[#74323B]">
          Certificate Verification
        </h2>

        {certificate ? (
          <div className="p-6 md:p-8 rounded-md">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
              <div className="flex flex-col sm:flex-row items-center gap-6 mb-6 md:mb-0">
                <Image
                  src={"/assets/images/user.jpg"}
                  alt="User"
                  width={100}
                  height={100}
                  className="rounded-full border-4 border-[#74323B]"
                />
                <div className="text-center sm:text-left">
                  <p className="text-2xl font-bold text-[#74323B]">
                    {certificate.student_name_full}
                  </p>
                  <p className="text-md text-gray-700">
                    Issued on: {formatDate(certificate.issued_date)}
                  </p>
                  <p className="text-md text-gray-700">
                    Certificate ID: {certificate.certificate_id}
                  </p>
                </div>
              </div>
            </div>

            <div className="text-left mb-6">
              <h3 className="text-2xl font-semibold text-[#74323B] mb-2">
                Certificate from {certificate.organization}
              </h3>
              <p className="text-gray-800 leading-relaxed mb-4">
                This certificate verifies that the student has successfully completed all required coursework and assessments according to the standards set by the issuing institution.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-[#74323B] mb-2">Student Information</h4>
                  <p><span className="font-medium">Name:</span> {certificate.student_name_full}</p>
                  <p><span className="font-medium">Student ID:</span> {certificate.student_id}</p>
                  <p><span className="font-medium">Email:</span> {certificate.email}</p>
                  <p><span className="font-medium">Grade:</span> {certificate.student_grade}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-[#74323B] mb-2">Organization</h4>
                  <p><span className="font-medium">Name:</span> {certificate.organization}</p>
                  <p><span className="font-medium">Created By:</span> {certificate.created_by}</p>
                  <p><span className="font-medium">Issued Date:</span> {formatDate(certificate.issued_date)}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={handleBackButton}
                className="bg-[#7C2B33] hover:bg-[#74323B] text-white font-semibold py-3 px-8 rounded-lg transition"
              >
                Back to Search
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className="text-black text-xl mb-8 font-semibold">
              Please enter the certificate ID exactly as it appears on the verification document.
            </p>

            <div className="relative w-full mb-8">
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
                placeholder="Enter Certificate Number"
                value={certificateIdInput}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                className="w-full text-lg md:text-xl pl-12 pr-4 py-4 rounded-full shadow-md bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#74323B]"
              />

              {suggestions.length > 0 && (
                <div className="absolute z-20 bg-white rounded-lg shadow-lg mt-2 w-full text-left">
                  <div className="p-2 max-h-72 overflow-y-auto">
                    {suggestions.map((cert, index) => (
                      <div
                        key={index}
                        onClick={() => selectCertificate(cert)}
                        onKeyDown={(e) => handleKeyDown(e, cert)}
                        tabIndex={0}
                        className="cursor-pointer hover:bg-gray-100 p-3 rounded-md mb-2"
                        role="option"
                        aria-selected={false}
                      >
                        <p className="font-semibold text-[#74323B] text-md">
                          {cert.certificate_id}
                        </p>
                        <p className="text-sm text-gray-700">
                          {cert.student_name_full} ({cert.organization})
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {loading && (
                <div className="absolute right-4 top-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#74323B]"></div>
                </div>
              )}
            </div>

            <p className="text-black text-lg mt-6 leading-relaxed mb-8 text-left">
              These certificates are issued by the United Kingdom College of Advanced Studies and verify the successful completion of accredited academic and professional programs. Each certificate serves as an official record of achievement and authenticity.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default CertificateVerificationClient;
