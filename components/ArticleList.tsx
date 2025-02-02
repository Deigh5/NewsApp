import React, { useEffect, useState } from "react";
import {
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  TextInput,
} from "react-native";
import { fetchNews } from "@/utils/api";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useNavigation } from "@react-navigation/native";
import { Article, ArticleListRouteProp } from "@/app/types";
import CategorySelector from "@/components/CategorySelector";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/app/types";

// Define the props for the ArticleList component
type ArticleListProps = {
  route: ArticleListRouteProp;
  navigation: StackNavigationProp<RootStackParamList, "ArticleList">;
};

type ArticleListNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ArticleList"
>;

const ArticleList: React.FC<ArticleListProps> = ({ route, navigation }) => {
  const { category } = route.params; // Extract category from route params
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("business");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const getArticles = async () => {
      setLoading(true);
      try {
        const fetchedArticles = await fetchNews(category);
        console.log("Fetched Articles:", fetchedArticles); // Debugging log
        setArticles(fetchedArticles);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getArticles();
  }, [category]);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ThemedView style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search articles..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <CategorySelector onSelectCategory={setSelectedCategory} />
      <ThemedText style={styles.header}>Top News</ThemedText>
      <FlatList
        data={filteredArticles}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("ArticleDetail", {
                article: {
                  ...item,
                  content: item.content || "",
                  urlToImage: item.urlToImage || "",
                },
              })
            }
          >
            <Image
              source={{ uri: item.urlToImage || "" }}
              style={styles.image}
            />
            <ThemedText style={styles.title}>{item.title}</ThemedText>
            <ThemedText style={styles.description}>{item.content}</ThemedText>
          </TouchableOpacity>
        )}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  searchInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
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

export default ArticleList;
