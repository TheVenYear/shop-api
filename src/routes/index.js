import { Router } from 'express';

import authRouter from './auth-router';

const routes = Router();

const routers = [
  {
    path: '/auth',
    router: authRouter,
  },
];

routers.forEach((router) => {
  routes.use(router.path, router.router);
});

export default routes;
