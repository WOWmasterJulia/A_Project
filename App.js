import "react-native-gesture-handler";
import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Registration from "./src/components/RegistrationScreen.js";
import Login from "./src/components/LoginScreen.js";
import Home from "./src/components/Home";
import Comments from "./src/components/CommentsScreen";
import CreatePostsScreen from "./src/components/CreatePostsScreen";
import Map from "./src/components/MapScreen";
import EditPostScreen from "./src/components/EditPostScreen";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./src/redux/store";

import { useFonts } from "expo-font";

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
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <NavigationContainer>
        <MainStack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <MainStack.Screen name="Registration" component={Registration} />
          <MainStack.Screen name="Login" component={Login} />
          <MainStack.Screen name="Home" component={Home} />
          <MainStack.Screen name="Comments" component={Comments} />
          <MainStack.Screen
            name="createPostsScreen"
            component={CreatePostsScreen}
          />
          <MainStack.Screen name="Map" component={Map} />
          <MainStack.Screen name="EditPostScreen" component={EditPostScreen} />
        </MainStack.Navigator>
      </NavigationContainer>
      {/* </PersistGate> */}
    </Provider>
  );
}
// a-project-native-1
