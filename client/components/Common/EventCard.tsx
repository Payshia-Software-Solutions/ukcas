"use client"
import React from "react";
import { motion } from "framer-motion";

interface EventCardProps {
  image: string;
  category: string;
  title: string;
  description: string;
  link: string;
}

const EventCard: React.FC<EventCardProps> = ({ image, category, title, description, link }) => {
  return (
    <div className="max-w-sm bg-white rounded-xl shadow-md overflow-hidden relative group">
      {/* Image Container */}
      <div className="relative">
        <img className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105" src={image} alt={title} />
        
        {/* Overlay content (hidden by default, appears on hover) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute inset-0 bg-black/60  h-auto flex flex-col justify-center items-center text-center text-white p-4  "
        >
      
          <p className="text-lg mt-2">{description}</p>
          <a href={link} className="text-white border px-6 py-4 border-white rounded-full font-semibold mt-4 inline-block ">
            Read More →
          </a>
        </motion.div>
        <div className="mt-6 p-4"> 
        <p className="text-sm">{category}</p>
        <h3 className="text-xl font-semibold mt-1">{title}</h3>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
