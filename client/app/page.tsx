import AboutSection from "@/components/AboutSection";
import EventCard from "@/components/Common/EventCard";
import CounterSection from "@/components/Counter";
import CurriculumCardsSection from "@/components/CurriculumCardsSection";
import EventPage from "@/components/EventPage";
import HeroSection from "@/components/HeroSection";
import Testamonial from "@/components/Testamonial";
import WhyChooseUs from "@/components/WhyChooseUs";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <CounterSection />
      <CurriculumCardsSection />
      <WhyChooseUs />

      <Testamonial />
      <EventPage />
    </div>
  );
}
