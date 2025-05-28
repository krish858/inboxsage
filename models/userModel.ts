import { Schema, model, models, Document } from "mongoose";

export enum Tier {
  FREE = "free",
  PAID = "paid",
}

interface UserInterface extends Document {
  name: string;
  email: string;
  prompt: string;
  tier: Tier;
}

const userSchema = new Schema<UserInterface>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  prompt: { type: String, default: " " },
  tier: {
    type: String,
    enum: Object.values(Tier),
    default: Tier.FREE,
  },
});

export const userModel =
  models.Users || model<UserInterface>("Users", userSchema);
