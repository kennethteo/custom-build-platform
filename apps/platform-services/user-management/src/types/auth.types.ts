/**
 * Authentication-related type definitions
 */

import { User } from './user.types';

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  tokenType: 'Bearer';
  expiresIn: number;
}

export interface TokenPayload {
  userId: string;
  email: string;
  username: string;
  roles: string[];
  permissions: string[];
  sessionId: string;
  iat: number;
  exp: number;
}

export interface RefreshTokenData {
  refreshToken: string;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirm {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface EmailVerificationRequest {
  token: string;
}

export interface ResendVerificationRequest {
  email: string;
}

export interface AuthenticatedUser {
  user: Omit<User, 'password'>;
  tokens: AuthTokens;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: AuthenticatedUser;
}

export interface LogoutRequest {
  refreshToken?: string;
  allDevices?: boolean;
}

export interface TwoFactorSetupRequest {
  password: string;
}

export interface TwoFactorVerifyRequest {
  token: string;
  code: string;
}

export interface TwoFactorLoginRequest {
  email: string;
  password: string;
  twoFactorCode: string;
}

export type AuthProvider = 'local' | 'google' | 'github' | 'microsoft';

export interface SocialAuthRequest {
  provider: AuthProvider;
  accessToken: string;
  profile?: any;
}
