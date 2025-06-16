/**
 * User-related type definitions
 */

import { BaseEntity, Status, TimestampEntity } from './common.types';

export interface User extends BaseEntity {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  status: Status;
  emailVerified: boolean;
  emailVerificationToken?: string;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  lastLogin?: Date;
  loginAttempts: number;
  lockUntil?: Date;
  roles: string[]; // Role IDs
  permissions: string[]; // Permission IDs
  profile?: UserProfile;
  preferences?: UserPreferences;
  metadata?: Record<string, any>;
}

export interface UserProfile {
  avatar?: string;
  phone?: string;
  address?: UserAddress;
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'other';
  timezone?: string;
  locale?: string;
}

export interface UserAddress {
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

export interface UserPreferences {
  theme?: 'light' | 'dark' | 'auto';
  language?: string;
  emailNotifications?: boolean;
  pushNotifications?: boolean;
  twoFactorEnabled?: boolean;
}

export interface UserSession extends TimestampEntity {
  _id: string;
  userId: string;
  token: string;
  deviceInfo?: DeviceInfo;
  ipAddress?: string;
  userAgent?: string;
  expiresAt: Date;
  isActive: boolean;
  lastActivity: Date;
}

export interface DeviceInfo {
  type?: 'desktop' | 'mobile' | 'tablet';
  os?: string;
  browser?: string;
  version?: string;
}

export interface UserActivity extends TimestampEntity {
  _id: string;
  userId: string;
  action: string;
  resource?: string;
  resourceId?: string;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Record<string, any>;
}

export type UserStatus = Status;

export interface UserFilters {
  status?: UserStatus[];
  roles?: string[];
  emailVerified?: boolean;
  lastLoginAfter?: Date;
  lastLoginBefore?: Date;
  createdAfter?: Date;
  createdBefore?: Date;
}
