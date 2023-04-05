import { Router } from 'express';
import verifyToken from '../../middelwares/verifyToken';
import * as user from '../../controllers/User';
import * as email from '../../controllers/Email';

const routes = Router();

routes
  .get('/user/:id', verifyToken, user.getUser)
  .get('/user', verifyToken, user.getUsers)
  .patch('/user/:id', verifyToken, user.updateUser)
  .patch('/password/:id', verifyToken, user.updatePassword)
  .delete('/user/:id', verifyToken, user.deleteUser)
  .post('/email', email.createEmail)
  .get('/email/:id', email.getEmails)
  .patch('/email/:id', email.updateEmail)
  .delete('/email/:id', email.deleteEmail);

export default routes;
