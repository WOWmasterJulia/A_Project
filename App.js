import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import { StyleSheet, View } from 'react-native';

import Registration from './src/components/RegistrationScreen';
import Login from './src/components/LoginScreen';
import Posts from './src/components/PostsScreen';

const MainStack = createStackNavigator(); // вказує на групу навігаторів
export default function App() {
  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="Login"
        // screenOptions={{ headerShown: false, }}
      >
        <MainStack.Screen name="Registration" component={Registration} />
        <MainStack.Screen name="Login" component={Login} />
        <MainStack.Screen name="Posts" component={Posts} />
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
