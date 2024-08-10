import mongoose from 'mongoose';
import { Image } from '@egdata/core.schemas.images';

const CustomAttributeSchema = new mongoose.Schema(
  {
    key: { type: String, required: true },
    type: { type: String, required: true },
    value: { type: String, required: true },
  },
  { _id: false }
);

const ItemSchema = new mongoose.Schema({
  _id: { required: true, type: String },
  id: { required: true, type: String },
  namespace: { required: true, type: String },
  title: { required: true, type: String },
  description: { required: true, type: String },
  keyImages: [Image.schema],
  categories: [{ path: String }],
  status: { required: true, type: String },
  creationDate: { required: true, type: Date },
  lastModifiedDate: { required: true, type: Date },
  customAttributes: { type: [CustomAttributeSchema] },
  entitlementName: { required: true, type: String },
  entitlementType: { required: true, type: String },
  itemType: { required: true, type: String },
  releaseInfo: [{ id: String, appId: String, platform: [String] }],
  developer: { required: false, type: String },
  developerId: { required: false, type: String },
  eulaIds: [String],
  installModes: [String],
  endOfSupport: { required: true, type: Boolean },
  selfRefundable: { type: Boolean },
  applicationId: { type: String },
  unsearchable: { required: true, type: Boolean },
  requiresSecureAccount: { type: Boolean },
  entitlementEndDate: { type: Date },
  useCount: { type: Number },
  entitlementStartDate: { type: Date },
  longDescription: { type: String },
  technicalDetails: { type: String },
  linkedOffers: { required: true, type: [String] },
});

export const Item = mongoose.model('Item', ItemSchema);
export type ItemType = mongoose.InferSchemaType<typeof ItemSchema>;
