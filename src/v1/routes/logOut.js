import { Router } from "express";
import { statusCodes } from "../../../constants/statusCodes.js";
import { messages } from "../../../constants/messages.js";

// Use Router as router
const router = Router();

// <----------------------------------------------Log Out Route---------------------------------------->
router.get("/logOut", (req, res, next) => {
  try {
    // Clear the cookies from client side
    return res.clearCookie("access_token").status(statusCodes.SUCCESS).json({
      Success: true,
      messages: messages.USER_LOGOUT,
      data: {},
    });
  } catch (error) {
    next(error);
  }
});

export default router;
