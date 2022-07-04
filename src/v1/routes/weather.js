import { Router } from "express";
import { weatherController } from "../controllers/weather.js";
import { statusCodes } from "../../../constants/statusCodes.js";
import { messages } from "../../../constants/messages.js";
import { redisData } from "../helpers/redisHelper.js";

// Use Router as router
const router = Router();

//<----------------------------------------------------Get Weather Details Route------------------------------------------->
router.get("/weather", async (req, res, next) => {
  try {
    // Call the weather controller
    const { cityName } = req.query;
    if (!cityName) {
      return res.status(statusCodes.BAD_REQUEST).json({
        Success: false,
        messages: messages.PASS_CITY,
        data: {},
      });
    }

    // Fetch current day
    const dataKey = new Date().toDateString();

    // Search data in redis cache
    const isCachedData = await redisData(dataKey);

    const weatherData = !isCachedData
      ? await weatherController(cityName)
      : JSON.parse(isCachedData);

    // Response to the client
    res.status(statusCodes.SUCCESS).json({
      Success: true,
      messages: messages.WEATHER_DATA,
      data: weatherData,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
