/**
 * Validation-related constants
 */

export const VALIDATION_CONSTANTS = {
  // Common validation rules
  REQUIRED_FIELD: 'This field is required',
  INVALID_FORMAT: 'Invalid format',
  INVALID_LENGTH: 'Invalid length',
  
  // String validation
  STRING: {
    MIN_LENGTH: (min: number) => `Must be at least ${min} characters long`,
    MAX_LENGTH: (max: number) => `Must be no more than ${max} characters long`,
    PATTERN_MISMATCH: 'Invalid format or contains illegal characters',
    EMPTY: 'Cannot be empty',
    WHITESPACE_ONLY: 'Cannot contain only whitespace'
  },
  
  // Number validation
  NUMBER: {
    MIN_VALUE: (min: number) => `Must be at least ${min}`,
    MAX_VALUE: (max: number) => `Must be no more than ${max}`,
    POSITIVE: 'Must be a positive number',
    INTEGER: 'Must be an integer',
    INVALID: 'Must be a valid number'
  },
  
  // Email validation
  EMAIL: {
    INVALID: 'Must be a valid email address',
    REQUIRED: 'Email address is required',
    TOO_LONG: 'Email address is too long'
  },
  
  // Password validation
  PASSWORD: {
    TOO_SHORT: 'Password is too short',
    TOO_LONG: 'Password is too long',
    MISSING_LOWERCASE: 'Password must contain at least one lowercase letter',
    MISSING_UPPERCASE: 'Password must contain at least one uppercase letter',
    MISSING_DIGIT: 'Password must contain at least one digit',
    MISSING_SPECIAL: 'Password must contain at least one special character',
    COMMON_PASSWORD: 'Password is too common',
    CONTAINS_PERSONAL_INFO: 'Password cannot contain personal information'
  },
  
  // Date validation
  DATE: {
    INVALID: 'Must be a valid date',
    FUTURE_REQUIRED: 'Date must be in the future',
    PAST_REQUIRED: 'Date must be in the past',
    TOO_OLD: 'Date is too far in the past',
    TOO_FUTURE: 'Date is too far in the future'
  },
  
  // Array validation
  ARRAY: {
    EMPTY: 'At least one item is required',
    TOO_MANY: (max: number) => `Cannot have more than ${max} items`,
    INVALID_ITEM: 'Contains invalid items',
    DUPLICATE: 'Contains duplicate items'
  },
  
  // File validation
  FILE: {
    TOO_LARGE: (maxSize: string) => `File size cannot exceed ${maxSize}`,
    INVALID_TYPE: (allowedTypes: string[]) => `File type must be one of: ${allowedTypes.join(', ')}`,
    REQUIRED: 'File is required',
    CORRUPTED: 'File appears to be corrupted'
  },
  
  // ID validation
  ID: {
    INVALID_OBJECT_ID: 'Invalid ID format',
    NOT_FOUND: 'Resource with this ID does not exist',
    REQUIRED: 'ID is required'
  },
  
  // URL validation
  URL: {
    INVALID: 'Must be a valid URL',
    PROTOCOL_REQUIRED: 'URL must include protocol (http/https)',
    LOCALHOST_NOT_ALLOWED: 'Localhost URLs are not allowed'
  }
} as const;

export const VALIDATION_REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  USERNAME: /^[a-zA-Z0-9_-]+$/,
  PASSWORD_STRONG: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
  PHONE: /^\+?[\d\s\-\(\)]+$/,
  NAME: /^[a-zA-Z\s\-'.]+$/,
  URL: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
  OBJECT_ID: /^[0-9a-fA-F]{24}$/,
  SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  COLOR_HEX: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
  TIMEZONE: /^[A-Za-z_]+\/[A-Za-z_]+$/
} as const;
