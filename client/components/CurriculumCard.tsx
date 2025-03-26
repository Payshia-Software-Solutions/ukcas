"use client";
import React from "react";
import { FiPlus } from "react-icons/fi";

interface CardProps {
  image: string;
  category: string;
  title: string;
}

const CurriculumCard: React.FC<CardProps> = ({ image, category, title }) => {
  return (
    <div className="relative w-80 h-96 rounded-lg overflow-hidden shadow-lg">
      {/* Background Image */}
      <img src={image} alt={title} className="w-full h-full object-cover" />
      
      {/* Overlay Content */}
      <div className="absolute bottom-0 left-0 w-full bg-white p-4 shadow-lg flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-500 uppercase">{category}</p>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        <button className="bg-blue-900 text-white p-2 rounded-full">
          <FiPlus className="text-lg" />
        </button>
      </div>
    </div>
  );
};

export default CurriculumCard;
