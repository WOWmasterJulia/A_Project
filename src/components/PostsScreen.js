import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Image,
  Alert,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
} from "react-native";
import { useNavigation } from '@react-navigation/native';

const Post = () => {
    
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Публікації</Text>
        <Pressable
          style={styles.logOut}
          onPress={() => navigation.navigate("Login")}
        >
          <Image source={require("../assets_new/icons/log-out.png")} />
        </Pressable>
      </View>

      <View style={styles.profileWrap}>
        <Image
          source={require("../assets_new/photos/Ava_Romanova.png")}
          resizeMode="cover"
          style={styles.image}
        ></Image>
        <View style={styles.userInfotWrap}>
          <Text style={styles.name}>Natali Romanova</Text>
          <Text style={styles.email}>email@example.com</Text>
        </View>
      </View>
      <Pressable
        style={styles.postStyle}
        onPress={() => navigation.navigate("Comments")}
      >
        <Image source={require("../assets_new/photos/Photo_2.png")} />
      </Pressable>
      {/* <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Login")}>
        <Text style={styles.btnText}>Змінити аккаунт через логін</Text>
      </Pressable> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    marginTop: 44,
    paddingBottom: 11,
    justifyContent: "flex-end",
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
  },
  title: {
    backgroundColor: "#FFFFFF",
    fontSize: 17,
    paddingBottom: 5,
  },
  logOut: {
    alignSelf: "center",
    marginLeft: 120,
    paddingRight: 10,
  },
  profileWrap: {
    alignItems: "center",
    alignSelf: "flex-start",
    justifyContent: "flex-start",
    gap: 8,
    flexDirection: "row",
    marginTop: 32,
  },
  image: {
    width: 60,
    height: 60,
  },
  name: {
    fontSize: 13,
    color: "#212121",
  },
  email: {
    fontSize: 11,
    color: "#212121",
  },
  // button: {
  //   backgroundColor: "#FF6C00",
  //   borderRadius: 100,
  //   marginTop: 27,
  //   marginBottom: 16,
  //   paddingTop: 16,
  //   paddingBottom: 16,
  //   paddingLeft: 32,
  //   paddingRight: 32,
  // },
  // btnText: {
  //   fontSize: 16,
  //   color: "#fff",
  //   textAlign: "center",
  // },
  postStyle: {
    alignSelf: "center",
    marginTop: 15,
  },
});

export default Post;