import axios from "axios";
import config from "../../../config.js";

// <------------------------------------------News Controller---------------------------------------->
export const newsController = async (keyword) => {
  try {
    const { newsApi, newsApiKey } = config;

    // Fetch news from newsApis server
    const newsData = await axios.get(
      `${newsApi}?q=${keyword}&apikey=${newsApiKey}`
    );

    // articles contain all news objects
    const articles = newsData.data.articles;

    // Filter top 10 results
    const responseArray = [];

    for (let i = 0; i < articles.length && i < 10; i++) {
      responseArray.push({
        headline: articles[i].title,
        link: articles[i].url,
      });
    }

    return {
      count: 10,
      data: responseArray,
    };
  } catch (error) {
    throw error;
  }
};
