import transporter from '../config/transporter';
import HttpException from '../utils/http-exception';

const emailService = {
  send: async (data) => {
    try {
      let text = `Тема обращения: ${data.subject || 'нет'}\nОписание: ${
        data.description || 'нет'
      }\nИмя: ${data.name}\nТелефон: ${data.phone}\nEmail: ${
        data.email || 'нет'
      }\nСписок продуктов: `;

      if (data.products) {
        text += '\n';
        data.products.forEach((product, index) => {
          text += `${index + 1}: ${product}\n`;
        });
      } else {
        text += 'нет';
      }

      const info = await transporter.sendMail({
        from: 'Open Shop-API mail service',
        to: 'TheVenYear@gmail.com, kodrikgleb2@gmail.com, naumov2301@mail.ru',
        subject: 'Новый заказ',
        text,
      });
      console.log(info);
    } catch (error) {
      throw new HttpException({ global: error.message });
    }
  },
};

export default emailService;
