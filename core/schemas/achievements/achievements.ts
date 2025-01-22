import mongoose from 'mongoose';

export const Achievement = new mongoose.Schema(
  {
    deploymentId: { required: true, type: String },
    name: { required: true, type: String },
    flavorText: { required: false, type: String },
    hidden: { required: true, type: Boolean },

    unlockedDisplayName: { required: false, type: String },
    unlockedDescription: { required: false, type: String },
    unlockedIconId: { required: false, type: String },
    unlockedIconLink: { required: false, type: String },

    lockedDisplayName: { required: false, type: String },
    lockedDescription: { required: false, type: String },
    lockedIconId: { required: false, type: String },
    lockedIconLink: { required: false, type: String },

    xp: { required: true, type: Number },
    completedPercent: { required: true, type: Number }, // rarity.percent (0.0 - 100.0)
  },
  { _id: false }
);

const schema = new mongoose.Schema(
  {
    _id: { required: true, type: String },
    productId: { required: true, type: String },
    sandboxId: { required: true, type: String },
    achievementSetId: { required: true, type: String },
    isBase: { required: true, type: Boolean },
    numProgressed: { required: false, type: Number },
    numCompleted: { required: false, type: Number },
    achievements: [Achievement],
  },
  { _id: false }
);

export const AchievementSet = mongoose.model('AchievementSet', schema);
