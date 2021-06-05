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
                products: {
                  type: 'array',
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
