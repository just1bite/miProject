import {
  signUpSchema,
  signinUser,
  signupUser,
} from '@/controllers/auth.controller';
import { inputValidator } from '@/middleware/middleware.input';
import { Router } from 'express';

const authRouter = Router();

authRouter.post('/signin', signinUser);
authRouter.post('/signup', inputValidator(signUpSchema), signupUser);

export default authRouter;
