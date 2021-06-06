import emailService from '../services/email-service';
import HttpException from '../utils/http-exception';

const emailController = {
  send: async (req, res, next) => {
    try {
      await emailService.send(req.body);
      return res.sendStatus(200);
    } catch (error) {
      return next(new HttpException(error, 400));
    }
  },
};

export default emailController;
