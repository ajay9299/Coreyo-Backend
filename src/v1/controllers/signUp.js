import { genSalt, hash } from "bcrypt";
import { User } from "../models/user.js";
import { globalConstants } from "../../../constants/globalConstants.js";
import { statusCodes } from "../../../constants/statusCodes.js";
import { messages } from "../../../constants/messages.js";

// <---------------------------------------Sign Up Controller------------------------------------------>
export const signUpController = async (body) => {
  try {
    const { password, name, phone, email } = body;

    // Check if email and phone number already present in database
    const isUserByEmail = await User.findOne({ email });
    const isUserByPhone = phone ? await User.findOne({ phone }) : null;

    if (isUserByEmail || isUserByPhone) {
      return res.status(statusCodes.BAD_REQUEST).json({
        Success: false,
        message: messages.USER_ALREADY,
        data: {},
      });
    }

    // Generate salt for hashing
    const salt = await genSalt(globalConstants.SALT_FOR_HASH);

    // Hashing the upcoming plan password
    const hashedPassword = await hash(password, salt);

    // Store the new user details in DB
    // If phone number also present in request body
    const newUser = phone
      ? await User.create({
          name,
          email,
          password: hashedPassword,
          phone,
        })
      : await User.create({
          name,
          email,
          password: hashedPassword,
        });
    return { name, email };
  } catch (error) {
    throw error;
  }
};
