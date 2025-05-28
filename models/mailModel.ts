import { Schema, model, models, Document } from "mongoose";

interface mailInterface extends Document {
  mailid: string;
  email: string;
  senderemail: string;
  body: string;
  subject: string;
  replybody: string;
  replysubject: string;
}

const mailSchema = new Schema<mailInterface>(
  {
    mailid: { type: String, required: true },
    email: { type: String, required: true },
    senderemail: { type: String, required: true },
    body: { type: String, required: true },
    subject: { type: String },
    replybody: { type: String, required: true },
    replysubject: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const mailModel =
  models.Mails || model<mailInterface>("Mails", mailSchema);
