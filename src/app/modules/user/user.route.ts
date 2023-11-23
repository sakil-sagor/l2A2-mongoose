import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.get('/', UserController.getUsers);
router.post('/', UserController.createUser);
router.get('/:userId', UserController.getSingleUser);
router.put('/:userId', UserController.updateSingleUser);
router.delete('/:userId', UserController.deleteSingleUser);
router.put('/:userId/orders', UserController.orderProduct);
router.get('/:userId/orders', UserController.allOrdersForSingleUser);

export const UserRoutes = router;
