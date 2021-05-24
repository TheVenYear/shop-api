import { Router } from 'express';

import authRouter from './auth-router';
import shopRouter from './shop-router';
import mediaRouter from './media-router';

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
  {
    path: '/media',
    router: mediaRouter,
  },
];

routers.forEach((router) => {
  routes.use(router.path, router.router);
});

export default routes;
