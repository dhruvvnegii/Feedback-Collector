/**
 * Filtering and search utility functions
 */

/**
 * Filters feedback based on search criteria
 * @param {Array} feedbackList - Array of feedback objects
 * @param {string} keyword - Search keyword
 * @param {string} dateFilter - Date filter value
 * @returns {Array} Filtered feedback array
 */
export const filterFeedback = (feedbackList, keyword, dateFilter) => {
  // Ensure feedbackList is an array
  if (!Array.isArray(feedbackList)) {
    console.warn('feedbackList is not an array:', feedbackList);
    return [];
  }

  let filtered = [...feedbackList];

  // Filter by keyword across name, email, and message
  if (keyword && keyword.trim()) {
    const lowerKeyword = keyword.toLowerCase();
    filtered = filtered.filter(
      f =>
        f.name?.toLowerCase().includes(lowerKeyword) ||
        f.email?.toLowerCase().includes(lowerKeyword) ||
        f.message?.toLowerCase().includes(lowerKeyword)
    );
  }

  // Filter by date range
  if (dateFilter) {
    const now = new Date();
    filtered = filtered.filter(f => {
      if (!f.createdAt) return false;
      
      const feedbackDate = new Date(f.createdAt);
      const daysDiff = Math.floor((now - feedbackDate) / (1000 * 60 * 60 * 24));

      switch (dateFilter) {
        case 'today':
          return daysDiff === 0;
        case 'week':
          return daysDiff <= 7;
        case 'month':
          return daysDiff <= 30;
        default:
          return true;
      }
    });
  }

  return filtered;
};
