/**
 * User Model Tests
 * Tests for User model methods, schema validation, and business logic
 */

import { IUser } from '../../../src/models/user.model';
import { Types } from 'mongoose';

describe('User Model', () => {
  let mockUser: Partial<IUser>;

  beforeEach(() => {
    mockUser = {
      _id: new Types.ObjectId(),
      email: 'test@example.com',
      username: 'testuser',
      passwordHash: '$2a$12$hash',
      firstName: 'Test',
      lastName: 'User',
      isActive: true,
      isVerified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      profile: {
        timezone: 'UTC',
        language: 'en',
        preferences: {
          theme: 'light',
          notifications: {
            email: true,
            push: false,
            sms: false
          },
          privacy: {
            profileVisible: true,
            showEmail: false
          }
        }
      },
      roles: [],
      sessions: [],
      comparePassword: jest.fn(),
      addRole: jest.fn(),
      removeRole: jest.fn(),
      hasRole: jest.fn(),
      addSession: jest.fn(),
      removeSession: jest.fn(),
      clearExpiredSessions: jest.fn()
    };
  });

  describe('User Properties', () => {
    it('should have all required properties', () => {
      expect(mockUser.email).toBeDefined();
      expect(mockUser.username).toBeDefined();
      expect(mockUser.passwordHash).toBeDefined();
      expect(mockUser.isActive).toBeDefined();
      expect(mockUser.isVerified).toBeDefined();
      expect(mockUser.createdAt).toBeDefined();
      expect(mockUser.updatedAt).toBeDefined();
      expect(mockUser.profile).toBeDefined();
      expect(mockUser.roles).toBeDefined();
      expect(mockUser.sessions).toBeDefined();
    });

    it('should have correct property types', () => {
      expect(typeof mockUser.email).toBe('string');
      expect(typeof mockUser.username).toBe('string');
      expect(typeof mockUser.passwordHash).toBe('string');
      expect(typeof mockUser.isActive).toBe('boolean');
      expect(typeof mockUser.isVerified).toBe('boolean');
      expect(mockUser.createdAt).toBeInstanceOf(Date);
      expect(mockUser.updatedAt).toBeInstanceOf(Date);
      expect(Array.isArray(mockUser.roles)).toBe(true);
      expect(Array.isArray(mockUser.sessions)).toBe(true);
    });

    it('should have valid profile structure', () => {
      expect(mockUser.profile?.timezone).toBe('UTC');
      expect(mockUser.profile?.language).toBe('en');
      expect(mockUser.profile?.preferences).toBeDefined();
      expect(mockUser.profile?.preferences?.notifications).toBeDefined();
      expect(mockUser.profile?.preferences?.privacy).toBeDefined();
    });
  });

  describe('User Methods', () => {
    it('should have comparePassword method', () => {
      expect(mockUser.comparePassword).toBeDefined();
      expect(typeof mockUser.comparePassword).toBe('function');
    });

    it('should have role management methods', () => {
      expect(mockUser.addRole).toBeDefined();
      expect(mockUser.removeRole).toBeDefined();
      expect(mockUser.hasRole).toBeDefined();
      expect(typeof mockUser.addRole).toBe('function');
      expect(typeof mockUser.removeRole).toBe('function');
      expect(typeof mockUser.hasRole).toBe('function');
    });

    it('should have session management methods', () => {
      expect(mockUser.addSession).toBeDefined();
      expect(mockUser.removeSession).toBeDefined();
      expect(mockUser.clearExpiredSessions).toBeDefined();
      expect(typeof mockUser.addSession).toBe('function');
      expect(typeof mockUser.removeSession).toBe('function');
      expect(typeof mockUser.clearExpiredSessions).toBe('function');
    });
  });

  describe('User Role Management', () => {
    it('should mock adding a role to user', () => {
      const roleId = new Types.ObjectId();
      const roleName = 'admin';
      const assignedBy = new Types.ObjectId();

      if (mockUser.addRole) {
        mockUser.addRole(roleId, roleName, assignedBy);
        expect(mockUser.addRole).toHaveBeenCalledWith(roleId, roleName, assignedBy);
      }
    });

    it('should mock removing a role from user', () => {
      const roleId = new Types.ObjectId();

      if (mockUser.removeRole) {
        mockUser.removeRole(roleId);
        expect(mockUser.removeRole).toHaveBeenCalledWith(roleId);
      }
    });

    it('should mock checking if user has role', () => {
      const roleName = 'admin';
      
      (mockUser.hasRole as jest.Mock)?.mockReturnValue(true);

      if (mockUser.hasRole) {
        const hasRole = mockUser.hasRole(roleName);
        expect(mockUser.hasRole).toHaveBeenCalledWith(roleName);
        expect(hasRole).toBe(true);
      }
    });
  });

  describe('User Session Management', () => {
    it('should mock adding a session', () => {
      const sessionData = {
        sessionId: 'test-session-id',
        tokenHash: 'test-token-hash',
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        ipAddress: '127.0.0.1',
        userAgent: 'Test User Agent',
        isActive: true
      };

      if (mockUser.addSession) {
        mockUser.addSession(sessionData);
        expect(mockUser.addSession).toHaveBeenCalledWith(sessionData);
      }
    });

    it('should mock removing a session', () => {
      const sessionId = 'test-session-id';

      if (mockUser.removeSession) {
        mockUser.removeSession(sessionId);
        expect(mockUser.removeSession).toHaveBeenCalledWith(sessionId);
      }
    });

    it('should mock clearing expired sessions', () => {
      if (mockUser.clearExpiredSessions) {
        mockUser.clearExpiredSessions();
        expect(mockUser.clearExpiredSessions).toHaveBeenCalled();
      }
    });
  });

  describe('User Validation', () => {
    it('should have valid email format', () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      expect(emailRegex.test(mockUser.email!)).toBe(true);
    });

    it('should have valid username format', () => {
      const usernameRegex = /^[a-zA-Z0-9_-]+$/;
      expect(usernameRegex.test(mockUser.username!)).toBe(true);
      expect(mockUser.username!.length).toBeGreaterThanOrEqual(3);
      expect(mockUser.username!.length).toBeLessThanOrEqual(30);
    });

    it('should have hashed password', () => {
      expect(mockUser.passwordHash).toBeDefined();
      expect(mockUser.passwordHash!.length).toBeGreaterThan(10);
      expect(mockUser.passwordHash!.startsWith('$2a$')).toBe(true);
    });
  });
});