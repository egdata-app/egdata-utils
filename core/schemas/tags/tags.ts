import mongoose from 'mongoose';

// for offer schema - needs to be revoked to be just an array of tagIds
export const Tags =
  mongoose.models.Tags ||
  mongoose.model(
    'Tags',
    new mongoose.Schema(
      {
        id: String,
        name: String,
      },
      { _id: false }
    )
  );

const TagSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  namespace: { type: String, required: false },
  aliases: { type: [String], required: true },
  status: { type: String, required: true },
  created: { type: Date, required: false }, // old tags dont have a created field
  updated: { type: Date, required: true },
  referenceCount: { type: Number, required: false },
  comment: { type: String, required: false }, // tags may have a dev comment
  groupId: { type: String, required: false },
  groupName: { type: String, required: false },
});

export const TagModel = mongoose.model('Tag', TagSchema);

export type TagType = mongoose.InferSchemaType<typeof TagSchema>;
