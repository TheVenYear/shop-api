import transporter from '../config/transporter';

const emailService = {
  send: async (data) => {
    let text = `email: ${data.email}\nСписок продуктов:\n`;
    data.products.forEach((product, index) => {
      text += `${index + 1}: ${product}\n`;
    });
    const info = await transporter.sendMail({
      from: 'Open Shop-API mail service',
      to: 'TheVenYear@gmail.com, kodrikgleb2@gmail.com',
      subject: 'Новый заказ',
      text,
    });
    console.log(info);
  },
};

export default emailService;
