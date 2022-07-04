import { Router } from "express";
import { statusCodes } from "../../../constants/statusCodes.js";
import { messages } from "../../../constants/messages.js";
import { signInValidation } from "../validation/signIn.js";
import { signInController } from "../controllers/signIn.js";
import { signJwtToken } from "../helpers/authHelper.js";

// Use Router as router
const router = Router();

//<----------------------------------------------------Sign In Route------------------------------------------->
router.post("/signIn", signInValidation, async (req, res, next) => {
  try {
    //  Call the signIn controller
    const isSuccessfullySignIn = await signInController(req.body);

    if (!isSuccessfullySignIn) {
      return res.status(statusCodes.BAD_REQUEST).json({
        success: false,
        messages: messages.USER_NOT_LOGIN,
        data: {},
      });
    }

    // Sign access token
    const newJwtToken = signJwtToken(isSuccessfullySignIn._id);

    console.log(newJwtToken);

    // Store the access token inside the cookies
    res
      .cookie("access_token", newJwtToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "prod",
      })
      .status(statusCodes.SUCCESS)
      .json({
        success: true,
        message: messages.USER_LOGIN,
        data: {},
      });
  } catch (error) {
    next(error);
  }
});

export default router;
