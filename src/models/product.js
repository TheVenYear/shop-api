import { model } from 'mongoose';

const Product = model('Product', {
  name: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  images: [String],
  rubric: {
    type: String,
    default: null,
  },
});

export default Product;
