"use client";

import CurriculumCard from "@/components/CurriculumCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const CurriculumCardsSection = () => {
  const cards = [
    { image: "/assets/curriculum/card1.jpg", category: "INTERNATIONAL", title: "Curriculum Design" },
    { image: "/assets/curriculum/card2.jpg", category: "INTERNATIONAL", title: "Skill Assessments" },
    { image: "/assets/curriculum/card3.jpg", category: "INTERNATIONAL", title: "Employability Research" },
    { image: "/assets/curriculum/card1.jpg", category: "INTERNATIONAL", title: "Skill Certifications" },
  ];

  return (
    <section className="bg-[#7C2B33] py-16 text-white text-center">
      <h2 className="text-4xl font-bold">What We Are Offering</h2>
      <p className="text-sm uppercase text-gray-400 mt-2">Our Services</p>

      {/* Mobile View: Swiper */}
      <div className="block md:hidden mt-8 px-4">
        <Swiper
          modules={[Pagination]}
          spaceBetween={20}
          pagination={{
            clickable: true,
            el: ".custom-swiper-pagination",
          }}
          slidesPerView={1.1}
        >
          {cards.map((card, index) => (
            <SwiperSlide key={index}>
              <CurriculumCard {...card} />
            </SwiperSlide>
          ))}
        </Swiper>
         {/* Custom pagination outside the card */}
  <div className="custom-swiper-pagination absolute left-1/2 -translate-x-1/2 flex gap-2 mt-4 "></div>

      </div>

      {/* Desktop View: Grid */}
      <div className="hidden md:flex flex-wrap justify-center gap-6 mt-8">
        {cards.map((card, index) => (
          <CurriculumCard key={index} {...card} />
        ))}
      </div>
    </section>
  );
};

export default CurriculumCardsSection;
