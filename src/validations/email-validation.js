import { body } from 'express-validator';

const emailValidation = {
  sendReq: [
    body('products', 'Неверное значение').notEmpty().optional(),
    body('phone').exists().notEmpty().isString(),
    body('name').exists().notEmpty().isString(),
    body('email').optional({ checkFalsy: true }).isEmail(),
  ],
};

export default emailValidation;
