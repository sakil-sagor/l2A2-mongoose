import { User } from './user.interface';
import { UserModel } from './user.model';
// for create user
const createUserInDb = async (user: User) => {
  const result = await UserModel.create(user);
  return result;
};

export const UserService = {
  createUserInDb,
};
