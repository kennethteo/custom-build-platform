/**
 * User-related constants
 */

export const USER_CONSTANTS = {
  // Field length limits
  MIN_USERNAME_LENGTH: 3,
  MAX_USERNAME_LENGTH: 30,
  MIN_NAME_LENGTH: 1,
  MAX_NAME_LENGTH: 50,
  MAX_EMAIL_LENGTH: 254,
  
  // Profile limits
  MAX_BIO_LENGTH: 500,
  MAX_PHONE_LENGTH: 20,
  
  // File upload limits
  MAX_AVATAR_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_AVATAR_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  
  // Default values
  DEFAULT_LOCALE: 'en',
  DEFAULT_TIMEZONE: 'UTC',
  DEFAULT_THEME: 'light',
  
  // Pagination
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  
  // User status
  STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PENDING: 'pending',
    SUSPENDED: 'suspended'
  } as const,
  
  // Gender options
  GENDER: {
    MALE: 'male',
    FEMALE: 'female',
    OTHER: 'other'
  } as const,
  
  // Theme options
  THEME: {
    LIGHT: 'light',
    DARK: 'dark',
    AUTO: 'auto'
  } as const,
  
  // Device types
  DEVICE_TYPE: {
    DESKTOP: 'desktop',
    MOBILE: 'mobile',
    TABLET: 'tablet'
  } as const
} as const;

export const USER_ERRORS = {
  NOT_FOUND: 'User not found',
  ALREADY_EXISTS: 'User already exists',
  INVALID_ID: 'Invalid user ID',
  CANNOT_DELETE_SELF: 'Cannot delete your own account',
  CANNOT_DISABLE_SELF: 'Cannot disable your own account',
  CANNOT_CHANGE_OWN_ROLE: 'Cannot change your own role',
  INVALID_STATUS: 'Invalid user status',
  PROFILE_UPDATE_FAILED: 'Failed to update user profile',
  AVATAR_UPLOAD_FAILED: 'Failed to upload avatar',
  INVALID_AVATAR_TYPE: 'Invalid avatar file type',
  AVATAR_TOO_LARGE: 'Avatar file is too large',
  USERNAME_TAKEN: 'Username is already taken',
  EMAIL_TAKEN: 'Email address is already taken',
  INVALID_EMAIL: 'Invalid email address format',
  INVALID_USERNAME: 'Username contains invalid characters',
  WEAK_PASSWORD: 'Password does not meet security requirements',
  CANNOT_UPDATE_SYSTEM_USER: 'Cannot update system user account'
} as const;

export const USER_MESSAGES = {
  CREATED: 'User created successfully',
  UPDATED: 'User updated successfully',
  DELETED: 'User deleted successfully',
  STATUS_CHANGED: 'User status changed successfully',
  PROFILE_UPDATED: 'User profile updated successfully',
  AVATAR_UPLOADED: 'Avatar uploaded successfully',
  AVATAR_REMOVED: 'Avatar removed successfully',
  EMAIL_UPDATED: 'Email address updated successfully',
  USERNAME_UPDATED: 'Username updated successfully'
} as const;

export const USER_REGEX = {
  USERNAME: /^[a-zA-Z0-9_-]+$/,
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^\+?[\d\s\-\(\)]+$/,
  NAME: /^[a-zA-Z\s\-'.]+$/
} as const;
