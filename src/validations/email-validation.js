import { body } from 'express-validator';

const emailValidation = {
  sendReq: [
    body('products', 'Неверное значение').exists().notEmpty(),
    body('phone').exists().notEmpty().isString(),
    body('name').exists().notEmpty().isString(),
    body('email').optional({ checkFalsy: true }).isEmail(),
  ],
};

export default emailValidation;
