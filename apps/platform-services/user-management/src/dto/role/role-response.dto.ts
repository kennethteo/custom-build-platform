/**
 * Role response DTOs
 */

import { PaginationResult } from '../../types';

export interface RoleResponse {
  _id: string;
  name: string;
  displayName: string;
  description?: string;
  status: 'active' | 'inactive';
  permissions: RolePermissionInfo[];
  isSystem: boolean;
  userCount: number;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface RoleSummaryResponse {
  _id: string;
  name: string;
  displayName: string;
  description?: string;
  status: string;
  permissionCount: number;
  userCount: number;
  isSystem: boolean;
  createdAt: string;
}

export interface RolePermissionInfo {
  _id: string;
  name: string;
  displayName: string;
  resource: string;
  action: string;
  description?: string;
}

export interface RoleDetailResponse extends RoleResponse {
  hierarchy?: {
    parentRoles: RoleSummaryResponse[];
    childRoles: RoleSummaryResponse[];
  };
  users: {
    _id: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    assignedAt: string;
    expiresAt?: string;
  }[];
  auditLog: {
    action: string;
    performedBy: string;
    timestamp: string;
    details?: Record<string, any>;
  }[];
}

export interface RoleListResponse {
  success: boolean;
  message: string;
  data: PaginationResult<RoleSummaryResponse>;
}

export interface RoleSearchResponse {
  success: boolean;
  message: string;
  data: {
    roles: RoleSummaryResponse[];
    totalCount: number;
    searchQuery: string;
    filters?: Record<string, any>;
  };
}

export interface RoleStatsResponse {
  success: boolean;
  message: string;
  data: {
    total: number;
    active: number;
    inactive: number;
    system: number;
    custom: number;
    mostUsed: {
      roleId: string;
      name: string;
      userCount: number;
    }[];
    recentlyCreated: RoleSummaryResponse[];
  };
}

export interface GetRoleResponse {
  success: boolean;
  message: string;
  data: RoleResponse;
}

export interface GetRoleDetailResponse {
  success: boolean;
  message: string;
  data: RoleDetailResponse;
}
