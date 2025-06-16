/**
 * Standard API response DTOs
 */

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  timestamp: string;
  requestId?: string;
}

export interface SuccessResponse<T = any> {
  success: true;
  message: string;
  data: T;
  timestamp: string;
  requestId?: string;
}

export interface ErrorResponse {
  success: false;
  message: string;
  error: string;
  timestamp: string;
  requestId?: string;
  details?: any;
}

export interface ValidationErrorResponse extends ErrorResponse {
  validationErrors: {
    field: string;
    message: string;
    value?: any;
  }[];
}

export interface BulkOperationResponse<T> {
  success: boolean;
  message: string;
  data: {
    successful: T[];
    failed: {
      item: any;
      error: string;
    }[];
    summary: {
      total: number;
      successful: number;
      failed: number;
    };
  };
  timestamp: string;
}

export interface HealthCheckResponse {
  status: 'healthy' | 'unhealthy';
  timestamp: string;
  uptime: number;
  version: string;
  services: {
    database: 'healthy' | 'unhealthy';
    redis?: 'healthy' | 'unhealthy';
    email?: 'healthy' | 'unhealthy';
  };
  memory: {
    used: number;
    total: number;
    percentage: number;
  };
}
