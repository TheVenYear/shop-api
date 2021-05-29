import { Router } from 'express';

import authenticate from '../middlewares/authenticate';
import validate from '../middlewares/validate';
import shopValidation from '../validations/shop-validations';
import shopController from '../controllers/shop-controller';

const shopRouter = Router();

shopRouter.post('/comments', authenticate(), shopController.addComment);

shopRouter.get('/rubrics', shopController.getRubrics);
shopRouter.post(
  '/rubrics',
  authenticate(true),
  validate(shopValidation.rubric),
  shopController.addRubric
);
shopRouter.delete(
  '/rubrics/:rubric',
  authenticate(true),
  shopController.removeRubric
);

shopRouter.get('/products/:id', shopController.getProducts);
shopRouter.get('/products', shopController.getProducts);
shopRouter.post(
  '/products',
  authenticate(true),
  validate(shopValidation.product),
  shopController.addProduct
);
shopRouter.delete(
  '/products/:product',
  authenticate(true),
  shopController.removeProduct
);

shopRouter.get(
  '/specs/:product',
  validate(shopValidation.productInSpecs),
  shopController.getSpecs
);

shopRouter.post(
  '/specs',
  validate(shopValidation.specs),
  authenticate(true),
  shopController.addSpecs
);

export default shopRouter;
