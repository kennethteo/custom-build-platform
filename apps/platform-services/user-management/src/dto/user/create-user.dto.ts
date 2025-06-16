/**
 * User creation DTO
 */

import { UserProfile, UserPreferences } from '../../types';

export interface CreateUserRequest {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  roles?: string[];
  status?: 'active' | 'inactive' | 'pending' | 'suspended';
  profile?: Partial<UserProfile>;
  preferences?: Partial<UserPreferences>;
  sendWelcomeEmail?: boolean;
  metadata?: Record<string, any>;
}

export interface CreateUserResponse {
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
    createdAt: string;
    updatedAt: string;
  };
}

export interface BulkCreateUserRequest {
  users: Omit<CreateUserRequest, 'confirmPassword'>[];
  sendWelcomeEmails?: boolean;
  validateEmails?: boolean;
}

export interface BulkCreateUserResponse {
  success: boolean;
  message: string;
  data: {
    created: CreateUserResponse['data'][];
    failed: {
      user: Omit<CreateUserRequest, 'password' | 'confirmPassword'>;
      error: string;
    }[];
    summary: {
      total: number;
      successful: number;
      failed: number;
    };
  };
}
