import { Router } from 'express';
import { verifyToken } from '../../middelwares/verifyToken';
import * as user from '../../controllers/User';
import * as email from '../../controllers/Email';
import * as information from '../../controllers/Information';
import {
  validateCreateEmail,
  validateGetEmail,
  validateUpdateEmail,
  validateDeleteEmail
} from '../../middelwares/validation/Email';
import {
  validateDeactivateUser,
  validateDeleteUser,
  validateGetUser,
  validateUpdateUser
} from '../../middelwares/validation/User';

const routes = Router();

routes
  // User Routes
  .get('/user/:id', verifyToken, validateGetUser, user.getUser)
  .get('/user', verifyToken, validateGetUser, user.getUsers)
  .patch('/user/:id', verifyToken, validateUpdateUser, user.updateUser)
  .delete('/user/:id', verifyToken, validateDeleteUser, user.deleteUser)
  .patch('/user-deactivate/:id', validateDeactivateUser, user.deactivateUser)
  // Email Routes
  .post('/email', verifyToken, validateCreateEmail, email.createEmail)
  .get('/email/:id', verifyToken, validateGetEmail, email.getEmails)
  .patch('/email/:id', verifyToken, validateUpdateEmail, email.updateEmail)
  .delete('/email/:id', verifyToken, validateDeleteEmail, email.deleteEmail)
  // Information Routes
  .post('/information', information.createInformation)
  .patch('/information/:id', information.updateInformation);

export default routes;
