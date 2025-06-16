/**
 * Validation Utility Tests
 * Tests for common validation functions and utilities
 */

import { z } from 'zod';

describe('Validation Utility', () => {
  describe('Email Validation', () => {
    it('should validate correct email formats', () => {
      const validEmails = [
        'test@example.com',
        'user.name@domain.co',
        'firstname+lastname@example.org',
        'user123@test-domain.com',
        'test.email.with+symbol@example.com'
      ];

      const emailSchema = z.string().email();

      validEmails.forEach(email => {
        const result = emailSchema.safeParse(email);
        expect(result.success).toBe(true);
      });
    });

    it('should reject invalid email formats', () => {
      const invalidEmails = [
        'plainaddress',
        '@domain.com',
        'username@',
        'username@.com',
        'username..@domain.com',
        'username@domain@domain.com'
      ];

      const emailSchema = z.string().email();

      invalidEmails.forEach(email => {
        const result = emailSchema.safeParse(email);
        expect(result.success).toBe(false);
      });
    });
  });

  describe('ObjectId Validation', () => {
    it('should validate correct MongoDB ObjectId format', () => {
      const validObjectIds = [
        '507f1f77bcf86cd799439011',
        '507f191e810c19729de860ea',
        '123456789012345678901234',
        'abcdef123456789012345678'
      ];

      const objectIdRegex = /^[0-9a-fA-F]{24}$/;
      const objectIdSchema = z.string().regex(objectIdRegex);

      validObjectIds.forEach(id => {
        const result = objectIdSchema.safeParse(id);
        expect(result.success).toBe(true);
      });
    });

    it('should reject invalid ObjectId formats', () => {
      const invalidObjectIds = [
        '507f1f77bcf86cd79943901', // too short
        '507f1f77bcf86cd799439011g', // too long
        '507f1f77bcf86cd79943901g', // invalid character
        '', // empty
        '123'
      ];

      const objectIdRegex = /^[0-9a-fA-F]{24}$/;
      const objectIdSchema = z.string().regex(objectIdRegex);

      invalidObjectIds.forEach(id => {
        const result = objectIdSchema.safeParse(id);
        expect(result.success).toBe(false);
      });
    });
  });

  describe('Username Validation', () => {
    it('should validate correct username formats', () => {
      const validUsernames = [
        'username',
        'user_name',
        'user-name',
        'user123',
        'user_123',
        'test-user_123'
      ];

      const usernameRegex = /^[a-zA-Z0-9_-]+$/;
      const usernameSchema = z.string()
        .min(3)
        .max(30)
        .regex(usernameRegex);

      validUsernames.forEach(username => {
        const result = usernameSchema.safeParse(username);
        expect(result.success).toBe(true);
      });
    });

    it('should reject invalid username formats', () => {
      const invalidUsernames = [
        'us', // too short
        'a'.repeat(31), // too long
        'user name', // space
        'user@name', // special character
        'user.name', // dot
        'user#name'
      ];

      const usernameRegex = /^[a-zA-Z0-9_-]+$/;
      const usernameSchema = z.string()
        .min(3)
        .max(30)
        .regex(usernameRegex);

      invalidUsernames.forEach(username => {
        const result = usernameSchema.safeParse(username);
        expect(result.success).toBe(false);
      });
    });
  });

  describe('Phone Number Validation', () => {
    it('should validate international phone number formats', () => {
      const validPhones = [
        '+1234567890',
        '+12345678901',
        '+123456789012',
        '+61412345678',
        '+442071234567'
      ];

      const phoneRegex = /^\+[1-9]\d{8,14}$/;
      const phoneSchema = z.string().regex(phoneRegex);

      validPhones.forEach(phone => {
        const result = phoneSchema.safeParse(phone);
        expect(result.success).toBe(true);
      });
    });

    it('should reject invalid phone number formats', () => {
      const invalidPhones = [
        '1234567890', // no +
        '+0123456789', // starts with 0
        '+12345', // too short
        '+123456789012345678', // too long
        '+12-345-678-90', // contains dashes
        '+12 345 678 90' // contains spaces
      ];

      const phoneRegex = /^\+[1-9]\d{8,14}$/;
      const phoneSchema = z.string().regex(phoneRegex);

      invalidPhones.forEach(phone => {
        const result = phoneSchema.safeParse(phone);
        expect(result.success).toBe(false);
      });
    });
  });

  describe('Date Validation', () => {
    it('should validate date objects', () => {
      const validDates = [
        new Date(),
        new Date('2023-01-01'),
        new Date('2023-12-31T23:59:59Z'),
        new Date(2023, 0, 1) // January 1, 2023
      ];

      const dateSchema = z.date();

      validDates.forEach(date => {
        const result = dateSchema.safeParse(date);
        expect(result.success).toBe(true);
      });
    });

    it('should reject invalid date values', () => {
      const invalidDates = [
        'not-a-date',
        '2023-13-01', // invalid month
        '2023-02-30', // invalid day for February
        null,
        undefined,
        123456789
      ];

      const dateSchema = z.date();

      invalidDates.forEach(date => {
        const result = dateSchema.safeParse(date);
        expect(result.success).toBe(false);
      });
    });

    it('should validate future date constraints', () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 1);

      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 1);

      const maxDateSchema = z.date().max(new Date());

      expect(maxDateSchema.safeParse(pastDate).success).toBe(true);
      expect(maxDateSchema.safeParse(futureDate).success).toBe(false);
    });
  });
});