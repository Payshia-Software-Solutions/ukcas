import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPencil, FaTrash } from "react-icons/fa6";
import UpdateForm from "./UpdateForm";
import Image from "next/image";

interface Props {
  filterKeyword?: string;
}

const RightSide: React.FC<Props> = ({ filterKeyword = "" }) => {

  interface NewsItem {
    id: string;
    title: string;
    mini_description: string;
    img_url?: string;
  }

  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteStatus, setDeleteStatus] = useState<'idle' | 'success' | 'failed'>('idle');
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchNews = () => {
    axios
      .get("http://localhost:5000/api/v2/news")
      .then((response) => setNewsList(response.data))
      .catch((error) => console.error("Error fetching news:", error));
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleEdit = (id: string) => {
    setEditingId(id);
  };

  const handleDeleteConfirm = (id: string) => {
    setDeleteId(id);
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    setIsDeleting(true);
    setDeleteError(null);

    try {
      await axios.delete(`http://localhost:5000/api/v2/news/${deleteId}`);
      setDeleteStatus('success');
      setNewsList(newsList.filter(news => news.id !== deleteId));
    } catch (error) {
      console.error("Error deleting news:", error);
      setDeleteError("Failed to delete news article. Please try again.");
      setDeleteStatus('failed');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDone = () => {
    window.location.reload();
  };

  const cancelDelete = () => {
    setDeleteId(null);
    setDeleteStatus('idle');
    setDeleteError(null);
  };

  const filteredNews = newsList.filter((news) =>
    news.title.toLowerCase().includes(filterKeyword.toLowerCase())
  );

  return (
    <div className=" p-6 rounded-lg space-y-4 relative">
      <h2 className="text-2xl font-bold mb-4 text-gray-600">Show All News</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-2">
        {filteredNews.slice(0, 10).map((news) => (
          <div
            key={news.id}
            className="bg-white rounded-xl shadow p-4 flex items-start justify-between hover:shadow-md transition shadow-lg cursor-pointer"
          >
            <div className="flex space-x-4">
              <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center border shadow-sm">
                {news.img_url ? (
                  <Image
                    src={`/assets/curriculum/${news.img_url}`} 
                    alt={news.title} 
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
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3v18h18"
                    />
                  </svg>
                )}
              </div>
              <div>
                <h3 className="font-bold text-gray-700">{news.title}</h3>
                <p className="text-sm text-gray-600">{news.mini_description}</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 space-x-2">
              <button 
                className="text-gray-500 hover:text-blue-600 transition"
                onClick={() => handleEdit(news.id)}
              >
                <FaPencil size={18} />
              </button>
              <button 
                className="text-gray-500 hover:text-red-600 transition"
                onClick={() => handleDeleteConfirm(news.id)}
              >
                <FaTrash size={18} />
              </button>
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

      {editingId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Update Event</h3>
              <button 
                onClick={() => setEditingId(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <UpdateForm id={editingId} onClose={() => setEditingId(null)} />
          </div>
        </div>
      )}

      {deleteId && deleteStatus === 'idle' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <h3 className="text-xl font-bold text-gray-700 mb-3">Confirm Deletion</h3>
            <p className="text-gray-600 mb-5">Are you sure you want to delete this news article? This action cannot be undone.</p>
            <div className="flex space-x-3">
              <button
                onClick={cancelDelete}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center"
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteId && (deleteStatus === 'success' || deleteStatus === 'failed') && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <div className={`rounded-xl p-5 text-center ${deleteStatus === 'success' ? 'bg-green-100' : 'bg-red-100'}`}>
              {deleteStatus === 'success' ? (
                <>
                  <div className="flex justify-center mb-3">
                    <div className="bg-green-500 rounded-full p-2 w-16 h-16 flex items-center justify-center">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-green-700 mb-2">Deleted Successfully!</h3>
                  <p className="text-green-600 mb-4">The article has been removed from the system.</p>
                </>
              ) : (
                <>
                  <div className="flex justify-center mb-3">
                    <div className="bg-red-500 rounded-full p-2 w-16 h-16 flex items-center justify-center">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-red-700 mb-2">Deletion Failed</h3>
                  <p className="text-red-600 mb-2">There was an error deleting the article.</p>
                  <p className="text-red-600 mb-4">{deleteError}</p>
                </>
              )}
              <button 
                onClick={handleDone}
                className="bg-gray-900 hover:bg-black text-white text-xl font-semibold py-3 px-8 rounded-xl shadow-md transition-all duration-300"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RightSide;
