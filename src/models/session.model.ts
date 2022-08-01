import mongoose from "mongoose";
import { UserDocument } from "./user.model";

export interface SessionDocument extends mongoose.Document {
  user: UserDocument["_id"];
  valid: boolean;
  userAgent: string;
  craetedAt: Date;
  updatedAt: Date;
}

const sessionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    valid: { type: Boolean, required: true, default: true },
    userAgent: { type: String },
  },
  {
    timestamps: true,
  }
);

const Session = mongoose.model<SessionDocument>("Session", sessionSchema);

export default Session;
