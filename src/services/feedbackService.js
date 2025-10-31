/**
 * Service layer for handling feedback data operations
 * Uses localStorage for data persistence
 */

const STORAGE_KEY = 'feedbackData';

const FeedbackService = {
  /**
   * Retrieves all feedback entries from localStorage
   * @returns {Promise<Array>} Array of feedback objects
   */
  getAllFeedback: async () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return [];
      
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error('Error loading feedback:', error);
      return [];
    }
  },

  /**
   * Saves a new feedback entry
   * @param {Object} feedback - The feedback object to save
   * @returns {Promise<Object>} The saved feedback with metadata
   */
  saveFeedback: async (feedback) => {
    try {
      const allFeedback = await FeedbackService.getAllFeedback();
      
      const newFeedback = {
        ...feedback,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      
      allFeedback.unshift(newFeedback);
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allFeedback));
      return newFeedback;
    } catch (error) {
      console.error('Error saving feedback:', error);
      throw error;
    }
  },

  /**
   * Deletes a feedback entry by ID
   * @param {string} id - The ID of the feedback to delete
   * @returns {Promise<boolean>} Success status
   */
  deleteFeedback: async (id) => {
    try {
      const allFeedback = await FeedbackService.getAllFeedback();
      const filtered = allFeedback.filter(f => f.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      return true;
    } catch (error) {
      console.error('Error deleting feedback:', error);
      throw error;
    }
  },

  /**
   * Clears all feedback (useful for testing)
   * @returns {Promise<boolean>} Success status
   */
  clearAllFeedback: async () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return true;
    } catch (error) {
      console.error('Error clearing feedback:', error);
      throw error;
    }
  },
};

export default FeedbackService;

