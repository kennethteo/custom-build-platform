import { Response } from 'express';

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  timestamp: string;
  requestId?: string;
}

export class ResponseUtil {
  static success<T>(
    res: Response,
    message: string = 'Success',
    data?: T,
    statusCode: number = 200
  ): Response<ApiResponse<T>> {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      timestamp: new Date().toISOString(),
    });
  }

  static error(
    res: Response,
    message: string = 'Internal Server Error',
    error?: string,
    statusCode: number = 500
  ): Response<ApiResponse> {
    return res.status(statusCode).json({
      success: false,
      message,
      error,
      timestamp: new Date().toISOString(),
    });
  }

  static badRequest(
    res: Response,
    message: string = 'Bad Request',
    error?: string
  ): Response<ApiResponse> {
    return this.error(res, message, error, 400);
  }

  static unauthorized(
    res: Response,
    message: string = 'Unauthorized'
  ): Response<ApiResponse> {
    return this.error(res, message, undefined, 401);
  }

  static forbidden(
    res: Response,
    message: string = 'Forbidden'
  ): Response<ApiResponse> {
    return this.error(res, message, undefined, 403);
  }

  static notFound(
    res: Response,
    message: string = 'Not Found'
  ): Response<ApiResponse> {
    return this.error(res, message, undefined, 404);
  }

  static conflict(
    res: Response,
    message: string = 'Conflict'
  ): Response<ApiResponse> {
    return this.error(res, message, undefined, 409);
  }
}
