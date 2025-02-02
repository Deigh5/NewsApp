import { RouteProp } from '@react-navigation/native';


export type ArticleDetailRouteProp = RouteProp<RootStackParamList, "ArticleDetail">;

export type Article = {
  title: string;
  url: string;
  urlToImage?: string;
  content?: string;
};

export type RootStackParamList = {
  index: undefined;
  ArticleList: { category: string };
  ArticleDetail: { article: Article };
  "saved-articles": undefined;
};

export type ArticleListRouteProp = RouteProp<RootStackParamList, 'ArticleList'>;
