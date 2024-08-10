import mongoose, { Schema, Document } from 'mongoose';

// Define TypeScript interfaces for the schemas
interface IOfferPrice extends Document {
  currencyCode: string;
  discount: number;
  discountPrice?: number;
  originalPrice?: number;
  basePayoutCurrencyCode: string;
  basePayoutPrice?: number;
  payoutCurrencyExchangeRate?: number;
}

interface IDiscountSetting extends Document {
  discountType: string;
  discountValue?: number;
  discountPercentage?: number;
}

interface IPromotionSetting extends Document {
  promotionType: string;
  discountOffers?: Array<{ offerId: string }>;
}

interface IAppliedRules extends Document {
  id: string;
  name: string;
  namespace: string;
  promotionStatus?: string;
  startDate?: Date;
  endDate?: Date;
  saleType?: string;
  regionIds?: string[];
  discountSetting?: IDiscountSetting;
  promotionSetting?: IPromotionSetting;
}

interface IPriceEngine extends Document {
  country: string;
  region: string;
  namespace: string;
  offerId: string;
  price: IOfferPrice;
  appliedRules: IAppliedRules[];
  updatedAt: Date;
}

// Define the Mongoose schemas
const offerPriceSchema = new Schema<IOfferPrice>({
  currencyCode: { required: true, type: String },
  discount: { required: true, type: Number },
  discountPrice: { required: false, type: Number },
  originalPrice: { required: false, type: Number },
  basePayoutCurrencyCode: { required: true, type: String },
  basePayoutPrice: { required: false, type: Number },
  payoutCurrencyExchangeRate: { required: false, type: Number },
});

const discountSettingSchema = new Schema<IDiscountSetting>({
  discountType: { required: true, type: String },
  discountValue: { required: false, type: Number },
  discountPercentage: { required: false, type: Number },
});

const promotionSettingSchema = new Schema<IPromotionSetting>({
  promotionType: { required: true, type: String },
  discountOffers: {
    required: false,
    type: [
      {
        offerId: { required: true, type: String },
      },
    ],
  },
});

const appliedRulesSchema = new Schema<IAppliedRules>({
  id: { required: true, type: String },
  name: { required: true, type: String },
  namespace: { required: true, type: String },
  promotionStatus: { required: false, type: String },
  startDate: { required: false, type: Date },
  endDate: { required: false, type: Date },
  saleType: { required: false, type: String },
  regionIds: { required: false, type: [String] },
  discountSetting: { required: false, type: discountSettingSchema },
  promotionSetting: { required: false, type: promotionSettingSchema },
});

const priceEngineSchema = new Schema<IPriceEngine>({
  country: { required: true, type: String },
  region: { required: true, type: String },
  namespace: { required: true, type: String },
  offerId: { required: true, type: String },
  price: { required: true, type: offerPriceSchema },
  appliedRules: { required: true, type: [appliedRulesSchema] },
  updatedAt: { required: true, type: Date, default: Date.now },
});

// Define the models with the appropriate interfaces
export const PriceEngine = mongoose.model<IPriceEngine>(
  'PriceEngine',
  priceEngineSchema,
  'pricev2'
);
export const PriceEngineHistorical = mongoose.model<IPriceEngine>(
  'PriceEngineHistorical',
  priceEngineSchema,
  'pricev2_historical'
);

// Export the TypeScript type for use elsewhere
export type PriceEngineType = IPriceEngine;
