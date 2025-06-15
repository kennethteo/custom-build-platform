import { Request, Response, NextFunction } from 'express';
import { z, ZodSchema } from 'zod';
import { createError } from './errorHandler';

export const validateBody = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = createError('Validation failed', 400);
        validationError.message = error.errors
          .map(err => `${err.path.join('.')}: ${err.message}`)
          .join(', ');
        return next(validationError);
      }
      next(error);
    }
  };
};

export const validateQuery = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.query);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = createError('Query validation failed', 400);
        validationError.message = error.errors
          .map(err => `${err.path.join('.')}: ${err.message}`)
          .join(', ');
        return next(validationError);
      }
      next(error);
    }
  };
};

export const validateParams = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.params);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = createError('Parameter validation failed', 400);
        validationError.message = error.errors
          .map(err => `${err.path.join('.')}: ${err.message}`)
          .join(', ');
        return next(validationError);
      }
      next(error);
    }
  };
};
