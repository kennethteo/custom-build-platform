/**
 * Common validation schemas
 */

import { z } from 'zod';
import { VALIDATION_REGEX } from '../constants';

// Common ID validation
export const objectIdSchema = z.string()
  .regex(VALIDATION_REGEX.OBJECT_ID, 'Invalid ID format');

// Pagination validation
export const paginationSchema = z.object({
  page: z.number()
    .int('Page must be an integer')
    .min(1, 'Page must be at least 1')
    .default(1)
    .optional(),

  limit: z.number()
    .int('Limit must be an integer')
    .min(1, 'Limit must be at least 1')
    .max(100, 'Limit cannot exceed 100')
    .default(20)
    .optional(),

  sortBy: z.string()
    .min(1, 'Sort field cannot be empty')
    .optional(),

  sortOrder: z.enum(['asc', 'desc'])
    .default('desc')
    .optional()
});

// Search validation
export const searchSchema = paginationSchema.extend({
  q: z.string()
    .min(1, 'Search query must be at least 1 character')
    .max(100, 'Search query must be no more than 100 characters')
    .optional()
});

// Date range validation
export const dateRangeSchema = z.object({
  startDate: z.date().optional(),
  endDate: z.date().optional()
}).refine((data) => {
  if (data.startDate && data.endDate) {
    return data.startDate <= data.endDate;
  }
  return true;
}, {
  message: "Start date must be before or equal to end date",
  path: ["endDate"]
});

// File upload validation
export const fileUploadSchema = z.object({
  filename: z.string()
    .min(1, 'Filename is required')
    .max(255, 'Filename must be no more than 255 characters'),

  mimetype: z.string()
    .min(1, 'MIME type is required'),

  size: z.number()
    .int('File size must be an integer')
    .min(1, 'File size must be greater than 0')
    .max(5 * 1024 * 1024, 'File size cannot exceed 5MB'), // 5MB limit

  encoding: z.string().optional()
});

// Email validation
export const emailSchema = z.string()
  .email('Invalid email format')
  .max(254, 'Email must be no more than 254 characters');

// Password validation
export const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters long')
  .max(128, 'Password must be no more than 128 characters long')
  .regex(
    VALIDATION_REGEX.PASSWORD_STRONG,
    'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
  );

// URL validation
export const urlSchema = z.string()
  .url('Invalid URL format')
  .max(2048, 'URL must be no more than 2048 characters');

// Phone number validation
export const phoneSchema = z.string()
  .regex(VALIDATION_REGEX.PHONE, 'Invalid phone number format')
  .max(20, 'Phone number must be no more than 20 characters');

// Color validation (hex)
export const colorSchema = z.string()
  .regex(VALIDATION_REGEX.COLOR_HEX, 'Invalid color format. Use hex format (e.g., #FF0000)');

// Timezone validation
export const timezoneSchema = z.string()
  .regex(VALIDATION_REGEX.TIMEZONE, 'Invalid timezone format');

// Slug validation
export const slugSchema = z.string()
  .regex(VALIDATION_REGEX.SLUG, 'Invalid slug format. Use lowercase letters, numbers, and hyphens only');

// Name validation
export const nameSchema = z.string()
  .min(1, 'Name is required')
  .max(50, 'Name must be no more than 50 characters')
  .regex(VALIDATION_REGEX.NAME, 'Name contains invalid characters');

// Username validation
export const usernameSchema = z.string()
  .min(3, 'Username must be at least 3 characters')
  .max(30, 'Username must be no more than 30 characters')
  .regex(VALIDATION_REGEX.USERNAME, 'Username can only contain letters, numbers, underscores, and hyphens');

// Status validation
export const statusSchema = z.enum(['active', 'inactive', 'pending', 'suspended']);

// Metadata validation
export const metadataSchema = z.record(z.any()).optional();

// Reason validation (for audit logs)
export const reasonSchema = z.string()
  .max(255, 'Reason must be no more than 255 characters')
  .optional();

// Bulk operation validation
export const bulkOperationSchema = z.object({
  ids: z.array(objectIdSchema)
    .min(1, 'At least one ID is required')
    .max(100, 'Cannot process more than 100 items at once'),
  
  reason: reasonSchema
});

// Filter validation for common filters
export const commonFiltersSchema = z.object({
  status: z.array(statusSchema).optional(),
  createdAfter: z.date().optional(),
  createdBefore: z.date().optional(),
  updatedAfter: z.date().optional(),
  updatedBefore: z.date().optional()
});

// Health check response validation
export const healthCheckSchema = z.object({
  status: z.enum(['healthy', 'unhealthy']),
  timestamp: z.string(),
  uptime: z.number(),
  version: z.string(),
  services: z.object({
    database: z.enum(['healthy', 'unhealthy']),
    redis: z.enum(['healthy', 'unhealthy']).optional(),
    email: z.enum(['healthy', 'unhealthy']).optional()
  }),
  memory: z.object({
    used: z.number(),
    total: z.number(),
    percentage: z.number()
  })
});

// Type exports
export type ObjectId = z.infer<typeof objectIdSchema>;
export type PaginationInput = z.infer<typeof paginationSchema>;
export type SearchInput = z.infer<typeof searchSchema>;
export type DateRangeInput = z.infer<typeof dateRangeSchema>;
export type FileUploadInput = z.infer<typeof fileUploadSchema>;
export type BulkOperationInput = z.infer<typeof bulkOperationSchema>;
export type CommonFiltersInput = z.infer<typeof commonFiltersSchema>;
export type HealthCheckResponse = z.infer<typeof healthCheckSchema>;
