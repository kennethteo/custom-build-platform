import jwt from 'jsonwebtoken';

export const generateTestToken = (userId: string, role: string = 'user'): string => {
  return jwt.sign(
    { userId, role },
    process.env.JWT_SECRET || 'test-secret',
    { expiresIn: '1h' }
  );
};

export const createAuthHeader = (token: string): object => {
  return { Authorization: `Bearer ${token}` };
};
