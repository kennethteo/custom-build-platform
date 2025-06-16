/**
 * Role creation DTO
 */

export interface CreateRoleRequest {
  name: string;
  displayName: string;
  description?: string;
  permissions: string[];
  status?: 'active' | 'inactive';
  metadata?: Record<string, any>;
}

export interface CreateRoleResponse {
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

export interface CloneRoleRequest {
  sourceRoleId: string;
  name: string;
  displayName: string;
  description?: string;
  includePermissions?: boolean;
  modifications?: {
    addPermissions?: string[];
    removePermissions?: string[];
  };
}
