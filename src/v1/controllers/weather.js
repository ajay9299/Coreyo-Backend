import axios from "axios";
import config from "../../../config.js";
import { convertTiming } from "../helpers/getTimeHelper.js";
import redisClient from "../connection/redis.js";

export const weatherController = async (cityName) => {
  try {
    const { weatherApiKey, weatherApi } = config;

    // Fetch data from open weather api
    const weatherData = await axios.get(
      `${weatherApi}?q=${cityName},units=metric&appid=${weatherApiKey}`
    );

    // Fetch complete data object from api response
    const totalData = weatherData.data;

    // Fetch total forecasting
    const listOfForecast = totalData.list;

    // Response array
    const fivDaysForecast = [];

    // Apply loop in order to filter out required data
    listOfForecast.forEach((item, index, arr) => {
      const dateOfForecast = item.dt_txt;
      if (dateOfForecast[12] === "0") {
        const { main } = item.weather[0];
        const { temp } = item.main;
        fivDaysForecast.push({
          date: convertTiming(dateOfForecast),
          main,
          temp,
        });
      }
    });

    // Store data on redis
    const dataKey = new Date().toDateString();

    // Store the data in redis based on day of search
    await redisClient.set(dataKey, JSON.stringify(fivDaysForecast));

    return {
      count: 5,
      unit: "metric",
      location: cityName,
      data: fivDaysForecast,
    };
  } catch (error) {
    throw error;
  }
};
