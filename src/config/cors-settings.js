import config from '.';

const corsSettings = {
  origin:
    config.NODE_ENV === 'production'
      ? 'https://glendi123.github.io/'
      : 'http://localhost:8000/',
  credentials: true,
  preflightContinue: true,
};

export default corsSettings;
