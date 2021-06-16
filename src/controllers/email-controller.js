import emailService from '../services/email-service';

const emailController = {
  send: async (req, res, next) => {
    try {
      await emailService.send(req.body);
      return res.sendStatus(200);
    } catch (error) {
      return next(error);
    }
  },
};

export default emailController;
