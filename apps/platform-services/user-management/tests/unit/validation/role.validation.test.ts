/**
 * Role Validation Tests
 * Tests for role-related validation schemas
 */

import { z } from 'zod';

describe('Role Validation', () => {
  describe('Role Creation Validation', () => {
    const createRoleSchema = z.object({
      name: z.string()
        .min(2, 'Role name must be at least 2 characters')
        .max(50, 'Role name must be no more than 50 characters')
        .regex(/^[a-zA-Z0-9_-]+$/, 'Role name can only contain letters, numbers, underscores, and hyphens'),
      description: z.string()
        .min(1, 'Description is required')
        .max(255, 'Description must be no more than 255 characters'),
      permissions: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid permission ID format')).optional(),
      isActive: z.boolean().default(true).optional()
    });

    it('should validate correct role creation data', () => {
      const validRoleData = [
        {
          name: 'admin',
          description: 'Administrator role with full access'
        },
        {
          name: 'moderator',
          description: 'Moderator role with limited admin access',
          permissions: ['507f1f77bcf86cd799439011', '507f191e810c19729de860ea'],
          isActive: true
        },
        {
          name: 'user-manager',
          description: 'Role for managing users',
          permissions: ['507f1f77bcf86cd799439011'],
          isActive: false
        }
      ];

      validRoleData.forEach(data => {
        const result = createRoleSchema.safeParse(data);
        expect(result.success).toBe(true);
      });
    });

    it('should reject invalid role creation data', () => {
      const invalidRoleData = [
        {
          name: 'a', // too short
          description: 'Valid description'
        },
        {
          name: 'a'.repeat(51), // too long
          description: 'Valid description'
        },
        {
          name: 'invalid role', // contains space
          description: 'Valid description'
        },
        {
          name: 'admin@role', // contains special character
          description: 'Valid description'
        },
        {
          name: 'valid-role',
          description: '' // empty description
        },
        {
          name: 'valid-role',
          description: 'a'.repeat(256) // description too long
        },
        {
          name: 'valid-role',
          description: 'Valid description',
          permissions: ['invalid-id'] // invalid permission ID
        }
      ];

      invalidRoleData.forEach(data => {
        const result = createRoleSchema.safeParse(data);
        expect(result.success).toBe(false);
      });
    });
  });

  describe('Role Update Validation', () => {
    const updateRoleSchema = z.object({
      name: z.string()
        .min(2, 'Role name must be at least 2 characters')
        .max(50, 'Role name must be no more than 50 characters')
        .regex(/^[a-zA-Z0-9_-]+$/, 'Role name can only contain letters, numbers, underscores, and hyphens')
        .optional(),
      description: z.string()
        .min(1, 'Description cannot be empty')
        .max(255, 'Description must be no more than 255 characters')
        .optional(),
      permissions: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid permission ID format')).optional(),
      isActive: z.boolean().optional()
    }).refine(data => Object.keys(data).length > 0, {
      message: 'At least one field must be provided for update'
    });

    it('should validate correct role update data', () => {
      const validUpdateData = [
        {
          description: 'Updated description'
        },
        {
          name: 'new-role-name',
          description: 'Updated description'
        },
        {
          permissions: ['507f1f77bcf86cd799439011']
        },
        {
          isActive: false
        },
        {
          name: 'updated-role',
          description: 'Updated description',
          permissions: ['507f1f77bcf86cd799439011', '507f191e810c19729de860ea'],
          isActive: true
        }
      ];

      validUpdateData.forEach(data => {
        const result = updateRoleSchema.safeParse(data);
        expect(result.success).toBe(true);
      });
    });

    it('should reject invalid role update data', () => {
      const invalidUpdateData = [
        {}, // empty object
        {
          name: 'a' // too short
        },
        {
          description: '' // empty description
        },
        {
          permissions: ['invalid-id'] // invalid permission ID
        }
      ];

      invalidUpdateData.forEach(data => {
        const result = updateRoleSchema.safeParse(data);
        expect(result.success).toBe(false);
      });
    });
  });

  describe('Role Assignment Validation', () => {
    const assignRoleSchema = z.object({
      userId: z.string()
        .regex(/^[0-9a-fA-F]{24}$/, 'Invalid user ID format'),
      roleId: z.string()
        .regex(/^[0-9a-fA-F]{24}$/, 'Invalid role ID format'),
      assignedBy: z.string()
        .regex(/^[0-9a-fA-F]{24}$/, 'Invalid assignedBy user ID format')
        .optional(),
      reason: z.string()
        .max(255, 'Reason must be no more than 255 characters')
        .optional()
    });

    it('should validate correct role assignment data', () => {
      const validAssignmentData = [
        {
          userId: '507f1f77bcf86cd799439011',
          roleId: '507f191e810c19729de860ea'
        },
        {
          userId: '507f1f77bcf86cd799439011',
          roleId: '507f191e810c19729de860ea',
          assignedBy: '507f1f77bcf86cd799439012',
          reason: 'Promoted to admin'
        }
      ];

      validAssignmentData.forEach(data => {
        const result = assignRoleSchema.safeParse(data);
        expect(result.success).toBe(true);
      });
    });

    it('should reject invalid role assignment data', () => {
      const invalidAssignmentData = [
        {
          userId: 'invalid-id',
          roleId: '507f191e810c19729de860ea'
        },
        {
          userId: '507f1f77bcf86cd799439011',
          roleId: 'invalid-id'
        },
        {
          userId: '507f1f77bcf86cd799439011',
          roleId: '507f191e810c19729de860ea',
          assignedBy: 'invalid-id'
        },
        {
          userId: '507f1f77bcf86cd799439011',
          roleId: '507f191e810c19729de860ea',
          reason: 'a'.repeat(256) // reason too long
        }
      ];

      invalidAssignmentData.forEach(data => {
        const result = assignRoleSchema.safeParse(data);
        expect(result.success).toBe(false);
      });
    });
  });

  describe('Role Query Validation', () => {
    const roleQuerySchema = z.object({
      page: z.coerce.number().int().min(1, 'Page must be at least 1').default(1),
      limit: z.coerce.number().int().min(1).max(100, 'Limit cannot exceed 100').default(10),
      search: z.string().max(100, 'Search query must be no more than 100 characters').optional(),
      isActive: z.coerce.boolean().optional(),
      sortBy: z.enum(['name', 'createdAt', 'updatedAt']).default('name'),
      sortOrder: z.enum(['asc', 'desc']).default('asc')
    });

    it('should validate correct role query data', () => {
      const validQueryData = [
        {},
        {
          page: 1,
          limit: 10
        },
        {
          page: 2,
          limit: 25,
          search: 'admin',
          isActive: true,
          sortBy: 'name',
          sortOrder: 'asc'
        },
        {
          search: 'moderator',
          sortBy: 'createdAt',
          sortOrder: 'desc'
        }
      ];

      validQueryData.forEach(data => {
        const result = roleQuerySchema.safeParse(data);
        expect(result.success).toBe(true);
      });
    });

    it('should reject invalid role query data', () => {
      const invalidQueryData = [
        {
          page: 0 // page must be at least 1
        },
        {
          limit: 101 // limit exceeds maximum
        },
        {
          search: 'a'.repeat(101) // search query too long
        },
        {
          sortBy: 'invalid-field' // invalid sort field
        },
        {
          sortOrder: 'invalid-order' // invalid sort order
        }
      ];

      invalidQueryData.forEach(data => {
        const result = roleQuerySchema.safeParse(data);
        expect(result.success).toBe(false);
      });
    });
  });

  describe('System Role Validation', () => {
    it('should validate system role names', () => {
      const systemRoles = [
        'system_admin',
        'admin',
        'moderator',
        'user',
        'guest'
      ];

      systemRoles.forEach(roleName => {
        expect(roleName).toMatch(/^[a-zA-Z0-9_-]+$/);
        expect(roleName.length).toBeGreaterThan(1);
        expect(roleName.length).toBeLessThanOrEqual(50);
      });
    });

    it('should validate role hierarchy', () => {
      const roleHierarchy = {
        'system_admin': 10,
        'admin': 8,
        'moderator': 6,
        'manager': 4,
        'user': 2,
        'guest': 1
      };

      Object.entries(roleHierarchy).forEach(([role, level]) => {
        expect(typeof role).toBe('string');
        expect(typeof level).toBe('number');
        expect(level).toBeGreaterThan(0);
        expect(level).toBeLessThanOrEqual(10);
      });
    });
  });
});