import redisClient from "../connection/redis.js";

export const redisData = async (keyValue) => {
  try {
    const data = await redisClient.get(keyValue);
    if (!data) return false;
    return data;
  } catch (error) {
    throw error;
  }
};
