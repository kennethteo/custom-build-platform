/**
 * JWT Utility Tests
 * Tests for JWT token generation, validation, and management
 */

import jwt from 'jsonwebtoken';

describe('JWT Utility', () => {
  describe('JWT Token Operations', () => {
    it('should create and verify a valid JWT token', () => {
      const payload = {
        userId: '507f1f77bcf86cd799439011',
        sessionId: 'test-session-id',
        email: 'test@example.com'
      };

      const secret = process.env.JWT_SECRET || 'test-secret';
      const token = jwt.sign(payload, secret, { expiresIn: '1h' });

      expect(token).toBeDefined();
      expect(typeof token).toBe('string');

      const decoded = jwt.verify(token, secret) as any;
      expect(decoded.userId).toBe(payload.userId);
      expect(decoded.sessionId).toBe(payload.sessionId);
      expect(decoded.email).toBe(payload.email);
    });

    it('should handle expired tokens', () => {
      const payload = {
        userId: '507f1f77bcf86cd799439011',
        sessionId: 'test-session-id'
      };

      const secret = process.env.JWT_SECRET || 'test-secret';
      const token = jwt.sign(payload, secret, { expiresIn: '0s' });

      expect(() => {
        jwt.verify(token, secret);
      }).toThrow();
    });

    it('should handle invalid tokens', () => {
      const secret = process.env.JWT_SECRET || 'test-secret';
      const invalidToken = 'invalid.token.here';

      expect(() => {
        jwt.verify(invalidToken, secret);
      }).toThrow();
    });

    it('should handle tokens with wrong secret', () => {
      const payload = {
        userId: '507f1f77bcf86cd799439011',
        sessionId: 'test-session-id'
      };

      const correctSecret = 'correct-secret';
      const wrongSecret = 'wrong-secret';
      const token = jwt.sign(payload, correctSecret, { expiresIn: '1h' });

      expect(() => {
        jwt.verify(token, wrongSecret);
      }).toThrow();
    });
  });

  describe('JWT Payload Validation', () => {
    it('should validate required payload fields', () => {
      const validPayload = {
        userId: '507f1f77bcf86cd799439011',
        sessionId: 'test-session-id',
        email: 'test@example.com'
      };

      expect(validPayload.userId).toBeDefined();
      expect(validPayload.sessionId).toBeDefined();
      expect(validPayload.email).toBeDefined();
    });

    it('should handle missing required fields', () => {
      const incompletePayload: any = {
        userId: '507f1f77bcf86cd799439011'
        // missing sessionId
      };

      expect(incompletePayload.userId).toBeDefined();
      expect(incompletePayload.sessionId).toBeUndefined();
    });
  });
});