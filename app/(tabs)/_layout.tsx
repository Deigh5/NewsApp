import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { IconSymbol } from "@/components/ui/IconSymbol";
import HomeScreen from ".";
import ArticleDetail from "@/components/ArticleDetail";
import SavedArticles from "@/components/SavedArticles";
import { RootStackParamList } from "@/app/types";

const Tab = createBottomTabNavigator<RootStackParamList>();
const HomeStack = createStackNavigator<RootStackParamList>();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="index"
        component={HomeScreen}
        options={{ title: "Home", headerShown: false }}
      />
      <HomeStack.Screen
        name="ArticleDetail"
        component={ArticleDetail}
        options={{ title: "Article Detail", headerShown: false }}
      />
    </HomeStack.Navigator>
  );
}

export default function TabLayout() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: "house.fill" | "bookmark.fill" = "house.fill";

          if (route.name === "index") {
            iconName = "house.fill";
          } else if (route.name === "saved-articles") {
            iconName = "bookmark.fill";
          }

          return <IconSymbol size={size} name={iconName} color={color} />;
        },
        tabBarActiveTintColor: "#2f95dc",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="index"
        component={HomeStackScreen}
        options={{ title: "Home" }}
      />
      <Tab.Screen
        name="saved-articles"
        component={SavedArticles}
        options={{ title: "Saved Articles", headerShown: false  }}
      />
    </Tab.Navigator>
  );
}
