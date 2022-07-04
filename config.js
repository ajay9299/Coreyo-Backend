// Fetch the environment details
const environment = process.env.NODE_ENV;

const config = {
  dev: {
    db: {
      url: "mongodb://localhost:27017/coreyo",
    },
    jwtKey: "12qposqxyazzp89",
    jwtExpire: "12h",
    weatherApi: "https://api.openweathermap.org/data/2.5/forecast",
    weatherApiKey: "d5c7dee10fd2afce3a778ae1d6b316fb",
    newsApi: "https://newsapi.org/v2/everything",
    newsApiKey: "77d83c57d1234f48a4f91264ce8f2a10",
  },
  prod: {
    db: {
      url: "PASTE_ATLAS_URL",
    },
    jwtKey: "PASTE_JWT_KEY",
    jwtExpire: "SET_EXPIRE_TIME",
    weatherApi: "PASTE_WEATHER_API",
    weatherApiKey: "PASTE_WEATHER_API_KEY",
    newsApi: "PASTE_NEWS_API",
    newsApiKey: "PASTE_NEWS_API_KEY",
  },
};

export default environment === "dev" ? config.dev : config.prod;
