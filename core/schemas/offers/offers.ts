import mongoose from 'mongoose';
import { Image } from '@egdata/core.schemas.images';
import { Tags } from '@egdata/core.schemas.tags';

export const schema = new mongoose.Schema({
  _id: { required: true, type: String },
  id: { required: true, type: String },
  namespace: { required: true, type: String },
  title: { required: true, type: String },
  description: { required: true, type: String },
  offerType: String,
  effectiveDate: Date,
  creationDate: Date,
  lastModifiedDate: Date,
  isCodeRedemptionOnly: Boolean,
  keyImages: [Image.schema],
  currentPrice: Number,
  seller: {
    id: String,
    name: String,
  },
  productSlug: { required: false, type: String },
  urlSlug: { required: false, type: String },
  url: { required: false, type: String },
  tags: [Tags.schema],
  items: [
    {
      id: String,
      namespace: String,
    },
  ],
  customAttributes: [
    {
      key: String,
      value: String,
    },
  ],
  categories: [String],
  developerDisplayName: String,
  publisherDisplayName: String,
  prePurchase: { required: false, type: Boolean },
  releaseDate: Date,
  pcReleaseDate: Date,
  viewableDate: Date,
  countriesBlacklist: [String],
  countriesWhitelist: [String],
  refundType: String,
  offerMappings: [
    {
      pageSlug: String,
      pageType: String,
    },
  ],
});

export const Offer = mongoose.model('Offer', schema);

export const OfferStaging = mongoose.model(
  'OfferStaging',
  schema,
  'offers_staging'
);

export type OfferType = mongoose.InferSchemaType<typeof schema>;
