import { model, Schema } from 'mongoose';

const Spec = model(
  'Spec',
  new Schema({
    key: String,
    value: String,
  })
);

export default Spec;
