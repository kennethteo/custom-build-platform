import { Permission, IPermission } from '../models/permission.model';
import { Types } from 'mongoose';

export interface CreatePermissionDTO {
  name: string;
  description: string;
  resource: string;
  action: string;
  category?: string;
  conditions?: Record<string, any>;
}

export interface UpdatePermissionDTO {
  name?: string;
  description?: string;
  resource?: string;
  action?: string;
  category?: string;
  conditions?: Record<string, any>;
}

export interface PermissionFilterOptions {
  resource?: string;
  action?: string;
  category?: string;
  search?: string;
}

export class PermissionService {
  /**
   * Create a new permission
   */
  async createPermission(permissionData: CreatePermissionDTO): Promise<IPermission> {
    // Check if permission already exists
    const existingPermission = await Permission.findOne({ 
      name: permissionData.name 
    });
    if (existingPermission) {
      throw new Error('Permission with this name already exists');
    }

    // Create new permission
    const permission = new Permission(permissionData);
    await permission.save();
    return permission;
  }

  /**
   * Get permission by ID
   */
  async getPermissionById(permissionId: string): Promise<IPermission | null> {
    if (!Types.ObjectId.isValid(permissionId)) {
      throw new Error('Invalid permission ID format');
    }
    return Permission.findById(permissionId);
  }

  /**
   * Get permission by name
   */
  async getPermissionByName(permissionName: string): Promise<IPermission | null> {
    return Permission.findOne({ name: permissionName });
  }

  /**
   * Get all permissions with optional filtering
   */
  async getAllPermissions(
    page: number = 1,
    limit: number = 50,
    filters?: PermissionFilterOptions
  ): Promise<{
    permissions: IPermission[];
    total: number;
    totalPages: number;
    currentPage: number;
  }> {
    const query: any = {};

    // Apply filters
    if (filters?.resource) {
      query.resource = filters.resource;
    }

    if (filters?.action) {
      query.action = filters.action;
    }

    if (filters?.category) {
      query.category = filters.category;
    }

    if (filters?.search) {
      query.$or = [
        { name: { $regex: filters.search, $options: 'i' } },
        { description: { $regex: filters.search, $options: 'i' } },
        { resource: { $regex: filters.search, $options: 'i' } }
      ];
    }

    const skip = (page - 1) * limit;
    
    const [permissions, total] = await Promise.all([
      Permission.find(query)
        .sort({ category: 1, resource: 1, action: 1 })
        .skip(skip)
        .limit(limit),
      Permission.countDocuments(query)
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      permissions,
      total,
      totalPages,
      currentPage: page
    };
  }

  /**
   * Update permission
   */
  async updatePermission(permissionId: string, updates: UpdatePermissionDTO): Promise<IPermission | null> {
    if (!Types.ObjectId.isValid(permissionId)) {
      throw new Error('Invalid permission ID format');
    }

    // Check if name is being changed and doesn't conflict
    if (updates.name) {
      const existingPermission = await Permission.findOne({ 
        name: updates.name,
        _id: { $ne: permissionId }
      });
      if (existingPermission) {
        throw new Error('Permission with this name already exists');
      }
    }

    const permission = await Permission.findByIdAndUpdate(
      permissionId,
      updates,
      { new: true, runValidators: true }
    );

    return permission;
  }

  /**
   * Delete permission
   */
  async deletePermission(permissionId: string): Promise<boolean> {
    if (!Types.ObjectId.isValid(permissionId)) {
      throw new Error('Invalid permission ID format');
    }

    // TODO: Check if permission is assigned to any roles before deletion
    // This would require checking the Role collection

    const result = await Permission.findByIdAndDelete(permissionId);
    return !!result;
  }

  /**
   * Get permissions by resource
   */
  async getPermissionsByResource(resource: string): Promise<IPermission[]> {
    return Permission.find({ resource }).sort({ action: 1 });
  }

  /**
   * Get permissions by category
   */
  async getPermissionsByCategory(category: string): Promise<IPermission[]> {
    return Permission.find({ category }).sort({ resource: 1, action: 1 });
  }

  /**
   * Get all unique resources
   */
  async getUniqueResources(): Promise<string[]> {
    const resources = await Permission.distinct('resource');
    return resources.sort();
  }

  /**
   * Get all unique actions
   */
  async getUniqueActions(): Promise<string[]> {
    const actions = await Permission.distinct('action');
    return actions.sort();
  }

  /**
   * Get all unique categories
   */
  async getUniqueCategories(): Promise<string[]> {
    const categories = await Permission.distinct('category');
    return categories.filter(Boolean).sort();
  }

  /**
   * Bulk create permissions
   */
  async createPermissionsBulk(permissionsData: CreatePermissionDTO[]): Promise<IPermission[]> {
    // Check for existing permissions
    const existingNames = await Permission.find({
      name: { $in: permissionsData.map(p => p.name) }
    }).distinct('name');

    const newPermissions = permissionsData.filter(
      p => !existingNames.includes(p.name)
    );

    if (newPermissions.length === 0) {
      return [];
    }

    const permissions = await Permission.insertMany(newPermissions);
    return permissions as IPermission[];
  }
}
