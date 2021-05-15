import { body } from 'express-validator';

const requiredMessage = 'Обязательное поле';
const shopValidation = {
  product: [
    body('name', requiredMessage).exists().notEmpty(),
    body('description', requiredMessage).exists().notEmpty(),
    body('shortDescription', requiredMessage).exists().notEmpty(),
    body('price', requiredMessage)
      .exists()
      .notEmpty()
      .isNumeric()
      .withMessage('Поле должно быть числом'),
  ],
  rubric: [
    body('name', requiredMessage)
      .exists()
      .notEmpty()
      .isString()
      .withMessage('Неверное поле'),
    body('url', requiredMessage)
      .exists()
      .notEmpty()
      .isString()
      .withMessage('Неверное поле'),
  ],
};

export default shopValidation;
