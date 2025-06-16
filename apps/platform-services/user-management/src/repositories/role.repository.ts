/**
 * Role Repository
 * Handles data access operations for roles
 */

import { Model } from 'mongoose';
import { BaseRepository } from './base.repository';
import { IRole } from '../models/role.model';

export class RoleRepository extends BaseRepository<IRole> {
  constructor(model: Model<IRole>) {
    super(model);
  }

  /**
   * Find role by name
   */
  async findByName(name: string): Promise<IRole | null> {
    return this.model.findOne({ name }).exec();
  }

  /**
   * Find multiple roles by names
   */
  async findByNames(names: string[]): Promise<IRole[]> {
    return this.model.find({ name: { $in: names } }).exec();
  }

  /**
   * Find roles with specific permissions
   */
  async findByPermission(permissionId: string): Promise<IRole[]> {
    return this.model.find({ 'permissions.permissionId': permissionId }).exec();
  }

  /**
   * Find system roles
   */
  async findSystemRoles(): Promise<IRole[]> {
    return this.model.find({ isSystemRole: true }).exec();
  }

  /**
   * Find custom (non-system) roles
   */
  async findCustomRoles(): Promise<IRole[]> {
    return this.model.find({ isSystemRole: { $ne: true } }).exec();
  }

  /**
   * Check if role exists by name
   */
  async existsByName(name: string, excludeId?: string): Promise<boolean> {
    const query: any = { name };
    if (excludeId) {
      query._id = { $ne: excludeId };
    }
    const count = await this.model.countDocuments(query).exec();
    return count > 0;
  }
}
