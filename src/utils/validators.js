/**
 * Validates email format
 * @param {string} email - Email address to validate
 * @returns {boolean} True if valid email format
 */
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
export { isValidEmail };