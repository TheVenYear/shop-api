import config from '.';

const whitelist = [
  'http://localhost:3000',
  'https://glendi123.github.io',
  config.NODE_ENV === 'production'
    ? config.HOST
    : `http://localhost:8000:${config.PORT}`,
];

const corsSettings = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Заблокировано политикой CORS'));
    }
  },
  credentials: true,
  preflightContinue: true,
};

export default corsSettings;
