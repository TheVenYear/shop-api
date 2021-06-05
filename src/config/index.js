import { cleanEnv, num, str } from 'envalid';
import 'dotenv/config';

const config = cleanEnv(process.env, {
  PORT: num({ default: 8000 }),
  DATABASE_URL: str(),
  REFRESH_SECRET: str(),
  REFRESH_EXPIRES_IN: str(),
  ACCESS_SECRET: str(),
  ACCESS_EXPIRES_IN: str(),
  YANDEX_KEY: str(),
  NODE_ENV: str({ default: 'development' }),
  HOST: str({ default: 'some_url' }),
  EMAIL_PORT: num({ default: 465 }),
  EMAIL_ADDRESS: str(),
  EMAIL_PASSWORD: str(),
  EMAIL_HOST: str(),
});

export default config;
