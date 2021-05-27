import { model, Schema } from 'mongoose';

const Comment = model(
  'Comment',
  new Schema({
    text: {
      type: String,
      required: true,
    },
    advantages: {
      type: String,
      required: true,
    },
    minuses: {
      type: String,
      required: true,
    },
    postedAt: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    rating: {
      type: Number,
      default: 0,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
  })
);

export default Comment;
