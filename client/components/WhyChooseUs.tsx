import React from "react";
import { Brain, Search, GraduationCap } from "lucide-react";

const features = [
  {
    title: "Intellectual Curriculum",
    description:
      "Employers value and trust our approach thanks to the expertise in our curriculum",
    icon: <Brain size={48} className="text-blue-500" />,
  },
  {
    title: "Driven By Research",
    description:
      "We do a lot of research before developing and proposing a qualification.",
    icon: <Search size={48} className="text-red-500" />,
  },
  {
    title: "Global Certification",
    description:
      "Everyone values us and accepts our systems for Skill development & Training",
    icon: <GraduationCap size={48} className="text-green-500" />,
  },
];

const WhyChooseUs: React.FC = () => {
  return (
    <section className="text-center p-10 bg-white">
      <h2 className="text-4xl font-bold">Why Choose Us</h2>
      <p className="text-gray-600 mt-6 text-lg mb-10 max-w-xl mx-auto">
        Embark on a transformative educational journey with UK International
        Qualifications (UKIQ). Here's why choosing us sets you on a distinct
        path to success
      </p>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl h-auto mx-auto">
        {features.map((feature, index) => (
          <div key={index} className="text-center p-6 hover:shadow-lg rounded-lg">
            <div className="mb-4 flex justify-center">{feature.icon}</div>
            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <p className="text-gray-600 mt-2">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
