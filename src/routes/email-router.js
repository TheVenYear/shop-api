import validate from '../middlewares/validate';
import emailValidation from '../validations/email-validation';

const { Router } = require('express');
const { default: emailController } = require('../controllers/email-controller');
const { default: authenticate } = require('../middlewares/authenticate');

const emailRouter = Router();

emailRouter.post(
  '/',
  authenticate(),
  validate(emailValidation.sendReq),
  emailController.send
);

export default emailRouter;
