"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "@/components/Common/EventCard";
import { motion } from "framer-motion";
import Breadcrumb from "@/components/Breadcrumb";
import config from "@/config";

// 🧩 Define the event type
interface Event {
  id: string;
  title: string;
  description: string;
  mini_description?: string;
  img_url: string;
  category: string;
  slug: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(
          `${config.API_BASE_URL}/news`
        );
        console.log("Fetched events:", res.data); // 🔍 Log to see the data
        setEvents(res.data);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };

    fetchEvents();
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
              { href: "/event", label: "event" },
            ]}
            fontColor=""
          />
        </div>

        <div className="text-center my-8">
          <h2 className="text-4xl font-bold mb-4">Upcoming Events</h2>
          <p className="text-xl mb-4">
            Discover our carefully curated events designed to inspire, educate,
            and connect our community.
          </p>
        </div>

        <motion.div
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {events.length === 0 ? (
            <p className="text-center col-span-full text-gray-500">
              No upcoming events at the moment. Check back later!
            </p>
          ) : (
            events.map((event: Event) => (
              <motion.div
                key={event.id}
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="flex justify-center"
              >
                <EventCard
                  image={`/assets/curriculum/${event.img_url}`}
                  category={event.category}
                  title={event.title}
                  description={event.mini_description || event.description}
                  link={`/${event.slug}`}
                />
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </div>
  );
}
