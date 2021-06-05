import nodemailer from 'nodemailer';
import config from '.';

const transporter = nodemailer.createTransport({
  port: config.EMAIL_PORT,
  host: config.EMAIL_HOST,
  auth: {
    user: config.EMAIL_ADDRESS,
    pass: config.EMAIL_PASSWORD,
  },
  secure: true,
});

export default transporter;
