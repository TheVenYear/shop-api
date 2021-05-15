const shopPath = {
  '/shop/add-product': {
    post: {
      summary: 'Добавить продукт',
      tags: ['shop'],
      responses: {
        200: {
          description: 'Продукт успешно добавлен',
        },
        400: {
          description: 'Не удалось добавить продукт',
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
                name: {
                  type: 'string',
                  required: true,
                  description: 'название',
                },
                shortDescription: {
                  type: 'string',
                  required: true,
                  description: 'Короткое описание',
                },
                description: {
                  type: 'string',
                  required: true,
                  description: 'Описание',
                },
                price: {
                  type: 'number',
                  required: true,
                  description: 'цена',
                },
              },
            },
          },
        },
      },
    },
  },
  '/shop/add-comment': {
    post: {
      summary: 'Добавить отзыв',
      tags: ['shop'],
      responses: {
        200: {
          description: 'Отзыв успешно добавлен',
        },
        400: {
          description: 'Не удалось добавить отзыв',
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
                text: {
                  type: 'string',
                  required: true,
                },
                advantages: {
                  type: 'string',
                  required: true,
                },
                minuses: {
                  type: 'string',
                  required: true,
                },
                rating: {
                  type: 'number',
                  default: 0,
                  required: true,
                },
                product: {
                  type: 'string',
                  required: true,
                },
              },
            },
          },
        },
      },
    },
  },
  '/shop/rubrics': {
    get: {
      tags: ['shop'],
      summary: 'Получить категории',
      responses: {
        200: {
          description: 'Получение категорий',
        },
        500: {
          description: 'Внутренняя ошибка сервера',
        },
      },
    },
    post: {
      summary: 'Добавить категорию',
      tags: ['shop'],
      responses: {
        200: {
          description: 'Категория успешно добавлена',
        },
        400: {
          description: 'Не удалось добавить категорию',
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
                name: {
                  type: 'string',
                  required: true,
                },
                url: {
                  type: 'string',
                  required: true,
                },
                image: {
                  type: 'string',
                  format: 'binary',
                },
              },
            },
          },
        },
      },
    },
  },
  '/shop/products/{id}': {
    get: {
      tags: ['shop'],
      summary: 'Получить продукт(ы)',
      parameters: [
        {
          in: 'path',
          name: 'id',
          type: 'integer',
        },
      ],
      responses: {
        200: {
          description: 'Получение продуктов',
        },
        500: {
          description: 'Внутренняя ошибка сервера',
        },
      },
    },
  },
  '/shop/products/': {
    get: {
      tags: ['shop'],
      summary: 'Получить продукт(ы)',
      responses: {
        200: {
          description: 'Получение продуктов',
        },
        500: {
          description: 'Внутренняя ошибка сервера',
        },
      },
    },
  },
};

export default shopPath;
