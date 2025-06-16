/**
 * Role and permission type definitions
 */

import { BaseEntity, Status } from './common.types';

export interface Role extends BaseEntity {
  name: string;
  displayName: string;
  description?: string;
  status: Status;
  permissions: string[]; // Permission IDs
  isSystem: boolean; // System roles cannot be deleted
  metadata?: Record<string, any>;
}

export interface Permission extends BaseEntity {
  name: string;
  displayName: string;
  description?: string;
  resource: string; // e.g., 'user', 'role', 'permission'
  action: string; // e.g., 'create', 'read', 'update', 'delete'
  conditions?: PermissionCondition[]; // Advanced conditions
  isSystem: boolean; // System permissions cannot be deleted
  metadata?: Record<string, any>;
}

export interface PermissionCondition {
  field: string;
  operator: 'eq' | 'neq' | 'in' | 'nin' | 'gt' | 'gte' | 'lt' | 'lte' | 'regex';
  value: any;
}

export interface RoleAssignment {
  userId: string;
  roleId: string;
  assignedBy: string;
  assignedAt: Date;
  expiresAt?: Date;
  isActive: boolean;
  metadata?: Record<string, any>;
}

export interface PermissionAssignment {
  userId: string;
  permissionId: string;
  assignedBy: string;
  assignedAt: Date;
  expiresAt?: Date;
  isActive: boolean;
  metadata?: Record<string, any>;
}

export interface RoleHierarchy {
  parentRoleId: string;
  childRoleId: string;
  inheritPermissions: boolean;
  createdAt: Date;
  createdBy: string;
}

export type RoleStatus = Status;
export type PermissionStatus = Status;

export interface RoleFilters {
  status?: RoleStatus[];
  isSystem?: boolean;
  hasPermission?: string;
  createdAfter?: Date;
  createdBefore?: Date;
}

export interface PermissionFilters {
  resource?: string[];
  action?: string[];
  isSystem?: boolean;
  createdAfter?: Date;
  createdBefore?: Date;
}

// Predefined system roles
export enum SystemRoles {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  USER_MANAGER = 'user_manager',
  USER = 'user',
  GUEST = 'guest'
}

// Predefined system permissions
export enum SystemPermissions {
  // User permissions
  USER_CREATE = 'user:create',
  USER_READ = 'user:read',
  USER_UPDATE = 'user:update',
  USER_DELETE = 'user:delete',
  USER_LIST = 'user:list',
  
  // Role permissions
  ROLE_CREATE = 'role:create',
  ROLE_READ = 'role:read',
  ROLE_UPDATE = 'role:update',
  ROLE_DELETE = 'role:delete',
  ROLE_LIST = 'role:list',
  ROLE_ASSIGN = 'role:assign',
  
  // Permission permissions
  PERMISSION_CREATE = 'permission:create',
  PERMISSION_READ = 'permission:read',
  PERMISSION_UPDATE = 'permission:update',
  PERMISSION_DELETE = 'permission:delete',
  PERMISSION_LIST = 'permission:list',
  PERMISSION_ASSIGN = 'permission:assign',
  
  // System permissions
  SYSTEM_ADMIN = 'system:admin',
  SYSTEM_CONFIG = 'system:config',
  SYSTEM_LOGS = 'system:logs',
  SYSTEM_HEALTH = 'system:health'
}
