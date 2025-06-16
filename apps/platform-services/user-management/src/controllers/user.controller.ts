import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';
import { createError } from '../middleware/errorHandler';
import { z } from 'zod';

const updateProfileSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phone: z.string().regex(/^\+?[\d\s-()]+$/, 'Invalid phone number format').optional(),
  profile: z.object({
    bio: z.string().optional(),
    timezone: z.string().optional(),
    language: z.string().optional(),
    preferences: z.any().optional()
  }).optional()
});

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  getProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user?.id;
      
      if (!userId) {
        throw createError('Authentication required', 401);
      }

      const user = await this.userService.getUserById(userId);

      if (!user) {
        throw createError('User not found', 404);
      }

      res.json({
        success: true,
        data: {
          id: user._id,
          email: user.email,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          isActive: user.isActive,
          isVerified: user.isVerified,
          profile: user.profile,
          roles: user.roles,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          lastLogin: user.lastLogin
        }
      });
    } catch (error) {
      next(error);
    }
  };

  updateProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user?.id;
      
      if (!userId) {
        throw createError('Authentication required', 401);
      }

      const validatedData = updateProfileSchema.parse(req.body);
      const user = await this.userService.updateUser(userId, validatedData);

      if (!user) {
        throw createError('User not found', 404);
      }

      res.json({
        success: true,
        message: 'Profile updated successfully',
        data: {
          id: user._id,
          email: user.email,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          profile: user.profile,
          updatedAt: user.updatedAt
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = createError('Validation failed', 400);
        validationError.message = error.errors.map(err => `${err.path.join('.')}: ${err.message}`).join(', ');
        return next(validationError);
      }
      next(error);
    }
  };

  getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const search = req.query.search as string;

      const result = await this.userService.getAllUsers(page, limit, search);

      res.json({
        success: true,
        data: {
          users: result.users.map(user => ({
            id: user._id,
            email: user.email,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            isActive: user.isActive,
            isVerified: user.isVerified,
            roles: user.roles,
            createdAt: user.createdAt,
            lastLogin: user.lastLogin
          })),
          pagination: {
            page,
            limit,
            total: result.total,
            totalPages: result.totalPages
          }
        }
      });
    } catch (error) {
      next(error);
    }
  };

  getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      if (!id) {
        throw createError('User ID is required', 400);
      }
      const user = await this.userService.getUserById(id);

      if (!user) {
        throw createError('User not found', 404);
      }

      res.json({
        success: true,
        data: {
          user: {
            id: user._id,
            email: user.email,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            isActive: user.isActive,
            isVerified: user.isVerified,
            profile: user.profile,
            roles: user.roles,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            lastLogin: user.lastLogin
          }
        }
      });
    } catch (error) {
      next(error);
    }
  };

  assignRole = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const { roleId } = req.body;
      const assignedBy = req.user?.id;

      if (!id) {
        throw createError('User ID is required', 400);
      }
      if (!roleId) {
        throw createError('Role ID is required', 400);
      }

      const user = await this.userService.assignRole(id, roleId, assignedBy);

      if (!user) {
        throw createError('User not found', 404);
      }

      res.json({
        success: true,
        message: 'Role assigned successfully',
        data: {
          user: {
            id: user._id,
            roles: user.roles
          }
        }
      });
    } catch (error) {
      if (error instanceof Error) {
        const customError = createError(error.message, 400);
        return next(customError);
      }
      next(error);
    }
  };

  removeRole = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const { roleId } = req.body;

      if (!id) {
        throw createError('User ID is required', 400);
      }
      if (!roleId) {
        throw createError('Role ID is required', 400);
      }

      const user = await this.userService.removeRole(id, roleId);

      if (!user) {
        throw createError('User not found', 404);
      }

      res.json({
        success: true,
        message: 'Role removed successfully',
        data: {
          user: {
            id: user._id,
            roles: user.roles
          }
        }
      });
    } catch (error) {
      if (error instanceof Error) {
        const customError = createError(error.message, 400);
        return next(customError);
      }
      next(error);
    }
  };

  deactivateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      if (!id) {
        throw createError('User ID is required', 400);
      }
      const user = await this.userService.deactivateUser(id);

      if (!user) {
        throw createError('User not found', 404);
      }

      res.json({
        success: true,
        message: 'User deactivated successfully',
        data: {
          user: {
            id: user._id,
            isActive: user.isActive
          }
        }
      });
    } catch (error) {
      next(error);
    }
  };

  activateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      if (!id) {
        throw createError('User ID is required', 400);
      }
      const user = await this.userService.activateUser(id);

      if (!user) {
        throw createError('User not found', 404);
      }

      res.json({
        success: true,
        message: 'User activated successfully',
        data: {
          user: {
            id: user._id,
            isActive: user.isActive
          }
        }
      });
    } catch (error) {
      next(error);
    }
  };
}
