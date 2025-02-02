import React, { useEffect, useState } from "react";
import {
  FlatList,
  ActivityIndicator,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { getFavoriteArticles } from "@/utils/storage"; // Function to fetch saved articles
import { Article } from "@/app/types"; // Import the Article type
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "@/app/types";

const SavedArticles: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [savedArticles, setSavedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedArticles = async () => {
      setLoading(true);
      try {
        const articles = await getFavoriteArticles();
        setSavedArticles(articles);
      } catch (error) {
        console.error("Failed to load saved articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedArticles();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Saved Articles</ThemedText>
      </ThemedView>
      {savedArticles.length === 0 ? (
        <ThemedText>No saved articles yet.</ThemedText>
      ) : (
        <FlatList
          data={savedArticles}
          keyExtractor={(item) => item.url}
          renderItem={({ item }) => (
            <ThemedView style={styles.card}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ArticleDetail", {
                    article: {
                      title: item.title,
                      content: item.content || "",
                      urlToImage: item.urlToImage || "",
                      url: item.url,
                    },
                  })
                }
              >
                <Image source={{ uri: item.urlToImage }} style={styles.image} />
              </TouchableOpacity>
              <ThemedText style={styles.title}>{item.title}</ThemedText>
              <ThemedText style={styles.description}>{item.content}</ThemedText>
            </ThemedView>
          )}
        />
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  titleContainer: {
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
});

export default SavedArticles;
