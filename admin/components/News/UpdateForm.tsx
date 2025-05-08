import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

interface UpdateFormProps {
  id: string | number;
  onClose: () => void;
}

interface NewsItem {
  id: number;
  title: string;
  slug: string;
  description: string;
  mini_description: string;
  date: string;
  time: string;
  img_url: string;
  category: string;
  created_by?: string;
  updated_by?: string;
  created_at?: string;
  updated_at?: string;
}

// Define a type for the update payload
interface NewsUpdatePayload {
  title: string;
  description: string;
  mini_description: string;
  date: string;
  time: string;
  category: string;
  [key: string]: string; // Allow for additional string properties if needed
}

const UpdateForm: React.FC<UpdateFormProps> = ({ id, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<NewsItem>({
    id: 0,
    title: "",
    slug: "",
    description: "",
    mini_description: "",
    date: "",
    time: "",
    img_url: "",
    category: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // New state for tracking submission status
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "success" | "failed"
  >("idle");

  // Parse time from time string (e.g., "10:00:00")
  const parseTime = (timeString: string) => {
    if (!timeString) return { hour: "12", minute: "00", period: "AM" };

    // Parse 24-hour format like "10:00:00"
    const match = timeString.match(/(\d+):(\d+):(\d+)/);
    if (!match) return { hour: "12", minute: "00", period: "AM" };

    const hour = parseInt(match[1]);
    const minute = match[2];

    if (hour === 0) {
      return { hour: "12", minute, period: "AM" };
    } else if (hour < 12) {
      return { hour: hour.toString(), minute, period: "AM" };
    } else if (hour === 12) {
      return { hour: "12", minute, period: "PM" };
    } else {
      return { hour: (hour - 12).toString(), minute, period: "PM" };
    }
  };

  // Format time back to 24-hour format
  const formatTime = (hour: string, minute: string, period: string): string => {
    let hourNum = parseInt(hour);

    // Convert to 24-hour format
    if (period === "PM" && hourNum < 12) {
      hourNum += 12;
    } else if (period === "AM" && hourNum === 12) {
      hourNum = 0;
    }

    return `${hourNum.toString().padStart(2, "0")}:${minute}:00`;
  };

  // Fetch news data when component mounts
  useEffect(() => {
    const fetchNewsData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v2/news/${id}`
        );
        const newsData = response.data;
        setFormData({
          id: newsData.id,
          title: newsData.title || "",
          slug: newsData.slug || "",
          description: newsData.description || "",
          mini_description: newsData.mini_description || "",
          date: newsData.date || "",
          time: newsData.time || "",
          img_url: newsData.img_url || "",
          category: newsData.category || "",
        });
      } catch (err) {
        console.error("Error fetching news data:", err);
        setError("Failed to load news data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchNewsData();
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleTimeChange = (
    field: "hour" | "minute" | "period",
    value: string
  ) => {
    const time = parseTime(formData.time);
    const newTime = { ...time, [field]: value };
    const timeString = formatTime(newTime.hour, newTime.minute, newTime.period);

    setFormData({
      ...formData,
      time: timeString,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Create data object for update with proper typing
      const updateData: NewsUpdatePayload = {
        title: formData.title,
        description: formData.description,
        mini_description: formData.mini_description,
        date: formData.date,
        time: formData.time,
        category: formData.category,
      };

      // Use FormData if there's a file to upload
      if (imageFile) {
        const submitData = new FormData();
        Object.keys(updateData).forEach((key) => {
          submitData.append(key, updateData[key]);
        });
        submitData.append("image", imageFile);

        await axios.put(`http://localhost:5000/api/v2/news/${id}`, submitData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        // Regular JSON update without file
        await axios.put(`http://localhost:5000/api/v2/news/${id}`, updateData);
      }

      // Set success status instead of closing form
      setSubmissionStatus("success");
    } catch (err) {
      console.error("Error updating news:", err);
      setError("Failed to update news article. Please try again.");
      setSubmissionStatus("failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle refresh and close
  const handleDone = () => {
    if (submissionStatus === "success") {
      window.location.reload(); // Refresh the page
    } else {
      // Reset to form state if failed
      setSubmissionStatus("idle");
      setError(null);
    }
  };

  const time = parseTime(formData.time);

  // Render status card when submission is complete
  if (submissionStatus === "success" || submissionStatus === "failed") {
    return (
      <div className="bg-yellow-50 p-6 rounded-2xl space-y-4 shadow-md">
        <div
          className={`rounded-xl p-5 text-center ${
            submissionStatus === "success" ? "bg-green-100" : "bg-red-100"
          }`}
        >
          {submissionStatus === "success" ? (
            <>
              <div className="flex justify-center mb-3">
                <div className="bg-green-500 rounded-full p-2 w-16 h-16 flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-green-700 mb-2">
                Success!
              </h3>
              <p className="text-green-600 mb-4">
                The article has been updated successfully.
              </p>
            </>
          ) : (
            <>
              <div className="flex justify-center mb-3">
                <div className="bg-red-500 rounded-full p-2 w-16 h-16 flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-red-700 mb-2">
                Update Failed
              </h3>
              <p className="text-red-600 mb-2">
                There was an error updating the article.
              </p>
              <p className="text-red-600 mb-4">{error}</p>
            </>
          )}
          <button
            onClick={handleDone}
            className="bg-gray-900 hover:bg-black text-white text-xl font-semibold py-3 px-8 rounded-xl shadow-md transition-all duration-300"
          >
            {submissionStatus === "success" ? "Done" : "Try Again"}
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-yellow-50 p-6 rounded-2xl space-y-4 shadow-md flex justify-center items-center h-64">
        <div className="text-gray-600 font-semibold">Loading news data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-yellow-50 p-6 rounded-2xl space-y-4 shadow-md">
        <div className="text-red-500 font-semibold">{error}</div>
        <button
          onClick={onClose}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 cursor-pointer transition duration-300"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className=" p-6 rounded-2xl space-y-4"
    >
      <h2 className="text-2xl text-gray-600 font-bold mb-4">
        Update News Article
      </h2>

      <div className="space-y-4">
        {/* Date/Time Scheduler */}
        <div>
          <label className="block font-semibold text-xl text-gray-500 mb-2">
            Schedule Date / Time
          </label>
          <div className="flex flex-wrap md:flex-nowrap items-center gap-3">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="flex-1 border border-gray-300 px-4 py-2 rounded-xl bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-gray-400 text-sm"
            />
            <select
              value={time.hour}
              onChange={(e) => handleTimeChange("hour", e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded-xl bg-white shadow-inner text-sm"
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={(i + 1).toString()}>
                  {i + 1}
                </option>
              ))}
            </select>
            <span className="text-xl font-semibold">:</span>
            <select
              value={time.minute}
              onChange={(e) => handleTimeChange("minute", e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded-xl bg-white shadow-inner text-sm"
            >
              {["00", "15", "30", "45"].map((min) => (
                <option key={min} value={min}>
                  {min}
                </option>
              ))}
            </select>
            <select
              value={time.period}
              onChange={(e) => handleTimeChange("period", e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded-xl bg-white shadow-inner text-sm"
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
        </div>

        {/* News Title */}
        <div>
          <label className="block font-semibold text-xl text-gray-500 mb-1">
            News Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Update title here"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-inner focus:outline-none focus:ring-2 focus:ring-gray-400 bg-white shadow-md"
          />
        </div>

        {/* News Category */}
        <div>
          <label className="block font-semibold text-xl text-gray-500 mb-1">
            News Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-inner bg-white text-gray-700 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            <option value="">Choose Category</option>
            <option value="Technology">Technology</option>
            <option value="Education">Education</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Business">Business</option>
            <option value="Science">Science</option>
          </select>
        </div>

        {/* Title Image */}
        <div>
          <label className="block font-semibold text-xl text-gray-500 mb-1">
            Title Image
          </label>
          <div className="flex items-center space-x-4 bg-orange-50 p-3 rounded-lg">
            <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center border border-dashed shadow-sm">
              {formData.img_url ? (
                <div className="w-full h-full overflow-hidden rounded-md">
                  <Image
                    src={`/assets/curriculum/${formData.img_url}`}
                    alt="News thumbnail"
                    width={500}
                    height={300}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://via.placeholder.com/150";
                    }}
                  />
                </div>
              ) : (
                <svg
                  className="w-6 h-6 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              )}
            </div>
            <div className="flex-1">
              <p className="text-md text-gray-500 mb-1">
                Upload new image (optional)
              </p>
              <input
                type="file"
                onChange={handleImageChange}
                className="border px-3 py-1 w-full rounded-lg text-sm bg-white"
              />
              {formData.img_url && (
                <p className="text-xs text-gray-500 mt-1">
                  Current: {formData.img_url.split("/").pop()}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* News Description */}
        <div>
          <label className="block font-semibold text-xl text-gray-500 mb-1">
            News Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={5}
            placeholder="Update full description"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-inner focus:outline-none focus:ring-2 focus:ring-gray-400 bg-white shadow-md"
          ></textarea>
        </div>

        {/* Mini Description */}
        <div>
          <label className="block font-semibold text-xl text-gray-500 mb-1">
            Mini Description
          </label>
          <input
            type="text"
            name="mini_description"
            value={formData.mini_description}
            onChange={handleInputChange}
            placeholder="Update brief summary"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-inner focus:outline-none focus:ring-2 focus:ring-gray-400 bg-white shadow-md"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 text-xl font-semibold py-3 rounded-xl shadow-md transition-all duration-300 cursor-pointer"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 bg-gray-900 hover:bg-black text-white text-xl font-semibold py-3 rounded-xl shadow-md transition-all duration-300 cursor-pointer flex items-center justify-center space-x-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update Article"}
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="text-red-500 text-sm font-medium mt-2">{error}</div>
        )}
      </div>
    </form>
  );
};

export default UpdateForm;