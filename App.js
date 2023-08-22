import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Button, View, ImageBackground } from 'react-native';

import Registration from "./src/components/RegistrationScreen";
import Login from "./src/components/LoginScreen";
// import Post from './src/components/PostsScreen';
import Home from "./src/components/Home";
import PhotoCamera from "./src/components/PhotoCamera";
import Comments from "./src/components/CommentsScreen";

const MainStack = createStackNavigator(); // вказує на групу навігаторів

export default function App() {
  return (
    <NavigationContainer>
      <MainStack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <MainStack.Screen name="Registration" component={Registration} />
        <MainStack.Screen name="Login" component={Login} />
        <MainStack.Screen name="PhotoCamera" component={PhotoCamera} />
        {/* <MainStack.Screen name="Post" component={Post} /> */}
        <MainStack.Screen name="Home" component={Home} />
        <MainStack.Screen name="Comments" component={Comments} />
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
