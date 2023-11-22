import { Request, Response } from 'express';
import { UserService } from './user.service';

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

export const UserController = {
  createUser,
  getUsers,
};
