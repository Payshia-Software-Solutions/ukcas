"use client";
import React, { useState } from "react";
import axios from "axios"; // Import Axios and AxiosError type
import { FaPhoneAlt, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Breadcrumb from "./Breadcrumb";
import config from "../config";

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.full_name || !formData.email || !formData.message) {
      toast.warn(
        "Please fill in all required fields: Name, Email, and Message"
      );
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      // Posting data using Axios
      await axios.post(`${config.API_BASE_URL}/contact`, {
        ...formData,
        created_by: formData.email,
      });

      toast.success("Message sent successfully!");

      setFormData({
        full_name: "",
        email: "",
        phone_number: "",
        subject: "",
        message: "",
      });
    } catch (error: unknown) {
      // Proper error handling with AxiosError
      if (axios.isAxiosError(error)) {
        // Handle Axios-specific error
        toast.error("Failed to send message. Please try again later.");
        console.error(error.response?.data || error.message);
      } else {
        // Handle non-Axios errors
        toast.error("An unexpected error occurred. Please try again later.");
        console.error(error);
      }
    }
  };

  return (
    <section className="bg-gray-50">
      <div className="flex justify-start max-w-6xl md:px-24">
        <Breadcrumb
          crumbs={[{ href: "/", label: "Home" }, { href: "/contact", label: "Contact Us " }]}
          fontColor=""
        />
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center min-h-screen p-6m d:p-12">
        <ToastContainer position="top-right" autoClose={3000} />

        {/* Left Section */}
        <div className="md:w-auto h-auto md:h-[38rem] px-6 md:px-12 py-8 text-center bg-[#74323B] md:text-left mb-6 md:mb-0 w-full">
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Let&rsquo;s chat.
            <br /> Tell me about your project.
          </h2>
          <p className="text-white mt-4 text-base md:text-lg">
            Let&rsquo;s create something together
          </p>

          <div className="flex flex-col md:flex-row justify-center md:justify-start items-center md:items-start gap-4 md:gap-8">
            <div className="mt-6 flex items-center justify-center w-full md:w-75 bg-white shadow-lg p-4 md:p-6 rounded-lg">
              <FaEnvelope className="text-gray-600 mr-3 text-xl md:text-2xl" />
              <a href="mailto:info@phamacollege.lk" className="text-black font-semibold text-sm md:text-lg">
                info@phamacollege.lk
              </a>
            </div>
            <div className="mt-6 flex items-center justify-center w-full md:w-75 bg-white shadow-lg p-4 md:p-6 rounded-lg">
              <FaPhoneAlt className="text-gray-600 mr-3 text-xl md:text-2xl" />
              <a href="tel:+94117494335" className="text-black font-semibold text-sm md:text-lg">
                011 74 94 335
              </a>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center md:justify-start bg-white shadow-lg p-4 md:p-6 rounded-lg w-full">
            <FaMapMarkerAlt className="text-gray-600 mr-3 text-xl md:text-2xl" />
            <span className="text-gray-700 text-sm md:text-lg">
              Our Head Office,
              <br />
              Ceylon Pharma College (PVT) LTD,
              <br />
              L35, West Tower, World Trade Center, Colombo 01, Sri Lanka
            </span>
          </div>

          <div className="mt-6 flex items-center justify-center md:justify-start bg-white shadow-lg p-4 md:p-6 rounded-lg w-full">
            <FaMapMarkerAlt className="text-gray-600 mr-3 text-xl md:text-2xl" />
            <span className="text-gray-700 text-sm md:text-lg">
              Operation Branch,
              <br />
              L35, West Tower, World Trade Center, Colombo 01, Sri Lanka
            </span>
          </div>
        </div>

        {/* Right Section */}
        <div className="md:w-2/3 bg-[#E7C7C9] shadow-xl rounded-lg p-6 md:p-8 w-full max-w-xl">
          <h3 className="text-xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
            Send us a message
          </h3>
          <form className="flex flex-col space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <input
              type="text"
              name="full_name"
              placeholder="Full name*"
              value={formData.full_name}
              onChange={handleChange}
              className="border border-gray-500 p-3 md:p-4 rounded-md text-base md:text-lg"
            />
            <input
              type="email"
              name="email"
              placeholder="Email address*"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-500 p-3 md:p-4 rounded-md text-base md:text-lg"
            />
            <input
              type="text"
              name="phone_number"
              placeholder="Phone Number"
              value={formData.phone_number}
              onChange={handleChange}
              className="border border-gray-500 p-3 md:p-4 rounded-md text-base md:text-lg"
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              className="border border-gray-500 p-3 md:p-4 rounded-md text-base md:text-lg"
            />
            <textarea
              name="message"
              placeholder="Tell us more about *"
              value={formData.message}
              onChange={handleChange}
              className="border border-gray-500 p-3 md:p-4 rounded-md text-base md:text-lg h-24 md:h-32 resize-none"
            ></textarea>
            <button
              type="submit"
              className="bg-[#74323B] text-white font-semibold p-3 md:p-4 rounded-md text-base md:text-lg hover:bg-[#7C2B33] transition duration-300 cursor-pointer flex items-center justify-center"
            >
              Send message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
