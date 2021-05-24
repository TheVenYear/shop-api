import { Router } from 'express';
import yadiskService from '../services/yadisk-service';

const mediaRouter = Router();

mediaRouter.get('/:image', async (req, res) => {
  const response = await yadiskService.get(req.params.image);
  const img = Buffer.from(response.data, 'base64');
  return res.set('Content-Type', response.headers['Content-Type']).send(img);
});

export default mediaRouter;
