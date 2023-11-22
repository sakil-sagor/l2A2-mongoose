import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.get('/', UserController.getUsers);
router.post('/', UserController.createUser);
router.get('/:userId', UserController.getSingleUser);
router.put('/:userId', UserController.updateSingleUser);
export const UserRoutes = router;
