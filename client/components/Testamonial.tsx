"use client";
import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";
import type { NavigationOptions } from "swiper/types";
import "swiper/css";
import "swiper/css/navigation";
import CommentCard from "./Common/CommentCard";
import Image from "next/image";
import config from "../config";

// ✅ Define the Comment type
interface Comment {
  id: string;
  name: string;
  role: string;
  comment: string;
  img_url: string;
}

const Testimonial = () => {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  const [cards, setCards] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`${config.API_BASE_URL}/comment`);
        setCards(res.data);
        console.log("Fetched comments:", res.data);
      } catch (err) {
        console.error("Failed to fetch comments:", err);
      }
    };

    fetchComments();
  }, []);

  useEffect(() => {
    if (swiperRef.current?.navigation) {
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, []);

  return (
    <section className="relative w-full bg-white px-8 flex justify-center items-center min-h-[700px]">
      <div className="absolute inset-0 h-auto md:h-[700px] flex justify-center items-center">
        <Image
          src="/assets/testamonial/background.jpg"
          width={500}
          height={300}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-black opacity-40" />

      <div className="grid text-white bg-[#7C2B33]/80 px-8 py-10 md:py-16 rounded-3xl min-h-[600px] grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-[100rem] relative items-center text-center md:text-left backdrop-blur-md">
        <div className="col-span-1 flex flex-col justify-start items-center md:items-start text-start md:text-left">
          <p className="text-base my-6 md:my-0 uppercase">Testimonial</p>
          <h2 className="text-3xl md:text-5xl font-bold">
            23k+ Customers gave their <span>Feedback</span>
          </h2>
          <div className="mt-8 gap-5 hidden md:flex">
            <button
              ref={prevRef}
              className="border border-white bg-white text-black rounded-lg p-4 hover:bg-black hover:text-white transition"
            >
              <ArrowLeft size={24} />
            </button>
            <button
              ref={nextRef}
              className="border border-white bg-white text-black rounded-lg p-4 hover:bg-black hover:text-white transition"
            >
              <ArrowRight size={24} />
            </button>
          </div>
        </div>

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
            loop={true}
            className="w-full"
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              if (typeof swiper.params.navigation === "object") {
                const navigation = swiper.params.navigation as NavigationOptions;
                if (prevRef.current && nextRef.current) {
                  navigation.prevEl = prevRef.current;
                  navigation.nextEl = nextRef.current;
                  swiper.navigation.init();
                  swiper.navigation.update();
                }
              }
            }}
          >
            {cards.map((card) => (
              <SwiperSlide key={card.id}>
                <CommentCard
                  name={card.name}
                  image={`/assets/curriculum/${card.img_url}`}
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
