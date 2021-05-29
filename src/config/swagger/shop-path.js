const shopPath = {
  '/shop/comments': {
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
  '/shop/rubrics/{rubric}': {
    delete: {
      tags: ['shop'],
      summary: 'Удаление категории',
      parameters: [
        {
          in: 'path',
          name: 'rubric',
          description: 'id категории',
        },
      ],
      responses: {
        200: {
          description: 'Успешно удалено',
        },
        401: {
          description: 'Не авторизирован',
        },
        500: {
          description: 'Внутренняя ошибка сервера',
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
          type: 'string',
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
    delete: {
      tags: ['shop'],
      summary: 'Удалить продукт',
      parameters: [
        {
          in: 'path',
          name: 'id',
          type: 'string',
        },
      ],
      responses: {
        200: {
          description: 'Продукт успешно удалён',
        },
        500: {
          description: 'Внутренняя ошибка сервера',
        },
        401: {
          description: 'Не авторизирован',
        },
      },
    },
  },
  '/shop/products': {
    get: {
      tags: ['shop'],
      summary: 'Получить продукт(ы)',
      parameters: [
        {
          name: 'rubricId',
          description: 'id категории',
          in: 'query',
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
                  description: 'Название',
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
                  description: 'Цена',
                },
                rubric: {
                  type: 'string',
                  description: 'Категория',
                },
                images: {
                  type: 'array',
                  items: {
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
  },
  '/shop/specs/{product}': {
    get: {
      tags: ['shop'],
      summary: 'Получить категории',
      parameters: [
        {
          name: 'product',
          description: 'id продукта',
          in: 'path',
        },
      ],
      responses: {
        200: {
          description: 'Получение категорий',
        },
        400: {
          description: 'Продукт не найден',
        },
        500: {
          description: 'Внутренняя ошибка сервера',
        },
      },
    },
  },
  '/shop/specs': {
    post: {
      summary: 'Добавить характеристику',
      tags: ['shop'],
      responses: {
        200: {
          description: 'характеристика успешно добавлена',
        },
        400: {
          description: 'Не удалось найти продукт',
        },
        401: {
          description: 'Не авторизирован',
        },
      },
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                product: {
                  type: 'string',
                  required: true,
                },
                specs: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      key: {
                        type: 'string',
                      },
                      value: {
                        type: 'string',
                      },
                    },
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

export default shopPath;
