"use client";

import EventCard from "@/components/Common/EventCard"; // Assuming the EventCard component is in the same directory
import { motion } from "framer-motion";
import Breadcrumb from "@/components/Breadcrumb";

export default function EventsPage() {


  // Sample event data - replace with your actual data
  const events = [
    {
      id: 1,
      image: "/assets/curriculum/card1.jpg",
      category: "Conference",
      title: "Tech Innovation Summit 2025",
      description:
        "Join industry leaders for discussions on emerging technologies and future trends in the tech world.",
      link: "tech-innovation-summit",
    },
    {
      id: 2,
      image: "/assets/curriculum/card2.jpg",
      category: "Workshop",
      title: "UI/UX Design Masterclass",
      description:
        "A hands-on workshop covering the latest design principles and tools for creating exceptional user experiences.",
      link: "design-masterclass",
    },
    {
      id: 3,
      image: "/assets/curriculum/card3.jpg",
      category: "Networking",
      title: "Startup Networking Mixer",
      description:
        "Connect with fellow entrepreneurs, investors, and industry experts in this casual networking event.",
      link: "startup-mixer",
    },
    {
      id: 4,
      image: "/assets/curriculum/card1.jpg",
      category: "Webinar",
      title: "Sustainable Business Practices",
      description:
        "Learn how to implement eco-friendly strategies that benefit both your business and the environment.",
      link: "sustainable-business",
    },
    
    {
      id: 5,
      image: "/images/event5.jpg",
      category: "Seminar",
      title: "Blockchain Technology for Beginners",
      description:
        "An introduction to blockchain, its applications, and how it is revolutionizing industries around the world.",
      link: "blockchain-beginners",
    },
    {
      id: 6,
      image: "/images/event6.jpg",
      category: "Hackathon",
      title: "Hack for Good 2025",
      description:
        "A 48-hour hackathon where developers collaborate to create solutions for social impact and good causes.",
      link: "hack-for-good",
    },
    {
      id: 7,
      image: "/images/event7.jpg",
      category: "Panel Discussion",
      title: "Future of Artificial Intelligence",
      description:
        "Join a panel of experts as they explore the current state of AI and its potential impact on various industries.",
      link: "future-of-ai",
    },
    {
      id: 8,
      image: "/images/event8.jpg",
      category: "Training",
      title: "Advanced JavaScript Techniques",
      description:
        "Deep dive into advanced JavaScript topics including asynchronous programming, design patterns, and optimization.",
      link: "advanced-javascript",
    },
  ];
  

  // Animation variants
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
        {/* Page Header with Animation */}
       <div className="my-6">
       <Breadcrumb
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/event", label: "event" }
         
        ]}
        fontColor=""
      />
       </div>

        <div className="text-center my-8 ">
          <h2 className="text-4xl font-bold mb-4"> Upcoming Events</h2>

          <p className="text-xl mb-4">
            Discover our carefully curated events designed to inspire, educate,
            and connect our community.
          </p>
        </div>

        {/* Events Row with Animation */}
        <motion.div
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-16 "
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {events.map((event) => (
            <motion.div
              key={event.id}
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="flex justify-center"
            >
              <EventCard
                image={event.image}
                category={event.category}
                title={event.title}
                description={event.description}
                link={event.link}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
