
/**
 * Validates if the string is a valid email format.
 * Uses a standard regex pattern compatible with HTML5 validation.
 * @param email The email string to validate
 * @returns true if valid, false otherwise
 */
export const isValidEmail = (email: string): boolean => {
  // Basic email regex: no spaces, has @, has domain part
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Sanitizes user input by removing leading/trailing whitespace.
 * React escapes content by default, so we focus on data cleanliness here.
 * @param input The string to sanitize
 * @returns The sanitized string
 */
export const sanitizeInput = (input: string): string => {
  return input.trim();
};
