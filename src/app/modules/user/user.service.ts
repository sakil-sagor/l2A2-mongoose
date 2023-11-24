import { Types } from 'mongoose';
import { Order, TUser } from './user.interface';
import { User } from './user.model';
// for find users
const findUserInDb = async () => {
  const result = await User.find({}).select({
    username: 1,
    fullName: 1,
    age: 1,
    email: 1,
    address: 1,
    _id: 0,
  });
  return result;
};
// for find single user
const findSingleUserInDb = async (userId: string) => {
  const result = await User.findOne({ userId }).select({
    password: 0,
  });
  return result;
};

// for create user
const createUserInDb = async (user: TUser) => {
  console.log(user.userId);
  if (await User.isUserExists(user.userId)) {
    throw new Error('User already exists');
  }
  const result = await User.create(user);

  return result;
};

// for find single user
const updateSingleUserInDb = async (userId: string, detils: TUser) => {
  const result = await User.updateOne({ _id: userId }, { $set: detils });
  return result;
};

// for find single user
const deleteSingleUserInDb = async (userId: string) => {
  const result = await User.deleteOne({ _id: userId });
  return result;
};

// for find single user
const createOrderInUser = async (userId: string, orderInfo: Order) => {
  const result = await User.updateOne(
    { _id: userId },
    { $push: { orders: orderInfo } },
  );
  return result;
};
// find all order specific user
const findAllOrderSingleUserInDb = async (userId: string) => {
  const result = await User.find({ _id: userId }).select({
    orders: 1,
    _id: 0,
  });
  return result;
};
// find all order specific user
const calculateTotalPriceUser = async (userId: string) => {
  const result = await User.aggregate([
    { $match: { _id: new Types.ObjectId(userId) } },
    { $unwind: '$orders' },
    {
      $group: {
        _id: null,
        totalPrice: {
          $sum: { $multiply: ['$orders.price', '$orders.quantity'] },
        },
      },
    },
    {
      $project: {
        _id: 0,
      },
    },
  ]);
  const totalPriceObject = { totalPrice: result[0]?.totalPrice || 0 };
  return totalPriceObject;
};

export const UserService = {
  createUserInDb,
  findUserInDb,
  findSingleUserInDb,
  updateSingleUserInDb,
  deleteSingleUserInDb,
  createOrderInUser,
  findAllOrderSingleUserInDb,
  calculateTotalPriceUser,
};
