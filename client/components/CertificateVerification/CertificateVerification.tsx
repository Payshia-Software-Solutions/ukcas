'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

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
        description:
          'The React Development course provides comprehensive training in building dynamic, high-performance web applications using React.js.Students learn how to create reusable components, manage application state with Hooks and Context API, and integrate APIs. The course covers modern front-end development practices, responsive design principles, and deployment techniques. By the end of the program, students are capable of developing fully functional, scalable, and maintainable React applications.',
        skills: ['React', 'JavaScript', 'Frontend', 'UI/UX'],
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
        description:
          'The Python Fullstack course is designed to equip students with the skills to develop full-featured web applications using both frontend and backend technologies. Learners begin with Python and Flask/Django for server-side logic, and move on to JavaScript, HTML, and CSS for the client side. The course includes database management, REST API development, authentication, and cloud deployment. Graduates of this course are able to build and deploy fullstack applications from scratch.',
        skills: ['Python', 'Django', 'API', 'HTML/CSS'],
      },
    },
  },
];

const CertificateVerificationClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [certificateIdInput, setCertificateIdInput] = useState('');
  const [certificate, setCertificate] = useState<typeof dummyCertificates[0] | null>(null);

  useEffect(() => {
    const id = searchParams.get('certificateId');
    if (id) {
      const matched = dummyCertificates.find((cert) => cert.certificateId === id);
      if (matched) {
        setCertificate(matched);
        setCertificateIdInput(id);
      }
    }
  }, [searchParams]);

  const handleSearch = () => {
    const matched = dummyCertificates.find(
      (cert) => cert.certificateId === certificateIdInput.trim()
    );
    if (matched) {
      setCertificate(matched);
      router.push(`/certificate-verification?certificateId=${certificateIdInput.trim()}`);
    } else {
      setCertificate(null);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-20">
      <div className="relative z-10 bg-opacity-95 p-10 rounded-xl w-full max-w-6xl text-center mt-40 mb-10">
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

        <h2 className="text-4xl md:text-5xl font-bold text-center mb-10 text-[#74323B]">
          Certificate Verification
        </h2>

        {certificate ? (
          <div className="p-8 rounded-md">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
              <div className="flex items-center gap-6 mb-4 md:mb-0">
                <Image
                  src={certificate.user.image}
                  alt="User"
                  width={100}
                  height={100}
                  className="rounded-full border-4 border-[#74323B]"
                />
                <div className="text-left">
                  <p className="text-2xl font-bold text-[#74323B]">{certificate.user.name}</p>
                  <p className="text-md text-gray-700">Issued on: {certificate.user.course.completionDate}</p>
                </div>
              </div>
            </div>

            {/* Course Description Section */}
            <div className="text-left mb-6">
              <h3 className="text-2xl font-semibold text-[#74323B] mb-2">
                {certificate.user.course.name}
              </h3>
              <p className="text-gray-800 leading-relaxed mb-4">
                {certificate.user.course.description}
              </p>
              <p className="text-md text-gray-600">
                <strong>Duration:</strong> {certificate.user.course.duration} &nbsp;&nbsp;
                <strong>Learning Partner:</strong> {certificate.user.course.learningpartner}
              </p>
            </div>

            {/* Skills */}
            <div className="text-left mt-6">
              <h4 className="text-lg font-semibold mb-2 text-[#74323B]">Skills</h4>
              <div className="flex flex-wrap gap-3">
                {certificate.user.course.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-white border border-[#74323B] text-[#74323B] px-4 py-1 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            <p className="text-black text-xl mb-8 font-semibold">
              Please enter the certificate ID exactly as it appears on the verification document.
            </p>
            <div className="relative w-full mb-8">
              <span className="absolute inset-y-0 right-6 pl-4 flex items-center pointer-events-none text-gray-500 text-xl">
                🔍
              </span>
              <input
                type="text"
                placeholder="Enter Certificate Number"
                value={certificateIdInput}
                onChange={(e) => setCertificateIdInput(e.target.value)}
                className="w-full text-xl pl-12 pr-4 py-4 rounded-full shadow-md bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#74323B]"
              />
            </div>
            <button
              onClick={handleSearch}
              className="w-1/2 text-xl bg-[#7C2B33] hover:bg-[#74323B] text-white font-semibold py-4 rounded-lg transition cursor-pointer"
            >
              Search
            </button>
            <p className="text-black text-lg mt-6 leading-relaxed mb-8 text-left">
              These certificates are issued by the United Kingdom College of Advanced Studies and
              verify the successful completion of accredited academic and professional programs.
              Each certificate serves as an official record of achievement and authenticity.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default CertificateVerificationClient;
