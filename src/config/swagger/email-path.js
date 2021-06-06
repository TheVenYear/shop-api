const emailPath = {
  '/email': {
    post: {
      tags: ['email'],
      description: 'Отправка email всем администраторам',
      summary: 'Отправить email',
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  required: true,
                },
                phone: {
                  type: 'string',
                  required: true,
                },
                email: {
                  type: 'string',
                },
                products: {
                  type: 'array',
                  required: true,
                  items: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Успешная отправка email',
        },
        400: {
          description: 'Ошибка сервeра',
        },
      },
    },
  },
};

export default emailPath;
