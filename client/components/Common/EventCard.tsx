"use client"
import React from "react";
import Image from "next/image";

interface EventCardProps {
  image: string;
  category: string;
  title: string;
  description: string;
  link: string;
}

const EventCard: React.FC<EventCardProps> = ({ image, category, title, description, link }) => {
  return (
    <div className="relative min-w-[20rem]  max-w-sm bg-white rounded-xl shadow-md overflow-hidden group">
      
      {/* Card Content (image + text) */}
      <div className="relative z-10">
        <Image
          className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
          src={image}
          width={500}
          height={300}
          alt={title}
        />

        <div className="p-4 mt-2">
          <p className="text-sm text-gray-600">{category}</p>
          <h3 className="text-xl font-semibold mt-1">{title}</h3>
        </div>
      </div>

      {/* Full Card Overlay */}
      <div className="absolute inset-0 z-20 bg-black/60 opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out flex flex-col justify-center items-center text-center text-white p-6">
        <p className="text-lg">{description}</p>
        <a
          href={link}
          className="text-white border px-6 py-3 border-white rounded-full font-semibold mt-4 inline-block"
          aria-label={`Read more about ${title}`}
        >
          Read More →
        </a>
      </div>
    </div>
  );
};

export default EventCard;
