import React from "react";

const TrustedClients: React.FC = () => {
  return (
    <section className="bg-[#74323B] text-white p-8 rounded-lg max-w-6xl mx-auto text-center">
      <h4 className="text-sm font-semibold uppercase tracking-wide mb-2 flex items-center justify-center gap-2">
        Join Us <span className="w-12 h-0.5 bg-red-400"></span>
      </h4>
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Trusted By More <br /> Than <span>150k Clients.</span>
      </h2>
      <p className="text-gray-300 text-sm md:text-base mb-6">
        Join us to upgrade your institute with international certification. Our
        globally acclaimed systems in assessment & certification will help your
        trainees reach greater heights. The partnership with Skill Development
        Council Canada Inc will support you to constantly grow every year.
      </p>
      <button className="bg-red-500 text-white font-semibold px-6 py-3 rounded-full text-lg hover:bg-red-600 transition duration-300">
        GET ACCREDITED
      </button>
    </section>
  );
};

export default TrustedClients;
