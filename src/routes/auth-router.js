import { Router } from 'express';

import authController from '../controllers/auth-controller';
import validate from '../middlewares/validate';
import authValidation from '../validations/auth-validation';
import authenticate from '../middlewares/authenticate';

const REFRESH_URL = '/refresh';
const LOGOUT_URL = '/logout';
const authRouter = Router();

authRouter.post(
  '/sign-up',
  validate(authValidation.signUp),
  authController.signUp
);

authRouter.get(REFRESH_URL, authController.refresh);

authRouter.get('/me', authenticate(), authController.me);

authRouter.post(
  '/sign-in',
  validate(authValidation.signIn),
  authController.signIn(REFRESH_URL, LOGOUT_URL)
);

authRouter.post(
  '/change-profile',
  validate(authValidation.update),
  authenticate(),
  authController.changeProfile
);

authRouter.post(LOGOUT_URL, authController.logout);

export default authRouter;
