import { Schema, model, Document } from 'mongoose';

export interface IPermission extends Document {
  name: string;
  description?: string;
  resource: string;
  action: string;
  category: string;
  isSystemPermission: boolean;
  conditions?: Record<string, any>;
  createdAt: Date;
}

const permissionSchema = new Schema<IPermission>({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: { type: String, trim: true },
  resource: { type: String, required: true },
  action: { type: String, required: true },
  category: { type: String, required: true },
  isSystemPermission: { type: Boolean, default: false },
  conditions: { type: Schema.Types.Mixed, default: {} }
}, {
  timestamps: true
});

// Indexes
permissionSchema.index({ name: 1 });
permissionSchema.index({ resource: 1, action: 1 });
permissionSchema.index({ category: 1 });

export const Permission = model<IPermission>('Permission', permissionSchema);
