import HttpException from '../utils/http-exception';

const errorHandler = (err, _req, res, _next) => {
  if (err instanceof HttpException) {
    return res.status(err.status).send({ data: null, errors: err.body });
  }

  return res
    .status(500)
    .send({ data: null, errors: { global: [err.message] } });
};

export default errorHandler;
