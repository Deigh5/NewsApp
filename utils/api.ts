import axios from 'axios';

const API_KEY = '835763c0e9814b3fb3c34bc2176704da';
const BASE_URL = 'https://newsapi.org/v2';

export const fetchNews = async (category: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/top-headlines`, {
      params: {
        country: 'us',
        category,
        apiKey: API_KEY,
        // Add any additional parameters needed to fetch full content
      },
    });
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};
