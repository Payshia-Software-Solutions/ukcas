import React from "react";
import { FaPhoneAlt, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";

const ContactForm: React.FC = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-50 p-12">
      {/* Left Section */}
      <div className="md:w-auto h-[30rem] px-12 py-8 text-center bg-[#0b1c39] md:text-left mb-8 md:mb-0">
        <h2 className="text-4xl md:text-5xl font-bold text-white">
          Let's chat.<br /> Tell me about your project.
        </h2>
        <p className="text-white mt-4 text-lg">Let's create something together ✨</p>

        <div className="flex justify-between items-center gap-8">
          {/* Email */}
          <div className="mt-6 flex items-center justify-center flex-grow md:justify-start bg-white shadow-lg p-6 rounded-lg">
            <FaEnvelope className="text-gray-600 mr-3 text-2xl" />
            <a
              href="mailto:framesmillion@gmail.com"
              className="text-black font-semibold text-lg"
            >
              framesmillion@gmail.com
            </a>
          </div>

          {/* Phone */}
          <div className="mt-6 flex items-center justify-center md:justify-start bg-white shadow-lg p-6 rounded-lg">
            <FaPhoneAlt className="text-gray-600 mr-3 text-2xl" />
            <a
              href="tel:+123456789"
              className="text-black font-semibold text-lg"
            >
              +1 234 567 89
            </a>
          </div>
        </div>

        {/* Address */}
        <div className="mt-6 flex items-center justify-center md:justify-start bg-white shadow-lg p-6 rounded-lg">
          <FaMapMarkerAlt className="text-gray-600 mr-3 text-2xl" />
          <span className="text-gray-700 text-lg">1234 Street Name, City, Country</span>
        </div>
      </div>

      {/* Right Section (Form) */}
      <div className="md:w-2/3 bg-white shadow-xl rounded-lg p-8 w-full max-w-xl">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">
          Send us a message🚀
        </h3>
        <form className="flex flex-col space-y-6">
          <input
            type="text"
            placeholder="Full name*"
            className="border border-gray-300 p-4 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="email"
            placeholder="Email address*"
            className="border border-gray-300 p-4 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="text"
            placeholder="Subject"
            className="border border-gray-300 p-4 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <textarea
            placeholder="Tell us more about *"
            className="border border-gray-300 p-4 rounded-md text-lg h-32 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
          ></textarea>
          <button
            type="submit"
            className="bg-purple-600 text-white font-semibold p-4 rounded-md text-lg hover:bg-purple-700 transition duration-300"
          >
            Send message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
