/**
 * Permission Repository
 * Handles data access operations for permissions
 */

import { Model } from 'mongoose';
import { BaseRepository } from './base.repository';
import { IPermission } from '../models/permission.model';

export class PermissionRepository extends BaseRepository<IPermission> {
  constructor(model: Model<IPermission>) {
    super(model);
  }

  /**
   * Find permission by name
   */
  async findByName(name: string): Promise<IPermission | null> {
    return this.model.findOne({ name }).exec();
  }

  /**
   * Find multiple permissions by names
   */
  async findByNames(names: string[]): Promise<IPermission[]> {
    return this.model.find({ name: { $in: names } }).exec();
  }

  /**
   * Find permissions by resource
   */
  async findByResource(resource: string): Promise<IPermission[]> {
    return this.model.find({ resource }).exec();
  }

  /**
   * Find permissions by action
   */
  async findByAction(action: string): Promise<IPermission[]> {
    return this.model.find({ action }).exec();
  }

  /**
   * Find permissions by resource and action
   */
  async findByResourceAndAction(resource: string, action: string): Promise<IPermission[]> {
    return this.model.find({ resource, action }).exec();
  }

  /**
   * Find system permissions
   */
  async findSystemPermissions(): Promise<IPermission[]> {
    return this.model.find({ isSystemPermission: true }).exec();
  }

  /**
   * Find custom (non-system) permissions
   */
  async findCustomPermissions(): Promise<IPermission[]> {
    return this.model.find({ isSystemPermission: { $ne: true } }).exec();
  }

  /**
   * Check if permission exists by name
   */
  async existsByName(name: string, excludeId?: string): Promise<boolean> {
    const query: any = { name };
    if (excludeId) {
      query._id = { $ne: excludeId };
    }
    const count = await this.model.countDocuments(query).exec();
    return count > 0;
  }

  /**
   * Get unique resources
   */
  async getUniqueResources(): Promise<string[]> {
    return this.model.distinct('resource').exec();
  }

  /**
   * Get unique actions
   */
  async getUniqueActions(): Promise<string[]> {
    return this.model.distinct('action').exec();
  }
}
