import AboutSection from "@/components/AboutSection";
import CurriculumCardsSection from "@/components/CurriculumCardsSection";
import HeroSection from "@/components/HeroSection";
import Testamonial from "@/components/Testamonial";
import WhyChooseUs from "@/components/WhyChooseUs";
import Image from "next/image";

export default function Home() {
  return (
    <div>

      <HeroSection/>
      <AboutSection/>
      <CurriculumCardsSection/>
      <WhyChooseUs/>
      <Testamonial/>
    </div>
  );
}
