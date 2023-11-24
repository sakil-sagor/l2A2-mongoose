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
const findSingleUserInDb = async (userId: number) => {
  if (!(await User.isUserExists(userId))) {
    throw new Error('User not found!');
  }
  const result = await User.findOne({ userId }).select({
    password: 0,
    _id: 0,
    orders: 0,
  });
  return result;
};

// for create user
const createUserInDb = async (user: TUser) => {
  if (await User.isUserExists(user.userId)) {
    throw new Error('User already exists');
  }
  const result = await User.create(user);

  return result;
};

// for update single user
const updateSingleUserInDb = async (userId: number, detils: TUser) => {
  if (!(await User.isUserExists(userId))) {
    throw new Error('User not found!');
  }
  const result = await User.updateOne({ userId }, { $set: detils });
  if (result.modifiedCount > 0) {
    const userData = await User.findOne({ userId }).select({
      password: 0,
      _id: 0,
      orders: 0,
    });
    return userData;
  } else {
    throw new Error('User is already up-to-date');
  }
};

// for delete single user
const deleteSingleUserInDb = async (userId: number) => {
  if (!(await User.isUserExists(userId))) {
    throw new Error('User not found!');
  }
  const result = await User.deleteOne({ userId });
  return result;
};

// for make a order
const createOrderInUser = async (userId: number, orderInfo: Order) => {
  if (!(await User.isUserExists(userId))) {
    throw new Error('User not found!');
  }
  const result = await User.updateOne(
    { userId },
    { $push: { orders: orderInfo } },
  );
  return result;
};
// find all order specific user
const findAllOrderSingleUserInDb = async (userId: number) => {
  if (!(await User.isUserExists(userId))) {
    throw new Error('User not found!');
  }
  const result = await User.findOne({ userId }).select({
    orders: 1,
    _id: 0,
  });

  return result;
};
// find all order specific user
const calculateTotalPriceUser = async (userId: number) => {
  if (!(await User.isUserExists(userId))) {
    throw new Error('User not found!');
  }
  const result = await User.aggregate([
    { $match: { userId } },
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
