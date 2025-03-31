import React from "react";
import Image from "next/image";

const WelcomeMessage: React.FC = () => {
  return (
    <section className="flex flex-col md:flex-row items-center p-6 max-w-4xl mx-auto">
      {/* Image Section */}
      <div className="w-full md:w-[20rem] p-4">
        <Image 
         src="/assets/about/director.jpg"
         alt="Business Professional"
         width={500} 
         height={300} 
          className="rounded-lg shadow-md w-full"
        />
      </div>

      {/* Text Section */}
      <div className="w-full md:w-1/2 p-4">
        <h2 className="text-2xl font-bold mb-4">Welcome Message from Director</h2>
        <p className="text-gray-700 mb-4">
          Welcome to UK International Qualifications. We are a leading skill qualifications provider with over a decade of expertise in the area. We have finally formalized our journey in the area of human resource development by making skill training accessible to all through our global platform.
        </p>
        <p className="text-gray-700 mb-4">
          UK International Qualifications Ltd (UKIQ) was formally founded on the experience in a long tradition of higher education in the arts, sciences, and numerous professional disciplines. We also support and encourage internationally-connected research collaborations around skilling and TVET.
        </p>
        <p className="text-gray-700 font-semibold">Thank you for taking the time to visit us.</p>
        <p className="text-gray-900 font-bold mt-2">Director</p>
      </div>
    </section>
  );
};

export default WelcomeMessage;
