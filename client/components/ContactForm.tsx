import React from "react";
import { FaPhoneAlt, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";

const ContactForm: React.FC = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-50 p-6 md:p-12">
      {/* Left Section */}
      <div className="md:w-auto h-auto md:h-[30rem] px-6 md:px-12 py-8 text-center bg-[#0b1c39] md:text-left mb-6 md:mb-0 w-full">
        <h2 className="text-3xl md:text-5xl font-bold text-white">
          Let&rsquo;s chat.<br /> Tell me about your project.
        </h2>
        <p className="text-white mt-4 text-base md:text-lg">Let&rsquo;s create something together ✨</p>

        <div className="flex flex-col md:flex-row justify-center md:justify-start items-center md:items-start gap-4 md:gap-8">
          {/* Email */}
          <div className="mt-6 flex items-center justify-center w-full md:w-auto bg-white shadow-lg p-4 md:p-6 rounded-lg">
            <FaEnvelope className="text-gray-600 mr-3 text-xl md:text-2xl" />
            <a href="mailto:framesmillion@gmail.com" className="text-black font-semibold text-sm md:text-lg">
              framesmillion@gmail.com
            </a>
          </div>

          {/* Phone */}
          <div className="mt-6 flex items-center justify-center w-full md:w-auto bg-white shadow-lg p-4 md:p-6 rounded-lg">
            <FaPhoneAlt className="text-gray-600 mr-3 text-xl md:text-2xl" />
            <a href="tel:+123456789" className="text-black font-semibold text-sm md:text-lg">
              +1 234 567 89
            </a>
          </div>
        </div>

        {/* Address */}
        <div className="mt-6 flex items-center justify-center md:justify-start bg-white shadow-lg p-4 md:p-6 rounded-lg w-full">
          <FaMapMarkerAlt className="text-gray-600 mr-3 text-xl md:text-2xl" />
          <span className="text-gray-700 text-sm md:text-lg">1234 Street Name, City, Country</span>
        </div>
      </div>

      {/* Right Section (Form) */}
      <div className="md:w-2/3 bg-white shadow-xl rounded-lg p-6 md:p-8 w-full max-w-xl">
        <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4 md:mb-6">
          Send us a message🚀
        </h3>
        <form className="flex flex-col space-y-4 md:space-y-6">
          <input
            type="text"
            placeholder="Full name*"
            className="border border-gray-300 p-3 md:p-4 rounded-md text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="email"
            placeholder="Email address*"
            className="border border-gray-300 p-3 md:p-4 rounded-md text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="text"
            placeholder="Subject"
            className="border border-gray-300 p-3 md:p-4 rounded-md text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <textarea
            placeholder="Tell us more about *"
            className="border border-gray-300 p-3 md:p-4 rounded-md text-base md:text-lg h-24 md:h-32 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
          ></textarea>
          <button
            type="submit"
            className="bg-purple-600 text-white font-semibold p-3 md:p-4 rounded-md text-base md:text-lg hover:bg-purple-700 transition duration-300"
          >
            Send message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
