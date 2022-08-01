import { DocumentDefinition, FilterQuery } from "mongoose";
import User, { UserDocument } from "../models/user.model";
import { omit } from "lodash";

export async function createUser(input: DocumentDefinition<Omit<UserDocument, "createdAt" | "updatedAt" | "comparePassword">>) {
  try {
    return await User.create(input);
  } catch (e: any) {
    throw new Error(e);
  }
}

/**
 * Attempts to validate the password for a user.
 * @param email The email of the user that wants to login
 * @param password The candidate password of the user that wants to login
 * @returns false if the user does not exist or the password is incorrect, otherwise returns the user
 */
export async function validatePassword(email: string, password: string): Promise<any> {
    const user = await User.findOne({ email }) as UserDocument;
    if (!user) return false;
    
    const isValid = await user.comparePassword(password);
    if (!isValid) return false;
    
    return omit(user.toJSON(), "password");
}

export async function findUser(query: FilterQuery<UserDocument>) {
  return User.findOne(query).lean();
}