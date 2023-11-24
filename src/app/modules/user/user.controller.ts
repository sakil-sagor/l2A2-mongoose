import { Request, Response } from 'express';
import { UserService } from './user.service';

// find all users
const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserService.findUserInDb();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

// find single users
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    const result = await UserService.findSingleUserInDb(userId);
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

// create single user
const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const result = await UserService.createUserInDb(user);
    const { password, orders, ...userData } = result.toObject();

    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: userData,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

// update single users
const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    console.log('update user');
    const result = await UserService.updateSingleUserInDb(userId, req.body);

    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

// update single users
const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await UserService.deleteSingleUserInDb(userId);

    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

//make order for new product
const orderProduct = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const orderInfo = req.body;
    const result = await UserService.createOrderInUser(userId, orderInfo);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};
// find all orders for single user
const allOrdersForSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserService.findAllOrderSingleUserInDb(userId);
    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};
// find all orders for single user
const totalPriceSpecificUserOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserService.calculateTotalPriceUser(userId);

    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

export const UserController = {
  createUser,
  getUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
  orderProduct,
  allOrdersForSingleUser,
  totalPriceSpecificUserOrders,
};
