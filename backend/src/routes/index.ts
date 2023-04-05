import { Router } from 'express';
import routes from './api';
import authRouter from './api/auth';
import adminRouter from './api/admin';

const router = Router();

router.use('/admin', adminRouter);
router.use('/api', routes);
router.use('/auth', authRouter);

export default router;
