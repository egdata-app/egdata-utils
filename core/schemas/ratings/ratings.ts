import mongoose from 'mongoose';

const ScoreSchema = new mongoose.Schema({
  earnedStars: {
    type: Number,
    required: false,
  },
  totalStars: {
    type: Number,
    required: false,
  },
  score: {
    type: String,
    required: false,
  },
  earnedScore: {
    type: Number,
    required: false,
  },
  totalScore: {
    type: Number,
    required: false,
  },
});

export const ReviewSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  outlet: {
    type: String,
    required: true,
  },
  score: {
    type: ScoreSchema,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

export const RatingsSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  criticAverage: {
    type: Number,
    required: true,
  },
  criticRating: {
    type: String,
    required: true,
  },
  recommendPercentage: {
    type: Number,
    required: true,
  },
  reviews: {
    type: [ReviewSchema],
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

export const Ratings = mongoose.model('Ratings', RatingsSchema);

export type RatingsType = mongoose.InferSchemaType<typeof RatingsSchema>;
