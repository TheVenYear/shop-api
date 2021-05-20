import Product from '../models/product';
import Comment from '../models/comment';
import shopService from '../services/shop-service';
import Rubric from '../models/rubric';

const shopController = {
  addProduct: async (req, res, next) => {
    const product = new Product(req.body);
    try {
      await product.save();
      return res.send({ data: product, errors: null });
    } catch (error) {
      return next(error);
    }
  },
  addComment: async (req, res, next) => {
    const comment = new Comment({ ...req.body, user: req.user._id });
    try {
      await comment.save();
      return res.send({ data: comment, errors: null });
    } catch (error) {
      return next(error);
    }
  },
  addRubric: async (req, res, next) => {
    try {
      const rubric = await shopService.addRubric({
        ...req.body,
        image: req.files?.image,
      });
      return res.send({ data: rubric, errors: null });
    } catch (error) {
      return next(error);
    }
  },
  getProducts: async (req, res, next) => {
    try {
      if (req.params.id) {
        const product = await Product.findById(req.params.id);
        return res.send({ data: product, errors: null });
      }
      const products = await Product.find(
        {},
        'name price shortDescription images'
      );
      return res.send({ data: products, errors: null });
    } catch (error) {
      return next(error);
    }
  },
  getRubrics: async (_req, res, next) => {
    try {
      const rubrics = await Rubric.find({});
      return res.send({ data: rubrics, errors: null });
    } catch (error) {
      return next(error);
    }
  },
};

export default shopController;
