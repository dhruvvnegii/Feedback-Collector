# Feedback-Collector
Feedback Collector is a React + Vite web app that lets users submit, view, filter, and manage feedback entries. It features a clean UI, local storage persistence, real-time search and date filters, and interactive modals for deleting feedback — designed for simplicity and efficient feedback management.
<img width="1914" height="708" alt="image" src="https://github.com/user-attachments/assets/79ec0b62-0ba0-4075-9627-ff57e2f268c5" />
<img width="1167" height="538" alt="image" src="https://github.com/user-attachments/assets/d06e3fcb-ba56-43f3-8346-116d20719ac8" />

# Key Features Implemented
  # Core Functionality
- Feedback Form with validation (name, email, message)
- Dynamic Feedback List displaying all submissions
- Filter by Keyword - searches across name, email, and message
- Filter by Date - Today, Last 7 days, Last 30 days, or All time
- Delete with Confirmation - Modal dialog to prevent accidental deletions
- Persistent Storage - Data saves across sessions
  <img width="1053" height="507" alt="image" src="https://github.com/user-attachments/assets/c9cca5dc-e9a2-41bf-8841-de6fd2d687d2" />
  <img width="1020" height="334" alt="image" src="https://github.com/user-attachments/assets/e01882fc-80b8-48bb-98b3-8d300b4dd356" />



# Architecture & Best Practices
  # File Structure (Organized within single component):
- Services Layer – FeedbackService handles all data operations
- Utils Layer – Helper functions (formatDate, isValidEmail, filterFeedback)
- Components – Modular, reusable components (FeedbackForm, FeedbackList, FeedbackItem, ModalComponent)
- Main App – Orchestrates all components
