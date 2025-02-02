import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  ScrollView,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@/app/types";
import { saveFavoriteArticle } from "@/utils/storage";

type ArticleDetailRouteProp = RouteProp<RootStackParamList, "ArticleDetail">;

type ArticleDetailProps = {
  route: ArticleDetailRouteProp;
};

const ArticleDetail: React.FC<ArticleDetailProps> = ({ route }) => {
  const { article } = route.params;

  const handleSaveArticle = async () => {
    try {
      await saveFavoriteArticle(article);
      alert("Article saved!");
    } catch (error) {
      console.error("Failed to save article:", error);
      alert("Failed to save article.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: article.urlToImage }} style={styles.image} />
      <Text style={styles.title}>{article.title}</Text>
      <Text style={styles.content}>{article.content}</Text>
      <Button title="Save Article" onPress={handleSaveArticle} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  content: {
    fontSize: 16,
    color: "#333",
  },
});

export default ArticleDetail;
