import jwt, { TokenExpiredError } from 'jsonwebtoken';
import StatusCodes from 'http-status-codes';

import config from '../config';
import authService from '../services/auth-service';
import User from '../models/user';
import RefreshToken from '../models/refresh-token';

const authController = {
  signUp: async (req, res, next) => {
    console.log(req.body);
    try {
      const user = await authService.registerUser({
        ...req.body,
        avatar: req.files?.avatar,
      });

      return res.send({ data: user, errors: [] });
    } catch (error) {
      return next(error);
    }
  },

  signIn: (refreshUrl, logoutUrl) => async (req, res, next) => {
    const mapUrl = (url) => {
      const urlTo = req.originalUrl.split('/');
      urlTo.pop();
      return urlTo.join('/') + url;
    };

    const refreshUrlTo = mapUrl(refreshUrl);
    const logoutUrlTo = mapUrl(logoutUrl);

    try {
      const user = await authService.loginUser(req.body);
      const refreshToken = await authService.createRefresh(user);
      const accessToken = authService.createAccess(refreshToken);
      return res
        .cookie('refreshToken', refreshToken, {
          path: refreshUrlTo,
          httpOnly: true,
          sameSite: 'none',
        })
        .cookie('refreshToken', refreshToken, {
          path: logoutUrlTo,
          httpOnly: true,
          sameSite: 'none',
        })
        .cookie('accessToken', accessToken, {
          httpOnly: true,
          sameSite: 'none',
        })
        .send({ data: user, errors: [] });
    } catch (error) {
      return next(error);
    }
  },

  logout: async (req, res) => {
    authService.deleteRefresh(req.cookies.refreshToken);
    return res
      .cookie('accessToken', '', { httpOnly: true, sameSite: 'none' })
      .send({ data: null, errors: [] });
  },

  refresh: async (req, res) => {
    try {
      const refreshToken = await authService.validateRefresh(
        req.cookies.refreshToken
      );
      const token = authService.createAccess(refreshToken);
      const user = jwt.verify(token, config.ACCESS_SECRET);
      return res
        .cookie('accessToken', token, { httpOnly: true, sameSite: 'none' })
        .send({ data: user || null, errors: [] });
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        await RefreshToken.findOneAndDelete({
          value: req.cookies.refreshToken,
        });
      }
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .send({ data: null, errors: [{ global: error.message }] });
    }
  },

  me: async (req, res) => {
    const user = await User.findOne({ _id: req.user._id });
    return res.send({ data: user, errors: [] });
  },

  changeProfile: async (req, res) => {
    try {
      const user = await authService.changeUser(req.user._id, {
        ...req.body,
        avatar: req.files?.avatar,
      });
      return res.send({ data: user, errors: [] });
    } catch (error) {
      return res.send({
        data: null,
        errors: [{ [error.param || 'global']: error.message }],
      });
    }
  },
};

export default authController;
