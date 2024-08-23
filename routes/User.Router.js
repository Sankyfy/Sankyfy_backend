import express from 'express';
import { deleteUserById, getAllUsers, getUserById, loginUser, signupUser, updateUserById, updateUserStatus,updatePassword } from '../controllers/User.Controller.js';


const UserRouter = express.Router();

// Route to signup a new user
UserRouter.post('/signup', signupUser);

// Route to login a user
UserRouter.post('/login', loginUser);

// Route to get user by ID
UserRouter.get('/:id', getUserById);

UserRouter.get('/', getAllUsers);

// Route to update user by ID
UserRouter.put('/:id', updateUserById);
UserRouter.post('/update-status', updateUserStatus);
// Route to delete user by ID
UserRouter.delete('/:id', deleteUserById);
UserRouter.post('/update-password', updatePassword);
export default UserRouter;
