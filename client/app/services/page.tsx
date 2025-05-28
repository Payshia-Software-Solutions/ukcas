"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import ServiceCard from "@/components/ServiceCard"; // Make sure to create the ServiceCard component
import { motion } from "framer-motion";
import Breadcrumb from "@/components/Breadcrumb";
import config from "@/config";

// 🧩 Define the Service type
interface Service {
  id: number;
  category: string;
  title: string;
  description: string;
  imageUrl: string;
  slug: string;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        // Fetch services from the backend API
        const res = await axios.get(`${config.API_BASE_URL}/service`);
        console.log("Fetched services:", res.data); // 🔍 Log to see the data
        setServices(res.data);
      } catch (err) {
        console.error("Error fetching services:", err);
      }
    };

    fetchServices();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <div className="bg-gradient-to-b mt-20 from-gray-50 to-gray-100 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="my-6">
          <Breadcrumb
            crumbs={[
              { href: "/", label: "Home" },
              { href: "/services", label: "Services" },
            ]}
            fontColor=""
          />
        </div>

        <div className="text-center my-8">
          <h2 className="text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-xl mb-4">
            Explore our wide range of services designed to meet your business needs.
          </p>
        </div>

        <motion.div
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {services.length === 0 ? (
            <p className="text-center col-span-full text-gray-500">
              No services available at the moment. Check back later!
            </p>
          ) : (
            services.map((service: Service) => (
              <motion.div
                key={service.id}
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="flex justify-center"
              >
                <ServiceCard
                  imageUrl={service.imageUrl}
                  category={service.category}
                  title={service.title}
                  description={service.description}
                  link={`/services/${service.slug}`} // Link to service detail page using the slug
                />
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </div>
  );
}
