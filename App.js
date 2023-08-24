import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Button, View, ImageBackground } from 'react-native';

import { useFonts } from "expo-font";
import Registration from "./src/components/RegistrationScreen";
import Login from "./src/components/LoginScreen";
// import Post from './src/components/PostsScreen';
import Home from "./src/components/Home";
// import PhotoCamera from "./src/components/PhotoCamera";
import Comments from "./src/components/CommentsScreen";
import CreatePostsScreen from "./src/components/CreatePostsScreen";
import Map from "./src/components/MapScreen";

const MainStack = createStackNavigator(); // вказує на групу навігаторів

export default function App() {
  // const [fontsLoaded] = useFonts({
  //   "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  //   "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  // });
  // if (!fontsLoaded) {
  //   return null;
  // }
  return (
    <NavigationContainer>
      <MainStack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <MainStack.Screen name="Registration" component={Registration} />
        <MainStack.Screen name="Login" component={Login} />
        {/* <MainStack.Screen name="PhotoCamera" component={PhotoCamera} /> */}
        {/* <MainStack.Screen name="Post" component={Post} /> */}
        <MainStack.Screen name="Home" component={Home} />
        <MainStack.Screen name="Comments" component={Comments} />
        <MainStack.Screen name="createPostsScreen" component={CreatePostsScreen} />
        <MainStack.Screen name="Map" component={Map} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // alignItems: 'center',
//     // justifyContent: 'center',
//     //

//     // paddingBottom: 30,
//   },
// });
