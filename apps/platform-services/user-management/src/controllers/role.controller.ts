import { Request, Response, NextFunction } from 'express';
import { Role, IRole } from '../models/role.model';
import { Permission } from '../models/permission.model';
import { createError } from '../middleware/errorHandler';
import { z } from 'zod';
import { Types } from 'mongoose';

const createRoleSchema = z.object({
  name: z.string().min(1, 'Role name is required'),
  description: z.string().optional(),
  permissions: z.array(z.string()).optional()
});

const updateRoleSchema = z.object({
  name: z.string().min(1, 'Role name is required').optional(),
  description: z.string().optional(),
  permissions: z.array(z.string()).optional()
});

export class RoleController {
  getAllRoles = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const roles = await Role.find().sort({ createdAt: -1 });

      res.json({
        success: true,
        data: {
          roles: roles.map(role => ({
            id: role._id,
            name: role.name,
            description: role.description,
            isSystemRole: role.isSystemRole,
            permissions: role.permissions,
            createdAt: role.createdAt,
            updatedAt: role.updatedAt
          }))
        }
      });
    } catch (error) {
      next(error);
    }
  };

  getRoleById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const role = await Role.findById(id);

      if (!role) {
        throw createError('Role not found', 404);
      }

      res.json({
        success: true,
        data: {
          role: {
            id: role._id,
            name: role.name,
            description: role.description,
            isSystemRole: role.isSystemRole,
            permissions: role.permissions,
            createdAt: role.createdAt,
            updatedAt: role.updatedAt
          }
        }
      });
    } catch (error) {
      next(error);
    }
  };

  createRole = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const validatedData = createRoleSchema.parse(req.body);

      // Check if role already exists
      const existingRole = await Role.findOne({ name: validatedData.name });
      if (existingRole) {
        throw createError('Role with this name already exists', 400);
      }

      const role = new Role({
        name: validatedData.name,
        description: validatedData.description,
        permissions: []
      });

      // Add permissions if provided
      if (validatedData.permissions && validatedData.permissions.length > 0) {
        const permissions = await Permission.find({
          _id: { $in: validatedData.permissions }
        });

        for (const permission of permissions) {
          role.addPermission(permission._id, {
            name: permission.name,
            resource: permission.resource,
            action: permission.action,
            conditions: permission.conditions
          });
        }
      }

      await role.save();

      res.status(201).json({
        success: true,
        message: 'Role created successfully',
        data: {
          role: {
            id: role._id,
            name: role.name,
            description: role.description,
            permissions: role.permissions
          }
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

  updateRole = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const validatedData = updateRoleSchema.parse(req.body);

      const role = await Role.findById(id);
      if (!role) {
        throw createError('Role not found', 404);
      }

      if (role.isSystemRole) {
        throw createError('Cannot modify system roles', 403);
      }

      // Check if new name conflicts with existing role
      if (validatedData.name && validatedData.name !== role.name) {
        const existingRole = await Role.findOne({ name: validatedData.name });
        if (existingRole) {
          throw createError('Role with this name already exists', 400);
        }
      }

      // Update role fields
      if (validatedData.name) role.name = validatedData.name;
      if (validatedData.description !== undefined) role.description = validatedData.description;

      // Update permissions if provided
      if (validatedData.permissions) {
        role.permissions = [];
        const permissions = await Permission.find({
          _id: { $in: validatedData.permissions }
        });

        for (const permission of permissions) {
          role.addPermission(permission._id, {
            name: permission.name,
            resource: permission.resource,
            action: permission.action,
            conditions: permission.conditions
          });
        }
      }

      await role.save();

      res.json({
        success: true,
        message: 'Role updated successfully',
        data: {
          role: {
            id: role._id,
            name: role.name,
            description: role.description,
            permissions: role.permissions
          }
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

  deleteRole = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const role = await Role.findById(id);

      if (!role) {
        throw createError('Role not found', 404);
      }

      if (role.isSystemRole) {
        throw createError('Cannot delete system roles', 403);
      }

      await Role.findByIdAndDelete(id);

      res.json({
        success: true,
        message: 'Role deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  addPermission = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const { permissionId } = req.body;

      if (!permissionId) {
        throw createError('Permission ID is required', 400);
      }

      const role = await Role.findById(id);
      const permission = await Permission.findById(permissionId);

      if (!role) {
        throw createError('Role not found', 404);
      }

      if (!permission) {
        throw createError('Permission not found', 404);
      }

      role.addPermission(permission._id, {
        name: permission.name,
        resource: permission.resource,
        action: permission.action,
        conditions: permission.conditions
      });

      await role.save();

      res.json({
        success: true,
        message: 'Permission added to role successfully',
        data: {
          role: {
            id: role._id,
            permissions: role.permissions
          }
        }
      });
    } catch (error) {
      next(error);
    }
  };

  removePermission = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id, permissionId } = req.params;

      const role = await Role.findById(id);
      if (!role) {
        throw createError('Role not found', 404);
      }

      role.removePermission(new Types.ObjectId(permissionId));
      await role.save();

      res.json({
        success: true,
        message: 'Permission removed from role successfully',
        data: {
          role: {
            id: role._id,
            permissions: role.permissions
          }
        }
      });
    } catch (error) {
      next(error);
    }
  };
}
