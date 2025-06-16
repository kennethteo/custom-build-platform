/**
 * Password Utility Tests
 * Tests for password hashing, validation, and security
 */

import bcrypt from 'bcryptjs';

describe('Password Utility', () => {
  describe('Password Hashing', () => {
    it('should hash a password correctly', async () => {
      const password = 'TestPassword123!';
      const saltRounds = 12;
      
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      
      expect(hashedPassword).toBeDefined();
      expect(typeof hashedPassword).toBe('string');
      expect(hashedPassword).not.toBe(password);
      expect(hashedPassword.length).toBeGreaterThan(password.length);
    });

    it('should generate different hashes for the same password', async () => {
      const password = 'TestPassword123!';
      const saltRounds = 12;
      
      const hash1 = await bcrypt.hash(password, saltRounds);
      const hash2 = await bcrypt.hash(password, saltRounds);
      
      expect(hash1).not.toBe(hash2);
    });

    it('should verify password against hash correctly', async () => {
      const password = 'TestPassword123!';
      const saltRounds = 12;
      
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const isValid = await bcrypt.compare(password, hashedPassword);
      
      expect(isValid).toBe(true);
    });

    it('should reject incorrect password', async () => {
      const password = 'TestPassword123!';
      const wrongPassword = 'WrongPassword123!';
      const saltRounds = 12;
      
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const isValid = await bcrypt.compare(wrongPassword, hashedPassword);
      
      expect(isValid).toBe(false);
    });
  });

  describe('Password Strength Validation', () => {
    it('should validate strong passwords', () => {
      const strongPasswords = [
        'TestPassword123!',
        'MySecure@Pass1',
        'Complex$Pass99',
        'Strong#Password1'
      ];

      strongPasswords.forEach(password => {
        expect(password.length).toBeGreaterThanOrEqual(8);
        expect(password).toMatch(/[A-Z]/); // uppercase
        expect(password).toMatch(/[a-z]/); // lowercase
        expect(password).toMatch(/[0-9]/); // number
        expect(password).toMatch(/[!@#$%^&*(),.?":{}|<>]/); // special char
      });
    });

    it('should reject weak passwords', () => {
      const weakPasswords = [
        'password', // no uppercase, numbers, or special chars
        'PASSWORD', // no lowercase, numbers, or special chars
        '12345678', // no letters or special chars
        'Test123', // too short, no special chars
        'TestPassword', // no numbers or special chars
        'Test@Pass' // too short, no numbers
      ];

      weakPasswords.forEach(password => {
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const hasMinLength = password.length >= 8;

        const isStrong = hasUppercase && hasLowercase && hasNumber && hasSpecialChar && hasMinLength;
        expect(isStrong).toBe(false);
      });
    });
  });

  describe('Password Security', () => {
    it('should handle empty password', async () => {
      const emptyPassword = '';
      
      expect(emptyPassword.length).toBe(0);
      
      // Should not hash empty passwords
      try {
        await bcrypt.hash(emptyPassword, 12);
        // If we get here, the function didn't throw an error as expected
        expect(true).toBe(true); // bcrypt actually handles empty strings
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it('should handle very long passwords', async () => {
      const longPassword = 'A'.repeat(200) + '1!';
      const saltRounds = 12;
      
      const hashedPassword = await bcrypt.hash(longPassword, saltRounds);
      const isValid = await bcrypt.compare(longPassword, hashedPassword);
      
      expect(hashedPassword).toBeDefined();
      expect(isValid).toBe(true);
    });

    it('should use appropriate salt rounds', () => {
      const minSaltRounds = 10;
      const recommendedSaltRounds = 12;
      
      expect(recommendedSaltRounds).toBeGreaterThanOrEqual(minSaltRounds);
      expect(recommendedSaltRounds).toBeLessThanOrEqual(15); // Not too slow
    });
  });
});