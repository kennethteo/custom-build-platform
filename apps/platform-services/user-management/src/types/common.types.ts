/**
 * Common types used across the application
 */

export interface PaginationOptions {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginationResult<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  timestamp: string;
}

export interface SearchOptions {
  query?: string;
  filters?: Record<string, any>;
  pagination?: PaginationOptions;
}

export interface AuditInfo {
  createdBy: string;
  createdAt: Date;
  updatedBy?: string;
  updatedAt?: Date;
}

export type SortOrder = 'asc' | 'desc';

export type Status = 'active' | 'inactive' | 'pending' | 'suspended';

export interface BaseEntity {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TimestampEntity {
  createdAt: Date;
  updatedAt: Date;
}

export interface SoftDeleteEntity {
  deletedAt?: Date;
  isDeleted: boolean;
}
