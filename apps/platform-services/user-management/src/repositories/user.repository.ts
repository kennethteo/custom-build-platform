import { BaseRepository } from './base.repository';
import { User, IUser } from '../models/user.model';
import { FilterQuery } from 'mongoose';

export interface UserSearchOptions {
  search?: string;
  isActive?: boolean;
  isVerified?: boolean;
  hasRole?: string;
  createdAfter?: Date;
  createdBefore?: Date;
}

export class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super(User);
  }

  /**
   * Find user by email
   */
  async findByEmail(email: string): Promise<IUser | null> {
    return this.findOne({ email: email.toLowerCase() });
  }

  /**
   * Find user by username
   */
  async findByUsername(username: string): Promise<IUser | null> {
    return this.findOne({ username: username.toLowerCase() });
  }

  /**
   * Find user by email or username
   */
  async findByEmailOrUsername(emailOrUsername: string): Promise<IUser | null> {
    const lowerCase = emailOrUsername.toLowerCase();
    return this.findOne({
      $or: [
        { email: lowerCase },
        { username: lowerCase }
      ]
    });
  }

  /**
   * Find users with search and filters
   */
  async findUsersWithFilters(
    options: UserSearchOptions,
    page: number = 1,
    limit: number = 10
  ) {
    const query: FilterQuery<IUser> = {};

    // Search in name, email, username
    if (options.search) {
      const searchRegex = { $regex: options.search, $options: 'i' };
      query.$or = [
        { firstName: searchRegex },
        { lastName: searchRegex },
        { email: searchRegex },
        { username: searchRegex }
      ];
    }

    // Active status filter
    if (options.isActive !== undefined) {
      query.isActive = options.isActive;
    }

    // Verified status filter
    if (options.isVerified !== undefined) {
      query.isVerified = options.isVerified;
    }

    // Role filter
    if (options.hasRole) {
      query['roles.name'] = options.hasRole;
    }

    // Date range filters
    if (options.createdAfter || options.createdBefore) {
      query.createdAt = {};
      if (options.createdAfter) {
        query.createdAt.$gte = options.createdAfter;
      }
      if (options.createdBefore) {
        query.createdAt.$lte = options.createdBefore;
      }
    }

    return this.paginate(query, page, limit);
  }

  /**
   * Find users by role
   */
  async findByRole(roleName: string): Promise<IUser[]> {
    return this.find({
      'roles.name': roleName
    });
  }

  /**
   * Find active users
   */
  async findActiveUsers(page: number = 1, limit: number = 10) {
    return this.paginate(
      { isActive: true },
      page,
      limit
    );
  }

  /**
   * Find inactive users
   */
  async findInactiveUsers(page: number = 1, limit: number = 10) {
    return this.paginate(
      { isActive: false },
      page,
      limit
    );
  }

  /**
   * Find unverified users
   */
  async findUnverifiedUsers(page: number = 1, limit: number = 10) {
    return this.paginate(
      { isVerified: false },
      page,
      limit
    );
  }

  /**
   * Find users with recent login
   */
  async findRecentlyActiveUsers(days: number = 30): Promise<IUser[]> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    return this.find({
      lastLogin: { $gte: cutoffDate },
      isActive: true
    });
  }

  /**
   * Find users who never logged in
   */
  async findUsersNeverLoggedIn(): Promise<IUser[]> {
    return this.find({
      lastLogin: { $exists: false }
    });
  }

  /**
   * Update user last login
   */
  async updateLastLogin(userId: string): Promise<IUser | null> {
    return this.update(userId, {
      lastLogin: new Date()
    });
  }

  /**
   * Activate user
   */
  async activateUser(userId: string): Promise<IUser | null> {
    return this.update(userId, {
      isActive: true
    });
  }

  /**
   * Deactivate user
   */
  async deactivateUser(userId: string): Promise<IUser | null> {
    return this.update(userId, {
      isActive: false
    });
  }

  /**
   * Verify user email
   */
  async verifyUser(userId: string): Promise<IUser | null> {
    return this.update(userId, {
      isVerified: true,
      emailVerifiedAt: new Date()
    });
  }

  /**
   * Get user statistics
   */
  async getUserStats() {
    const [
      totalUsers,
      activeUsers,
      verifiedUsers,
      recentlyActive
    ] = await Promise.all([
      this.count(),
      this.count({ isActive: true }),
      this.count({ isVerified: true }),
      this.count({
        lastLogin: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
      })
    ]);

    return {
      total: totalUsers,
      active: activeUsers,
      verified: verifiedUsers,
      recentlyActive
    };
  }

  /**
   * Find users by session ID
   */
  async findBySessionId(sessionId: string): Promise<IUser | null> {
    return this.findOne({
      'sessions.sessionId': sessionId,
      'sessions.isActive': true
    });
  }

  /**
   * Clean up expired sessions
   */
  async cleanupExpiredSessions(): Promise<number> {
    const result = await this.model.updateMany(
      {
        'sessions.expiresAt': { $lte: new Date() },
        'sessions.isActive': true
      },
      {
        $set: { 'sessions.$.isActive': false }
      }
    );

    return result.modifiedCount;
  }
}
