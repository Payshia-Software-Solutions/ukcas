import React, { useState, ChangeEvent } from 'react';

// Interface for the form data
interface NewsFormData {
  title: string;
  description: string;
  mini_description: string;
  date: string;
  time: string;
  img_url: string;
  category: string;
  created_by: string;
  updated_by: string;
}

// Interface for submission status
interface SubmitStatus {
  success: boolean;
  message: string;
}

// Interface for time components
interface TimeComponents {
  hours: string;
  minutes: string;
  period: string;
}

const LeftSide: React.FC = () => {
  const [formData, setFormData] = useState<NewsFormData>({
    title: "Breaking News: AI Revolution",
    description: "A detailed article about how AI is transforming industries worldwide.",
    mini_description: "AI is revolutionizing industries globally.",
    date: "2025-05-03",
    time: "14:30:00",
    img_url: "https://example.com/images/ai-revolution.jpg",
    category: "Technology",
    created_by: "admin_user",
    updated_by: "admin_user"
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({ success: false, message: "" });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    // In a real implementation, you would handle file upload here
    // For now, we'll just update the file name display
    const fileName = e.target.files?.[0]?.name || "";
    if (fileName) {
      // In a real app, you would upload the file to a server and get a URL back
      // For demo purposes, we'll just use a placeholder
      setFormData({
        ...formData,
        img_url: `${fileName}`,
      });
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setSubmitStatus({ success: false, message: "" });

    // Using the fetch API instead of axios
    fetch('http://localhost:5000/api/v2/news', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      setSubmitStatus({ 
        success: true, 
        message: "News created successfully!" 
      });
      console.log("Success:", data);
    })
    .catch(error => {
      setSubmitStatus({ 
        success: false, 
        message: "Failed to create news." 
      });
      console.error("Error:", error);
    })
    .finally(() => {
      setIsSubmitting(false);
    });
  };

  // Format the date for the date input field
  const formatDateForInput = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  // Extract hours and minutes from time string
  const getTimeComponents = (): TimeComponents => {
    if (!formData.time) return { hours: "12", minutes: "00", period: "AM" };
    
    const [hours, minutes] = formData.time.split(':');
    const hoursNum = parseInt(hours, 10);
    
    return {
      hours: hoursNum > 12 ? (hoursNum - 12).toString() : hoursNum.toString(),
      minutes: minutes.split(':')[0] || "00",
      period: hoursNum >= 12 ? "PM" : "AM"
    };
  };

  const { hours, minutes, period } = getTimeComponents();

  const handleTimeChange = (component: 'hours' | 'minutes' | 'period', value: string) => {
    let newHours = parseInt(hours);
    let newMinutes = minutes;
    let newPeriod = period;

    if (component === 'hours') {
      newHours = parseInt(value);
    } else if (component === 'minutes') {
      newMinutes = value;
    } else if (component === 'period') {
      newPeriod = value;
    }

    // Adjust hours for 12-hour format to 24-hour format
    if (newPeriod === "PM" && newHours < 12) {
      newHours += 12;
    } else if (newPeriod === "AM" && newHours === 12) {
      newHours = 0;
    }

    // Format the time string (HH:MM:SS)
    const formattedTime = `${newHours.toString().padStart(2, '0')}:${newMinutes}:00`;
    
    setFormData({
      ...formData,
      time: formattedTime,
    });
  };

  return (
    <div className="bg-yellow-50 p-6 rounded-2xl space-y-4 shadow-md">
      <h2 className="text-2xl text-gray-600 font-bold mb-4">Create News Article</h2>

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
              value={formatDateForInput(formData.date)}
              onChange={handleChange}
              className="flex-1 border border-gray-300 px-4 py-2 rounded-xl bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-gray-400 text-sm"
            />
            <select 
              value={hours}
              onChange={(e) => handleTimeChange('hours', e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded-xl bg-white shadow-inner text-sm"
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={(i + 1).toString()}>{i + 1}</option>
              ))}
            </select>
            <span className="text-xl font-semibold">:</span>
            <select 
              value={minutes}
              onChange={(e) => handleTimeChange('minutes', e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded-xl bg-white shadow-inner text-sm"
            >
              {['00', '15', '30', '45'].map((min) => (
                <option key={min} value={min}>{min}</option>
              ))}
            </select>
            <select 
              value={period}
              onChange={(e) => handleTimeChange('period', e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded-xl bg-white shadow-inner text-sm"
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
        </div>

        {/* News Title */}
        <div>
          <label className="block font-semibold text-xl text-gray-500 mb-1">News Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter title here"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-inner focus:outline-none focus:ring-2 focus:ring-gray-400 bg-white shadow-md"
          />
        </div>

        {/* News Category */}
        <div>
          <label className="block font-semibold text-xl text-gray-500 mb-1">News Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
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
          <label className="block font-semibold text-xl text-gray-500 mb-1">Title Image</label>
          <div className="flex items-center space-x-4 bg-orange-50 p-3 rounded-lg">
            <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center border border-dashed shadow-sm">
              <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-md text-gray-500 mb-1">Please upload square image, size less than 100KB</p>
              <input
                type="file"
                onChange={handleFileChange}
                className="border px-3 py-1 w-full rounded-lg text-sm bg-white"
              />
              <p className="text-xs text-gray-500 mt-1">
                Current image: {formData.img_url.split('/').pop()}
              </p>
            </div>
          </div>
        </div>

        {/* News Description */}
        <div>
          <label className="block font-semibold text-xl text-gray-500 mb-1">News Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            placeholder="Type Description"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-inner focus:outline-none focus:ring-2 focus:ring-gray-400 bg-white shadow-md"
          ></textarea>
        </div>

        {/* Mini Description */}
        <div>
          <label className="block font-semibold text-xl text-gray-500 mb-1">Mini Description</label>
          <input
            type="text"
            name="mini_description"
            value={formData.mini_description}
            onChange={handleChange}
            placeholder="Brief description for listing"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-inner focus:outline-none focus:ring-2 focus:ring-gray-400 bg-white shadow-md"
          />
        </div>

        {/* Status Message */}
        {submitStatus.message && (
          <div className={`p-3 rounded-lg ${submitStatus.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {submitStatus.message}
          </div>
        )}

        {/* Submit Button */}
        <button 
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`w-full ${isSubmitting ? 'bg-gray-400' : 'bg-gray-900 hover:bg-black'} text-white text-xl font-semibold py-3 rounded-xl shadow-md transition-all duration-300 cursor-pointer flex items-center justify-center space-x-2`}
        >
          {isSubmitting ? 'Submitting...' : 'Done !'}
        </button>
      </div>
    </div>
  );
};

export default LeftSide;