import React, { useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  Image,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
  TouchableHighlight,
  Pressable,
} from "react-native";
import Background from "../assets_new/photos/Photo_BG.png";

import { useNavigation } from "@react-navigation/native";

export default function Registration() {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  return (
    <ImageBackground
      source={Background}
      resizeMode="cover"
      style={styles.Background}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <KeyboardAvoidingView // визначаємо ОС та налаштовуємо поведінку клавіатури
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={-150}
            // style={{ flex: 1 }}
          >
            <View style={styles.loginWrap}>
              <View style={styles.generalWrap}>
                <View style={styles.registrationWrap}>
                  <Text style={styles.title}>Реєстрація</Text>
                  <KeyboardAvoidingView // визначаємо ОС та налаштовуємо поведінку клавіатури
                    behavior={Platform.OS == "ios" ? "padding" : "height"}
                  >
                    <View style={styles.inputsWrap}>
                      <TextInput
                        style={styles.input}
                        placeholder="Логін"
                        value={login}
                        onChangeText={setLogin}
                      />
                      <TextInput
                        style={styles.input}
                        placeholder="Адреса електронної пошти"
                        value={email}
                        onChangeText={setEmail}
                      />
                      <View>
                        <TextInput
                          style={styles.input}
                          placeholder="Пароль"
                          value={password}
                          onChangeText={setPassword}
                          secureTextEntry={true}
                        />
                        <Pressable
                          style={styles.buttonSee}
                          onPress={() => alert(1)}
                        >
                          <Text style={styles.text}>Показати</Text>
                        </Pressable>
                      </View>
                    </View>
                  </KeyboardAvoidingView>
                  <View style={styles.imageWrap}>
                    <Image
                      source={require("../assets_new/photos/Add_Ava.png")}
                      resizeMode="cover"
                      style={styles.image}
                    ></Image>
                    <Pressable
                      style={styles.buttonAdd}
                      onPress={() => navigation.navigate("Text")}
                    >
                      <Image
                        source={require("../assets_new/icons/add.png")}
                        style={styles.btnAdd}
                      ></Image>
                    </Pressable>
                  </View>
                  <View style={styles.btnWrap}>
                    <Pressable
                      style={styles.buttonRegistration}
                      onPress={() => navigation.navigate("Posts")}
                    >
                      <Text style={styles.btnReg}>Зареєстуватися</Text>
                    </Pressable>
                    <Pressable
                      style={styles.buttonEntrance}
                      onPress={() => navigation.navigate("Login")}
                    >
                      <Text style={styles.text}>Вже є акаунт? Увійти</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
}
// }

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: "100%",
    justifyContent: "flex-end",
  },
  registrationWrap: {
    backgroundColor: "#fff",
    paddingTop: 92,
    paddingLeft: 16,
    paddingRight: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "stretch",
  },

  imageBackground: {
    height: "100%",
    justifyContent: "flex-end",
  },
  imageWrap: {
    position: "absolute",
    alignSelf: "center",
    marginTop: -60,
  },
  image: {
    width: 132,
    height: 132,
    alignSelf: "center",
    position: "absolute",
  },
  buttonAdd: {
    // position: 'absolute',
    marginTop: 80,
    marginLeft: 130,
  },

  title: {
    fontSize: 30,
    color: "#212121",
    textAlign: "center",
    marginBottom: 33,
  },
  input: {
    height: 50,
    color: "#212121",
    borderColor: "#E8E8E8",
    borderRadius: 6,
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 16,
  },
  buttonSee: {
    position: "absolute",
    // marginLeft: 280,
    // marginTop: 145,
    right: 15,
    top: 15,
  },

  buttonRegistration: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    marginTop: 27,
    marginBottom: 16,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 32,
    paddingRight: 32,
  },
  btnReg: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    color: "#1B4371",
    textAlign: "center",
    paddingBottom: 79,
  },
});
