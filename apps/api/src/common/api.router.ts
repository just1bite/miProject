import authRouter from '@/routers/auth.router';
import { Router } from 'express';

const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/event', authRouter);

export default apiRouter;
