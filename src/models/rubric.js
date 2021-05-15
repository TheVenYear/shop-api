import { model } from 'mongoose';

const Rubric = model('Rubric', {
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
});

export default Rubric;
