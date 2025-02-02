import axios from 'axios';
import { Variables } from '@/constants/Colors';

const API_KEY = Variables.API_KEY;
const BASE_URL = Variables.BASE_URL;

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
