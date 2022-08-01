import mongoose from "mongoose";
import bcrypt from "bcrypt";
import log from "../util/logger";

export interface UserDocument extends mongoose.Document {
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const user = this as UserDocument;

  if (!user.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(
      parseInt(process.env.SALT_WORK_FACTOR ?? "10")
    );
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    return next();
  } catch (e) {
    log.error(e);
    return next(new Error("Error hashing password: " + e));
  }
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as UserDocument;
  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

const User = mongoose.model("User", userSchema);

export default User;
