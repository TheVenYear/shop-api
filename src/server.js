import { connect } from 'mongoose';

import app from './app';
import config from './config';

const server = async () => {
  await connect(config.DATABASE_URL, {
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  app.listen(config.PORT, () => {
    console.log(`Server is running on ${config.PORT}`);
  });
};

server();
