import DOMPurify from "dompurify";

/**
 * Security utility for input sanitization and validation
 * Implements OWASP best practices for XSS prevention
 */

// Создаем безопасную версию DOMPurify для SSR
const createDOMPurify = () => {
  if (typeof window !== "undefined") {
    return DOMPurify;
  }
  // Для SSR возвращаем mock с базовой санитизацией
  return {
    sanitize: (input: string) => {
      return String(input)
        .replace(/[<>]/g, "")
        .replace(/javascript:/gi, "")
        .replace(/on\w+\s*=/gi, "");
    }
  };
};

const purify = createDOMPurify();

// Configuration for DOMPurify
const PURIFY_CONFIG = {
  ALLOWED_TAGS: [], // No HTML tags allowed by default
  ALLOWED_ATTR: [],
  KEEP_CONTENT: true,
  RETURN_DOM: false,
  RETURN_DOM_FRAGMENT: false,
  RETURN_DOM_IMPORT: false,
  FORCE_BODY: false,
};

/**
 * Sanitizes user input to prevent XSS attacks
 * Removes all HTML tags and potentially dangerous characters
 * 
 * @param input - User input string
 * @returns Sanitized string safe for display
 */
export const sanitizeInput = (input: string): string => {
  if (typeof input !== "string") {
    return "";
  }
  
  // Remove any HTML tags and scripts
  const cleaned = purify.sanitize(input, PURIFY_CONFIG);
  
  // Additional cleanup: remove any remaining special characters that could be dangerous
  return cleaned
    .replace(/[<>]/g, "") // Remove any angle brackets
    .replace(/javascript:/gi, "") // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, "") // Remove event handlers
    .trim();
};

/**
 * Validates email format
 * Uses strict RFC 5322 compliant regex
 * 
 * @param email - Email address to validate
 * @returns true if valid email format
 */
export const validateEmail = (email: string): boolean => {
  if (!email || typeof email !== "string") {
    return false;
  }

  // RFC 5322 compliant email regex (simplified but secure)
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  return emailRegex.test(email) && email.length <= 254; // RFC max length
};

/**
 * Validates phone number (Kazakhstan format)
 * Accepts formats: +7XXXXXXXXXX, 8XXXXXXXXXX, 7XXXXXXXXXX
 * 
 * @param phone - Phone number to validate
 * @returns true if valid phone format
 */
export const validatePhone = (phone: string): boolean => {
  if (!phone || typeof phone !== "string") {
    return false;
  }

  // Remove all non-digit characters except +
  const cleaned = phone.replace(/[^\d+]/g, "");
  
  // Kazakhstan phone number formats
  const phoneRegex = /^(\+7|8|7)\d{10}$/;
  
  return phoneRegex.test(cleaned);
};

/**
 * Validates name field (supports Cyrillic and Latin)
 * Minimum 2 characters, maximum 100 characters
 * Only letters, spaces, hyphens allowed
 * 
 * @param name - Name to validate
 * @returns true if valid name format
 */
export const validateName = (name: string): boolean => {
  if (!name || typeof name !== "string") {
    return false;
  }

  const trimmed = name.trim();
  
  // Check length constraints
  if (trimmed.length < 2 || trimmed.length > 100) {
    return false;
  }

  // Allow Cyrillic, Latin letters, spaces, and hyphens
  const nameRegex = /^[a-zA-Zа-яА-ЯёЁәіңғүұқөһӘІҢҒҮҰҚӨҺ\s\-']+$/;
  
  return nameRegex.test(trimmed);
};

/**
 * Validates message/text field
 * Minimum 10 characters, maximum 2000 characters
 * 
 * @param message - Message to validate
 * @returns true if valid message format
 */
export const validateMessage = (message: string): boolean => {
  if (!message || typeof message !== "string") {
    return false;
  }

  const trimmed = message.trim();
  
  return trimmed.length >= 10 && trimmed.length <= 2000;
};

/**
 * Sanitizes and validates form data
 * Implements defense in depth principle
 * 
 * @param data - Form data object
 * @returns Sanitized and validated data or null if validation fails
 */
export interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  service?: string;
}

export const sanitizeFormData = (data: FormData): FormData | null => {
  // Sanitize all inputs
  const sanitized: FormData = {
    name: sanitizeInput(data.name),
    email: sanitizeInput(data.email),
    phone: sanitizeInput(data.phone),
    message: sanitizeInput(data.message),
    service: data.service ? sanitizeInput(data.service) : undefined,
  };

  // Validate all fields
  if (
    !validateName(sanitized.name) ||
    !validateEmail(sanitized.email) ||
    !validatePhone(sanitized.phone) ||
    !validateMessage(sanitized.message)
  ) {
    return null;
  }

  return sanitized;
};

/**
 * Escapes HTML entities to prevent XSS in user-generated content
 * 
 * @param text - Text to escape
 * @returns HTML-safe string
 */
export const escapeHtml = (text: string): string => {
  const map: { [key: string]: string } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "/": "&#x2F;",
  };
  
  return text.replace(/[&<>"'/]/g, (char) => map[char] || char);
};

/**
 * Rate limiting helper for form submissions
 * Prevents abuse and DoS attacks
 */
export class RateLimiter {
  private attempts: Map<string, number[]> = new Map();
  private maxAttempts: number;
  private windowMs: number;

  constructor(maxAttempts: number = 3, windowMs: number = 60000) {
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
  }

  /**
   * Checks if action is allowed based on rate limit
   * 
   * @param identifier - Unique identifier (e.g., IP, session ID)
   * @returns true if action is allowed
   */
  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const attempts = this.attempts.get(identifier) || [];
    
    // Filter out old attempts outside the time window
    const recentAttempts = attempts.filter(time => now - time < this.windowMs);
    
    if (recentAttempts.length >= this.maxAttempts) {
      return false;
    }
    
    // Record new attempt
    recentAttempts.push(now);
    this.attempts.set(identifier, recentAttempts);
    
    return true;
  }

  /**
   * Clears rate limit for identifier
   * 
   * @param identifier - Unique identifier to reset
   */
  reset(identifier: string): void {
    this.attempts.delete(identifier);
  }
}

/**
 * Generates a secure random token for CSRF protection
 * 
 * @returns Random token string
 */
export const generateCSRFToken = (): string => {
  if (typeof window !== "undefined" && window.crypto) {
    const array = new Uint8Array(32);
    window.crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, "0")).join("");
  }
  
  // Fallback for SSR or older browsers
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};
