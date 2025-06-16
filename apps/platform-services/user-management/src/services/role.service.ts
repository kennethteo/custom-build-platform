import { Types } from 'mongoose';
import { Role, IRole } from '../models/role.model';
import { Permission } from '../models/permission.model';

export interface CreateRoleDTO {
  name: string;
  description: string;
  permissions?: string[];
  isSystemRole?: boolean;
}

export interface UpdateRoleDTO {
  name?: string;
  description?: string;
  permissions?: string[];
}

export interface RoleFilterOptions {
  isSystemRole?: boolean;
  hasPermission?: string;
  search?: string;
}

export class RoleService {
  /**
   * Create a new role
   */
  async createRole(roleData: CreateRoleDTO): Promise<IRole> {
    // Check if role already exists
    const existingRole = await Role.findOne({ name: roleData.name });
    if (existingRole) {
      throw new Error('Role with this name already exists');
    }

    // Create new role
    const role = new Role({
      name: roleData.name,
      description: roleData.description,
      isSystemRole: roleData.isSystemRole || false
    });

    // Add permissions if provided
    if (roleData.permissions && roleData.permissions.length > 0) {
      const permissions = await Permission.find({
        _id: { $in: roleData.permissions }
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
    return role;
  }

  /**
   * Get role by ID
   */
  async getRoleById(roleId: string): Promise<IRole | null> {
    if (!Types.ObjectId.isValid(roleId)) {
      throw new Error('Invalid role ID format');
    }
    return Role.findById(roleId);
  }

  /**
   * Get role by name
   */
  async getRoleByName(roleName: string): Promise<IRole | null> {
    return Role.findOne({ name: roleName });
  }

  /**
   * Get all roles with optional filtering
   */
  async getAllRoles(
    page: number = 1,
    limit: number = 10,
    filters?: RoleFilterOptions
  ): Promise<{
    roles: IRole[];
    total: number;
    totalPages: number;
    currentPage: number;
  }> {
    const query: any = {};

    // Apply filters
    if (filters?.isSystemRole !== undefined) {
      query.isSystemRole = filters.isSystemRole;
    }

    if (filters?.search) {
      query.$or = [
        { name: { $regex: filters.search, $options: 'i' } },
        { description: { $regex: filters.search, $options: 'i' } }
      ];
    }

    if (filters?.hasPermission) {
      query['permissions.name'] = filters.hasPermission;
    }

    const skip = (page - 1) * limit;
    
    const [roles, total] = await Promise.all([
      Role.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Role.countDocuments(query)
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      roles,
      total,
      totalPages,
      currentPage: page
    };
  }

  /**
   * Update role
   */
  async updateRole(roleId: string, updates: UpdateRoleDTO): Promise<IRole | null> {
    if (!Types.ObjectId.isValid(roleId)) {
      throw new Error('Invalid role ID format');
    }

    const role = await Role.findById(roleId);
    if (!role) {
      return null;
    }

    // Check if name is being changed and doesn't conflict
    if (updates.name && updates.name !== role.name) {
      const existingRole = await Role.findOne({ 
        name: updates.name,
        _id: { $ne: roleId }
      });
      if (existingRole) {
        throw new Error('Role with this name already exists');
      }
      role.name = updates.name;
    }

    // Update description
    if (updates.description !== undefined) {
      role.description = updates.description;
    }

    // Update permissions if provided
    if (updates.permissions) {
      role.permissions = [];
      if (updates.permissions.length > 0) {
        const permissions = await Permission.find({
          _id: { $in: updates.permissions }
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
    }

    await role.save();
    return role;
  }

  /**
   * Delete role
   */
  async deleteRole(roleId: string): Promise<boolean> {
    if (!Types.ObjectId.isValid(roleId)) {
      throw new Error('Invalid role ID format');
    }

    const role = await Role.findById(roleId);
    if (!role) {
      return false;
    }

    // Prevent deletion of system roles
    if (role.isSystemRole) {
      throw new Error('Cannot delete system roles');
    }

    // TODO: Check if role is assigned to any users before deletion
    // This would require checking the User collection

    await Role.findByIdAndDelete(roleId);
    return true;
  }

  /**
   * Add permission to role
   */
  async addPermissionToRole(roleId: string, permissionId: string): Promise<IRole | null> {
    if (!Types.ObjectId.isValid(roleId) || !Types.ObjectId.isValid(permissionId)) {
      throw new Error('Invalid role or permission ID format');
    }

    const [role, permission] = await Promise.all([
      Role.findById(roleId),
      Permission.findById(permissionId)
    ]);

    if (!role || !permission) {
      return null;
    }

    // Check if permission already exists
    const hasPermission = role.permissions.some(
      p => p.permissionId.toString() === permissionId
    );

    if (!hasPermission) {
      role.addPermission(permission._id, {
        name: permission.name,
        resource: permission.resource,
        action: permission.action,
        conditions: permission.conditions
      });
      await role.save();
    }

    return role;
  }

  /**
   * Remove permission from role
   */
  async removePermissionFromRole(roleId: string, permissionId: string): Promise<IRole | null> {
    if (!Types.ObjectId.isValid(roleId) || !Types.ObjectId.isValid(permissionId)) {
      throw new Error('Invalid role or permission ID format');
    }

    const role = await Role.findById(roleId);
    if (!role) {
      return null;
    }

    role.removePermission(new Types.ObjectId(permissionId));
    await role.save();
    return role;
  }

  /**
   * Get roles by permission
   */
  async getRolesByPermission(permissionName: string): Promise<IRole[]> {
    return Role.find({
      'permissions.name': permissionName
    });
  }

  /**
   * Check if role has specific permission
   */
  async roleHasPermission(roleId: string, permissionName: string): Promise<boolean> {
    if (!Types.ObjectId.isValid(roleId)) {
      return false;
    }

    const role = await Role.findById(roleId);
    if (!role) {
      return false;
    }

    return role.hasPermission(permissionName);
  }
}
