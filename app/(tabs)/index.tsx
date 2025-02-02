import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { fetchNews } from "@/utils/api";
import { Article } from "@/app/types";
import SavedArticles from "@/components/SavedArticles";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "@/app/types";

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("general");

  useEffect(() => {
    const getArticles = async () => {
      try {
        const fetchedArticles = await fetchNews(category);
        console.log(fetchedArticles);
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
      <Picker
        selectedValue={category}
        style={styles.picker}
        onValueChange={(itemValue) => setCategory(itemValue)}
      >
        <Picker.Item label="General" value="general" />
        <Picker.Item label="Business" value="business" />
        <Picker.Item label="Technology" value="technology" />
        <Picker.Item label="Health" value="health" />
        <Picker.Item label="Science" value="science" />
        <Picker.Item label="Sports" value="sports" />
        <Picker.Item label="Entertainment" value="entertainment" />
      </Picker>
      <TextInput
        style={styles.searchInput}
        placeholder="Search articles..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Top News</ThemedText>
      </ThemedView>
      <FlatList
        data={filteredArticles}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => (
          <ThemedView style={styles.card}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ArticleDetail", {
                  article: item,
                })
              }
            >
              <Image
                source={{ uri: item.urlToImage || "" }}
                style={styles.image}
              />
              <ThemedText style={styles.title}>{item.title}</ThemedText>
              <ThemedText style={styles.description}>
                {item.content || "No description available"}
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>
        )}
      />
      <SavedArticles />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f9fa",
  },
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 16,
  },
  searchInput: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  titleContainer: {
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#555",
  },
});
