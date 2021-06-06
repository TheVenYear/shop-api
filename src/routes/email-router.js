import validate from '../middlewares/validate';
import emailValidation from '../validations/email-validation';
import emailController from '../controllers/email-controller';

const { Router } = require('express');

const emailRouter = Router();

emailRouter.post('/', validate(emailValidation.sendReq), emailController.send);

export default emailRouter;
