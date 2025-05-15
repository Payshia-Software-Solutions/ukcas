import React, { useState, ChangeEvent } from 'react';

interface ServiceFormData {
  title: string;
  category: string;
  description: string;
  img_url: string;
  created_by: string;
  updated_by: string;
}

interface SubmitStatus {
  success: boolean;
  message: string;
}

interface LeftSideProps {
  onCreateSuccess: () => void;
}

const LeftSide: React.FC<LeftSideProps> = ({ onCreateSuccess }) => {
  const [formData, setFormData] = useState<ServiceFormData>({
    title: '',
    category: '',
    description: '',
    img_url: '',
    created_by: 'admin_user',
    updated_by: 'admin_user',
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({ success: false, message: '' });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileName = e.target.files?.[0]?.name || '';
    if (fileName) {
      setFormData((prev) => ({
        ...prev,
        img_url: fileName,
      }));
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setSubmitStatus({ success: false, message: '' });

    fetch('http://localhost:5000/api/v2/services', {  // <-- update API endpoint if needed
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(() => {
        setSubmitStatus({ success: true, message: 'Service created successfully!' });
        onCreateSuccess();
      })
      .catch((error) => {
        setSubmitStatus({ success: false, message: 'Failed to create service.' });
        console.error('Error:', error);
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <div className="p-6 rounded-2xl space-y-4">
      <h2 className="text-2xl text-gray-600 font-bold mb-4">Create New Service</h2>

      <div>
        <label className="block font-semibold text-xl text-gray-500 mb-1">Service Title</label>
        <input
          type="text"
          name="title"
          placeholder="Enter title here"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-inner focus:outline-none focus:ring-2 focus:ring-gray-400 bg-white shadow-md"
        />
      </div>

      <div>
        <label className="block font-semibold text-xl text-gray-500 mb-1">Service Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-inner bg-white text-gray-700 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          <option value="">Choose Category</option>
          <option value="Education">Education</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Consulting">Consulting</option>
        </select>
      </div>

      <div>
        <label className="block font-semibold text-xl text-gray-500 mb-1">Title Image</label>
        <div className="flex items-center space-x-4 bg-[#fff7e6] p-3 rounded-lg">
          <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center border border-dashed shadow-sm">
            <svg
              className="w-6 h-6 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3v18h18" />
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
              Current image: {formData.img_url ? formData.img_url.split('/').pop() : 'No file selected'}
            </p>
          </div>
        </div>
      </div>

      <div>
        <label className="block font-semibold text-xl text-gray-500 mb-1">Service Description</label>
        <textarea
          name="description"
          rows={5}
          placeholder="Type Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-inner focus:outline-none focus:ring-2 focus:ring-gray-400 bg-white shadow-md"
        ></textarea>
      </div>

      {submitStatus.message && (
        <div
          className={`p-3 rounded-lg ${
            submitStatus.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {submitStatus.message}
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className={`w-full ${
          isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-900 hover:bg-black'
        } text-white text-xl font-semibold py-3 rounded-xl shadow-md`}
      >
        {isSubmitting ? 'Submitting...' : 'Done !'}
      </button>
    </div>
  );
};

export default LeftSide;
