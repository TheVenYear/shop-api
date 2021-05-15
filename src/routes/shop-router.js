import { Router } from 'express';

import authenticate from '../middlewares/authenticate';
import validate from '../middlewares/validate';
import shopValidation from '../validations/shop-validations';
import shopController from '../controllers/shop-controller';

const shopRouter = Router();

shopRouter.post(
  '/add-product',
  authenticate(true),
  validate(shopValidation.product),
  shopController.addProduct
);
shopRouter.post('/add-comment', authenticate(), shopController.addComment);
shopRouter.get('/rubrics', shopController.getRubrics);
shopRouter.post(
  '/rubrics',
  authenticate(true),
  validate(shopValidation.rubric),
  shopController.addRubric
);

shopRouter.get('/products/:id', shopController.getProducts);
shopRouter.get('/products', shopController.getProducts);

export default shopRouter;
