"use client";
import React from "react";
import Image from "next/image";

type SectionHeaderProps = {
  imgURL: string;
  title: string;
};

const SectionHeader: React.FC<SectionHeaderProps> = ({ imgURL, title }) => {
  return (
    <div className="mt-4">
      <div className="flex flex-col items-center justify-center">
        <div className="relative w-full h-40 sm:h-60 md:h-[60vh]">
          {/* Background Image */}
          <Image
            src={imgURL}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="shadow-lg"
            priority
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black opacity-50"></div>

          {/* Title Text */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-center px-4">
            <h1 className="text-3xl sm:text-5xl md:text-[75px] capitalize">{title}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionHeader;
