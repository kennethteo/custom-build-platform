import { apiClient } from '@/lib/api-client';
import {
  User,
  Role,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  CreateUserRequest,
  UpdateUserRequest,
  CreateRoleRequest,
  UpdateRoleRequest,
  PaginationParams,
  PaginatedResponse,
} from '@/types/api';

export class AuthService {
  static async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>('/auth/login', data);
    if (!response.success || !response.data) {
      throw new Error(response.error?.message || 'Login failed');
    }
    return response.data;
  }

  static async register(data: RegisterRequest): Promise<User> {
    const response = await apiClient.post<User>('/auth/register', data);
    if (!response.success || !response.data) {
      throw new Error(response.error?.message || 'Registration failed');
    }
    return response.data;
  }

  static async logout(): Promise<void> {
    await apiClient.post('/auth/logout');
  }

  static async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    const response = await apiClient.post('/auth/change-password', {
      currentPassword,
      newPassword,
    });
    if (!response.success) {
      throw new Error(response.error?.message || 'Password change failed');
    }
  }

  static async getProfile(): Promise<User> {
    const response = await apiClient.get<User>('/users/profile');
    if (!response.success || !response.data) {
      throw new Error(response.error?.message || 'Failed to fetch profile');
    }
    return response.data;
  }

  static async updateProfile(data: UpdateUserRequest): Promise<User> {
    const response = await apiClient.put<User>('/users/profile', data);
    if (!response.success || !response.data) {
      throw new Error(response.error?.message || 'Profile update failed');
    }
    return response.data;
  }
}

export class UserService {
  static async getUsers(params: PaginationParams = {}): Promise<PaginatedResponse<User>> {
    const response = await apiClient.get<PaginatedResponse<User>>('/users', params);
    if (!response.success || !response.data) {
      throw new Error(response.error?.message || 'Failed to fetch users');
    }
    return response.data;
  }

  static async getUserById(id: string): Promise<User> {
    const response = await apiClient.get<User>(`/users/${id}`);
    if (!response.success || !response.data) {
      throw new Error(response.error?.message || 'Failed to fetch user');
    }
    return response.data;
  }

  static async createUser(data: CreateUserRequest): Promise<User> {
    const response = await apiClient.post<User>('/users', data);
    if (!response.success || !response.data) {
      throw new Error(response.error?.message || 'User creation failed');
    }
    return response.data;
  }

  static async updateUser(id: string, data: UpdateUserRequest): Promise<User> {
    const response = await apiClient.put<User>(`/users/${id}`, data);
    if (!response.success || !response.data) {
      throw new Error(response.error?.message || 'User update failed');
    }
    return response.data;
  }

  static async deleteUser(id: string): Promise<void> {
    const response = await apiClient.delete(`/users/${id}`);
    if (!response.success) {
      throw new Error(response.error?.message || 'User deletion failed');
    }
  }

  static async assignRole(userId: string, roleId: string): Promise<void> {
    const response = await apiClient.post(`/users/${userId}/roles`, { roleId });
    if (!response.success) {
      throw new Error(response.error?.message || 'Role assignment failed');
    }
  }

  static async removeRole(userId: string, roleId: string): Promise<void> {
    const response = await apiClient.post(`/users/${userId}/roles/remove`, { roleId });
    if (!response.success) {
      throw new Error(response.error?.message || 'Role removal failed');
    }
  }

  static async activateUser(id: string): Promise<void> {
    const response = await apiClient.patch(`/users/${id}/activate`);
    if (!response.success) {
      throw new Error(response.error?.message || 'User activation failed');
    }
  }

  static async deactivateUser(id: string): Promise<void> {
    const response = await apiClient.patch(`/users/${id}/deactivate`);
    if (!response.success) {
      throw new Error(response.error?.message || 'User deactivation failed');
    }
  }
}

export class RoleService {
  static async getRoles(): Promise<Role[]> {
    const response = await apiClient.get<Role[]>('/roles');
    if (!response.success || !response.data) {
      throw new Error(response.error?.message || 'Failed to fetch roles');
    }
    return response.data;
  }

  static async getRoleById(id: string): Promise<Role> {
    const response = await apiClient.get<Role>(`/roles/${id}`);
    if (!response.success || !response.data) {
      throw new Error(response.error?.message || 'Failed to fetch role');
    }
    return response.data;
  }

  static async createRole(data: CreateRoleRequest): Promise<Role> {
    const response = await apiClient.post<Role>('/roles', data);
    if (!response.success || !response.data) {
      throw new Error(response.error?.message || 'Role creation failed');
    }
    return response.data;
  }

  static async updateRole(id: string, data: UpdateRoleRequest): Promise<Role> {
    const response = await apiClient.put<Role>(`/roles/${id}`, data);
    if (!response.success || !response.data) {
      throw new Error(response.error?.message || 'Role update failed');
    }
    return response.data;
  }

  static async deleteRole(id: string): Promise<void> {
    const response = await apiClient.delete(`/roles/${id}`);
    if (!response.success) {
      throw new Error(response.error?.message || 'Role deletion failed');
    }
  }
}
