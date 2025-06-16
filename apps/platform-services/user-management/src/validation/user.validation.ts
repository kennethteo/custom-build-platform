/**
 * User validation schemas
 */

import { z } from 'zod';
import { USER_CONSTANTS, VALIDATION_REGEX } from '../constants';

// Base user schema without confirm password
const baseUserSchema = z.object({
  email: z.string()
    .email('Invalid email format')
    .max(USER_CONSTANTS.MAX_EMAIL_LENGTH, `Email must be no more than ${USER_CONSTANTS.MAX_EMAIL_LENGTH} characters`),

  username: z.string()
    .min(USER_CONSTANTS.MIN_USERNAME_LENGTH, `Username must be at least ${USER_CONSTANTS.MIN_USERNAME_LENGTH} characters`)
    .max(USER_CONSTANTS.MAX_USERNAME_LENGTH, `Username must be no more than ${USER_CONSTANTS.MAX_USERNAME_LENGTH} characters`)
    .regex(VALIDATION_REGEX.USERNAME, 'Username can only contain letters, numbers, underscores, and hyphens'),

  firstName: z.string()
    .min(USER_CONSTANTS.MIN_NAME_LENGTH, `First name must be at least ${USER_CONSTANTS.MIN_NAME_LENGTH} character`)
    .max(USER_CONSTANTS.MAX_NAME_LENGTH, `First name must be no more than ${USER_CONSTANTS.MAX_NAME_LENGTH} characters`)
    .regex(VALIDATION_REGEX.NAME, 'First name contains invalid characters'),

  lastName: z.string()
    .min(USER_CONSTANTS.MIN_NAME_LENGTH, `Last name must be at least ${USER_CONSTANTS.MIN_NAME_LENGTH} character`)
    .max(USER_CONSTANTS.MAX_NAME_LENGTH, `Last name must be no more than ${USER_CONSTANTS.MAX_NAME_LENGTH} characters`)
    .regex(VALIDATION_REGEX.NAME, 'Last name contains invalid characters'),

  password: z.string()
    .min(8, 'Password must be at least 8 characters long')
    .max(128, 'Password must be no more than 128 characters long')
    .regex(VALIDATION_REGEX.PASSWORD_STRONG, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),

  roles: z.array(z.string().regex(VALIDATION_REGEX.OBJECT_ID, 'Invalid role ID format')).optional(),

  status: z.enum(['active', 'inactive', 'pending', 'suspended']).default('pending').optional(),

  profile: z.object({
    phone: z.string()
      .regex(VALIDATION_REGEX.PHONE, 'Invalid phone number format')
      .max(USER_CONSTANTS.MAX_PHONE_LENGTH, `Phone number must be no more than ${USER_CONSTANTS.MAX_PHONE_LENGTH} characters`)
      .optional(),

    dateOfBirth: z.date()
      .max(new Date(), 'Date of birth cannot be in the future')
      .optional(),

    gender: z.enum(['male', 'female', 'other']).optional(),

    timezone: z.string()
      .regex(VALIDATION_REGEX.TIMEZONE, 'Invalid timezone format')
      .optional(),

    locale: z.string()
      .min(2)
      .max(5)
      .optional()
  }).optional(),

  preferences: z.object({
    theme: z.enum(['light', 'dark', 'auto']).optional(),
    language: z.string().min(2).max(5).optional(),
    emailNotifications: z.boolean().optional(),
    pushNotifications: z.boolean().optional(),
    twoFactorEnabled: z.boolean().optional()
  }).optional(),

  sendWelcomeEmail: z.boolean().default(true).optional(),
  metadata: z.record(z.any()).optional()
});

