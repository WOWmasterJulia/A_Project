import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, AntDesign } from "@expo/vector-icons";

import Post from "./PostsScreen.js";
import CreatePostsScreen from "./CreatePostsScreen.js";
import Profile from "./ProfileScreen.js";

const Tabs = createBottomTabNavigator();

const Home = () => {
  return (
    <Tabs.Navigator
      labeled={false}
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "#FF6C00",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: false,

        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Post") {
            iconName = focused ? "appstore-o" : "appstore1";
          } else if (route.name === "CreatePostsScreen") {
            iconName = focused ? "pluscircleo" : "pluscircle";
          } else if (route.name === "Profile") {
            iconName = focused ? "user" : "user";
          }
          return <AntDesign name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="Post" component={Post} />
      <Tabs.Screen
        name="CreatePostsScreen"
        component={CreatePostsScreen}
        options={{ tabBarStyle: { display: "none" } }}
      />
      <Tabs.Screen name="Profile" component={Profile} />
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;
