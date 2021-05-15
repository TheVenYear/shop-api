import config from '.';

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
          : 'some_url'
      }/api`,
    },
  ],
  tags: [
    {
      name: 'auth',
      description: 'Всё, что связано с авторизацией',
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
  security: {
    cookieAuth: [],
  },
  paths: {
    '/auth/me': {
      get: {
        tags: ['auth'],
        parameters: [
          {
            name: 'accessToken',
            in: 'cookies',
            type: 'string',
            description: 'токен авторизации',
          },
        ],
        summary: 'Получить данные о текущем пользователе',
        responses: {
          200: {
            description: 'Объект авторизированного пользователя',
          },
          401: {
            description: 'Не удалось проверить личность пользователя',
          },
        },
      },
    },
    '/auth/sign-in': {
      post: {
        tags: ['auth'],
        summary: 'Войти в систему',
        responses: {
          200: {
            description: 'Успешный вход в систему',
            headers: {
              'Set-Cookie': {
                description: 'Куки файлы с сервера',
                schema: {
                  type: 'string',
                },
              },
            },
          },
        },
        requestBody: {
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                properties: {
                  email: {
                    description: 'email пользователя',
                    type: 'string',
                  },
                  password: {
                    type: 'string',
                    description: 'пароль пользователя',
                  },
                },
              },
            },
          },
        },
      },
    },
    '/auth/sign-up': {
      post: {
        tags: ['auth'],
        summary: 'Регистрация пользователя',
        responses: {
          200: {
            description: 'Пользователь успешно создан',
          },
        },
        requestBody: {
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                properties: {
                  email: {
                    description: 'email пользователя',
                    type: 'string',
                  },
                  password: {
                    type: 'string',
                    description: 'пароль пользователя',
                  },
                  avatar: {
                    type: 'string',
                    format: 'binary',
                    description: 'изображение профиля',
                  },
                  nickname: {
                    type: 'string',
                    description: 'ник пользователя',
                  },
                  phone: {
                    type: 'string',
                    description: 'телефон пользователя',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export default swagger;
