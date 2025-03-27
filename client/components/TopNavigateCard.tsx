"use client";
import React from "react";
import { FiUsers, FiCheckCircle, FiAward } from "react-icons/fi"; // Import icons

interface CardItem {
  title: string;
  link: string;
  icon: React.ReactNode;
}

const cardItems: CardItem[] = [
  { title: "Partnerships", link: "#", icon: <FiUsers className="text-2xl text-indigo-900" /> },
  { title: "Get Accredited", link: "#", icon: <FiCheckCircle className="text-2xl text-indigo-900" /> },
  { title: "Qualifications", link: "#", icon: <FiAward className="text-2xl text-indigo-900" /> },
];

const TopNavigateCard: React.FC = () => {
  return (
    <div className="bg-white text-black shadow-lg rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center md:w-[50rem] mx-auto">
      {cardItems.map((item, index) => (
        <div key={index} className="flex-1 mt-4 text-center">
          
          <div className="flex items-center justify-center mb-2">{item.icon}</div> {/* Icon */}
          <h3 className="font-semibold md:mt-0 mt-4 text-lg">{item.title}</h3>
          <a href={item.link} className="text-indigo-900 font-medium mt-2 inline-flex items-center">
            Learn More <span className="ml-1">➜</span>
          </a>
        </div>
      ))}
    </div>
  );
};

export default TopNavigateCard;
