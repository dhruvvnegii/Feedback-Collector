import { User, Mail, MessageSquare, Calendar, Trash2 } from 'lucide-react';
import { formatDate } from '../utils/dateFormatter.js';
/**
 * Individual feedback item component
 * @param {Object} props - Component props
 * @param {Object} props.feedback - Feedback data object
 * @param {Function} props.onDelete - Delete handler
 */
export const FeedbackItem = ({ feedback, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <User size={18} className="text-blue-600" />
            <h3 className="font-semibold text-lg text-gray-900">{feedback.name}</h3>
          </div>
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <Mail size={16} />
            <span>{feedback.email}</span>
          </div>
        </div>
        <button
          onClick={() => onDelete(feedback.id)}
          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
          title="Delete feedback"
        >
          <Trash2 size={20} />
        </button>
      </div>
      <div className="flex items-start gap-2 mb-3">
        <MessageSquare size={18} className="text-gray-400 mt-1 shrink-0" />
        <p className="text-gray-700 leading-relaxed">{feedback.message}</p>
      </div>
      <div className="flex items-center gap-2 text-xs text-gray-500 mt-4 pt-4 border-t border-gray-100">
        <Calendar size={14} />
        <span>{formatDate(feedback.createdAt)}</span>
      </div>
    </div>
  );
};
        