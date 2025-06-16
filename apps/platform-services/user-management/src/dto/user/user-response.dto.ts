/**
 * User response DTOs
 */

import { UserProfile, UserPreferences, PaginationResult } from '../../types';

export interface UserResponse {
  _id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  status: 'active' | 'inactive' | 'pending' | 'suspended';
  emailVerified: boolean;
  lastLogin?: string;
  roles: RoleInfo[];
  permissions: PermissionInfo[];
  profile?: UserProfile;
  preferences?: UserPreferences;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface UserSummaryResponse {
  _id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  status: string;
  emailVerified: boolean;
  lastLogin?: string;
  roleCount: number;
  createdAt: string;
}

export interface UserDetailResponse extends UserResponse {
  loginAttempts: number;
  lockUntil?: string;
  sessionCount: number;
  lastActivity?: string;
  permissions: PermissionInfo[];
}

export interface RoleInfo {
  _id: string;
  name: string;
  displayName: string;
  description?: string;
}

export interface PermissionInfo {
  _id: string;
  name: string;
  displayName: string;
  resource: string;
  action: string;
  description?: string;
}

export interface UserListResponse {
  success: boolean;
  message: string;
  data: PaginationResult<UserSummaryResponse>;
}

export interface UserSearchResponse {
  success: boolean;
  message: string;
  data: {
    users: UserSummaryResponse[];
    totalCount: number;
    searchQuery: string;
    filters?: Record<string, any>;
  };
}

export interface UserStatsResponse {
  success: boolean;
  message: string;
  data: {
    total: number;
    active: number;
    inactive: number;
    pending: number;
    suspended: number;
    emailVerified: number;
    emailUnverified: number;
    recentLogins: number; // Last 24 hours
    newRegistrations: number; // Last 7 days
    byRole: Record<string, number>;
  };
}

export interface GetUserResponse {
  success: boolean;
  message: string;
  data: UserResponse;
}

export interface GetUserDetailResponse {
  success: boolean;
  message: string;
  data: UserDetailResponse;
}
