import transporter from '../config/transporter';

const emailService = {
  send: async (data) => {
    let text = `Имя: ${data.name}\nТелефон: ${data.phone}\nEmail: ${
      data.email || 'нет'
    }\nСписок продуктов:\n`;
    data.products.forEach((product, index) => {
      text += `${index + 1}: ${product}\n`;
    });
    const info = await transporter.sendMail({
      from: 'Open Shop-API mail service',
      to: 'TheVenYear@gmail.com, kodrikgleb2@gmail.com, naumov2301@mail.ru',
      subject: 'Новый заказ',
      text,
    });
    console.log(info);
  },
};

export default emailService;
