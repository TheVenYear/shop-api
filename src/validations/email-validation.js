import { body } from 'express-validator';

const emailValidation = {
  sendReq: [body('products', 'Неверное значение').exists().notEmpty()],
};

export default emailValidation;
