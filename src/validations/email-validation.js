import { body } from 'express-validator';

const emailValidation = {
  sendReq: [
    body('products', 'Неверное значение')
      .notEmpty()
      .optional({ checkFalsy: true }),
    body('phone').exists().notEmpty().isString().optional({ checkFalsy: true }),
    body('name').exists().notEmpty().isString(),
    body('subject').exists().notEmpty().optional({ checkFalsy: true }),
    body('description').exists().notEmpty.optional({ checkFalsy: true }),
    body('email').isEmail().optional({ checkFalsy: true }),
  ],
};

export default emailValidation;
