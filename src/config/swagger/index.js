import config from '..';
import authPath from './auth-path';
import emailPath from './email-path';
import productsPath from './shop-path';

const swagger = {
  openapi: '3.0.0',
  info: {
    description: 'Общая API для интернет-магазинов',
    version: '1.0.0',
    title: 'Shop API',
  },
  servers: [
    {
      url: `${
        config.NODE_ENV === 'development'
          ? `http://localhost:${config.PORT}`
          : config.HOST
      }/api`,
    },
  ],
  tags: [
    {
      name: 'auth',
      description: 'Всё, что связано с авторизацией',
    },
    {
      name: 'shop',
      description: 'Всё, что связано с магазином',
    },
    {
      name: 'email',
      description: 'Отправка email',
    },
  ],
  components: {
    securitySchemes: {
      cookieAuth: {
        type: 'apiKey',
        in: 'cookie',
        name: 'accessToken',
      },
    },
  },
  paths: {
    ...authPath,
    ...productsPath,
    ...emailPath,
  },
};

export default swagger;
