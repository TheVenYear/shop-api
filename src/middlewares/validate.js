import { validationResult } from 'express-validator';
import HttpException from '../utils/http-exception';

const validate = (validations) => async (req, _res, next) => {
  await Promise.all(validations.map((validation) => validation.run(req)));
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const errorsBody = {};
  errors.array().forEach((error) => {
    if (errorsBody[error.param] instanceof Array) {
      errorsBody[error.param].push(error.msg);
    } else {
      errorsBody[error.param] = [error.msg];
    }
  });

  return next(new HttpException(errorsBody, 400));
};

export default validate;
