import mongoose from 'mongoose';

export interface IHltb {
  /**
   * Sandbox ID of the game
   */
  _id: string;
  /**
   * ID of the game in HowLongToBeat
   */
  hltbId: string;
  gameTimes:
    | {
        category: string;
        time: string;
      }[]
    | null;
  detailedTimes:
    | {
        type: string;
        average: string;
        median: string;
        rushed: string;
        leisure: string;
      }[]
    | null;
  created: Date;
  updated: Date;
}

export const HltbSchema = new mongoose.Schema<IHltb>({
  _id: { type: String, required: true },
  hltbId: { type: String, required: true },
  gameTimes: {
    type: [
      {
        category: { type: String, required: true },
        time: { type: String, required: true },
      },
    ],
    required: false,
  },
  detailedTimes: {
    type: [
      {
        type: { type: String, required: true },
        average: { type: String, required: true },
        median: { type: String, required: true },
        rushed: { type: String, required: true },
        leisure: { type: String, required: true },
      },
    ],
    required: false,
  },
  created: { type: Date, required: true, default: Date.now },
  updated: { type: Date, required: true, default: Date.now },
});

export const Hltb = mongoose.model(
  'Hltb',
  HltbSchema
);
export type HltbType = mongoose.InferSchemaType<typeof HltbSchema>;
