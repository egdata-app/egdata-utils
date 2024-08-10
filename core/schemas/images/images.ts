import mongoose from 'mongoose';

export const schema = new mongoose.Schema(
  {
    type: { required: true, type: String },
    url: { required: true, type: String },
    md5: { required: true, type: String },
  },
  { _id: false }
);

export const Image = mongoose.model('Image', schema);
export type ImageType = mongoose.InferSchemaType<typeof schema>;
