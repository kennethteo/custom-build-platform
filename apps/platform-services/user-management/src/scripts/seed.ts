import { connectDB } from '../config/database';
import { Role } from '../models/role.model';
import { Permission } from '../models/permission.model';
import { User } from '../models/user.model';

const defaultPermissions = [
  // User Management Permissions
  { name: 'users.create', description: 'Create new users', resource: 'users', action: 'create', category: 'user_management' },
  { name: 'users.read', description: 'View user information', resource: 'users', action: 'read', category: 'user_management' },
  { name: 'users.update', description: 'Update user information', resource: 'users', action: 'update', category: 'user_management' },
  { name: 'users.delete', description: 'Delete users', resource: 'users', action: 'delete', category: 'user_management' },
  { name: 'users.activate', description: 'Activate/deactivate users', resource: 'users', action: 'activate', category: 'user_management' },
  
  // Role Management Permissions
  { name: 'roles.create', description: 'Create new roles', resource: 'roles', action: 'create', category: 'role_management' },
  { name: 'roles.read', description: 'View role information', resource: 'roles', action: 'read', category: 'role_management' },
  { name: 'roles.update', description: 'Update role information', resource: 'roles', action: 'update', category: 'role_management' },
  { name: 'roles.delete', description: 'Delete roles', resource: 'roles', action: 'delete', category: 'role_management' },
  { name: 'roles.assign', description: 'Assign roles to users', resource: 'roles', action: 'assign', category: 'role_management' },
  
  // Permission Management
  { name: 'permissions.read', description: 'View permissions', resource: 'permissions', action: 'read', category: 'permission_management' },
  { name: 'permissions.assign', description: 'Assign permissions to roles', resource: 'permissions', action: 'assign', category: 'permission_management' },
  
  // Profile Management
  { name: 'profile.read', description: 'View own profile', resource: 'profile', action: 'read', category: 'profile_management' },
  { name: 'profile.update', description: 'Update own profile', resource: 'profile', action: 'update', category: 'profile_management' },
];

const defaultRoles = [
  {
    name: 'super-admin',
    description: 'Super administrator with full system access',
    isSystemRole: true,
    permissions: [
      'users.create', 'users.read', 'users.update', 'users.delete', 'users.activate',
      'roles.create', 'roles.read', 'roles.update', 'roles.delete', 'roles.assign',
      'permissions.read', 'permissions.assign',
      'profile.read', 'profile.update'
    ]
  },
  {
    name: 'admin',
    description: 'Administrator with user and role management access',
    isSystemRole: true,
    permissions: [
      'users.create', 'users.read', 'users.update', 'users.activate',
      'roles.read', 'roles.assign',
      'profile.read', 'profile.update'
    ]
  },
  {
    name: 'user-manager',
    description: 'User manager with limited user management access',
    isSystemRole: true,
    permissions: [
      'users.read', 'users.update',
      'profile.read', 'profile.update'
    ]
  },
  {
    name: 'user',
    description: 'Standard user with basic access',
    isSystemRole: true,
    permissions: [
      'profile.read', 'profile.update'
    ]
  }
];

const defaultUsers = [
  {
    email: 'admin@customplatform.com',
    username: 'admin',
    password: 'Admin123!@#',
    firstName: 'System',
    lastName: 'Administrator',
    isVerified: true,
    roles: ['super-admin', 'admin']
  }
];

export const seedDatabase = async (): Promise<void> => {
  try {
    console.log('🌱 Starting database seeding...');

    // Connect to database
    await connectDB();

    // Clear existing data (optional - remove in production)
    if (process.env.NODE_ENV === 'development') {
      await Permission.deleteMany({});
      await Role.deleteMany({});
      await User.deleteMany({});
      console.log('🧹 Cleared existing data');
    }

    // Seed permissions
    console.log('📋 Seeding permissions...');
    const permissionDocs = [];
    for (const permData of defaultPermissions) {
      const existingPermission = await Permission.findOne({ name: permData.name });
      if (!existingPermission) {
        const permission = new Permission({
          ...permData,
          isSystemPermission: true
        });
        await permission.save();
        permissionDocs.push(permission);
        console.log(`✅ Created permission: ${permData.name}`);
      } else {
        permissionDocs.push(existingPermission);
        console.log(`⏭️  Permission already exists: ${permData.name}`);
      }
    }

    // Seed roles
    console.log('👥 Seeding roles...');
    const roleDocs = [];
    for (const roleData of defaultRoles) {
      const existingRole = await Role.findOne({ name: roleData.name });
      if (!existingRole) {
        const role = new Role({
          name: roleData.name,
          description: roleData.description,
          isSystemRole: roleData.isSystemRole,
          permissions: []
        });

        // Add permissions to role
        for (const permissionName of roleData.permissions) {
          const permission = permissionDocs.find(p => p.name === permissionName);
          if (permission) {
            role.addPermission(permission._id, {
              name: permission.name,
              resource: permission.resource,
              action: permission.action,
              conditions: permission.conditions
            });
          }
        }

        await role.save();
        roleDocs.push(role);
        console.log(`✅ Created role: ${roleData.name} with ${role.permissions.length} permissions`);
      } else {
        roleDocs.push(existingRole);
        console.log(`⏭️  Role already exists: ${roleData.name}`);
      }
    }

    // Seed default admin user
    console.log('👤 Seeding default users...');
    for (const userData of defaultUsers) {
      const existingUser = await User.findOne({ email: userData.email });
      if (!existingUser) {
        const user = new User({
          email: userData.email,
          username: userData.username,
          passwordHash: userData.password, // Will be hashed by pre-save middleware
          firstName: userData.firstName,
          lastName: userData.lastName,
          isVerified: userData.isVerified
        });

        // Add roles to user
        for (const roleName of userData.roles) {
          const role = roleDocs.find(r => r.name === roleName);
          if (role) {
            user.addRole(role._id, role.name);
          }
        }

        await user.save();
        console.log(`✅ Created user: ${userData.email} with roles: ${userData.roles.join(', ')}`);
      } else {
        console.log(`⏭️  User already exists: ${userData.email}`);
      }
    }

    console.log('🎉 Database seeding completed successfully!');
    console.log(`📊 Summary:`);
    console.log(`   - Permissions: ${permissionDocs.length}`);
    console.log(`   - Roles: ${roleDocs.length}`);
    console.log(`   - Users: ${defaultUsers.length}`);

  } catch (error) {
    console.error('❌ Database seeding failed:', error);
    throw error;
  }
};

// Run seeder if called directly
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('✅ Seeding process completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Seeding process failed:', error);
      process.exit(1);
    });
}
