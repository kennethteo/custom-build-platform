export interface User {
  _id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  phone?: string;
  roles: Role[];
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
  profile?: {
    bio?: string;
    timezone?: string;
    preferences?: {
      theme?: 'light' | 'dark';
      notifications?: {
        email: boolean;
        push: boolean;
      };
    };
  };
}

export interface Role {
  _id: string;
  name: string;
  description: string;
  permissions: Permission[];
  createdAt: string;
  updatedAt: string;
}

export interface Permission {
  _id: string;
  name: string;
  description: string;
  resource: string;
  action: string;
}

export interface LoginRequest {
  emailOrUsername: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface CreateUserRequest {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  roles?: string[];
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  phone?: string;
  profile?: {
    bio?: string;
    timezone?: string;
    preferences?: {
      theme?: 'light' | 'dark';
      notifications?: {
        email: boolean;
        push: boolean;
      };
    };
  };
}

export interface CreateRoleRequest {
  name: string;
  description: string;
  permissions: string[];
}

export interface UpdateRoleRequest {
  name?: string;
  description?: string;
  permissions?: string[];
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}
