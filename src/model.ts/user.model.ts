import mongoose from "mongoose";
import bcrypt from "bcrypt";

export interface UserDocument extends mongoose.Document {
    email: string;
    username: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(password: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<UserDocument>('User', UserSchema);

UserSchema.methods.comparePassword = function (password: string): Promise<boolean> {
    const user = this as UserDocument;
    return bcrypt.compare(password, user.password).catch((err) => false);
}

UserSchema.pre("save", async function (next: mongoose.HookNextFunction) {
    const user = this as UserDocument;
    if (!user.isModified("password")) {
        return next();
    }

    let salt_rounds = 10;
    try {
        if (process.env.SALT_ROUNDS)
            salt_rounds = parseInt(process.env.SALT_ROUNDS);
    } catch (_) {}


    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, 10);
    next();
});