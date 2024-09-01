import mongoose from 'mongoose';

export interface IBundles {
  _id: string;
  offers: string[];
}

export const BundlesSchema = new mongoose.Schema<IBundles>({
  _id: { type: String, required: true },
  offers: { type: [String], required: true },
});

export const Bundles = mongoose.model('Bundles', BundlesSchema);
export type BundlesType = mongoose.InferSchemaType<typeof BundlesSchema>;
