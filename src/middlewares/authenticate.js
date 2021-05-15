import jwt, { TokenExpiredError } from 'jsonwebtoken';
import StatusCodes from 'http-status-codes';

import config from '../config';
import HttpException from '../utils/http-exception';

const authenticate =
  (onlyAdmin = false) =>
  (req, res, next) => {
    try {
      const { _id, email, status } = jwt.verify(
        req.cookies.accessToken,
        config.ACCESS_SECRET
      );

      if (onlyAdmin && status === 'admin') {
        next(
          new HttpException(
            {
              global: ['Эта страница только для администраторов'],
            },
            StatusCodes.FORBIDDEN
          )
        );
      }

      req.user = { _id, email, status };
      return next();
    } catch (error) {
      let { message } = error.message;

      if (error instanceof TokenExpiredError) {
        message = 'Эта страница только для авторизированных пользователей';
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
