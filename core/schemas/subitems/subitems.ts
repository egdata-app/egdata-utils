import { Schema, model } from 'mongoose';

interface IOfferSubItems {
  _id: string; // offer ID
  namespace: string;
  subItems: Array<{
    id: string;
    namespace: string;
    releaseInfo: Array<{
      platform: string[];
      appId: string;
    }>;
  }>;
  updatedAt: Date;
}

const OfferSubItemsSchema = new Schema<IOfferSubItems>({
  _id: String,
  namespace: { type: String, required: true },
  subItems: [
    {
      id: String,
      namespace: String,
      releaseInfo: [
        {
          platform: [String],
          appId: String,
        },
      ],
    },
  ],
  updatedAt: { type: Date, default: Date.now },
});

export const OfferSubItems = model<IOfferSubItems>(
  'OfferSubItems',
  OfferSubItemsSchema
);
