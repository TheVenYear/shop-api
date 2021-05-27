const authPath = {
  '/auth/me': {
    get: {
      tags: ['auth'],
      security: {
        cookieAuth: [],
      },
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
  '/auth/change-profile': {
    post: {
      tags: ['auth'],
      summary: 'Изменение профиля пользователя',
      responses: {
        200: {
          description: 'Пользователь успешно изменён',
        },
        400: {
          description: 'Не валидные поля',
        },
        401: {
          description: 'Не авторизирован',
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
  '/auth/refresh': {
    get: {
      tags: ['auth'],
      parameters: [
        {
          name: 'refreshToken',
          in: 'cookies',
          type: 'string',
          description: 'токен обновления авторизации',
        },
      ],
      summary: 'Получить новый refreshToken',
      responses: {
        200: {
          description: 'Запись нового токена в куку',
          headers: {
            'Set-Cookie': {
              type: 'string',
              description: 'новая кука',
            },
          },
        },
        401: {
          description: 'refreshToken не валиден или истек',
        },
      },
    },
  },
};

export default authPath;
