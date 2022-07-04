import { compare } from "bcrypt";
import { User } from "../models/user.js";

// <----------------------------------------Sig In Controller------------------------------------------->
export const signInController = async (body) => {
  try {
    const { email, password } = body;

    // Find the user details in DB based on email;
    const isUser = await User.findOne({ email });

    // If user not present in DB
    if (!isUser) return false;

    // If user present in DB, compare the password
    const isPasswordMatch = await compare(password, isUser.password);
    if (!isPasswordMatch) return false;

    return isUser;
  } catch (error) {
    throw error;
  }
};
