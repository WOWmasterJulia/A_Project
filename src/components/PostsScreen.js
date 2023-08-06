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

export default function Posts() {
    
const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* <KeyboardAvoidingView // визначаємо ОС та налаштовуємо поведінку клавіатури
            behavior={Platform.OS === "ios" ? "padding" : "height"}> */}
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
          source={require("../assets_new/photos/Ava.png")}
          resizeMode="cover"
          style={styles.image}
        ></Image>
        <View style={styles.userInfotWrap}>
          <Text style={styles.name}>Natali Romanova</Text>
          <Text style={styles.email}>email@example.com</Text>
        </View>
      </View>

      {/* <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Login")}>
        <Text style={styles.btnText}>Змінити аккаунт через логін</Text>
      </Pressable> */}

      {/* </KeyboardAvoidingView>       */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
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
    // alignSelf: 'center',
    // justifyContent: 'center',
  },
  logOut: {
    alignSelf: "center",
    marginLeft: 120,
    paddingRight: 10,
  },
  profileWrap: {
    // display: 'flex',
    alignItems: "center",
    alignSelf: "flex-start",
    justifyContent: "flex-start",
    gap: 8,
    flexDirection: "row",
    marginTop: 32,
    // backgroundColor: '#fff',
    // marginTop: 263,
    // paddingBottom: 79,
    // paddingLeft: 16,
    // paddingRight: 16,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // alignItems: 'stretch',
    // flexDirection: column,
  },
  image: {
    width: 60,
    height: 60,

    // marginTop: -60,
    // alignSelf: 'center',
  },
  name: {
    fontSize: 13,
    color: "#212121",
    // textAlign: 'center',
    // marginTop: 32,
    // marginBottom: 33,
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
});