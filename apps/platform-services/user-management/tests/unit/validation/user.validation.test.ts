import {
  createUserSchema,
  updateUserSchema,
  updateUserStatusSchema,
  updateUserRolesSchema,
  bulkCreateUsersSchema,
  userSearchSchema,
  type CreateUserInput,
  type UpdateUserInput,
  type UpdateUserStatusInput,
  type UpdateUserRolesInput,
  type BulkCreateUsersInput,
  type UserSearchInput
} from '../../../src/validation/user.validation';

// Helper function to safely access error messages
const getFirstErrorMessage = (result: any): string | undefined => {
  return result.error?.issues?.[0]?.message;
};

const getFirstErrorCode = (result: any): string | undefined => {
  return result.error?.issues?.[0]?.code;
};

describe('UserValidation', () => {
  describe('createUserSchema', () => {
    const validUserData = {
      email: 'test@example.com',
      username: 'testuser123',
      firstName: 'John',
      lastName: 'Doe',
      password: 'Password123!',
      confirmPassword: 'Password123!'
    };

    describe('successful validation', () => {
      it('should validate valid user data', () => {
        const result = createUserSchema.safeParse(validUserData);
        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data.email).toBe('test@example.com');
          expect(result.data.username).toBe('testuser123');
          expect(result.data.firstName).toBe('John');
          expect(result.data.lastName).toBe('Doe');
          expect(result.data.password).toBe('Password123!');
        }
      });

      it('should validate user data with optional fields', () => {
        const userWithOptionals = {
          ...validUserData,
          profile: {
            phone: '+1234567890',
            timezone: 'America/New_York',
            locale: 'en'
          },
          preferences: {
            theme: 'dark' as const,
            emailNotifications: true,
            pushNotifications: false
          }
        };

        const result = createUserSchema.safeParse(userWithOptionals);
        expect(result.success).toBe(true);
      });

      it('should validate user data with roles', () => {
        const userWithRoles = {
          ...validUserData,
          roles: ['507f1f77bcf86cd799439011', '507f1f77bcf86cd799439012']
        };

        const result = createUserSchema.safeParse(userWithRoles);
        expect(result.success).toBe(true);
      });
    });

    describe('email validation', () => {
      it('should reject invalid email format', () => {
        const invalidEmailData = { ...validUserData, email: 'invalid-email' };
        const result = createUserSchema.safeParse(invalidEmailData);
        
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(getFirstErrorMessage(result)).toBe('Invalid email format');
        }
      });

      it('should reject email that is too long', () => {
        const longEmail = 'a'.repeat(250) + '@example.com';
        const invalidEmailData = { ...validUserData, email: longEmail };
        const result = createUserSchema.safeParse(invalidEmailData);
        
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(getFirstErrorMessage(result)).toContain('Email must be no more than');
        }
      });

      it('should reject missing email', () => {
        const { email, ...dataWithoutEmail } = validUserData;
        const result = createUserSchema.safeParse(dataWithoutEmail);
        
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(getFirstErrorCode(result)).toBe('invalid_type');
        }
      });
    });

    describe('username validation', () => {
      it('should reject username that is too short', () => {
        const invalidUsernameData = { ...validUserData, username: 'ab' };
        const result = createUserSchema.safeParse(invalidUsernameData);
        
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(getFirstErrorMessage(result)).toContain('Username must be at least');
        }
      });

      it('should reject username that is too long', () => {
        const longUsername = 'a'.repeat(31);
        const invalidUsernameData = { ...validUserData, username: longUsername };
        const result = createUserSchema.safeParse(invalidUsernameData);
        
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(getFirstErrorMessage(result)).toContain('Username must be no more than');
        }
      });

      it('should reject username with invalid characters', () => {
        const invalidUsernameData = { ...validUserData, username: 'test@user' };
        const result = createUserSchema.safeParse(invalidUsernameData);
        
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(getFirstErrorMessage(result)).toBe('Username can only contain letters, numbers, underscores, and hyphens');
        }
      });

      it('should accept valid username with underscores and hyphens', () => {
        const validUsernameData = { ...validUserData, username: 'test_user-123' };
        const result = createUserSchema.safeParse(validUsernameData);
        
        expect(result.success).toBe(true);
      });
    });

    describe('name validation', () => {
      it('should reject empty first name', () => {
        const invalidNameData = { ...validUserData, firstName: '' };
        const result = createUserSchema.safeParse(invalidNameData);
        
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(getFirstErrorMessage(result)).toContain('First name must be at least');
        }
      });

      it('should reject first name that is too long', () => {
        const longName = 'a'.repeat(51);
        const invalidNameData = { ...validUserData, firstName: longName };
        const result = createUserSchema.safeParse(invalidNameData);
        
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(getFirstErrorMessage(result)).toContain('First name must be no more than');
        }
      });

      it('should reject names with invalid characters', () => {
        const invalidNameData = { ...validUserData, firstName: 'John123' };
        const result = createUserSchema.safeParse(invalidNameData);
        
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(getFirstErrorMessage(result)).toBe('First name contains invalid characters');
        }
      });

      it('should accept names with valid special characters', () => {
        const validNameData = { 
          ...validUserData, 
          firstName: "O'Connor",
          lastName: 'Van Der Berg-Smith'
        };
        const result = createUserSchema.safeParse(validNameData);
        
        expect(result.success).toBe(true);
      });
    });

    describe('password validation', () => {
      it('should reject password that is too short', () => {
        const invalidPasswordData = { 
          ...validUserData, 
          password: 'Pass1!',
          confirmPassword: 'Pass1!'
        };
        const result = createUserSchema.safeParse(invalidPasswordData);
        
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(getFirstErrorMessage(result)).toBe('Password must be at least 8 characters long');
        }
      });

      it('should reject password that is too long', () => {
        const longPassword = 'Password123!' + 'a'.repeat(130);
        const invalidPasswordData = { 
          ...validUserData, 
          password: longPassword,
          confirmPassword: longPassword
        };
        const result = createUserSchema.safeParse(invalidPasswordData);
        
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(getFirstErrorMessage(result)).toBe('Password must be no more than 128 characters long');
        }
      });

      it('should reject weak password (no uppercase)', () => {
        const weakPassword = 'password123!';
        const invalidPasswordData = { 
          ...validUserData, 
          password: weakPassword,
          confirmPassword: weakPassword
        };
        const result = createUserSchema.safeParse(invalidPasswordData);
        
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(getFirstErrorMessage(result)).toContain('Password must contain at least one uppercase letter');
        }
      });

      it('should reject weak password (no lowercase)', () => {
        const weakPassword = 'PASSWORD123!';
        const invalidPasswordData = { 
          ...validUserData, 
          password: weakPassword,
          confirmPassword: weakPassword
        };
        const result = createUserSchema.safeParse(invalidPasswordData);
        
        expect(result.success).toBe(false);
      });

      it('should reject weak password (no number)', () => {
        const weakPassword = 'Password!';
        const invalidPasswordData = { 
          ...validUserData, 
          password: weakPassword,
          confirmPassword: weakPassword
        };
        const result = createUserSchema.safeParse(invalidPasswordData);
        
        expect(result.success).toBe(false);
      });

      it('should reject weak password (no special character)', () => {
        const weakPassword = 'Password123';
        const invalidPasswordData = { 
          ...validUserData, 
          password: weakPassword,
          confirmPassword: weakPassword
        };
        const result = createUserSchema.safeParse(invalidPasswordData);
        
        expect(result.success).toBe(false);
      });

      it('should reject mismatched passwords', () => {
        const mismatchedData = { 
          ...validUserData, 
          password: 'Password123!',
          confirmPassword: 'DifferentPass123!'
        };
        const result = createUserSchema.safeParse(mismatchedData);
        
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(getFirstErrorMessage(result)).toBe("Passwords don't match");
        }
      });
    });

    describe('profile validation', () => {
      it('should validate valid phone number', () => {
        const userWithPhone = {
          ...validUserData,
          profile: {
            phone: '+1-234-567-8900'
          }
        };

        const result = createUserSchema.safeParse(userWithPhone);
        expect(result.success).toBe(true);
      });

      it('should reject invalid phone number', () => {
        const userWithInvalidPhone = {
          ...validUserData,
          profile: {
            phone: 'invalid-phone'
          }
        };

        const result = createUserSchema.safeParse(userWithInvalidPhone);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(getFirstErrorMessage(result)).toBe('Invalid phone number format');
        }
      });

      it('should reject future date of birth', () => {
        const futureDate = new Date();
        futureDate.setFullYear(futureDate.getFullYear() + 1);

        const userWithFutureBirth = {
          ...validUserData,
          profile: {
            dateOfBirth: futureDate
          }
        };

        const result = createUserSchema.safeParse(userWithFutureBirth);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(getFirstErrorMessage(result)).toBe('Date of birth cannot be in the future');
        }
      });

      it('should validate valid timezone', () => {
        const userWithTimezone = {
          ...validUserData,
          profile: {
            timezone: 'America/New_York'
          }
        };

        const result = createUserSchema.safeParse(userWithTimezone);
        expect(result.success).toBe(true);
      });

      it('should reject invalid timezone format', () => {
        const userWithInvalidTimezone = {
          ...validUserData,
          profile: {
            timezone: 'invalid-timezone'
          }
        };

        const result = createUserSchema.safeParse(userWithInvalidTimezone);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(getFirstErrorMessage(result)).toBe('Invalid timezone format');
        }
      });
    });

    describe('roles validation', () => {
      it('should validate valid role IDs', () => {
        const userWithRoles = {
          ...validUserData,
          roles: ['507f1f77bcf86cd799439011', '507f1f77bcf86cd799439012']
        };

        const result = createUserSchema.safeParse(userWithRoles);
        expect(result.success).toBe(true);
      });

      it('should reject invalid role ID format', () => {
        const userWithInvalidRoles = {
          ...validUserData,
          roles: ['invalid-role-id']
        };

        const result = createUserSchema.safeParse(userWithInvalidRoles);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(getFirstErrorMessage(result)).toBe('Invalid role ID format');
        }
      });
    });
  });

  describe('updateUserSchema', () => {
    it('should validate partial user updates', () => {
      const updateData = {
        firstName: 'Jane',
        email: 'jane@example.com'
      };

      const result = updateUserSchema.safeParse(updateData);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.firstName).toBe('Jane');
        expect(result.data.email).toBe('jane@example.com');
      }
    });

    it('should reject empty update object', () => {
      const result = updateUserSchema.safeParse({});
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(getFirstErrorMessage(result)).toBe('At least one field must be provided for update');
      }
    });

    it('should validate profile updates', () => {
      const updateData = {
        profile: {
          phone: '+1-555-123-4567',
          timezone: 'Europe/London'
        }
      };

      const result = updateUserSchema.safeParse(updateData);
      expect(result.success).toBe(true);
    });

    it('should validate preferences updates', () => {
      const updateData = {
        preferences: {
          theme: 'dark' as const,
          emailNotifications: false,
          twoFactorEnabled: true
        }
      };

      const result = updateUserSchema.safeParse(updateData);
      expect(result.success).toBe(true);
    });
  });

  describe('updateUserStatusSchema', () => {
    it('should validate status update with reason', () => {
      const statusUpdate = {
        status: 'suspended' as const,
        reason: 'Policy violation'
      };

      const result = updateUserStatusSchema.safeParse(statusUpdate);
      expect(result.success).toBe(true);
    });

    it('should validate status update without reason', () => {
      const statusUpdate = {
        status: 'active' as const
      };

      const result = updateUserStatusSchema.safeParse(statusUpdate);
      expect(result.success).toBe(true);
    });

    it('should reject invalid status', () => {
      const statusUpdate = {
        status: 'invalid-status'
      };

      const result = updateUserStatusSchema.safeParse(statusUpdate);
      expect(result.success).toBe(false);
    });

    it('should reject reason that is too long', () => {
      const statusUpdate = {
        status: 'suspended' as const,
        reason: 'a'.repeat(256)
      };

      const result = updateUserStatusSchema.safeParse(statusUpdate);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(getFirstErrorMessage(result)).toBe('Reason must be no more than 255 characters');
      }
    });
  });

  describe('updateUserRolesSchema', () => {
    it('should validate role assignment', () => {
      const roleUpdate = {
        roles: ['507f1f77bcf86cd799439011', '507f1f77bcf86cd799439012'],
        reason: 'Promotion to admin'
      };

      const result = updateUserRolesSchema.safeParse(roleUpdate);
      expect(result.success).toBe(true);
    });

    it('should reject invalid role IDs', () => {
      const roleUpdate = {
        roles: ['invalid-role-id']
      };

      const result = updateUserRolesSchema.safeParse(roleUpdate);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(getFirstErrorMessage(result)).toBe('Invalid role ID format');
      }
    });
  });

  describe('bulkCreateUsersSchema', () => {
    const validUser = {
      email: 'user1@example.com',
      username: 'user1',
      firstName: 'User',
      lastName: 'One',
      password: 'Password123!'
    };

    it('should validate bulk user creation', () => {
      const bulkData = {
        users: [
          validUser,
          { ...validUser, email: 'user2@example.com', username: 'user2' }
        ],
        sendWelcomeEmails: true,
        validateEmails: true
      };

      const result = bulkCreateUsersSchema.safeParse(bulkData);
      expect(result.success).toBe(true);
    });

    it('should reject empty users array', () => {
      const bulkData = {
        users: []
      };

      const result = bulkCreateUsersSchema.safeParse(bulkData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(getFirstErrorMessage(result)).toBe('At least one user is required');
      }
    });

    it('should reject too many users', () => {
      const users = Array(101).fill(validUser);
      const bulkData = { users };

      const result = bulkCreateUsersSchema.safeParse(bulkData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(getFirstErrorMessage(result)).toBe('Cannot create more than 100 users at once');
      }
    });
  });

  describe('userSearchSchema', () => {
    it('should validate basic search', () => {
      const searchData = {
        q: 'john',
        page: 1,
        limit: 20
      };

      const result = userSearchSchema.safeParse(searchData);
      expect(result.success).toBe(true);
    });

    it('should validate search with filters', () => {
      const searchData = {
        q: 'admin',
        page: 2,
        limit: 10,
        sortBy: 'email' as const,
        sortOrder: 'asc' as const,
        filters: {
          status: ['active', 'pending'],
          emailVerified: true,
          roles: ['507f1f77bcf86cd799439011']
        }
      };

      const result = userSearchSchema.safeParse(searchData);
      expect(result.success).toBe(true);
    });

    it('should apply default values', () => {
      const searchData = {};
      const result = userSearchSchema.safeParse(searchData);
      
      expect(result.success).toBe(true);
      if (result.success) {
        // Zod applies defaults during parsing when the fields are optional with defaults
        expect(result.data.page).toBe(1);
        expect(result.data.limit).toBe(20);
        expect(result.data.sortBy).toBe('createdAt');
        expect(result.data.sortOrder).toBe('desc');
      }
    });

    it('should reject invalid page number', () => {
      const searchData = {
        page: 0
      };

      const result = userSearchSchema.safeParse(searchData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(getFirstErrorMessage(result)).toBe('Page must be at least 1');
      }
    });

    it('should reject limit that is too high', () => {
      const searchData = {
        limit: 101
      };

      const result = userSearchSchema.safeParse(searchData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(getFirstErrorMessage(result)).toContain('Limit cannot exceed');
      }
    });

    it('should reject search query that is too long', () => {
      const searchData = {
        q: 'a'.repeat(101)
      };

      const result = userSearchSchema.safeParse(searchData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(getFirstErrorMessage(result)).toBe('Search query must be no more than 100 characters');
      }
    });

    it('should validate date filters', () => {
      const searchData = {
        filters: {
          lastLoginAfter: new Date('2024-01-01'),
          lastLoginBefore: new Date('2024-12-31'),
          createdAfter: new Date('2023-01-01'),
          createdBefore: new Date('2023-12-31')
        }
      };

      const result = userSearchSchema.safeParse(searchData);
      expect(result.success).toBe(true);
    });
  });

  describe('type exports', () => {
    it('should export correct types', () => {
      // Test that types can be used
      const createUser: CreateUserInput = {
        email: 'test@example.com',
        username: 'testuser',
        firstName: 'Test',
        lastName: 'User',
        password: 'Password123!',
        confirmPassword: 'Password123!'
      };

      const updateUser: UpdateUserInput = {
        firstName: 'Updated Name'
      };

      const statusUpdate: UpdateUserStatusInput = {
        status: 'active'
      };

      const rolesUpdate: UpdateUserRolesInput = {
        roles: ['507f1f77bcf86cd799439011']
      };

      const bulkCreate: BulkCreateUsersInput = {
        users: [createUser]
      };

      const search: UserSearchInput = {
        page: 1,
        limit: 10,
        sortBy: 'email',
        sortOrder: 'asc',
        q: 'test'
      };

      // These should compile without errors
      expect(createUser).toBeDefined();
      expect(updateUser).toBeDefined();
      expect(statusUpdate).toBeDefined();
      expect(rolesUpdate).toBeDefined();
      expect(bulkCreate).toBeDefined();
      expect(search).toBeDefined();
    });
  });
});