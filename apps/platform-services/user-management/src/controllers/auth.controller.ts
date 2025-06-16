import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';
import { createError } from '../middleware/errorHandler';
import { z } from 'zod';

const registerSchema = z.object({
  email: z.string().email('Invalid email format'),
  username: z.string().min(3, 'Username must be at least 3 characters').max(30, 'Username must be less than 30 characters'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phone: z.string().optional()
});

const loginSchema = z.object({
  emailOrUsername: z.string().min(1, 'Email or username is required'),
  password: z.string().min(1, 'Password is required')
});

export class AuthController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const validatedData = registerSchema.parse(req.body);
      const result = await this.userService.createUserWithSession(validatedData, {
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
      });

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
          user: {
            id: result.user._id,
            email: result.user.email,
            username: result.user.username,
            firstName: result.user.firstName,
            lastName: result.user.lastName,
            isVerified: result.user.isVerified,
            createdAt: result.user.createdAt
          },
          token: result.session.token,
          expiresAt: result.session.expiresAt
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = createError('Validation failed', 400);
        validationError.message = error.errors.map(err => `${err.path.join('.')}: ${err.message}`).join(', ');
        return next(validationError);
      }
      
      if (error instanceof Error) {
        const customError = createError(error.message, 400);
        return next(customError);
      }
      
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const validatedData = loginSchema.parse(req.body);
      const result = await this.userService.authenticateUser({
        ...validatedData,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
      });

      res.json({
        success: true,
        message: 'Login successful',
        data: {
          user: {
            id: result.user._id,
            email: result.user.email,
            username: result.user.username,
            firstName: result.user.firstName,
            lastName: result.user.lastName,
            roles: result.user.roles,
            lastLogin: result.user.lastLogin
          },
          token: result.session.token,
          expiresAt: result.session.expiresAt
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = createError('Validation failed', 400);
        validationError.message = error.errors.map(err => `${err.path.join('.')}: ${err.message}`).join(', ');
        return next(validationError);
      }
      
      if (error instanceof Error) {
        const customError = createError(error.message, 401);
        return next(customError);
      }
      
      next(error);
    }
  };

  logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user?.id;
      const sessionId = req.user?.sessionId;

      if (userId && sessionId) {
        await this.userService.logout(userId, sessionId);
      }

      res.json({
        success: true,
        message: 'Logged out successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  refreshToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // For now, we'll just return the current user info
      // In a more sophisticated implementation, you'd generate a new token
      
      if (!req.user) {
        throw createError('Authentication required', 401);
      }

      const user = await this.userService.getUserById(req.user.id);
      
      if (!user) {
        throw createError('User not found', 404);
      }

      res.json({
        success: true,
        message: 'Token refreshed',
        data: {
          user: {
            id: user._id,
            email: user.email,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            roles: user.roles,
            lastLogin: user.lastLogin
          }
        }
      });
    } catch (error) {
      next(error);
    }
  };

  forgotPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email } = req.body;
      
      if (!email) {
        throw createError('Email is required', 400);
      }

      // TODO: Implement password reset functionality
      // For now, just return a success message
      
      res.json({
        success: true,
        message: 'If an account with that email exists, a password reset link has been sent.'
      });
    } catch (error) {
      next(error);
    }
  };

  resetPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { token, newPassword } = req.body;
      
      if (!token || !newPassword) {
        throw createError('Token and new password are required', 400);
      }

      // TODO: Implement password reset verification and update
      // For now, just return a success message
      
      res.json({
        success: true,
        message: 'Password has been reset successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  changePassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { currentPassword, newPassword } = req.body;
      const userId = req.user?.id;

      if (!currentPassword || !newPassword) {
        throw createError('Current password and new password are required', 400);
      }

      if (!userId) {
        throw createError('Authentication required', 401);
      }

      await this.userService.changePassword(userId, currentPassword, newPassword);

      res.json({
        success: true,
        message: 'Password changed successfully'
      });
    } catch (error) {
      if (error instanceof Error) {
        const customError = createError(error.message, 400);
        return next(customError);
      }
      next(error);
    }
  };
}
