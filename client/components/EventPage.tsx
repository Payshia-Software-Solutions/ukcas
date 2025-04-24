"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "@/components/Common/EventCard";
import Link from "next/link";
import config from "../config";

// ✅ Define the type for each event item
interface Event {
  id: string;
  title: string;
  description: string;
  mini_description?: string;
  img_url: string;
  category: string;
  slug: string;
}

const EventPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(`${config.API_BASE_URL}/news`);  //   {}"http://localhost:5000/api/v2/news"
        console.log("Fetched news:", res.data);
        setEvents(res.data);
      } catch (err) {
        console.error("Failed to fetch news:", err);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="bg-gray-100 py-12 px-6">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-900">Our News And Insights</h2>
        <p className="text-red-500 font-semibold mt-2">LATEST NEWS</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {events.map((event) => (
          <EventCard
            key={event.id}
            image={`/assets/curriculum/${event.img_url}`}
            category={event.category}
            title={event.title}
            description={event.mini_description || event.description}
            link={`/${event.slug}`}
          />
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <Link href="/event">
          <button className="px-6 py-3 bg-[#7E3841] hover:bg-[#74323B] text-white font-semibold rounded-full shadow-md transition">
            LEARN MORE
          </button>
        </Link>
      </div>
    </div>
  );
};

export default EventPage;
