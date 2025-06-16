/**
 * Role and permission constants
 */

export const ROLE_CONSTANTS = {
  // Field length limits
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 50,
  MAX_DESCRIPTION_LENGTH: 255,
  
  // System role identifiers
  SYSTEM_ROLES: {
    SUPER_ADMIN: 'super_admin',
    ADMIN: 'admin',
    USER_MANAGER: 'user_manager',
    USER: 'user',
    GUEST: 'guest'
  } as const,
  
  // Role hierarchy levels
  HIERARCHY_LEVELS: {
    SUPER_ADMIN: 0,
    ADMIN: 1,
    USER_MANAGER: 2,
    USER: 3,
    GUEST: 4
  } as const,
  
  // Default roles that cannot be deleted
  PROTECTED_ROLES: ['super_admin', 'admin', 'user', 'guest'],
  
  // Pagination
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100
} as const;

export const PERMISSION_CONSTANTS = {
  // Resource types
  RESOURCES: {
    USER: 'user',
    ROLE: 'role',
    PERMISSION: 'permission',
    SYSTEM: 'system',
    AUDIT: 'audit'
  } as const,
  
  // Action types
  ACTIONS: {
    CREATE: 'create',
    READ: 'read',
    UPDATE: 'update',
    DELETE: 'delete',
    LIST: 'list',
    ASSIGN: 'assign',
    REVOKE: 'revoke',
    ADMIN: 'admin'
  } as const,
  
  // Permission naming convention: resource:action
  SYSTEM_PERMISSIONS: {
    // User permissions
    USER_CREATE: 'user:create',
    USER_READ: 'user:read',
    USER_UPDATE: 'user:update',
    USER_DELETE: 'user:delete',
    USER_LIST: 'user:list',
    
    // Role permissions
    ROLE_CREATE: 'role:create',
    ROLE_READ: 'role:read',
    ROLE_UPDATE: 'role:update',
    ROLE_DELETE: 'role:delete',
    ROLE_LIST: 'role:list',
    ROLE_ASSIGN: 'role:assign',
    ROLE_REVOKE: 'role:revoke',
    
    // Permission permissions
    PERMISSION_CREATE: 'permission:create',
    PERMISSION_READ: 'permission:read',
    PERMISSION_UPDATE: 'permission:update',
    PERMISSION_DELETE: 'permission:delete',
    PERMISSION_LIST: 'permission:list',
    PERMISSION_ASSIGN: 'permission:assign',
    PERMISSION_REVOKE: 'permission:revoke',
    
    // System permissions
    SYSTEM_ADMIN: 'system:admin',
    SYSTEM_CONFIG: 'system:config',
    SYSTEM_LOGS: 'system:logs',
    SYSTEM_HEALTH: 'system:health',
    
    // Audit permissions
    AUDIT_READ: 'audit:read',
    AUDIT_LIST: 'audit:list'
  } as const,
  
  // Condition operators
  OPERATORS: {
    EQ: 'eq',
    NEQ: 'neq',
    IN: 'in',
    NIN: 'nin',
    GT: 'gt',
    GTE: 'gte',
    LT: 'lt',
    LTE: 'lte',
    REGEX: 'regex'
  } as const,
  
  // Default permissions that cannot be deleted
  PROTECTED_PERMISSIONS: [
    'system:admin',
    'user:read',
    'user:update'
  ]
} as const;

export const ROLE_ERRORS = {
  NOT_FOUND: 'Role not found',
  ALREADY_EXISTS: 'Role already exists',
  INVALID_ID: 'Invalid role ID',
  CANNOT_DELETE_SYSTEM_ROLE: 'Cannot delete system role',
  CANNOT_MODIFY_SYSTEM_ROLE: 'Cannot modify system role',
  NAME_TAKEN: 'Role name is already taken',
  INVALID_NAME: 'Invalid role name format',
  CIRCULAR_HIERARCHY: 'Circular hierarchy detected',
  INVALID_PERMISSION: 'Invalid permission reference',
  PERMISSION_NOT_FOUND: 'Permission not found',
  CANNOT_ASSIGN_HIGHER_ROLE: 'Cannot assign role with higher privileges',
  ROLE_IN_USE: 'Role is currently assigned to users and cannot be deleted'
} as const;

export const PERMISSION_ERRORS = {
  NOT_FOUND: 'Permission not found',
  ALREADY_EXISTS: 'Permission already exists',
  INVALID_ID: 'Invalid permission ID',
  CANNOT_DELETE_SYSTEM_PERMISSION: 'Cannot delete system permission',
  CANNOT_MODIFY_SYSTEM_PERMISSION: 'Cannot modify system permission',
  NAME_TAKEN: 'Permission name is already taken',
  INVALID_NAME: 'Invalid permission name format',
  INVALID_RESOURCE: 'Invalid resource type',
  INVALID_ACTION: 'Invalid action type',
  INVALID_CONDITION: 'Invalid permission condition',
  PERMISSION_IN_USE: 'Permission is currently assigned and cannot be deleted'
} as const;

export const ROLE_MESSAGES = {
  CREATED: 'Role created successfully',
  UPDATED: 'Role updated successfully',
  DELETED: 'Role deleted successfully',
  ASSIGNED: 'Role assigned successfully',
  REVOKED: 'Role revoked successfully',
  PERMISSIONS_UPDATED: 'Role permissions updated successfully'
} as const;

export const PERMISSION_MESSAGES = {
  CREATED: 'Permission created successfully',
  UPDATED: 'Permission updated successfully',
  DELETED: 'Permission deleted successfully',
  ASSIGNED: 'Permission assigned successfully',
  REVOKED: 'Permission revoked successfully'
} as const;