// User creation validation
export const createUserSchema = baseUserSchema.extend({
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// User update validation
export const updateUserSchema = z.object({
  email: z.string()
    .email('Invalid email format')
    .max(USER_CONSTANTS.MAX_EMAIL_LENGTH, `Email must be no more than ${USER_CONSTANTS.MAX_EMAIL_LENGTH} characters`)
    .optional(),

  username: z.string()
    .min(USER_CONSTANTS.MIN_USERNAME_LENGTH, `Username must be at least ${USER_CONSTANTS.MIN_USERNAME_LENGTH} characters`)
    .max(USER_CONSTANTS.MAX_USERNAME_LENGTH, `Username must be no more than ${USER_CONSTANTS.MAX_USERNAME_LENGTH} characters`)
    .regex(VALIDATION_REGEX.USERNAME, 'Username can only contain letters, numbers, underscores, and hyphens')
    .optional(),

  firstName: z.string()
    .min(USER_CONSTANTS.MIN_NAME_LENGTH, `First name must be at least ${USER_CONSTANTS.MIN_NAME_LENGTH} character`)
    .max(USER_CONSTANTS.MAX_NAME_LENGTH, `First name must be no more than ${USER_CONSTANTS.MAX_NAME_LENGTH} characters`)
    .regex(VALIDATION_REGEX.NAME, 'First name contains invalid characters')
    .optional(),

  lastName: z.string()
    .min(USER_CONSTANTS.MIN_NAME_LENGTH, `Last name must be at least ${USER_CONSTANTS.MIN_NAME_LENGTH} character`)
    .max(USER_CONSTANTS.MAX_NAME_LENGTH, `Last name must be no more than ${USER_CONSTANTS.MAX_NAME_LENGTH} characters`)
    .regex(VALIDATION_REGEX.NAME, 'Last name contains invalid characters')
    .optional(),

  status: z.enum(['active', 'inactive', 'pending', 'suspended']).optional(),

  roles: z.array(z.string().regex(VALIDATION_REGEX.OBJECT_ID, 'Invalid role ID format')).optional(),

  emailVerified: z.boolean().optional(),

  profile: z.object({
    phone: z.string()
      .regex(VALIDATION_REGEX.PHONE, 'Invalid phone number format')
      .max(USER_CONSTANTS.MAX_PHONE_LENGTH, `Phone number must be no more than ${USER_CONSTANTS.MAX_PHONE_LENGTH} characters`)
      .optional(),

    dateOfBirth: z.date()
      .max(new Date(), 'Date of birth cannot be in the future')
      .optional(),

    gender: z.enum(['male', 'female', 'other']).optional(),

    timezone: z.string()
      .regex(VALIDATION_REGEX.TIMEZONE, 'Invalid timezone format')
      .optional(),

    locale: z.string()
      .min(2)
      .max(5)
      .optional()
  }).optional(),

  preferences: z.object({
    theme: z.enum(['light', 'dark', 'auto']).optional(),
    language: z.string().min(2).max(5).optional(),
    emailNotifications: z.boolean().optional(),
    pushNotifications: z.boolean().optional(),
    twoFactorEnabled: z.boolean().optional()
  }).optional(),

  metadata: z.record(z.any()).optional()
}).refine((data) => Object.keys(data).length > 0, {
  message: "At least one field must be provided for update"
});

// User status update validation
export const updateUserStatusSchema = z.object({
  status: z.enum(['active', 'inactive', 'pending', 'suspended']),
  reason: z.string().max(255, 'Reason must be no more than 255 characters').optional()
});

// User roles update validation
export const updateUserRolesSchema = z.object({
  roles: z.array(z.string().regex(VALIDATION_REGEX.OBJECT_ID, 'Invalid role ID format')),
  reason: z.string().max(255, 'Reason must be no more than 255 characters').optional()
});

// Bulk user creation validation
export const bulkCreateUsersSchema = z.object({
  users: z.array(baseUserSchema)
    .min(1, 'At least one user is required')
    .max(100, 'Cannot create more than 100 users at once'),

  sendWelcomeEmails: z.boolean().default(false).optional(),
  validateEmails: z.boolean().default(true).optional()
});

// User search validation
export const userSearchSchema = z.object({
  q: z.string()
    .min(1, 'Search query must be at least 1 character')
    .max(100, 'Search query must be no more than 100 characters')
    .optional(),

  page: z.number()
    .int('Page must be an integer')
    .min(1, 'Page must be at least 1')
    .default(1)
    .optional(),

  limit: z.number()
    .int('Limit must be an integer')
    .min(1, 'Limit must be at least 1')
    .max(USER_CONSTANTS.MAX_PAGE_SIZE, `Limit cannot exceed ${USER_CONSTANTS.MAX_PAGE_SIZE}`)
    .default(USER_CONSTANTS.DEFAULT_PAGE_SIZE)
    .optional(),

  sortBy: z.enum(['email', 'username', 'firstName', 'lastName', 'status', 'createdAt', 'lastLogin'])
    .default('createdAt')
    .optional(),

  sortOrder: z.enum(['asc', 'desc'])
    .default('desc')
    .optional(),

  filters: z.object({
    status: z.array(z.enum(['active', 'inactive', 'pending', 'suspended'])).optional(),
    roles: z.array(z.string().regex(VALIDATION_REGEX.OBJECT_ID, 'Invalid role ID format')).optional(),
    emailVerified: z.boolean().optional(),
    lastLoginAfter: z.date().optional(),
    lastLoginBefore: z.date().optional(),
    createdAfter: z.date().optional(),
    createdBefore: z.date().optional()
  }).optional()
});

// Type exports
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type UpdateUserStatusInput = z.infer<typeof updateUserStatusSchema>;
export type UpdateUserRolesInput = z.infer<typeof updateUserRolesSchema>;
export type BulkCreateUsersInput = z.infer<typeof bulkCreateUsersSchema>;
export type UserSearchInput = z.infer<typeof userSearchSchema>;
