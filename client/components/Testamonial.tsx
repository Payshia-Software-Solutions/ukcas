"use client";
import React, { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import CommentCard from "./Common/CommentCard";

const Testimonial = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const cards = [
    {
      name: "Yomal",
      role: "Theekshan",
      image: "/assets/curriculum/card1.jpg",
      comment:
        "Assessment and Certification system of Skill Development Council Canada is simply amazing. They have a very transparemt and fully digital system for all processes. We are very thankful to SDC Canada for our partnerhsip",
    },
    {
      name: "Alex",
      role: "Designer",
      image: "/assets/curriculum/card2.jpg",
      comment:
        "The best part of Skill Development Council Canada is their team of experts. Their team is wonderful and helped us solve our challenges in conducting assessments and awarding the qualifications. We recommend them to all training organisations worldwide.",
    },
    {
      name: "Emma",
      role: "Developer",
      image: "/assets/curriculum/card3.jpg",
      comment:
        "Assessment and Certification system of Skill Development Council Canada is simply amazing. They have a very transparemt and fully digital system for all processes. We are very thankful to SDC Canada for our partnerhsip.",
    },
  ];

  return (
    <section className="relative w-full bg-white px-8 flex justify-center items-center min-h-[700px]">
      {/* Background Image */}
      <div className="absolute inset-0 h-auto md:h-[700px] flex justify-center items-center">
        <img
          src="/assets/testamonial/background.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Content */}
      <div className="grid text-white bg-[#0b1c39]/80 px-8 py-10 md:py-16 rounded-3xl min-h-[600px] grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-[100rem] relative items-center text-center md:text-left backdrop-blur-md">
        {/* Left Section */}
        <div className="col-span-1 flex flex-col justify-center items-center md:items-start">
          <p className=" text-base uppercase">Testimonial</p>
          <div className="text-cent">
            <h2 className="text-4xl md:text-5xl font-bold ">
              23k+ Customers gave their <span className="">Feedback</span>
            </h2>
          </div>

          <div className="mt-8 flex gap-5">
            <button
              ref={prevRef}
              className="border border-white bg-white text-black rounded-lg p-4  hover:text-white transition"
            >
              <ArrowLeft size={24} />
            </button>
            <button
              ref={nextRef}
              className="border border-white bg-white text-black rounded-lg p-4  hover:text-white transition"
            >
              <ArrowRight size={24} />
            </button>
          </div>
        </div>

        {/* Right Section - Swiper */}
        <div className="col-span-2">
          <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 2 },
            }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            loop={true}
            className="w-full"
            onSwiper={(swiper) => {
              setTimeout(() => {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
              });
            }}
          >
            {cards.map((card, index) => (
              <SwiperSlide>
                <CommentCard
                  key={index}
                  name={card.name}
                  image={card.image}
                  role={card.role}
                  comment={card.comment}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
