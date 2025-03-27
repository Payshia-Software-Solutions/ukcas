"use client";
import CurriculumCard from "@/components/CurriculumCard";

const CurriculumCardsSection = () => {
    const cards = [
      { image: "/assets/curriculum/card1.jpg", category: "INTERNATIONAL", title: "Curriculum Design" },
      { image: "/assets/curriculum/card2.jpg", category: "INTERNATIONAL", title: "Skill Assessments" },
      { image:"/assets/curriculum/card3.jpg", category: "INTERNATIONAL", title: "Employability Research" },
      { image: "/assets/curriculum/card1.jpg", category: "INTERNATIONAL", title: "Skill Certifications" },
    ];
  
    return (
      
      <section className="bg-[#0b1c39] py-16 text-white text-center">

        {/* test */}
        <h2 className="text-4xl font-bold">What We Are Offering</h2>
        <p className="text-sm uppercase text-gray-400 mt-2">Our Services</p>
        <div className="flex flex-wrap justify-center gap-6 mt-8">
          {cards.map((card, index) => (
            <CurriculumCard key={index} {...card} />
          ))}
        </div>
      </section>
    );
  };
  
  export default CurriculumCardsSection;