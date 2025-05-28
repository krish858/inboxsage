import { Schema, model, models, Document } from "mongoose";

interface chat {
  role: string;
  content: string;
}

interface MessageInterface extends Document {
  Mailid: string;
  message: chat[];
  email: string;
}

const chatSchema = new Schema<chat>(
  {
    role: { type: String, required: true },
    content: { type: String, required: true },
  },
  { _id: false }
);

const messageSchema = new Schema<MessageInterface>(
  {
    Mailid: { type: String, required: true },
    message: { type: [chatSchema], required: true },
    email: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const messageModel =
  models.Messages || model<MessageInterface>("Messages", messageSchema);
