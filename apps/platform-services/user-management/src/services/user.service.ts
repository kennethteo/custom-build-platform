import { Types } from 'mongoose';
import { User, IUser } from '../models/user.model';
import { Role } from '../models/role.model';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

export interface CreateUserDTO {
  email: string;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}

export interface LoginCredentials {
  emailOrUsername: string;
  password: string;
  ipAddress?: string;
  userAgent?: string;
}

export interface SessionInfo {
  sessionId: string;
  token: string;
  expiresAt: Date;
}

export interface UpdateUserDTO {
  firstName?: string;
  lastName?: string;
  phone?: string;
  profile?: {
    bio?: string;
    timezone?: string;
    language?: string;
    preferences?: any;
  };
}

export class UserService {
  async createUser(userData: CreateUserDTO): Promise<IUser> {
    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [
        { email: userData.email },
        { username: userData.username }
      ]
    });

    if (existingUser) {
      throw new Error('User with this email or username already exists');
    }

    // Create new user
    const user = new User({
      ...userData,
      passwordHash: userData.password // Will be hashed in pre-save middleware
    });

    // Add default user role
    const userRole = await Role.findOne({ name: 'user' });
    if (userRole) {
      user.addRole(userRole._id, 'user');
    }

    await user.save();
    return user;
  }

  async authenticateUser(credentials: LoginCredentials): Promise<{ user: IUser; session: SessionInfo }> {
    // Find user by email or username
    const user = await User.findOne({
      $or: [
        { email: credentials.emailOrUsername },
        { username: credentials.emailOrUsername }
      ],
      isActive: true
    });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Check password
    const isPasswordValid = await user.comparePassword(credentials.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Create session
    const sessionId = crypto.randomUUID();
    const token = jwt.sign(
      { userId: user._id, sessionId },
      process.env.JWT_SECRET || 'default-secret',
      { expiresIn: process.env.JWT_EXPIRES_IN ? String(process.env.JWT_EXPIRES_IN) : '7d' } as jwt.SignOptions
    );

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    // Add session to user
    user.addSession({
      sessionId,
      tokenHash: crypto.createHash('sha256').update(token).digest('hex'),
      expiresAt,
      ipAddress: credentials.ipAddress,
      userAgent: credentials.userAgent,
      isActive: true
    });

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    return {
      user,
      session: {
        sessionId,
        token,
        expiresAt
      }
    };
  }

  async createUserWithSession(
    userData: CreateUserDTO, 
    sessionData?: { ipAddress?: string; userAgent?: string }
  ): Promise<{ user: IUser; session: SessionInfo }> {
    // Create the user first
    const user = await this.createUser(userData);
    
    // Create session for the new user
    const sessionId = crypto.randomUUID();
    const token = jwt.sign(
      { userId: user._id, sessionId },
      process.env.JWT_SECRET || 'default-secret',
      { expiresIn: process.env.JWT_EXPIRES_IN ? String(process.env.JWT_EXPIRES_IN) : '7d' } as jwt.SignOptions
    );

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    // Update user's last login and add session
    user.lastLogin = new Date();
    
    // Add session to user
    user.addSession({
      sessionId,
      tokenHash: crypto.createHash('sha256').update(token).digest('hex'),
      expiresAt,
      ipAddress: sessionData?.ipAddress,
      userAgent: sessionData?.userAgent,
      isActive: true
    });
    
    await user.save();

    return {
      user,
      session: {
        sessionId,
        token,
        expiresAt
      }
    };
  }

  async getUserById(userId: string): Promise<IUser | null> {
    return User.findById(userId).populate('roles.roleId');
  }

  async getUserByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email, isActive: true });
  }

  async updateUser(userId: string, updates: UpdateUserDTO): Promise<IUser | null> {
    const updateFields: any = {};
    
    if (updates.firstName) updateFields.firstName = updates.firstName;
    if (updates.lastName) updateFields.lastName = updates.lastName;
    if (updates.phone) updateFields.phone = updates.phone;
    
    if (updates.profile) {
      if (updates.profile.bio) updateFields['profile.bio'] = updates.profile.bio;
      if (updates.profile.timezone) updateFields['profile.timezone'] = updates.profile.timezone;
      if (updates.profile.language) updateFields['profile.language'] = updates.profile.language;
      if (updates.profile.preferences) updateFields['profile.preferences'] = updates.profile.preferences;
    }

    return User.findByIdAndUpdate(
      userId,
      { $set: updateFields },
      { new: true, runValidators: true }
    );
  }

  async assignRole(userId: string, roleId: string, assignedBy?: string): Promise<IUser | null> {
    const user = await User.findById(userId);
    const role = await Role.findById(roleId);

    if (!user || !role) {
      throw new Error('User or role not found');
    }

    user.addRole(
      new Types.ObjectId(roleId),
      role.name,
      assignedBy ? new Types.ObjectId(assignedBy) : undefined
    );

    await user.save();
    return user;
  }

  async removeRole(userId: string, roleId: string): Promise<IUser | null> {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    user.removeRole(new Types.ObjectId(roleId));
    await user.save();
    return user;
  }

  async logout(userId: string, sessionId: string): Promise<void> {
    const user = await User.findById(userId);
    if (user) {
      user.removeSession(sessionId);
      await user.save();
    }
  }

  async validateSession(token: string): Promise<IUser | null> {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default-secret') as any;
      const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

      const user = await User.findOne({
        _id: decoded.userId,
        'sessions.sessionId': decoded.sessionId,
        'sessions.tokenHash': tokenHash,
        'sessions.isActive': true,
        'sessions.expiresAt': { $gt: new Date() }
      });

      return user;
    } catch (error) {
      return null;
    }
  }

  async deactivateUser(userId: string): Promise<IUser | null> {
    return User.findByIdAndUpdate(
      userId,
      { isActive: false },
      { new: true }
    );
  }

  async activateUser(userId: string): Promise<IUser | null> {
    return User.findByIdAndUpdate(
      userId,
      { isActive: true },
      { new: true }
    );
  }

  async getAllUsers(page: number = 1, limit: number = 10, search?: string): Promise<{ users: IUser[]; total: number; totalPages: number }> {
    const query: any = {};
    
    if (search) {
      query.$or = [
        { email: { $regex: search, $options: 'i' } },
        { username: { $regex: search, $options: 'i' } },
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (page - 1) * limit;
    const users = await User.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await User.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    return {
      users,
      total,
      totalPages
    };
  }

  async cleanupExpiredSessions(): Promise<void> {
    await User.updateMany(
      {},
      {
        $pull: {
          sessions: {
            $or: [
              { expiresAt: { $lt: new Date() } },
              { isActive: false }
            ]
          }
        }
      }
    );
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<void> {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const isCurrentPasswordValid = await user.comparePassword(currentPassword);
    if (!isCurrentPasswordValid) {
      throw new Error('Current password is incorrect');
    }

    user.passwordHash = newPassword; // Will be hashed in pre-save middleware
    await user.save();
  }
}
