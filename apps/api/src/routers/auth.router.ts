import {
  signOut,
  signUpSchema,
  signinUser,
  signupUser,
} from '@/controllers/auth.controller';
import { createEvent } from '@/controllers/event.controller';
import { inputValidator } from '@/middleware/middleware.input';
import { Router } from 'express';

const authRouter = Router();

authRouter.post('/signin', signinUser);
authRouter.post('/signup', inputValidator(signUpSchema), signupUser);
authRouter.post('/signout', signOut);

export default authRouter;
