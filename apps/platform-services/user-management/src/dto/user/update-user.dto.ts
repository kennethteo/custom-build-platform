/**
 * User update DTO
 */

import { UserProfile, UserPreferences } from '../../types';

export interface UpdateUserRequest {
  email?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  status?: 'active' | 'inactive' | 'pending' | 'suspended';
  roles?: string[];
  emailVerified?: boolean;
  profile?: Partial<UserProfile>;
  preferences?: Partial<UserPreferences>;
  metadata?: Record<string, any>;
}

export interface UpdateUserResponse {
  success: boolean;
  message: string;
  data: {
    _id: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    status: string;
    emailVerified: boolean;
    roles: string[];
    profile?: UserProfile;
    preferences?: UserPreferences;
    metadata?: Record<string, any>;
    createdAt: string;
    updatedAt: string;
  };
}

export interface UpdateUserProfileRequest {
  firstName?: string;
  lastName?: string;
  profile?: Partial<UserProfile>;
  preferences?: Partial<UserPreferences>;
}

export interface UpdateUserStatusRequest {
  status: 'active' | 'inactive' | 'pending' | 'suspended';
  reason?: string;
}

export interface UpdateUserRolesRequest {
  roles: string[];
  reason?: string;
}

export interface BulkUpdateUserRequest {
  userIds: string[];
  updates: Omit<UpdateUserRequest, 'email' | 'username'>;
  reason?: string;
}

export interface BulkUpdateUserResponse {
  success: boolean;
  message: string;
  data: {
    updated: UpdateUserResponse['data'][];
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
