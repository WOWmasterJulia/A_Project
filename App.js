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

import { configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import rootReducer from "./rootReducer";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};
const reducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
const persistor = persistStore(store);
const MainStack = createStackNavigator(); // вказує на групу навігаторів
export default function App() {
  // const [fontsLoaded] = useFonts({
  //   "Roboto-Regular": require("./assets_new/fonts/Roboto-Regular.ttf"),
  //   "Roboto-Medium": require("./assets_new/fonts/Roboto-Medium.ttf"),
  // });
  // if (!fontsLoaded) {
  //   return null;
  // }
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <MainStack.Navigator
            initialRouteName="Login"
            screenOptions={{ headerShown: false }}
          >
            <MainStack.Screen name="Registration" component={Registration} />
            <MainStack.Screen name="Login" component={Login} />
            {/* <MainStack.Screen name="Post" component={Post} /> */}
            <MainStack.Screen name="Home" component={Home} />
            <MainStack.Screen name="Comments" component={Comments} />
            <MainStack.Screen
              name="createPostsScreen"
              component={CreatePostsScreen}
            />
            <MainStack.Screen name="Map" component={Map} />
          </MainStack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
// a-project-native-1



