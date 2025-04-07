"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumb";

const SinglePromotionPage: React.FC = () => {
  // Sample promotion data
  const promotion = {
    id: "summer-special",
    imageSrc: "/assets/curriculum/card2.jpg",
    title: "Summer Special Offer",
    description:
      "Get 20% off on all summer products until the end of the month.",
    longDescription:
      "Take advantage of our amazing summer sale with discounts on all seasonal items. Perfect for your outdoor activities, beach trips, and summer parties. This limited-time offer brings you the best quality products at unbeatable prices.",
    startDate: "April 1, 2025",
    endDate: "April 30, 2025",
    terms: [
      "Discount applies to selected summer items only",
      "Cannot be combined with other offers",
      "Valid for both online and in-store purchases",
      "Limited stock available",
    ],
  };

  return (
    <section className="mt-20 bg-gradient-to-br from-gray-50 to-gray-100 ">
       
       <Breadcrumb
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/Partnerships", label: "Partnerships" },
          { href: "/slug", label: "Slug" },
          
        ]}
        fontColor=""
      />
      
      <div className="min-h-screen py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="w-full h-[30rem] relative"
            >
              <Image
                src={promotion.imageSrc}
                alt={promotion.title}
                width={500}
                height={300}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="p-6 sm:p-8"
                >
                  <h1 className="text-3xl sm:text-4xl font-bold text-white">
                    {promotion.title}
                  </h1>
                </motion.div>
              </div>
            </motion.div>

            <div className="p-6 sm:p-8">
              {/* Dates with fade-in animation */}
              {/* <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="flex items-center text-gray-500 mb-4"
      >
        <FaCalendarAlt className="mr-2" />
        <span>From {promotion.startDate} - Until {promotion.endDate}</span>
      </motion.div> */}

              {/* Description with slide up animation */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="prose max-w-none mb-8"
              >
                <p className="text-lg text-gray-700">{promotion.description}</p>
                <p className="mt-4 text-gray-600">
                  {promotion.longDescription}
                </p>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="mb-8"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  Terms & Conditions
                </h2>
                <ul className="bg-gray-50 rounded-lg p-4">
                  {promotion.terms.map((term, index) => (
                    <motion.li
                      key={index}
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.7 + index * 0.1, duration: 0.3 }}
                      className="mb-2 last:mb-0 flex items-start"
                    >
                      <span className="inline-block w-1 h-1 rounded-full bg-gray-500 mt-2 mr-2"></span>
                      <span>{term}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.button
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3  bg-[#7C2B33] text-white rounded-lg font-medium transition-colors"
              >
                GET ACCREDITED
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SinglePromotionPage;
