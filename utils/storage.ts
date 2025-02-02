import AsyncStorage from '@react-native-async-storage/async-storage';
import { Article } from '@/app/types';

export const saveFavoriteArticle = async (article: Article) => {
  const favorites = await getFavoriteArticles();
  const updatedFavorites = [...favorites, article];
  await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
};

export const getFavoriteArticles = async () => {
  const favorites = await AsyncStorage.getItem('favorites');
  return favorites ? JSON.parse(favorites) : [];
};
