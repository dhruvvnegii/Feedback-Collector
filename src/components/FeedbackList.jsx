import { MessageSquare } from 'lucide-react';
import { FeedbackItem } from './FeedbackItem.jsx';

/**
 * List component for displaying all feedback entries
 * @param {Object} props - Component props
 * @param {Array} props.feedbackList - Array of feedback objects
 * @param {Function} props.onDelete - Delete handler
 */
const FeedbackList = ({ feedbackList, onDelete }) => {
  if (feedbackList.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <MessageSquare size={48} className="mx-auto text-gray-300 mb-3" />
        <p className="text-gray-500 text-lg">No feedback found</p>
        <p className="text-gray-400 text-sm mt-1">Try adjusting your filters or add new feedback</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {feedbackList.map(feedback => (
        <FeedbackItem key={feedback.id} feedback={feedback} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default FeedbackList;