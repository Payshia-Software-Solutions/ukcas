"use client";
import { motion } from "framer-motion";
import TopNavigateCard from "@/components/TopNavigateCard";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section >
      <div className="relative flex items-center justify-center h-screen text-white mb-6">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/assets/images/hero.jpg"
            width={500} 
            height={300}
            alt="International Learning"
            className="w-full h-full object-cover "
          />
        </div>

        {/* Overlay */}
         <div className="absolute inset-0 bg-black opacity-40"></div> 

        {/* Content Wrapper with Motion */}
        <motion.div
          className="absolute left-6 top-1/2 transform -translate-y-1/2 z-10 max-w-xs md:max-w-md lg:max-w-2xl p-6 
                    md:text-left md:left-24 lg:left-48 md:top-[36rem]"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", staggerChildren: 0.3 }}
        >
          {/* Title Animation */}
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            International Learning
          </motion.h1>

          {/* Paragraph Animation */}
          <motion.p
            className="mt-6 md:mt-8 text-[20px] text-start md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Transform your life through knowledge and skills. Raise your
            standards by acquiring internationally verifiable credentials from
            the UK.
          </motion.p>

          {/* Button Animation */}
          <motion.button
            className="mt-6 md:mt-8 px-4 md:px-6 py-2 md:py-3 bg-blue-600 text-white font-semibold rounded-lg 
                     hover:bg-blue-700 transition"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            APPLY NOW
          </motion.button>
        </motion.div>
      </div>

      <div className="md:absolute  md:-bottom-10 w-full">
        <TopNavigateCard />
      </div>
    </section>
  );
};

export default HeroSection;
