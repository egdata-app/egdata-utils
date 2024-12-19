import mongoose from 'mongoose';

const GamePositionSchema = new mongoose.Schema({
  collectionId: {
    type: String,
    required: true,
    index: true,
  },
  offerId: {
    type: String,
    required: true,
    index: true,
  },
  position: {
    type: Number,
    required: true,
  },
  timesInTop1: {
    type: Number,
    default: 0,
  },
  timesInTop5: {
    type: Number,
    default: 0,
  },
  timesInTop10: {
    type: Number,
    default: 0,
  },
  timesInTop20: {
    type: Number,
    default: 0,
  },
  timesInTop50: {
    type: Number,
    default: 0,
  },
  timesInTop100: {
    type: Number,
    default: 0,
  },
  previous: {
    type: Number,
    default: null,
  },
  positions: [{
    date: {
      type: Date,
      required: true,
    },
    position: {
      type: Number,
      required: true,
    }
  }],
  lastUpdated: {
    type: Date,
    required: true,
  }
});

// Schema for collections metadata
const CollectionsSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  addedAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
  postDate: {
    type: Date,
    required: true,
  },
});


// Export models
export const GamePosition = mongoose.model('GamePosition', GamePositionSchema, 'game_positions');
export const Collection = mongoose.model('Collection', CollectionsSchema, 'collections_v2');

// Export types
export type GamePositionType = mongoose.InferSchemaType<typeof GamePositionSchema>;
export type CollectionType = mongoose.InferSchemaType<typeof CollectionsSchema>;

// Type for position history entries
export interface PositionEntry {
  date: Date;
  position: number;
}