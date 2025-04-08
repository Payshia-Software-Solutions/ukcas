"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const AboutSection: React.FC = () => {
  return (
    <section className="flex flex-col md:flex-row items-center max-w-6xl mx-auto   bg-white  md:mt-20 rounded-lg overflow-hidden">
      {/* Left - Image */}
      <div className="w-full md:w-1/2">
        <Image
          src="/assets/images/side.jpg"
          alt="Business Professional"
          width={500} 
          height={300} 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right - Content */}
      <div className="w-full bg-gray-100 md:w-1/2 p-8">
        <h5 className="text-lg font-semibold text-gray-500 uppercase tracking-wide flex items-center">
          ABOUT US <span className="ml-2  w-10 md:w-16 h-px bg-red-500"></span>
        </h5>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
          SDC Canada Is Committed To Drive Skill Training
        </h2>
        <p className="mt-4 text-gray-600 leading-relaxed">
          We launched with a vision to offer a unique and authentic awarding
          experience for training organisations globally. Over the past year we
          are happy that we could provide standardised assessment and
          certification with international acceptance.
        </p>
    
        <Link href="./about">     <button className="mt-6 px-6 py-3 bg-[#7E3841] hover:bg-[#74323B] text-white font-semibold rounded-full shadow-md  transition">
          LEARN MORE
        </button></Link>
      </div>
    </section>
  );
};

export default AboutSection;
