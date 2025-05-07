"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import config from "@/config";

// 🧩 Type definition for the service
interface ServiceData {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  time: string;
  category: string;
  slug: string;
}

export default function SingleServicePage() {
  const { slug } = useParams();
  const [serviceData, setServiceData] = useState<ServiceData | null>(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await axios.get(
          `${config.API_BASE_URL}/services/slug/${slug}`
        );
        setServiceData(res.data);
      } catch (err) {
        console.error("Failed to fetch service:", err);
      }
    };

    if (slug) fetchService();
  }, [slug]);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  if (!serviceData) {
    return <div className="text-center py-20">Loading...</div>;
  }

  const pastelColors = [
    "bg-pink-100 text-pink-800",
    "bg-purple-100 text-purple-800",
    "bg-yellow-100 text-yellow-800",
    "bg-green-100 text-green-800",
    "bg-blue-100 text-blue-800",
    "bg-indigo-100 text-indigo-800",
    "bg-red-100 text-red-800",
    "bg-teal-100 text-teal-800",
  ];

  return (
    <motion.div
      className="min-h-screen container mt-38 mx-auto max-w-6xl"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <Breadcrumb
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/service", label: "Service" },
          { href: `/service/${slug}`, label: serviceData.title },
        ]}
        fontColor=""
      />

      <div className="relative h-[28rem] mt-5 w-full">
        <Image
          src={`/assets/services/${serviceData.imageUrl}`}
          alt={serviceData.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="container mx-auto px-4 pb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {serviceData.title}
            </h1>
            <div className="flex flex-wrap gap-4 text-white">
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span>{serviceData.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} />
                <span>{serviceData.time}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 px-4">
        <div className="flex flex-col justify-center items-center">
          <motion.div
            className="bg-gray-100/50 rounded-xl shadow-sm p-8 mb-8"
            variants={fadeIn}
          >
            <h2 className="text-2xl font-semibold mb-4">About This Service</h2>
            <p className="text-gray-700 mb-6 whitespace-pre-line">
              {serviceData.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {serviceData.category
                ?.split(",")
                .map((cat: string, idx: number) => {
                  const randomColor =
                    pastelColors[Math.floor(Math.random() * pastelColors.length)];
                  return (
                    <span
                      key={idx}
                      className={`${randomColor} text-sm font-medium px-3 py-1 rounded-full`}
                    >
                      {cat.trim()}
                    </span>
                  );
                })}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
