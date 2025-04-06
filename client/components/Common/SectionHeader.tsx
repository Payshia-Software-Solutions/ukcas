import React from "react";
import Image from "next/image";

type SectionHeaderProps = {
  imgURL: string;
  title: string;
};

const SectionHeader: React.FC<SectionHeaderProps> = ({ imgURL, title }) => {
  return (
    <div className="mb mt-4">
      <div className="flex flex-col items-center justify-center">
        <div className="relative w-full h-[60vh]">
          {/* Background Image */}
          <Image
            src={imgURL}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="shadow-lg"
          />

          {/* Black Overlay */}
          <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>

          {/* Title Text */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-center">
            <h1 className="text-[45px] md:text-[75px] capitalize">{title}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionHeader;
