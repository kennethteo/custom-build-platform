export interface LoginRequestDTO {
  emailOrUsername: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponseDTO {
  success: boolean;
  message: string;
  data: {
    user: UserPublicDTO;
    token: string;
    expiresAt: string;
    refreshToken?: string;
  };
}

export interface RegisterRequestDTO {
  email: string;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  acceptTerms: boolean;
}

export interface RegisterResponseDTO {
  success: boolean;
  message: string;
  data: {
    user: UserPublicDTO;
    requiresVerification: boolean;
  };
}

export interface RefreshTokenRequestDTO {
  refreshToken: string;
}

export interface RefreshTokenResponseDTO {
  success: boolean;
  data: {
    token: string;
    expiresAt: string;
    refreshToken?: string;
  };
}

export interface ChangePasswordRequestDTO {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ForgotPasswordRequestDTO {
  email: string;
}

export interface ResetPasswordRequestDTO {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface VerifyEmailRequestDTO {
  token: string;
}

export interface UserPublicDTO {
  id: string;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  isActive: boolean;
  isVerified: boolean;
  roles: Array<{
    roleId: string;
    name: string;
    assignedAt: string;
  }>;
  profile?: {
    bio?: string;
    timezone: string;
    language: string;
    preferences: Record<string, any>;
  };
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
}
