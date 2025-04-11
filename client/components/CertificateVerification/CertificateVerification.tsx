'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

// Keep dummy data outside the component
const dummyCertificates = [
  {
    certificateId: '1234',
    user: {
      name: 'John Doe',
      image: '/assets/images/user.jpg',
      course: {
        name: 'React Development',
        duration: '6 Months',
        completionDate: '01 Dec 2025',
        learningpartner: 'GA',
      },
    },
  },
  {
    certificateId: '5678',
    user: {
      name: 'Jane Smith',
      image: '/assets/images/user.jpg',
      course: {
        name: 'Python Fullstack',
        duration: '4 Months',
        completionDate: '15 Nov 2024',
        learningpartner: 'GA',
      },
    },
  },
];

const CertificateVerificationClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [certificateIdInput, setCertificateIdInput] = useState('');
  const [certificate, setCertificate] = useState<{
    certificateId: string;
    user: {
      name: string;
      image: string;
      course: {
        name: string;
        duration: string;
        completionDate: string;
        learningpartner: string;
      };
    };
  } | null>(null);

  useEffect(() => {
    const id = searchParams.get('certificateId');
    if (id) {
      const matched = dummyCertificates.find(cert => cert.certificateId === id);
      if (matched) {
        setCertificate(matched);
        setCertificateIdInput(id);
      }
    }
  }, [searchParams]);

  const handleSearch = () => {
    const matched = dummyCertificates.find(cert => cert.certificateId === certificateIdInput.trim());
    if (matched) {
      setCertificate(matched);
      router.push(`/certificate-verification?certificateId=${certificateIdInput.trim()}`);
    } else {
      setCertificate(null);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center pt-35">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/assets/images/certificate.webp')" }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>

      {/* Certificate Details Card */}
      <div className="relative z-10 bg-white bg-opacity-95 p-16 rounded-xl shadow-lg w-full max-w-6xl text-center mt-60 mb-10 border-2 border-[#74323B] shadow-[#74323B] shadow-lg transition-transform transform hover:scale-105 duration-300 ease-in-out hover:shadow-2xl hover:shadow-[#74323B] ">

        {/* Logo in the top of the certificate detail card */}
        <div className="mb-6 mb-0">
          <Image
            src="/assets/images/samplelogo.jpeg"
            alt="Logo"
            width={160}
            height={100}
            className="mx-auto"
            priority
          />
        </div>

        <h2 className="text-6xl font-bold text-center mb-6 text-[#74323B]">Certificate Verification</h2>

        {certificate ? (
          <div className="text-left mb-6">
            {/* User Image */}
            <div className="mb-6 flex justify-center">
              <Image
                src={certificate.user.image}
                alt="User"
                width={150}
                height={150}
                className="rounded-full border-4 border-[#74323B]  " 
              />
            </div>

            {/* Certificate Details Section */}
            <div className="border border-[#74323B] p-6 rounded-md shadow-md bg-[#E7C7C9] shadow-[#74323B] shadow-lg ">
              <div className="flex flex-wrap justify-start ml-1">
                <div className="w-full md:w-1/2 mb-6 text-3xl font-bold text-[#74323B]">
                  <p>Name</p>
                  <hr className="border-[#74323B] my-4" />
                  <p>Course</p>
                  <hr className="border-[#74323B] my-4" />
                  <p>Duration</p>
                  <hr className="border-[#74323B] my-4" />
                  <p>Completion Date</p>
                  <hr className="border-[#74323B] my-4" />
                  <p>Learning Partner</p>
                </div>
                <div className="w-full md:w-1/2 mb-6 text-3xl fornt-semibold text-[#74323B]">
                  <p>: {certificate.user.name}</p>
                  <hr className="border-[#74323B] my-4" />
                  <p>: {certificate.user.course.name}</p>
                  <hr className="border-[#74323B] my-4" />
                  <p>: {certificate.user.course.duration}</p>
                  <hr className="border-[#74323B] my-4" />
                  <p>: {certificate.user.course.completionDate}</p>
                  <hr className="border-[#74323B] my-4" />
                  <p>: {certificate.user.course.learningpartner}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <p className="text-gray-700 text-base mb-8">
              Please enter the GA certificate number as it appears on the front of the certificate.
            </p>
            <input
              type="text"
              placeholder="Certificate Number"
              value={certificateIdInput}
              onChange={(e) => setCertificateIdInput(e.target.value)}
              className="w-full text-xl px-6 py-4 border border-white-400 rounded-lg mb-8 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              onClick={handleSearch}
              className="w-full text-xl bg-[#7C2B33] hover:bg-[#74323B] text-white font-semibold py-4 rounded-lg transition cursor-pointer"
            >
              Search
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CertificateVerificationClient;
