/**
 * Authentication-related constants
 */

export const AUTH_CONSTANTS = {
  // Token settings
  ACCESS_TOKEN_EXPIRES_IN: '15m',
  REFRESH_TOKEN_EXPIRES_IN: '7d',
  EMAIL_VERIFICATION_TOKEN_EXPIRES_IN: '24h',
  PASSWORD_RESET_TOKEN_EXPIRES_IN: '1h',
  
  // Password settings
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 128,
  PASSWORD_SALT_ROUNDS: 12,
  
  // Login attempts
  MAX_LOGIN_ATTEMPTS: 5,
  ACCOUNT_LOCK_TIME: 30 * 60 * 1000, // 30 minutes in milliseconds
  
  // Session settings
  MAX_ACTIVE_SESSIONS: 5,
  SESSION_CLEANUP_INTERVAL: 60 * 60 * 1000, // 1 hour in milliseconds
  
  // Rate limiting
  LOGIN_RATE_LIMIT: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10 // limit each IP to 10 requests per windowMs
  },
  
  REGISTER_RATE_LIMIT: {
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5 // limit each IP to 5 requests per windowMs
  },
  
  PASSWORD_RESET_RATE_LIMIT: {
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 3 // limit each IP to 3 requests per windowMs
  },
  
  // Two-factor authentication
  TWO_FACTOR_SECRET_LENGTH: 32,
  TWO_FACTOR_CODE_LENGTH: 6,
  TWO_FACTOR_WINDOW: 2, // Allow codes from 2 periods before/after
  
  // Email verification
  EMAIL_VERIFICATION_RESEND_COOLDOWN: 60 * 1000, // 1 minute
  
  // JWT
  JWT_ALGORITHM: 'HS256' as const,
  JWT_ISSUER: 'user-management-service',
  JWT_AUDIENCE: 'user-management-clients'
} as const;

export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: 'Invalid email or password',
  ACCOUNT_LOCKED: 'Account is temporarily locked due to too many failed login attempts',
  ACCOUNT_DISABLED: 'Account is disabled',
  EMAIL_NOT_VERIFIED: 'Please verify your email address before logging in',
  INVALID_TOKEN: 'Invalid or expired token',
  TOKEN_EXPIRED: 'Token has expired',
  UNAUTHORIZED: 'Unauthorized access',
  FORBIDDEN: 'Insufficient permissions',
  USER_NOT_FOUND: 'User not found',
  EMAIL_ALREADY_EXISTS: 'Email address is already registered',
  USERNAME_ALREADY_EXISTS: 'Username is already taken',
  WEAK_PASSWORD: 'Password does not meet security requirements',
  PASSWORD_MISMATCH: 'Passwords do not match',
  CURRENT_PASSWORD_INCORRECT: 'Current password is incorrect',
  TOKEN_ALREADY_USED: 'Token has already been used',
  VERIFICATION_COOLDOWN: 'Please wait before requesting another verification email',
  TWO_FACTOR_REQUIRED: 'Two-factor authentication is required',
  INVALID_TWO_FACTOR_CODE: 'Invalid two-factor authentication code',
  SESSION_EXPIRED: 'Session has expired',
  MAX_SESSIONS_EXCEEDED: 'Maximum number of active sessions exceeded'
} as const;

export const AUTH_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful',
  LOGOUT_SUCCESS: 'Logout successful',
  REGISTER_SUCCESS: 'Registration successful. Please check your email for verification.',
  EMAIL_VERIFIED: 'Email address verified successfully',
  VERIFICATION_SENT: 'Verification email sent',
  PASSWORD_RESET_SENT: 'Password reset instructions sent to your email',
  PASSWORD_RESET_SUCCESS: 'Password reset successful',
  PASSWORD_CHANGED: 'Password changed successfully',
  TWO_FACTOR_ENABLED: 'Two-factor authentication enabled',
  TWO_FACTOR_DISABLED: 'Two-factor authentication disabled',
  PROFILE_UPDATED: 'Profile updated successfully'
} as const;
