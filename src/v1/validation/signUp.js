// Use Joi in order to apply validation on upcoming data from client side
import Joi from "joi";
import { messages } from "../../../constants/messages.js";
import { statusCodes } from "../../../constants/statusCodes.js";

//<---------------------------------------------SignUp Validator---------------------------------------->
export const signUpValidation = (req, res, next) => {
  try {

    // Valid body schema
    const schema = Joi.object({
      name: Joi.string().max(25).required(),
      email: Joi.string().email().required(),
      phone: Joi.string().allow(null).optional().regex(/^[0-9]{10}$/).messages({'string.pattern.base': `Phone number must have 10 digits.`}),
      password: Joi.string().required().min(5),
      confirmPassword: Joi.equal(Joi.ref('password')),
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
