# Feedback-Collector
Feedback Collector is a React + Vite web app that lets users submit, view, filter, and manage feedback entries. It features a clean UI, local storage persistence, real-time search and date filters, and interactive modals for deleting feedback — designed for simplicity and efficient feedback management.
# Key Features Implemented
  # Core Functionality
Feedback Form with validation (name, email, message)
Dynamic Feedback List displaying all submissions
Filter by Keyword - searches across name, email, and message
Filter by Date - Today, Last 7 days, Last 30 days, or All time
Delete with Confirmation - Modal dialog to prevent accidental deletions
Persistent Storage - Data saves across sessions

🏗️ Architecture & Best Practices
File Structure (Organized within single component):

Services Layer - FeedbackService handles all data operations
Utils Layer - Helper functions (formatDate, isValidEmail, filterFeedback)
Components - Modular, reusable components (FeedbackForm, FeedbackList, FeedbackItem, ModalComponent)
Main App - Orchestrates all components
