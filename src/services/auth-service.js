import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import config from '../config';
import RefreshToken from '../models/refresh-token';
import User from '../models/user';
import HttpException from '../utils/http-exception';
import yadiskService from './yadisk-service';

const changeUserData = async ({ email, password, nickname, phone, avatar }) => {
  const salt = await bcrypt.genSalt(9);
  let data = {
    email,
    password: password ? await bcrypt.hash(password, salt) : undefined,
    profile: { nickname, phone },
  };

  if (avatar) {
    data = {
      ...data,
      profile: {
        ...data.profile,
        avatar: await yadiskService.upload(avatar),
      },
    };
  }

  return data;
};

const authService = {
  registerUser: async (values) => {
    const existingUser = await User.findOne({ email: values.email });

    if (existingUser) {
      throw new HttpException({ email: ['Такой email уже существует'] });
    }

    const data = await changeUserData(values);

    const user = new User(data);

    await user.save();

    return user.toObject();
  },

  changeUser: async (id, values) => {
    if (values.email && (await User.findOne({ email: values.email }))) {
      throw new HttpException({
        email: ['Такой email уже существует'],
      });
    }
    const data = await changeUserData(values);
    const user = await User.findById(id);
    const response = await user.update(data, { omitUndefined: true });
    return response;
  },

  loginUser: async ({ email, password }) => {
    const user = await User.findOne({ email });
    const error = new HttpException({ global: ['Неверный email или пароль'] });

    if (!user) {
      throw error;
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!user || !isPasswordCorrect) {
      throw error;
    }

    const result = user.toObject();

    delete result.password;

    return result;
  },

  createRefresh: async ({ _id, email, status }) => {
    const token = jwt.sign({ _id, email, status }, config.REFRESH_SECRET, {
      expiresIn: config.REFRESH_EXPIRES_IN,
    });

    const refreshToken = new RefreshToken({ value: token });

    await refreshToken.save();

    return refreshToken.toObject().value;
  },

  deleteRefresh: async (value) => {
    await RefreshToken.deleteOne({ value });
  },

  validateRefresh: async (token) => {
    jwt.verify(token, config.REFRESH_SECRET);

    const refreshToken = await RefreshToken.findOne({ value: token });

    if (!refreshToken) {
      throw new Error('invalid token');
    }

    return token;
  },

  createAccess: (refreshToken) => {
    const { _id, email, status } = jwt.verify(
      refreshToken,
      config.REFRESH_SECRET
    );
    const token = jwt.sign({ _id, email, status }, config.ACCESS_SECRET, {
      expiresIn: config.ACCESS_EXPIRES_IN,
    });
    return token;
  },
};

export default authService;
