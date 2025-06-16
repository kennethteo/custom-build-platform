export const validRoleData = {
  name: 'test-role',
  description: 'Test role for testing',
  permissions: []
};

export const adminRoleData = {
  name: 'admin',
  description: 'Administrator role',
  permissions: ['users.create', 'users.read', 'users.update', 'users.delete']
};

export const userRoleData = {
  name: 'user',
  description: 'Standard user role',
  permissions: ['users.read']
};
