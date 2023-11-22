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
    console.log(userId);
    const result = await UserService.updateSingleUserInDb(userId);
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

export const UserController = {
  createUser,
  getUsers,
  getSingleUser,
  updateSingleUser,
};
