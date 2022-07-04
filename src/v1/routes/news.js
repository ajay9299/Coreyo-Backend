import { Router } from "express";
import { isAuthValid } from "../middleware/auth.js";
import { statusCodes } from "../../../constants/statusCodes.js";
import { messages } from "../../../constants/messages.js";
import { newsController } from "../controllers/news.js";
// Use Router as router
const router = Router();

//<----------------------------------------------------Get News Route------------------------------------------->
router.get("/news", isAuthValid, async (req, res, next) => {
  try {
    const { search } = req.query;
    if (!search) {
      return res.status(statusCodes.BAD_REQUEST).json({
        Success: false,
        messages: messages.INVALID_KEYWORD,
        data: {},
      });
    }

    // Call the news controller
    const newsData = await newsController(search);

    res.status(statusCodes.SUCCESS).json({
      Success: true,
      messages: `${messages.NEWS_DATA}${search}`,
      data: newsData,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
