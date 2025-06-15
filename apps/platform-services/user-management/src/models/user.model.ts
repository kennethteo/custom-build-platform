import { Schema, model, Document, Types } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUserRole {
  roleId: Types.ObjectId;
  name: string;
  assignedAt: Date;
  assignedBy?: Types.ObjectId;
}

export interface IUserSession {
  sessionId: string;
  tokenHash: string;
  expiresAt: Date;
  ipAddress?: string;
  userAgent?: string;
  isActive: boolean;
  createdAt: Date;
}

export interface IUserProfile {
  avatarUrl?: string;
  bio?: string;
  timezone: string;
  language: string;
  preferences: {
    theme?: string;
    notifications?: {
      email: boolean;
      push: boolean;
      sms: boolean;
    };
    privacy?: {
      profileVisible: boolean;
      showEmail: boolean;
    };
  };
}

export interface IUser extends Document {
  email: string;
  username: string;
  passwordHash: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  isActive: boolean;
  isVerified: boolean;
  emailVerifiedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
  profile: IUserProfile;
  roles: IUserRole[];
  sessions: IUserSession[];
  
  // Methods
  comparePassword(password: string): Promise<boolean>;
  addRole(roleId: Types.ObjectId, roleName: string, assignedBy?: Types.ObjectId): void;
  removeRole(roleId: Types.ObjectId): void;
  hasRole(roleName: string): boolean;
  addSession(sessionData: Omit<IUserSession, 'createdAt'>): void;
  removeSession(sessionId: string): void;
  clearExpiredSessions(): void;
}

const userRoleSchema = new Schema<IUserRole>({
  roleId: { type: Schema.Types.ObjectId, ref: 'Role', required: true },
  name: { type: String, required: true },
  assignedAt: { type: Date, default: Date.now },
  assignedBy: { type: Schema.Types.ObjectId, ref: 'User' }
});

const userSessionSchema = new Schema<IUserSession>({
  sessionId: { type: String, required: true, unique: true },
  tokenHash: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  ipAddress: { type: String },
  userAgent: { type: String },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

const userProfileSchema = new Schema<IUserProfile>({
  avatarUrl: { type: String },
  bio: { type: String },
  timezone: { type: String, default: 'UTC' },
  language: { type: String, default: 'en' },
  preferences: {
    theme: { type: String, default: 'light' },
    notifications: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: false },
      sms: { type: Boolean, default: false }
    },
    privacy: {
      profileVisible: { type: Boolean, default: true },
      showEmail: { type: Boolean, default: false }
    }
  }
});

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format']
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 30,
    match: [/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores']
  },
  passwordHash: { type: String, required: true },
  firstName: { type: String, trim: true },
  lastName: { type: String, trim: true },
  phone: { type: String },
  isActive: { type: Boolean, default: true },
  isVerified: { type: Boolean, default: false },
  emailVerifiedAt: { type: Date },
  lastLogin: { type: Date },
  profile: { type: userProfileSchema, default: () => ({}) },
  roles: [userRoleSchema],
  sessions: [userSessionSchema]
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      delete ret.passwordHash;
      delete ret.sessions;
      return ret;
    }
  }
});

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  if (!this.isModified('passwordHash')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Instance methods
userSchema.methods.comparePassword = async function(password: string): Promise<boolean> {
  return bcrypt.compare(password, this.passwordHash);
};

userSchema.methods.addRole = function(roleId: Types.ObjectId, roleName: string, assignedBy?: Types.ObjectId) {
  if (!this.hasRole(roleName)) {
    this.roles.push({
      roleId,
      name: roleName,
      assignedAt: new Date(),
      assignedBy
    });
  }
};

userSchema.methods.removeRole = function(roleId: Types.ObjectId) {
  this.roles = this.roles.filter(role => !role.roleId.equals(roleId));
};

userSchema.methods.hasRole = function(roleName: string): boolean {
  return this.roles.some(role => role.name === roleName);
};

userSchema.methods.addSession = function(sessionData: Omit<IUserSession, 'createdAt'>) {
  this.sessions.push({
    ...sessionData,
    createdAt: new Date()
  });
};

userSchema.methods.removeSession = function(sessionId: string) {
  this.sessions = this.sessions.filter(session => session.sessionId !== sessionId);
};

userSchema.methods.clearExpiredSessions = function() {
  const now = new Date();
  this.sessions = this.sessions.filter(session => session.expiresAt > now && session.isActive);
};

// Indexes
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });
userSchema.index({ isActive: 1 });
userSchema.index({ 'roles.name': 1 });
userSchema.index({ 'sessions.sessionId': 1 });
userSchema.index({ 'sessions.expiresAt': 1 });

export const User = model<IUser>('User', userSchema);
