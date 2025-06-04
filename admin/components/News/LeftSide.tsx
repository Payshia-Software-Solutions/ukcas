'use client';

import React, { useState, ChangeEvent } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

interface TimeComponents {
  hours: string;
  minutes: string;
  period: string;
}

interface LeftSideProps {
  onCreateSuccess: () => void;
}

const LeftSide: React.FC<LeftSideProps> = ({ onCreateSuccess }) => {
  const [formData, setFormData] = useState<NewsFormData>({
    title: '',
    description: '',
    mini_description: '',
    date: '',
    time: '',
    img_url: '',
    category: '',
    created_by: 'admin_user',
    updated_by: 'admin_user',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileName = e.target.files?.[0]?.name || '';
    if (fileName) {
      setFormData((prev) => ({ ...prev, img_url: fileName }));
    }
  };

  const handleEditorChange = (content: string) => {
    setFormData((prev) => ({ ...prev, description: content }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/api/v2/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to create news');

      toast.success('News created successfully!');
      onCreateSuccess();
    } catch (error) {
      console.error(error);
      toast.error('Failed to create news.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDateForInput = (dateString: string): string => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    return date.toISOString().split('T')[0];
  };

  const getTimeComponents = (): TimeComponents => {
    if (!formData.time) return { hours: '12', minutes: '00', period: 'AM' };
    const [hours, minutes] = formData.time.split(':');
    const hoursNum = parseInt(hours, 10);
    return {
      hours: hoursNum > 12 ? (hoursNum - 12).toString() : hoursNum.toString(),
      minutes: minutes || '00',
      period: hoursNum >= 12 ? 'PM' : 'AM',
    };
  };

  const { hours, minutes, period } = getTimeComponents();

  const handleTimeChange = (component: 'hours' | 'minutes' | 'period', value: string) => {
    let newHours = parseInt(hours);
    let newMinutes = minutes;
    let newPeriod = period;

    if (component === 'hours') newHours = parseInt(value);
    if (component === 'minutes') newMinutes = value;
    if (component === 'period') newPeriod = value;

    if (newPeriod === 'PM' && newHours < 12) newHours += 12;
    if (newPeriod === 'AM' && newHours === 12) newHours = 0;

    const formattedTime = `${newHours.toString().padStart(2, '0')}:${newMinutes}:00`;
    setFormData((prev) => ({ ...prev, time: formattedTime }));
  };

  return (
    <div className="p-6 rounded-2xl space-y-4">
      <ToastContainer position="top-right" autoClose={3000} />

      <h2 className="text-2xl text-gray-600 font-bold mb-4">Create News Article</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Date/Time */}
        <div>
          <label className="block font-semibold text-xl text-gray-500 mb-2">Schedule Date / Time</label>
          <div className="flex flex-wrap md:flex-nowrap items-center gap-3">
            <input
              type="date"
              name="date"
              value={formatDateForInput(formData.date)}
              onChange={handleChange}
              className="flex-1 border border-gray-300 px-4 py-2 rounded-xl bg-white shadow-inner text-sm"
            />
            <select value={hours} onChange={(e) => handleTimeChange('hours', e.target.value)} className="border px-3 py-2 rounded-xl text-sm">
              {Array.from({ length: 12 }, (_, i) => <option key={i + 1}>{i + 1}</option>)}
            </select>
            <span className="text-xl font-semibold">:</span>
            <select value={minutes} onChange={(e) => handleTimeChange('minutes', e.target.value)} className="border px-3 py-2 rounded-xl text-sm">
              {['00', '15', '30', '45'].map((m) => <option key={m}>{m}</option>)}
            </select>
            <select value={period} onChange={(e) => handleTimeChange('period', e.target.value)} className="border px-3 py-2 rounded-xl text-sm">
              <option>AM</option>
              <option>PM</option>
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
            className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-inner"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block font-semibold text-xl text-gray-500 mb-1">News Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border bg-white text-gray-700 shadow-inner"
            required
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
            <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center border">
              <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <div className="flex-1">
              <input
                type="file"
                onChange={handleFileChange}
                className="border px-3 py-1 w-full rounded-lg text-sm bg-white"
              />
              <p className="text-xs text-gray-500 mt-1">Current image: {formData.img_url?.split('/').pop()}</p>
            </div>
          </div>
        </div>

        {/* News Description */}
        <div>
          <label className="block font-semibold text-xl text-gray-500 mb-1">News Description</label>
          <Editor
            apiKey="bcmoy3sawjsp7clc7s2dwfar6vmlq11b4mvsxok6bwh2q08b"
            value={formData.description}
            init={{
              height: 200,
              menubar: false,
              plugins: [
                'advlist autolink lists link image charmap preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste help wordcount'
              ],
              toolbar:
                'undo redo | formatselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help'
            }}
            onEditorChange={handleEditorChange}
          />
        </div>

        {/* Mini Description */}
        <div>
          <label className="block font-semibold text-xl text-gray-500 mb-1">Mini Description</label>
          <input
            type="text"
            name="mini_description"
            value={formData.mini_description}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border shadow-inner"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full ${isSubmitting ? 'bg-gray-400' : 'bg-gray-900 hover:bg-black'} text-white text-xl font-semibold py-3 rounded-xl shadow-md`}
        >
          {isSubmitting ? 'Submitting...' : 'Done !'}
        </button>
      </form>
    </div>
  );
};

export default LeftSide;
