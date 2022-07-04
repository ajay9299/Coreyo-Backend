// Use Joi in order to apply validation on upcoming data from client side
import Joi from "joi";
import { messages } from "../../../constants/messages.js";
import { statusCodes } from "../../../constants/statusCodes.js";

//<---------------------------------------------SignUp Validator---------------------------------------->
export const signInValidation = (req, res, next) => {
  try {

    // Valid body schema
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required().min(5),
    });

    // Apply validation
    const isValid = schema.validate(req.body);

    // If upcoming data is not in valid format
    if (isValid.error) {
      return res.status(statusCodes.BAD_REQUEST).json({
        success: false,
        msg: messages.INVALID_DATA,
        error: isValid.error.details[0].message,
      });
    }
    next();
  } catch (error) {
    throw error;
  }
};
