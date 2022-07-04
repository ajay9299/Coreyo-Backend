import { Router } from "express";
import { signUpValidation } from "../validation/signUp.js";
import { statusCodes } from "../../../constants/statusCodes.js";
import { messages } from "../../../constants/messages.js";
import { signUpController } from "../controllers/signUp.js";
import {User} from "../models/user.js"

// Use Router as router
const router = Router();

//<----------------------------------------------------Sign In Route------------------------------------------->
router.post("/signUp", signUpValidation, async (req, res, next) => {
  try {
    
    const { phone, email } = req.body;

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
    // Call the signUp controller
    const newUser = await signUpController(req.body);

    // Response to the client
    res.status(statusCodes.SUCCESS).json({
      success: true,
      message: messages.USER_CREATED,
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
