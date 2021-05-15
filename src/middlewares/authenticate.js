import jwt, { TokenExpiredError } from 'jsonwebtoken';
import StatusCodes from 'http-status-codes';

import config from '../config';
import HttpException from '../utils/http-exception';
import User from '../models/user';

const authenticate =
  (onlyAdmin = false) =>
  async (req, _res, next) => {
    try {
      const { _id } = jwt.verify(req.cookies.accessToken, config.ACCESS_SECRET);

      const user = await User.findById(_id);

      if (!user) {
        req.user = undefined;
        return next(new HttpException({ global: 'Пользователь был удалён' }));
      }

      if (onlyAdmin && user.status !== 'admin') {
        req.user = undefined;
        return next(
          new HttpException(
            {
              global: ['Эта страница только для администраторов'],
            },
            StatusCodes.FORBIDDEN
          )
        );
      }

      req.user = { _id: user._id, email: user.email, status: user.status };
      return next();
    } catch (error) {
      let { message } = error.message;

      if (error instanceof TokenExpiredError) {
        message = 'Время сессии истекло';
      }

      return next(
        new HttpException(
          {
            global: [message],
          },
          StatusCodes.UNAUTHORIZED
        )
      );
    }
  };

export default authenticate;
