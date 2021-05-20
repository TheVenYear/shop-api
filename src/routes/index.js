import { Router } from 'express';

import authRouter from './auth-router';
import shopRouter from './shop-router';

const routes = Router();

const routers = [
  {
    path: '/auth',
    router: authRouter,
  },
  {
    path: '/shop',
    router: shopRouter,
  },
];

routers.forEach((router) => {
  routes.use(router.path, router.router);
});

export default routes;
