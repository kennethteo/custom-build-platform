import { UserModel } from '../../src/models/user.model';
import { RoleModel } from '../../src/models/role.model';

export const createTestUser = async (userData: any) => {
  return await UserModel.create(userData);
};

export const createTestRole = async (roleData: any) => {
  return await RoleModel.create(roleData);
};

export const findUserByEmail = async (email: string) => {
  return await UserModel.findOne({ email });
};
