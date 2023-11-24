import { Request, Response } from 'express';
import { UserService } from './user.service';
import { orderSchema, userValidationbyZod } from './user.validation';

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

    const result = await UserService.findSingleUserInDb(parseInt(userId));
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: {
        code: 404,
        description: err.message || 'something went wrong',
      },
    });
  }
};

// create single user
const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    // data validation using zod
    const zodParseData = userValidationbyZod.parse(user);

    const result = await UserService.createUserInDb(zodParseData);
    const { password, orders, _id, ...userData } = result.toObject();

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

// update single user
const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = req.body;
    // data validation using zod
    const zodParseData = userValidationbyZod.parse(user);
    const result = await UserService.updateSingleUserInDb(
      parseInt(userId),
      zodParseData,
    );

    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: {
        code: 404,
        description: err.message || 'something went wrong',
      },
    });
  }
};

// delete single user
const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await UserService.deleteSingleUserInDb(parseInt(userId));

    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: result.deletedCount == 1 && null,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: {
        code: 404,
        description: err.message || 'something went wrong',
      },
    });
  }
};

//make order for new product
const orderProduct = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    const orderInfo = req.body;
    const zodParseData = orderSchema.parse(orderInfo);
    console.log(orderInfo);
    console.log(zodParseData);

    const result = await UserService.createOrderInUser(
      parseInt(userId),
      zodParseData,
    );

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: {
        code: 404,
        description: err.message || 'something went wrong',
      },
    });
  }
};
// find all orders for single user
const allOrdersForSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserService.findAllOrderSingleUserInDb(
      parseInt(userId),
    );
    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: {
        code: 404,
        description: err.message || 'something went wrong',
      },
    });
  }
};
// find all orders for single user
const totalPriceSpecificUserOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserService.calculateTotalPriceUser(parseInt(userId));

    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: {
        code: 404,
        description: err.message || 'something went wrong',
      },
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
