import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

interface Props {
  filterKeyword?: string;
}

const RightSide: React.FC<Props> = ({ filterKeyword = "" }) => {

  interface ServiceItem {
    id: string;
    title: string;
    description: string;
    img_url?: string;
  }

  const [serviceList, setServiceList] = useState<ServiceItem[]>([]);

  const fetchServices = () => {
    axios
      .get("http://localhost:5000/api/v2/service")
      .then((response) => setServiceList(response.data))
      .catch((error) => console.error("Error fetching services:", error));
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const filteredServices = serviceList.filter((service) =>
    service.title.toLowerCase().includes(filterKeyword.toLowerCase())
  );

  // ✅ Function to remove HTML tags from description
  const stripHtmlTags = (html: string): string => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  return (
    <div className="p-6 rounded-lg space-y-4 relative">
      <h2 className="text-2xl font-bold mb-4 text-gray-600">Current Services</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-2">
        {filteredServices.slice(0, 10).map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-xl shadow p-4 flex items-start space-x-4 hover:shadow-md transition shadow-lg cursor-pointer"
          >
            <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center border shadow-sm">
              {service.img_url ? (
                <Image
                  src={`/assets/curriculum/${service.img_url}`}
                  alt={service.title}
                  width={500}
                  height={300}
                  className="w-full h-full object-cover rounded-md"
                />
              ) : (
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3v18h18" />
                </svg>
              )}
            </div>
            <div>
              <h3 className="font-bold text-gray-700">{service.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-3">
                {stripHtmlTags(service.description)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button className="text-gray-500 font-semibold text-md flex items-center justify-center w-full mt-4 cursor-pointer hover:text-gray-600 transition duration-300">
        Load More
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M19 9l-7 7-7-7" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
};

export default RightSide;
