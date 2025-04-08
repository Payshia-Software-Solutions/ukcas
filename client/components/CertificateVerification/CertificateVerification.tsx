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

      <div className="relative z-10 bg-gray-200 bg-opacity-95 p-16 rounded-xl shadow-lg w-full max-w-xl text-center">
        <Image
          src="/assets/images/samplelogo.jpeg"
          alt="Logo"
          width={180}
          height={120}
          className="mx-auto mb-6"
          priority
        />

        <h2 className="text-3xl font-bold mb-6">Certificate Verification</h2>

        {certificate ? (
          <div className="text-left mb-6">
            <div className="mb-6 flex justify-center">
              <Image
                src={certificate.user.image}
                alt="User"
                width={150}
                height={150}
                className="rounded-full"
              />
            </div>

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
                  <p className="text-black">: {certificate.user.name}</p>
                  <hr className="border-gray-400 mt-1" />
                  <p className="text-black">: {certificate.user.course.name}</p>
                  <hr className="border-gray-400 mt-1" />
                  <p className="text-black">: {certificate.user.course.duration}</p>
                  <hr className="border-gray-400 mt-1" />
                  <p className="text-black">: {certificate.user.course.completionDate}</p>
                  <hr className="border-gray-400 mt-1" />
                  <p className="text-black">: {certificate.user.course.learningpartner}</p>
                  <hr className="border-gray-400 mt-1" />
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
              className="w-full text-xl bg-[#7C2B33] hover:bg-[#74323B] text-white font-semibold py-4 rounded-lg transition cursor-pointer "
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
