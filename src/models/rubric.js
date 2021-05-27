import { model, Schema } from 'mongoose';

const Rubric = model(
  'Rubric',
  new Schema({
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  })
);

export default Rubric;
