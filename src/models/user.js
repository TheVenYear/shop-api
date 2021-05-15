import { model, Schema } from 'mongoose';

const User = model(
  'User',
  new Schema({
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },

    profile: {
      avatar: {
        type: String,
        default: null,
      },
      phone: {
        type: String,
        default: null,
      },
      nickname: {
        type: String,
        default: null,
      },
    },
  })
);

export default User;
