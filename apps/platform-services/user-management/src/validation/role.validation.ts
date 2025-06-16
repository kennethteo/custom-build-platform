/**
 * Role validation schemas
 */

import { z } from 'zod';
import { ROLE_CONSTANTS, VALIDATION_REGEX } from '../constants';

// Role creation validation
export const createRoleSchema = z.object({
  name: z.string()
    .min(ROLE_CONSTANTS.MIN_NAME_LENGTH, `Role name must be at least ${ROLE_CONSTANTS.MIN_NAME_LENGTH} characters`)
    .max(ROLE_CONSTANTS.MAX_NAME_LENGTH, `Role name must be no more than ${ROLE_CONSTANTS.MAX_NAME_LENGTH} characters`)
    .regex(/^[a-zA-Z0-9_-]+$/, 'Role name can only contain letters, numbers, underscores, and hyphens'),

  displayName: z.string()
    .min(ROLE_CONSTANTS.MIN_NAME_LENGTH, `Display name must be at least ${ROLE_CONSTANTS.MIN_NAME_LENGTH} characters`)
    .max(ROLE_CONSTANTS.MAX_NAME_LENGTH, `Display name must be no more than ${ROLE_CONSTANTS.MAX_NAME_LENGTH} characters`),

  description: z.string()
    .max(ROLE_CONSTANTS.MAX_DESCRIPTION_LENGTH, `Description must be no more than ${ROLE_CONSTANTS.MAX_DESCRIPTION_LENGTH} characters`)
    .optional(),

  permissions: z.array(z.string().regex(VALIDATION_REGEX.OBJECT_ID, 'Invalid permission ID format'))
    .default([]),

  status: z.enum(['active', 'inactive'])
    .default('active')
    .optional(),

  metadata: z.record(z.any()).optional()
});

// Role update validation
export const updateRoleSchema = z.object({
  displayName: z.string()
    .min(ROLE_CONSTANTS.MIN_NAME_LENGTH, `Display name must be at least ${ROLE_CONSTANTS.MIN_NAME_LENGTH} characters`)
    .max(ROLE_CONSTANTS.MAX_NAME_LENGTH, `Display name must be no more than ${ROLE_CONSTANTS.MAX_NAME_LENGTH} characters`)
    .optional(),

  description: z.string()
    .max(ROLE_CONSTANTS.MAX_DESCRIPTION_LENGTH, `Description must be no more than ${ROLE_CONSTANTS.MAX_DESCRIPTION_LENGTH} characters`)
    .optional(),

  status: z.enum(['active', 'inactive']).optional(),

  permissions: z.array(z.string().regex(VALIDATION_REGEX.OBJECT_ID, 'Invalid permission ID format')).optional(),

  metadata: z.record(z.any()).optional()
}).refine((data) => Object.keys(data).length > 0, {
  message: "At least one field must be provided for update"
});

// Role permissions update validation
export const updateRolePermissionsSchema = z.object({
  permissions: z.array(z.string().regex(VALIDATION_REGEX.OBJECT_ID, 'Invalid permission ID format')),
  reason: z.string().max(255, 'Reason must be no more than 255 characters').optional()
});

// Add permissions to role validation
export const addRolePermissionsSchema = z.object({
  permissions: z.array(z.string().regex(VALIDATION_REGEX.OBJECT_ID, 'Invalid permission ID format'))
    .min(1, 'At least one permission is required'),
  reason: z.string().max(255, 'Reason must be no more than 255 characters').optional()
});

// Remove permissions from role validation
export const removeRolePermissionsSchema = z.object({
  permissions: z.array(z.string().regex(VALIDATION_REGEX.OBJECT_ID, 'Invalid permission ID format'))
    .min(1, 'At least one permission is required'),
  reason: z.string().max(255, 'Reason must be no more than 255 characters').optional()
});

// Assign role to users validation
export const assignRoleSchema = z.object({
  userIds: z.array(z.string().regex(VALIDATION_REGEX.OBJECT_ID, 'Invalid user ID format'))
    .min(1, 'At least one user ID is required'),
  reason: z.string().max(255, 'Reason must be no more than 255 characters').optional(),
  expiresAt: z.string().datetime('Invalid expiration date format').optional()
});

// Revoke role from users validation
export const revokeRoleSchema = z.object({
  userIds: z.array(z.string().regex(VALIDATION_REGEX.OBJECT_ID, 'Invalid user ID format'))
    .min(1, 'At least one user ID is required'),
  reason: z.string().max(255, 'Reason must be no more than 255 characters').optional()
});

// Clone role validation
export const cloneRoleSchema = z.object({
  sourceRoleId: z.string().regex(VALIDATION_REGEX.OBJECT_ID, 'Invalid source role ID format'),
  
  name: z.string()
    .min(ROLE_CONSTANTS.MIN_NAME_LENGTH, `Role name must be at least ${ROLE_CONSTANTS.MIN_NAME_LENGTH} characters`)
    .max(ROLE_CONSTANTS.MAX_NAME_LENGTH, `Role name must be no more than ${ROLE_CONSTANTS.MAX_NAME_LENGTH} characters`)
    .regex(/^[a-zA-Z0-9_-]+$/, 'Role name can only contain letters, numbers, underscores, and hyphens'),

  displayName: z.string()
    .min(ROLE_CONSTANTS.MIN_NAME_LENGTH, `Display name must be at least ${ROLE_CONSTANTS.MIN_NAME_LENGTH} characters`)
    .max(ROLE_CONSTANTS.MAX_NAME_LENGTH, `Display name must be no more than ${ROLE_CONSTANTS.MAX_NAME_LENGTH} characters`),

  description: z.string()
    .max(ROLE_CONSTANTS.MAX_DESCRIPTION_LENGTH, `Description must be no more than ${ROLE_CONSTANTS.MAX_DESCRIPTION_LENGTH} characters`)
    .optional(),

  includePermissions: z.boolean().default(true).optional(),

  modifications: z.object({
    addPermissions: z.array(z.string().regex(VALIDATION_REGEX.OBJECT_ID, 'Invalid permission ID format')).optional(),
    removePermissions: z.array(z.string().regex(VALIDATION_REGEX.OBJECT_ID, 'Invalid permission ID format')).optional()
  }).optional()
});

