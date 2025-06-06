"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define a Type for your formData
interface FormData {
  name: string;
  address_line_1: string;
  address_line_2: string;
  province: string;
  country: string;
  year_of_inception: string;
  website: string;
  mini_description_of_instit: string;
  phone_number: string;
  email: string;
  accreditation_status: string;
  accreditation_details: string;
}

const GetAccredited = () => {
  const [countries, setCountries] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    address_line_1: "",
    address_line_2: "",
    province: "",
    country: "",
    year_of_inception: "",
    website: "",
    mini_description_of_instit: "",
    phone_number: "",
    email: "",
    accreditation_status: "",
    accreditation_details: "",
  });

  // Fetch countries from API
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const countryNames: string[] = response.data
          .map((country: { name: { common: string } }) => country.name.common)
          .sort();
        setCountries(countryNames);
      } catch (error) {
        console.error("Error fetching countries:", error);
        setCountries([
          "United Kingdom",
          "United States",
          "South Africa",
          "Australia",
          "Sri Lanka",
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCountrySelect = (country: string) => {
    setFormData((prev) => ({ ...prev, country }));
    setIsDropdownOpen(false);
    setSearchTerm("");
  };

  const filteredCountries = searchTerm
    ? countries.filter((country) =>
        country.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : countries;

  const validateForm = () => {
    if (
      !formData.name ||
      !formData.address_line_1 ||
      !formData.province ||
      !formData.country ||
      !formData.year_of_inception ||
      !formData.website ||
      !formData.mini_description_of_instit ||
      !formData.phone_number ||
      !formData.email
    ) {
      toast.warn("Please fill in all required fields.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await axios.post("http://localhost:5000/api/v2/accredite", {
        ...formData,
        created_by: formData.email,
      });

      console.log("Response:", response.data);
      toast.success("Accreditation request sent successfully!");

      setFormData({
        name: "",
        address_line_1: "",
        address_line_2: "",
        province: "",
        country: "",
        year_of_inception: "",
        website: "",
        mini_description_of_instit: "",
        phone_number: "",
        email: "",
        accreditation_status: "",
        accreditation_details: "",
      });
    } catch (error) {
      toast.error("Failed to send accreditation request. Please try again.");
            if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error("Error response:", error.response);
        } else if (error.request) {
          console.error("Error request:", error.request);
        } else {
          console.error("Error message:", error.message);
        }
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Section 1: What is Accreditation */}
      <div className="container mx-auto flex flex-col md:flex-row items-start justify-between px-8 md:px-20 py-20 bg-white">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight text-black">
            What is <br /> Accreditation
          </h1>
        </div>
        <div className="md:w-1/2 text-gray-700 md:text-xl text-lg space-y-6">
          <p>
            Accreditation is a process wherein independent or non-governmental
            agencies give acknowledgement to education providers or programs that
            meet specifically designed criteria.
          </p>
          <p>
            The primary purposes of accreditation are to ensure that an institution,
            course, or qualification conforms to general expectations and to assist
            educational institutions to continually improve the quality of their
            courses and qualifications.
          </p>
        </div>
      </div>

      {/* Section 2: Online Accreditation Title */}
      <div className="flex flex-col items-center justify-center px-8 md:px-20 py-20 bg-[#7C2B33] text-white">
        <h1 className="text-4xl md:text-7xl font-bold text-center">
          Online Accreditation
        </h1>
        <p className="mt-4 md:text-xl text-lg text-center max-w-3xl">
          Please complete and submit the form. Our team will contact you as soon as
          possible.
        </p>
      </div>

      {/* Section 3: Form */}
      <div className="bg-[#7C2B33] py-1 px-8 md:px-20">
        <div className="bg-white max-w-5xl mx-auto p-10 rounded-xl shadow-md mb-20">
          <form className="space-y-6 text-gray-900" onSubmit={handleSubmit}>
            <p className="text-sm text-red-600 font-medium">
              Fields marked with an <span className="text-red-600">*</span> are required
            </p>

            {/* Dynamically Render Form Inputs */}
            {[
              { label: "Name of Organisation / Institute", name: "name" },
              { label: "Address Line 1", name: "address_line_1" },
              { label: "Address Line 2", name: "address_line_2" },
              { label: "Province / City / State", name: "province" },
              { label: "Year of Inception", name: "year_of_inception" },
              { label: "Website", name: "website", type: "url" },
              { label: "Phone Number", name: "phone_number", type: "tel" },
              { label: "Email", name: "email", type: "email" },
            ].map(({ label, name, type = "text" }) => (
              <div key={name}>
                <label className="block font-semibold mb-1 md:text-xl">
                  {label} <span className="text-red-600">*</span>
                </label>
                <input
                  type={type}
                  name={name}
                  value={formData[name as keyof FormData]}
                  onChange={handleChange}
                  className="w-full border border-gray-400 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#74323B]"
                  required
                />
              </div>
            ))}

            {/* Country Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <label className="block font-semibold mb-1 md:text-xl">
                Country <span className="text-red-600">*</span>
              </label>
              <div
                className="w-full border border-gray-400 p-2 rounded flex justify-between items-center cursor-pointer"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <div>{formData.country || "Select a country"}</div>
                <div className="text-gray-500">{isDropdownOpen ? "▲" : "▼"}</div>
              </div>

              {isDropdownOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow-lg">
                  <div className="p-2 border-b">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={handleSearchChange}
                      placeholder="Search countries..."
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="max-h-48 overflow-y-auto">
                    {loading ? (
                      <div className="p-2 text-center text-gray-500">
                        Loading countries...
                      </div>
                    ) : filteredCountries.length > 0 ? (
                      filteredCountries.map((country, index) => (
                        <div
                          key={index}
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleCountrySelect(country)}
                        >
                          {country}
                        </div>
                      ))
                    ) : (
                      <div className="p-2 text-center text-gray-500">
                        No countries found
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Description Textarea */}
            <div>
              <label className="block font-semibold mb-1 md:text-xl">
                Brief Profile of Institution <span className="text-red-600">*</span>
              </label>
              <textarea
                name="mini_description_of_instit"
                rows={5}
                value={formData.mini_description_of_instit}
                onChange={handleChange}
                className="w-full border border-gray-400 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#74323B]"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="text-left pt-4">
              <button
                type="submit"
                className="bg-[#7C2B33] text-white px-10 py-3 rounded-full text-lg font-semibold hover:bg-[#74323B] transition duration-200 md:text-xl cursor-pointer"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GetAccredited;
