/**
 * Auth Validation Tests
 * Tests for authentication-related validation schemas
 */

import { z } from 'zod';

describe('Auth Validation', () => {
  describe('Login Validation', () => {
    const loginSchema = z.object({
      emailOrUsername: z.string()
        .min(1, 'Email or username is required')
        .max(255, 'Email or username must be no more than 255 characters'),
      password: z.string()
        .min(1, 'Password is required')
        .max(128, 'Password must be no more than 128 characters'),
      rememberMe: z.boolean().optional(),
      captcha: z.string().optional()
    });

    it('should validate correct login data', () => {
      const validLoginData = [
        {
          emailOrUsername: 'test@example.com',
          password: 'TestPassword123!'
        },
        {
          emailOrUsername: 'testuser',
          password: 'MySecurePass1!',
          rememberMe: true
        },
        {
          emailOrUsername: 'user.name@domain.com',
          password: 'StrongPassword99!',
          rememberMe: false,
          captcha: 'abc123'
        }
      ];

      validLoginData.forEach(data => {
        const result = loginSchema.safeParse(data);
        expect(result.success).toBe(true);
      });
    });

    it('should reject invalid login data', () => {
      const invalidLoginData = [
        {
          emailOrUsername: '',
          password: 'TestPassword123!'
        },
        {
          emailOrUsername: 'test@example.com',
          password: ''
        },
        {
          emailOrUsername: 'a'.repeat(256),
          password: 'TestPassword123!'
        },
        {
          emailOrUsername: 'test@example.com',
          password: 'a'.repeat(129)
        }
      ];

      invalidLoginData.forEach(data => {
        const result = loginSchema.safeParse(data);
        expect(result.success).toBe(false);
      });
    });
  });

  describe('Registration Validation', () => {
    const registrationSchema = z.object({
      email: z.string()
        .email('Invalid email format')
        .max(255, 'Email must be no more than 255 characters'),
      username: z.string()
        .min(3, 'Username must be at least 3 characters')
        .max(30, 'Username must be no more than 30 characters')
        .regex(/^[a-zA-Z0-9_-]+$/, 'Username can only contain letters, numbers, underscores, and hyphens'),
      password: z.string()
        .min(8, 'Password must be at least 8 characters')
        .max(128, 'Password must be no more than 128 characters')
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 'Password must contain uppercase, lowercase, number, and special character'),
      confirmPassword: z.string(),
      firstName: z.string()
        .min(1, 'First name is required')
        .max(50, 'First name must be no more than 50 characters')
        .optional(),
      lastName: z.string()
        .min(1, 'Last name is required')
        .max(50, 'Last name must be no more than 50 characters')
        .optional(),
      acceptTerms: z.boolean()
        .refine(val => val === true, 'You must accept the terms and conditions')
    }).refine(data => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ['confirmPassword']
    });

    it('should validate correct registration data', () => {
      const validRegistrationData = {
        email: 'test@example.com',
        username: 'testuser',
        password: 'TestPassword123!',
        confirmPassword: 'TestPassword123!',
        firstName: 'Test',
        lastName: 'User',
        acceptTerms: true
      };

      const result = registrationSchema.safeParse(validRegistrationData);
      expect(result.success).toBe(true);
    });

    it('should reject invalid registration data', () => {
      const invalidRegistrationData = [
        {
          email: 'invalid-email',
          username: 'testuser',
          password: 'TestPassword123!',
          confirmPassword: 'TestPassword123!',
          acceptTerms: true
        },
        {
          email: 'test@example.com',
          username: 'ab', // too short
          password: 'TestPassword123!',
          confirmPassword: 'TestPassword123!',
          acceptTerms: true
        },
        {
          email: 'test@example.com',
          username: 'testuser',
          password: 'weak', // too weak
          confirmPassword: 'weak',
          acceptTerms: true
        },
        {
          email: 'test@example.com',
          username: 'testuser',
          password: 'TestPassword123!',
          confirmPassword: 'DifferentPassword123!', // passwords don't match
          acceptTerms: true
        },
        {
          email: 'test@example.com',
          username: 'testuser',
          password: 'TestPassword123!',
          confirmPassword: 'TestPassword123!',
          acceptTerms: false // terms not accepted
        }
      ];

      invalidRegistrationData.forEach(data => {
        const result = registrationSchema.safeParse(data);
        expect(result.success).toBe(false);
      });
    });
  });

  describe('Password Change Validation', () => {
    const passwordChangeSchema = z.object({
      currentPassword: z.string()
        .min(1, 'Current password is required'),
      newPassword: z.string()
        .min(8, 'New password must be at least 8 characters')
        .max(128, 'New password must be no more than 128 characters')
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 'New password must contain uppercase, lowercase, number, and special character'),
      confirmNewPassword: z.string()
    }).refine(data => data.newPassword === data.confirmNewPassword, {
      message: "New passwords don't match",
      path: ['confirmNewPassword']
    }).refine(data => data.currentPassword !== data.newPassword, {
      message: "New password must be different from current password",
      path: ['newPassword']
    });

    it('should validate correct password change data', () => {
      const validPasswordChangeData = {
        currentPassword: 'OldPassword123!',
        newPassword: 'NewPassword456!',
        confirmNewPassword: 'NewPassword456!'
      };

      const result = passwordChangeSchema.safeParse(validPasswordChangeData);
      expect(result.success).toBe(true);
    });

    it('should reject invalid password change data', () => {
      const invalidPasswordChangeData = [
        {
          currentPassword: '',
          newPassword: 'NewPassword456!',
          confirmNewPassword: 'NewPassword456!'
        },
        {
          currentPassword: 'OldPassword123!',
          newPassword: 'weak',
          confirmNewPassword: 'weak'
        },
        {
          currentPassword: 'OldPassword123!',
          newPassword: 'NewPassword456!',
          confirmNewPassword: 'DifferentPassword456!'
        },
        {
          currentPassword: 'SamePassword123!',
          newPassword: 'SamePassword123!',
          confirmNewPassword: 'SamePassword123!'
        }
      ];

      invalidPasswordChangeData.forEach(data => {
        const result = passwordChangeSchema.safeParse(data);
        expect(result.success).toBe(false);
      });
    });
  });

  describe('Password Reset Validation', () => {
    const passwordResetRequestSchema = z.object({
      email: z.string()
        .email('Invalid email format')
        .max(255, 'Email must be no more than 255 characters'),
      captcha: z.string().optional()
    });

    const passwordResetSchema = z.object({
      token: z.string()
        .min(1, 'Reset token is required'),
      newPassword: z.string()
        .min(8, 'Password must be at least 8 characters')
        .max(128, 'Password must be no more than 128 characters')
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 'Password must contain uppercase, lowercase, number, and special character'),
      confirmPassword: z.string()
    }).refine(data => data.newPassword === data.confirmPassword, {
      message: "Passwords don't match",
      path: ['confirmPassword']
    });

    it('should validate password reset request', () => {
      const validResetRequest = {
        email: 'test@example.com',
        captcha: 'abc123'
      };

      const result = passwordResetRequestSchema.safeParse(validResetRequest);
      expect(result.success).toBe(true);
    });

    it('should validate password reset with token', () => {
      const validPasswordReset = {
        token: 'reset-token-123',
        newPassword: 'NewPassword123!',
        confirmPassword: 'NewPassword123!'
      };

      const result = passwordResetSchema.safeParse(validPasswordReset);
      expect(result.success).toBe(true);
    });
  });
});