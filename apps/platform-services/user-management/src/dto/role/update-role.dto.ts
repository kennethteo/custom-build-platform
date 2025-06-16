/**
 * Role update DTO
 */

export interface UpdateRoleRequest {
  displayName?: string;
  description?: string;
  status?: 'active' | 'inactive';
  permissions?: string[];
  metadata?: Record<string, any>;
}

export interface UpdateRoleResponse {
  success: boolean;
  message: string;
  data: {
    _id: string;
    name: string;
    displayName: string;
    description?: string;
    status: string;
    permissions: string[];
    isSystem: boolean;
    metadata?: Record<string, any>;
    createdAt: string;
    updatedAt: string;
  };
}

export interface UpdateRolePermissionsRequest {
  permissions: string[];
  reason?: string;
}

export interface AddRolePermissionsRequest {
  permissions: string[];
  reason?: string;
}

export interface RemoveRolePermissionsRequest {
  permissions: string[];
  reason?: string;
}

export interface AssignRoleRequest {
  userIds: string[];
  reason?: string;
  expiresAt?: string;
}

export interface RevokeRoleRequest {
  userIds: string[];
  reason?: string;
}

export interface AssignRoleResponse {
  success: boolean;
  message: string;
  data: {
    roleId: string;
    assigned: {
      userId: string;
      assignedAt: string;
      expiresAt?: string;
    }[];
    failed: {
      userId: string;
      error: string;
    }[];
    summary: {
      total: number;
      successful: number;
      failed: number;
    };
  };
}
