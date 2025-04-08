"use client"
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Define the shape of a service item
interface ServiceCardProps {
  category: string;
  title: string;
  imageUrl: string;
  description: string;
  onClick?: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  category,
  title,
  imageUrl,
  description,
  onClick
}) => {
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md overflow-hidden relative h-full"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
    >
      <div className="h-64 overflow-hidden">
        
        <Image 
          src={imageUrl} 
          alt={title} 
          width={500} 
          height={300} 
          className="w-full h-full object-cover hover:scale-125"
        />
      </div>
      <div className="p-6 text-center">
        <p className="text-red-500 uppercase font-medium tracking-wide mb-2">{category}</p>
        <h3 className="text-2xl  text-slate-800">{title}</h3>
      </div>

      {/* Description overlay that appears on hover */}
      <motion.div 
        className="absolute inset-0 bg-slate-800 bg-opacity-80 flex items-center justify-center p-6"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-center">
          {/* <p className="text-red-400 uppercase font-medium tracking-wide mb-2">{category}</p> */}
          <h3 className="text-2xl  text-white mb-4">Description</h3>
          <p className="text-white text-lg">
            {description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ServiceCard;