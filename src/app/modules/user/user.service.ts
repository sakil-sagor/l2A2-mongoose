import { Order, User } from './user.interface';
import { UserModel } from './user.model';
// for find users
const findUserInDb = async () => {
  const result = await UserModel.find({}).select({ username: 1, fullName: 1 });
  return result;
};
// for find single user
const findSingleUserInDb = async (userId: string) => {
  const result = await UserModel.findOne({ _id: userId }).select({
    password: 0,
  });
  return result;
};
// for create user
const createUserInDb = async (user: User) => {
  const result = await UserModel.create(user);
  return result;
};

// for find single user
const updateSingleUserInDb = async (userId: string, detils: User) => {
  const result = await UserModel.updateOne({ _id: userId }, { $set: detils });
  return result;
};

// for find single user
const deleteSingleUserInDb = async (userId: string) => {
  const result = await UserModel.deleteOne({ _id: userId });
  return result;
};

// for find single user
const createOrderInUser = async (userId: string, orderInfo: Order) => {
  const result = await UserModel.updateOne(
    { _id: userId },
    { $push: { orders: orderInfo } },
  );
  return result;
};

export const UserService = {
  createUserInDb,
  findUserInDb,
  findSingleUserInDb,
  updateSingleUserInDb,
  deleteSingleUserInDb,
  createOrderInUser,
};
