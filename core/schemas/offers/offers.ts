import mongoose from 'mongoose';
import { Image } from '@egdata/core.schemas.images';
import { Tags } from '@egdata/core.schemas.tags';

const itemSchema = new mongoose.Schema({
  id: { required: true, type: String },
  namespace: { required: true, type: String },
}, { _id: false });

const sellerSchema = new mongoose.Schema({
  id: { required: true, type: String },
  name: { required: true, type: String },
}, { _id: false });

const offerMappingSchema = new mongoose.Schema({
  pageSlug: { required: true, type: String },
  pageType: { required: true, type: String },
}, { _id: false });

const customAttributeSchema = new mongoose.Schema({
  key: { required: true, type: String },
  value: { required: false, type: String },
}, { _id: false });

export const schema = new mongoose.Schema({
  _id: { required: true, type: String },
  id: { required: true, type: String },
  namespace: { required: true, type: String },
  title: { required: true, type: String },
  description: { required: true, type: String },
  longDescription: { required: false, type: String },
  offerType: String,
  effectiveDate: Date,
  creationDate: Date,
  lastModifiedDate: Date,
  isCodeRedemptionOnly: Boolean,
  keyImages: [Image.schema],
  currentPrice: Number,
  seller: sellerSchema,
  productSlug: { required: false, type: String },
  urlSlug: { required: false, type: String },
  url: { required: false, type: String },
  tags: [Tags.schema],
  items: [itemSchema],
  customAttributes: [customAttributeSchema],
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
  offerMappings: [offerMappingSchema],
});

export const Offer = mongoose.model('Offer', schema);

export const OfferStaging = mongoose.model(
  'OfferStaging',
  schema,
  'offers_staging'
);

export type OfferType = mongoose.InferSchemaType<typeof schema>;
