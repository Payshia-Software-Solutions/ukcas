import AboutSection from "@/components/AboutSection";
import CurriculumCardsSection from "@/components/CurriculumCardsSection";
import HeroSection from "@/components/HeroSection";
import Image from "next/image";

export default function Home() {
  return (
    <div>

      <HeroSection/>
      <AboutSection/>
      <CurriculumCardsSection/>
    </div>
  );
}