// Role search validation
export const roleSearchSchema = z.object({
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
    .max(ROLE_CONSTANTS.MAX_PAGE_SIZE, `Limit cannot exceed ${ROLE_CONSTANTS.MAX_PAGE_SIZE}`)
    .default(ROLE_CONSTANTS.DEFAULT_PAGE_SIZE)
    .optional(),

  sortBy: z.enum(['name', 'displayName', 'status', 'createdAt', 'userCount'])
    .default('createdAt')
    .optional(),

  sortOrder: z.enum(['asc', 'desc'])
    .default('desc')
    .optional(),

  filters: z.object({
    status: z.array(z.enum(['active', 'inactive'])).optional(),
    isSystem: z.boolean().optional(),
    hasPermission: z.string().regex(VALIDATION_REGEX.OBJECT_ID, 'Invalid permission ID format').optional(),
    createdAfter: z.date().optional(),
    createdBefore: z.date().optional()
  }).optional()
});

// Permission creation validation
export const createPermissionSchema = z.object({
  name: z.string()
    .min(2, 'Permission name must be at least 2 characters')
    .max(100, 'Permission name must be no more than 100 characters')
    .regex(/^[a-zA-Z0-9_:-]+$/, 'Permission name can only contain letters, numbers, underscores, colons, and hyphens'),

  displayName: z.string()
    .min(2, 'Display name must be at least 2 characters')
    .max(100, 'Display name must be no more than 100 characters'),

  description: z.string()
    .max(255, 'Description must be no more than 255 characters')
    .optional(),

  resource: z.string()
    .min(1, 'Resource is required')
    .max(50, 'Resource must be no more than 50 characters')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Resource can only contain letters, numbers, underscores, and hyphens'),

  action: z.string()
    .min(1, 'Action is required')
    .max(50, 'Action must be no more than 50 characters')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Action can only contain letters, numbers, underscores, and hyphens'),

  conditions: z.array(z.object({
    field: z.string().min(1, 'Field is required'),
    operator: z.enum(['eq', 'neq', 'in', 'nin', 'gt', 'gte', 'lt', 'lte', 'regex']),
    value: z.any()
  })).optional(),

  metadata: z.record(z.any()).optional()
});

// Permission update validation
export const updatePermissionSchema = z.object({
  displayName: z.string()
    .min(2, 'Display name must be at least 2 characters')
    .max(100, 'Display name must be no more than 100 characters')
    .optional(),

  description: z.string()
    .max(255, 'Description must be no more than 255 characters')
    .optional(),

  conditions: z.array(z.object({
    field: z.string().min(1, 'Field is required'),
    operator: z.enum(['eq', 'neq', 'in', 'nin', 'gt', 'gte', 'lt', 'lte', 'regex']),
    value: z.any()
  })).optional(),

  metadata: z.record(z.any()).optional()
}).refine((data) => Object.keys(data).length > 0, {
  message: "At least one field must be provided for update"
});

// Permission search validation
export const permissionSearchSchema = z.object({
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
    .max(100, 'Limit cannot exceed 100')
    .default(20)
    .optional(),

  sortBy: z.enum(['name', 'displayName', 'resource', 'action', 'createdAt'])
    .default('createdAt')
    .optional(),

  sortOrder: z.enum(['asc', 'desc'])
    .default('desc')
    .optional(),

  filters: z.object({
    resource: z.array(z.string()).optional(),
    action: z.array(z.string()).optional(),
    isSystem: z.boolean().optional(),
    createdAfter: z.date().optional(),
    createdBefore: z.date().optional()
  }).optional()
});

// Type exports
export type CreateRoleInput = z.infer<typeof createRoleSchema>;
export type UpdateRoleInput = z.infer<typeof updateRoleSchema>;
export type UpdateRolePermissionsInput = z.infer<typeof updateRolePermissionsSchema>;
export type AddRolePermissionsInput = z.infer<typeof addRolePermissionsSchema>;
export type RemoveRolePermissionsInput = z.infer<typeof removeRolePermissionsSchema>;
export type AssignRoleInput = z.infer<typeof assignRoleSchema>;
export type RevokeRoleInput = z.infer<typeof revokeRoleSchema>;
export type CloneRoleInput = z.infer<typeof cloneRoleSchema>;
export type RoleSearchInput = z.infer<typeof roleSearchSchema>;
export type CreatePermissionInput = z.infer<typeof createPermissionSchema>;
export type UpdatePermissionInput = z.infer<typeof updatePermissionSchema>;
export type PermissionSearchInput = z.infer<typeof permissionSearchSchema>;
