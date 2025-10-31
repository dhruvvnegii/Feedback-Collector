import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import FeedbackForm from "./components/FeedbackForm.jsx";
import FeedbackList from "./components/FeedbackList.jsx";
import ModalComponent from "./components/ModalComponent.jsx";
import FeedbackService from "./services/feedbackService.js";
import { filterFeedback } from "./utils/filterHelpers.js";
/**
 * Main application component
 */
const App = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [modalState, setModalState] = useState({
    isOpen: false,
    feedbackId: null,
  });

  /**
   * Loads all feedback on component mount
   */
  useEffect(() => {
    loadFeedback();
  }, []);

  /**
   * Updates filtered list when filters or feedback list changes
   */
  useEffect(() => {
    if (feedbackList && Array.isArray(feedbackList)) {
      const filtered = filterFeedback(feedbackList, keyword, dateFilter);
      setFilteredList(filtered);
    } else {
      setFilteredList([]);
    }
  }, [feedbackList, keyword, dateFilter]);
  /**
   * Loads feedback from storage
   */
 const loadFeedback = async () => {
  setLoading(true);
  try {
    const data = await FeedbackService.getAllFeedback(); 
    setFeedbackList(data);
  } catch (error) {
    console.error("Error loading feedback:", error);
  } finally {
    setLoading(false);
  }
};

  /**
   * Handles new feedback submission
   * @param {Object} formData - Form data to submit
   */
  const handleSubmitFeedback = async (formData) => {
    const newFeedback = await FeedbackService.saveFeedback(formData);
    setFeedbackList((prev) => [newFeedback, ...prev]);
  };

  /**
   * Opens delete confirmation modal
   * @param {string} id - Feedback ID to delete
   */
  const handleDeleteClick = (id) => {
    setModalState({ isOpen: true, feedbackId: id });
  };

  /**
   * Confirms and executes feedback deletion
   */
  const handleConfirmDelete = async () => {
    try {
      await FeedbackService.deleteFeedback(modalState.feedbackId);
      setFeedbackList((prev) =>
        prev.filter((f) => f.id !== modalState.feedbackId)
      );
      setModalState({ isOpen: false, feedbackId: null });
    } catch (error) {
      console.error("Error deleting feedback:", error);
    }
  };

  /**
   * Closes modal
   */
  const handleCloseModal = () => {
    setModalState({ isOpen: false, feedbackId: null });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Feedback Collector
          </h1>
          <p className="text-gray-600">
            Share your thoughts and help us improve
          </p>
        </header>

        <FeedbackForm onSubmit={handleSubmitFeedback} />

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Filter Feedback
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="keyword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Search by keyword
              </label>
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  id="keyword"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Search name, email, or message..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="dateFilter"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Filter by date
              </label>
              <select
                id="dateFilter"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="">All time</option>
                <option value="today">Today</option>
                <option value="week">Last 7 days</option>
                <option value="month">Last 30 days</option>
              </select>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredList.length} of {feedbackList.length} feedback
            entries
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="text-gray-600 mt-4">Loading feedback...</p>
          </div>
        ) : (
          <FeedbackList
            feedbackList={filteredList}
            onDelete={handleDeleteClick}
          />
        )}

        <ModalComponent
          isOpen={modalState.isOpen}
          onClose={handleCloseModal}
          onConfirm={handleConfirmDelete}
          title="Delete Feedback"
          message="Are you sure you want to delete this feedback? This action cannot be undone."
        />
      </div>
    </div>
  );
};

export default App;
