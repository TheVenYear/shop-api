import { model, Schema } from 'mongoose';

const RefreshToken = model(
  'RefreshToken',
  new Schema({
    value: {
      type: String,
      required: true,
    },
  })
);

export default RefreshToken;
