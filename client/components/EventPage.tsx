import React from "react";
import EventCard from "@/components/Common/EventCard";


const EventPage: React.FC = () => {
    const events = [
        {
          image: "/assets/curriculum/card2.jpg",
          category: "Skill Certifications",
          title: "Unmasking Fraud: A Guide To Identifying Fake Learning Partner Certificates",
          date: "January 12, 2024",
          description: "Learn how to identify and prevent fraudulent learning partner certifications to protect your credentials.",
          link: "#"
        },
        {
          image: "/assets/curriculum/card2.jpg",
          category: "Future Careers",
          title: "Elevate Your Professional Profile With International Certifications",
          date: "August 28, 2023",
          description: "Discover how international certifications can enhance your job prospects and career growth.",
          link: "#"
        },
        {
          image: "/assets/curriculum/card3.jpg",
          category: "Skill Certifications",
          title: "International Certifications For Career Changers",
          date: "September 14, 2022",
          description: "A guide to using international certifications to switch careers and boost employability.",
          link: "#"
        }
      ];
      

  return (
    <div className="bg-gray-100 py-12 px-6">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-900">Our News And Insights</h2>
        <p className="text-red-500 font-semibold mt-2">LATEST NEWS</p>
      </div>
          



      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {events.map((event, index) => (
          <EventCard key={index} 
          image={event.image}
          category={event.category}
          title={event.title}
          description={event.description}
          link={event.link}

          />
        ))}
      </div>
    </div>
  );
};

export default EventPage;
