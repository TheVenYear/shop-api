import config from '.';

const corsSettings = {
  origin:
    config.NODE_ENV === 'production' ? config.HOST : 'http://localhost:8000/',
  credentials: true,
  preflightContinue: true,
};

export default corsSettings;
