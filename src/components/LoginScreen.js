import React, { useState, useEffect } from "react";
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
import Background from "../assets_new/photos/Photo_BG.png";
import { useNavigation } from "@react-navigation/native";

import { useDispatch } from "react-redux";
// import { selectUser } from "../redux/selectors";

import { logIn } from "../redux/authSlice";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
// import { useWindowDimensions } from 'react-native';

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   // const [visiblePassword, setVisiblePassword] = useState(true);
//   const [focused, setFocused] = useState(null);
//   const navigation = useNavigation();

//   //Показати та сховати пароль
//   const [secureTextEntry, setSecureTextEntry] = useState(true);
//   const togglePassword = () => {
//     setSecureTextEntry(!secureTextEntry);
//   };

//   // отримання даних з форми
//   const onLogin = () => {
//     console.log({ email, password });
//     Alert.alert("Email and Password :", `${email} and ${password}`);
//     // navigation.navigate("Post");
//     navigation.navigate("Home");
//     // очищення форми
//     setEmail("");
//     setPassword("");
//   };
const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [state, setState] = useState(initialState);
  const [visiblePassword, setVisiblePassword] = useState(true);
  const [focused, setFocused] = useState(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged((user) => {
    setLoading(false);
    if (user) {
      navigation.navigate("Home");
    }
  });
  return () => {
    unsubscribe();
  };
}, []);




  const loginDB = async ({ email, password }) => {
    try {
      const credentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return credentials.user;
    } catch (error) {
      throw error;
    }
  };
  //  При нажатии на кнопку вызов onCheckLogin  и в ней loginDB (для проверки в базе наличия этого пользователя)
  const onCheckLogin = async () => {
    const { email, password } = state;
    // console.log('email', email);
    if (email && password) {
      const { emailCr, displayName, uid, photoURL } = await loginDB({
        email,
        password,
      });
      dispatch(logIn({ email, displayName, uid, photoURL }));
      navigation.navigate("Home");
    }
  };

  return (
    <ImageBackground
      source={Background}
      resizeMode="cover"
      style={styles.imageBackground}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <KeyboardAvoidingView // визначаємо ОС та налаштовуємо поведінку клавіатури
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={-50}
          >
            <View style={styles.loginWrap}>
              <Text style={styles.title}>Увійти</Text>
              <TextInput
                // style={styles.input}
                style={
                  focused === "email"
                    ? { ...styles.input, ...styles.focusedInput }
                    : { ...styles.input }
                }
                placeholder="Адреса електронної пошти"
                // value={email}
                // onChangeText={setEmail}
                editable
                numberOfLines={1}
                maxLength={40}
                onChangeText={(value) =>
                  setState((prev) => ({ ...prev, email: value }))
                }
                value={state.email}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused(null)}
              />
              <View>
                <TextInput
                  // style={styles.input}
                  style={
                    focused === "password"
                      ? { ...styles.input, ...styles.focusedInput }
                      : { ...styles.input }
                  }
                  placeholder="Пароль"
                  // value={password}
                  // onChangeText={setPassword}
                  // // secureTextEntry={true}
                  // secureTextEntry={secureTextEntry}
                  autoComlete="password"
                  secureTextEntry={visiblePassword}
                  editable
                  numberOfLines={1}
                  maxLength={40}
                  onChangeText={(value) =>
                    setState((prev) => ({ ...prev, password: value }))
                  }
                  value={state.password}
                  onFocus={() => setFocused("password")}
                  onBlur={() => setFocused(null)}
                />
                {state.password && (
                  <Pressable
                    style={styles.buttonSee}
                    onPress={() => setVisiblePassword(!visiblePassword)}
                  >
                    <Text>{visiblePassword ? "Показати" : "Сховати"}</Text>
                  </Pressable>
                )}
              </View>

              <Pressable
                style={styles.buttonLogin}
                // onPress={() => navigation.navigate("Registration")}
                // onPress={onLogin}
                onPress={onCheckLogin}
              >
                <Text style={styles.btnLog}>Увійти</Text>
              </Pressable>
              <Pressable
                style={styles.buttonEntrance}
                onPress={() => navigation.navigate("Registration")}
              >
                <View style={styles.textWrap}>
                  <Text style={styles.text}>Немає акаунту?</Text>
                  <Text style={styles.textLine}>Зареєструватися</Text>
                </View>
              </Pressable>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "flex-end",
  },
  imageBackground: {
    height: "100%",
    justifyContent: "flex-end",
  },
  loginWrap: {
    backgroundColor: "#fff",
    paddingBottom: 79,
    paddingLeft: 16,
    paddingRight: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "stretch",
  },

  title: {
    fontSize: 30,
    color: "#212121",
    textAlign: "center",
    marginTop: 32,
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

  focusedInput: {
    borderColor: "#FF6C00",
    borderWidth: 2,
  },

  buttonSee: {
    position: "absolute",
    right: 15,
    top: 15,
  },
  buttonLogin: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    marginTop: 27,
    marginBottom: 16,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 32,
    paddingRight: 32,
  },
  btnLog: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    color: "#1B4371",
    textAlign: "center",
  },
  textWrap: {
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    flexDirection: "row",
  },
  textLine: {
    fontSize: 16,
    color: "#1B4371",
    textAlign: "center",
    textDecorationLine: "underline",
  },
});

export default Login;
