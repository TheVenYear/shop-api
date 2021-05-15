import { body } from 'express-validator';

const email = body('email')
  .exists()
  .bail()
  .notEmpty()
  .withMessage('Поле email - обязательно')
  .isEmail()
  .withMessage('Неверный email');

const password = body('password')
  .isLength({ min: 10 })
  .withMessage('Пароль должен содержать минимум 10 символов');

const phone = body('phone').optional({ checkFalsy: true }).isString();

const nickname = body('nickname').optional({ checkFalsy: true }).isString();

const authValidation = {
  signIn: [email, password],
  update: [
    email.optional({ checkFalsy: true }),
    password.optional({ checkFalsy: true }),
    phone,
    nickname,
  ],
  signUp: [email, password, phone, nickname],
};

export default authValidation;
