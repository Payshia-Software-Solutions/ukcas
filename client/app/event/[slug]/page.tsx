"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";

import Breadcrumb from "@/components/Breadcrumb";

// This would typically come from a database or API
const eventData = {
  id: "tech-innovation-summit",
  title: "Tech Innovation Summit 2025",
  date: "May 15, 2025",
  time: "9:00 AM - 5:00 PM",
  location: "Convention Center, New York City",
  image: "/assets/about/headerimage.jpg",
  category: "Conference",
  description:
    "Join industry leaders for discussions on emerging technologies and future trends in the tech world.",
  longDescription: `
    The Tech Innovation Summit brings together the brightest minds in technology to explore the future of innovation. This full-day conference features keynote presentations, panel discussions, and interactive workshops focused on the latest breakthroughs in AI, blockchain, IoT, and more.
    
    Attendees will have the opportunity to network with industry leaders, discover cutting-edge technologies, and gain insights into how these innovations will shape our world in the coming years.
  `,
};

export default function SingleEventPage() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <motion.div
      className=" min-h-screen container mt-38 mx-auto max-w-6xl "
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <Breadcrumb
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/event", label: "event" },
          { href: "/slug", label: "slug" },
        ]}
        fontColor=""
      />
      {/* Hero Section with Image */}
      <div className="relative h-[28rem] mt-5 w-full">
        <Image
          src={eventData.image}
          alt={eventData.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="container mx-auto px-4 pb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {eventData.title}
            </h1>
            <div className="flex flex-wrap gap-4 text-white">
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span>{eventData.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} />
                <span>{eventData.time}</span>
              </div>
             
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-10  px-4">
        <div className="flex flex-col justify-center items-center">
          <div className="">
            <motion.div
              className="bg-gray-100/50 rounded-xl shadow-sm p-8 mb-8"
              variants={fadeIn}
            >
              <h2 className="text-2xl font-semibold mb-4">About This Event</h2>
              <p className="text-gray-700 mb-6 whitespace-pre-line">
                {eventData.longDescription}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                  {eventData.category}
                </span>
                <span className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
                  Technology
                </span>
                <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                  Innovation
                </span>
              </div>

              {/* <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users size={18} className="text-gray-500" />
                  <span className="text-gray-500">{eventData.capacity} capacity ({eventData.remainingTickets} spots left)</span>
                </div>
                <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
                  <Share2 size={18} />
                  <span>Share</span>
                </button>
              </div> */}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
