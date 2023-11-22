import { User } from './user.interface';
import { UserModel } from './user.model';
// for find users
const findUserInDb = async () => {
  const result = await UserModel.find({}).select({ username: 1, fullName: 1 });
  return result;
};
// for create user
const createUserInDb = async (user: User) => {
  const result = await UserModel.create(user);

  return result;
};

export const UserService = {
  createUserInDb,
  findUserInDb,
};
