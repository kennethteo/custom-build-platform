import mongoose from 'mongoose';
import { User } from '../models/user.model';
import { Role } from '../models/role.model';
import { Permission } from '../models/permission.model';
import { connectDB } from '../config/database';

export async function seedDatabase() {
  try {
    await connectDB();
    
    console.log('🌱 Starting database seeding...');
    
    // Create permissions first
    console.log('Creating permissions...');
    const permissionsData = [
      { name: 'users:read', description: 'Read user data', resource: 'users', action: 'read', category: 'user-management' },
      { name: 'users:write', description: 'Create and update users', resource: 'users', action: 'write', category: 'user-management' },
      { name: 'users:delete', description: 'Delete users', resource: 'users', action: 'delete', category: 'user-management' },
      { name: 'roles:read', description: 'Read role data', resource: 'roles', action: 'read', category: 'user-management' },
      { name: 'roles:write', description: 'Create and update roles', resource: 'roles', action: 'write', category: 'user-management' },
      { name: 'roles:delete', description: 'Delete roles', resource: 'roles', action: 'delete', category: 'user-management' },
      { name: 'admin:access', description: 'Access admin features', resource: 'admin', action: 'access', category: 'administration' },
      { name: 'profile:read', description: 'Read own profile', resource: 'profile', action: 'read', category: 'user-profile' },
      { name: 'profile:write', description: 'Update own profile', resource: 'profile', action: 'write', category: 'user-profile' }
    ];
    
    const createdPermissions: { [key: string]: any } = {};
    for (const permData of permissionsData) {
      const permission = await Permission.findOneAndUpdate(
        { name: permData.name },
        { ...permData, isSystemPermission: true },
        { upsert: true, new: true }
      );
      createdPermissions[permData.name] = permission;
      console.log(`✅ Created/updated permission: ${permData.name}`);
    }
    
    // Create default roles if they don't exist
    console.log('Creating roles...');
    
    // Admin role with all permissions
    const adminPermissions = [
      { permissionId: createdPermissions['users:read']._id, name: 'users:read', resource: 'users', action: 'read' },
      { permissionId: createdPermissions['users:write']._id, name: 'users:write', resource: 'users', action: 'write' },
      { permissionId: createdPermissions['users:delete']._id, name: 'users:delete', resource: 'users', action: 'delete' },
      { permissionId: createdPermissions['roles:read']._id, name: 'roles:read', resource: 'roles', action: 'read' },
      { permissionId: createdPermissions['roles:write']._id, name: 'roles:write', resource: 'roles', action: 'write' },
      { permissionId: createdPermissions['roles:delete']._id, name: 'roles:delete', resource: 'roles', action: 'delete' },
      { permissionId: createdPermissions['admin:access']._id, name: 'admin:access', resource: 'admin', action: 'access' }
    ];
    
    const adminRole = await Role.findOneAndUpdate(
      { name: 'admin' },
      {
        name: 'admin',
        description: 'Administrator role with full access',
        isSystemRole: true,
        permissions: adminPermissions
      },
      { upsert: true, new: true }
    );

    // User role with limited permissions
    const userPermissions = [
      { permissionId: createdPermissions['users:read']._id, name: 'users:read', resource: 'users', action: 'read' },
      { permissionId: createdPermissions['profile:read']._id, name: 'profile:read', resource: 'profile', action: 'read' },
      { permissionId: createdPermissions['profile:write']._id, name: 'profile:write', resource: 'profile', action: 'write' }
    ];
    
    const userRole = await Role.findOneAndUpdate(
      { name: 'user' },
      {
        name: 'user',
        description: 'Standard user role',
        isSystemRole: true,
        permissions: userPermissions
      },
      { upsert: true, new: true }
    );
    
    console.log('✅ Default roles created');
    
    // Create admin user if it doesn't exist
    console.log('Creating admin user...');
    const adminExists = await User.findOne({ 
      $or: [
        { email: 'admin@customplatform.com' },
        { username: 'admin' }
      ]
    });
    
    if (!adminExists) {
      const adminUser = new User({
        email: 'admin@customplatform.com',
        username: 'admin',
        passwordHash: 'Admin123!@#', // Will be hashed in pre-save middleware
        firstName: 'Admin',
        lastName: 'User',
        isActive: true,
        isVerified: true
      });
      
      // Add admin role
      adminUser.addRole(adminRole._id, 'admin');
      
      await adminUser.save();
      console.log('✅ Admin user created');
    } else {
      // Update existing admin user with the correct credentials
      adminExists.email = 'admin@customplatform.com';
      adminExists.username = 'admin';
      adminExists.passwordHash = 'Admin123!@#'; // Will be hashed in pre-save middleware
      adminExists.firstName = 'Admin';
      adminExists.lastName = 'User';
      adminExists.isActive = true;
      adminExists.isVerified = true;
      
      // Ensure admin role is assigned
      adminExists.addRole(adminRole._id, 'admin');
      
      await adminExists.save();
      console.log('✅ Admin user updated with correct credentials');
    }
    
    console.log('🌱 Database seeding completed');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

// Run seeding if this file is executed directly
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('Seeding completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Seeding failed:', error);
      process.exit(1);
    });
}
