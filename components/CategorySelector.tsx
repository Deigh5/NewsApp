import React from "react";
import { View, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";

const categories = [
  "business",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
];

type CategorySelectorProps = {
  onSelectCategory: (category: string) => void;
};

const CategorySelector: React.FC<CategorySelectorProps> = ({
  onSelectCategory,
}) => {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
      {categories.map((category) => (
        <TouchableOpacity
          key={category}
          onPress={() => onSelectCategory(category)}
        >
          <ThemedText>{category}</ThemedText>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default CategorySelector;
