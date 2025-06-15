import { Schema, model, Document, Types } from 'mongoose';

export interface IPermission {
  permissionId: Types.ObjectId;
  name: string;
  resource: string;
  action: string;
  conditions?: Record<string, any>;
}

export interface IRole extends Document {
  name: string;
  description?: string;
  isSystemRole: boolean;
  permissions: IPermission[];
  createdAt: Date;
  updatedAt: Date;
  
  // Methods
  addPermission(permissionId: Types.ObjectId, permissionData: Omit<IPermission, 'permissionId'>): void;
  removePermission(permissionId: Types.ObjectId): void;
  hasPermission(permissionName: string): boolean;
}

const permissionSchema = new Schema<IPermission>({
  permissionId: { type: Schema.Types.ObjectId, ref: 'Permission', required: true },
  name: { type: String, required: true },
  resource: { type: String, required: true },
  action: { type: String, required: true },
  conditions: { type: Schema.Types.Mixed, default: {} }
});

const roleSchema = new Schema<IRole>({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: { type: String, trim: true },
  isSystemRole: { type: Boolean, default: false },
  permissions: [permissionSchema]
}, {
  timestamps: true
});

// Instance methods
roleSchema.methods.addPermission = function(permissionId: Types.ObjectId, permissionData: Omit<IPermission, 'permissionId'>) {
  if (!this.hasPermission(permissionData.name)) {
    this.permissions.push({
      permissionId,
      ...permissionData
    });
  }
};

roleSchema.methods.removePermission = function(permissionId: Types.ObjectId) {
  this.permissions = this.permissions.filter(perm => !perm.permissionId.equals(permissionId));
};

roleSchema.methods.hasPermission = function(permissionName: string): boolean {
  return this.permissions.some(perm => perm.name === permissionName);
};

// Indexes
roleSchema.index({ name: 1 });
roleSchema.index({ 'permissions.name': 1 });

export const Role = model<IRole>('Role', roleSchema);
