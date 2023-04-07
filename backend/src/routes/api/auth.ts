import { Router } from 'express';
import { checkAccessToken } from '../../utils/token';
import { checkIfExists } from '../../middelwares/checks';
import { verifyToken } from '../../middelwares/verifyToken';
import {
  validateLogin,
  validateRegister,
  validateResetPassword
} from '../../middelwares/validation/Auth';
import {
  createUser,
  authUser,
  refreshToken,
  updatePassword
} from '../../controllers/User';

const authRouter = Router();

authRouter
  .post('/register', validateRegister, checkIfExists, createUser)
  .post('/login', validateLogin, authUser)
  .patch('/password/:id', verifyToken, validateResetPassword, updatePassword)
  .post('/refresh-token', refreshToken)
  .get('/check-token', checkAccessToken);

export default authRouter;
