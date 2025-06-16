import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';
import { createError } from './errorHandler';

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        sessionId: string;
        email: string;
        username: string;
        roles: string[];
      };
    }
  }
}

const userService = new UserService();

export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw createError('Access token is required', 401);
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    
    const user = await userService.validateSession(token);
    
    if (!user) {
      throw createError('Invalid or expired token', 401);
    }

    // Add user info to request object
    req.user = {
      id: user._id.toString(),
      sessionId: '', // We'd need to extract this from the JWT
      email: user.email,
      username: user.username,
      roles: user.roles.map(role => role.name)
    };

    next();
  } catch (error) {
    next(error);
  }
};

export const authorize = (requiredRoles: string | string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      if (!req.user) {
        throw createError('Authentication required', 401);
      }

      const roles = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];
      
      const hasRequiredRole = roles.some(role => req.user!.roles.includes(role));
      
      if (!hasRequiredRole) {
        throw createError('Insufficient permissions', 403);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

export const optionalAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const user = await userService.validateSession(token);
      
      if (user) {
        req.user = {
          id: user._id.toString(),
          sessionId: '',
          email: user.email,
          username: user.username,
          roles: user.roles.map(role => role.name)
        };
      }
    }

    next();
  } catch (error) {
    // For optional auth, we don't throw errors, just continue without user
    next();
  }
};
