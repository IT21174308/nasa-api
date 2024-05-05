import express from 'express';
import { CreateAccount, Login, getUserDetails, sendNewEmail, updateAccount, deleteAccount } from '../controllers/UserController.js';
import { LoginValidator } from '../middlewares/LoggedIn.js';

const userRouter = express.Router();

userRouter.get('/user', LoginValidator, getUserDetails);
userRouter.post('/login', Login);
userRouter.post('/register', CreateAccount);
userRouter.post('/send-email', sendNewEmail);
userRouter.delete('/:id', deleteAccount);
userRouter.put('/:id', updateAccount);

export default userRouter;