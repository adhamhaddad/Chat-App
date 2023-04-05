import { Router } from 'express';
import { createUser, authUser, refreshToken } from '../../controllers/User';
import { checkAccessToken } from '../../utils/token';

const authRouter = Router();

authRouter
  .post('/register', createUser)
  .post('/login', authUser)
  .post('/refresh-token', refreshToken)
  .get('/check-token', checkAccessToken);

export default authRouter;
