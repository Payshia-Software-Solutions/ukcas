"use client";
import React from "react";
import { motion } from "framer-motion";
// import { FaArrowAltCircleRight } from 'react-icons/fa';
import Image from "next/image";
import Link from "next/link";

interface PromotionCardProps {
  imageSrc: string;
  title: string;
  description: string;
  link: string;
}

const PromotionCard: React.FC<PromotionCardProps> = ({
  imageSrc,
  title,

  link,
}) => {
  return (
    <Link href={`/Partnerships/${link}`}>
      <motion.div
        className="bg-white shadow-lg rounded-lg overflow-hidden relative"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        {/* Image */}
        <div className="h-48 overflow-hidden">
          <Image
            src={imageSrc}
            alt={title}
            width={500}
            height={300}
            className="w-full h-full object-cover transition-transform duration-300 "
          />
        </div>

        {/* <motion.div
        className="absolute inset-0 bg-black/70 text-white px-6 py-2 flex flex-col items-center justify-center opacity-0"
        whileHover={{ opacity: 1 }} 
        transition={{ duration: 0.3 }}
      >
        <h2 className='text-xl text-center my-6 border-b-2 border-white'>Description</h2>
        <p className="text-lg text-center">{description}</p>


        <a 
          href={` /Partnerships/${link}`}
          className="mt-4 text-white flex items-center text-lg font-semibold hover:underline"
        >
          <span>Learn More</span>

          <motion.div
            className="ml-2"
            whileHover={{ rotate: 360 }}  
            transition={{ duration: 1, repeat: 0, ease: 'easeInOut' }}
          >
            <FaArrowAltCircleRight className="text-xl  w-8 h-8 " />
          </motion.div>
        </a>
      </motion.div> */}

        {/* Content */}
        <div className="p-4">
          <h3 className="text-xl font-semibold">{title}</h3>
          {/* <p className="text-gray-600 mt-2">{description}</p> */}
        </div>
      </motion.div>
    </Link>
  );
};

export default PromotionCard;
