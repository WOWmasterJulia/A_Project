import { useState } from "react";
import {
  StyleSheet,
  ImageBackground,
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
import * as ImagePicker from "expo-image-picker";
import { ImageUser } from "./ImageUser";
import { auth, storage } from "../firebase/config";
import { createUser } from "../redux/authSlice";
import { logIn } from "../redux/authSlice";
import { updateProfile, createUserWithEmailAndPassword } from "firebase/auth";
import {
  uploadAvatarToServer,
  loginDB,
} from "../firebase/postsFirebaseOperation";

const initialState = {
  photoURL: null,
  displayName: null,
  email: null,
  password: null,
};

// const Registration = () => {
//   const [login, setLogin] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const [focused, setFocused] = useState(null);

//   const navigation = useNavigation();
//   //Показати та сховати пароль
//   const [secureTextEntry, setSecureTextEntry] = useState(true);
//   const togglePassword = () => {
//     setSecureTextEntry(!secureTextEntry);
//   };
//   const madeAva = () => {
//     <PhotoCamera />;
//   };

//   // отримання даних з форми
//   const newRegistration = () => {
//     console.log({ login, email, password });
//     Alert.alert(
//       "Login, Email and Password :",
//       `${login}, ${email} and ${password}`
//     );
//     // navigation.navigate("Post");
//     navigation.navigate("Home");
//     // очищення форми
//     setLogin("");
//     setEmail("");
//     setPassword("");
//   };

const Registration = () => {
  const [state, setState] = useState(initialState);
  const [visiblePassword, setVisiblePassword] = useState(true);
  const [focused, setFocused] = useState(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // console.log("State", state);

  const onCheckRegistration = async () => {
    const { displayName, email, password, photoURL } = state;
    if (displayName && email && password && photoURL) {
      const test = await createUserWithEmailAndPassword(
        auth,
        email,
        password
        // photoURL
      );
      const { uid } = await loginDB({
        email,
        password,
      });
      const storageAvatar = await loadAvatarToServer(photoURL, uid);
      await setState((prev) => ({ ...prev, photoURL: storageAvatar }));
      await updateProfile(auth.currentUser, {
        displayName: displayName,
        photoURL: storageAvatar,
      });

      dispatch(logIn({ email, displayName, uid, photoURL })); // записывает в Редакс Стор локальный стейт (данные юзера), после регистрации в Базе
      setState(initialState);
      navigation.navigate("Home");
    }
  };
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    // console.log("registration result", result.assets[0].uri);
    if (!result.canceled) {
      const photoURL = result.assets[0].uri;
      setState((prev) => ({ ...prev, photoURL }));
    } else {
      alert("You did not select any image.");
    }
    // if (!result.canceled) {
    //   const photoURL = await uploadAvatarToServer(result.assets[0].uri);
    //   setState((prev) => ({ ...prev, photoURL }));
    // } else {
    //   alert("You did not select any image.");
    // }
  };

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
            <View style={styles.registrationWrap}>
              <Text style={styles.title}>Реєстрація</Text>

              <KeyboardAvoidingView // визначаємо ОС та налаштовуємо поведінку клавіатури
                behavior={Platform.OS == "ios" ? "padding" : "height"}
              >
                <View style={styles.inputsWrap}>
                  <TextInput
                    // style={styles.input}
                    style={
                      focused === "name"
                        ? { ...styles.input, ...styles.focusedInput }
                        : { ...styles.input }
                    }
                    placeholder="Логін"
                    // value={login}
                    // onChangeText={setLogin}
                    onChangeText={(value) =>
                      setState((prev) => ({ ...prev, displayName: value }))
                    }
                    value={state.displayName}
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused(null)}
                  />
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
                        <Text style={styles.text}>
                          {visiblePassword ? "Показати" : "Сховати"}
                        </Text>
                      </Pressable>
                    )}
                    {/* <Pressable
                      style={styles.buttonSee}
                      onPress={togglePassword}
                    > */}
                    {/* <Text style={styles.text}>Показати</Text> */}
                    {/* <Text style={styles.text}>
                        {secureTextEntry ? "Показати" : "Сховати"}
                      </Text>
                    </Pressable> */}
                  </View>
                </View>
              </KeyboardAvoidingView>

              <View style={styles.imageWrap}>
                <ImageUser
                  style={styles.image}
                  state={state}
                  onPress={pickImageAsync}
                  onDelete={setState}
                />
                {/* <Image
                  source={require("../assets_new/photos/Add_Ava.png")}
                  resizeMode="cover"
                  style={styles.image}
                ></Image>
                <Pressable
                  style={styles.buttonAdd} */}
                {/* // onPress={() => PhotoCamera!!!!!}
                  // onPress={() => Alert.alert("Take a picture for avatar!")}
                > */}
                {/* <Image
                    source={require("../assets_new/icons/add.png")}
                    style={styles.btnAdd}
                  ></Image>
                </Pressable> */}
              </View>

              <View style={styles.btnWrap}>
                <Pressable
                  style={styles.buttonRegistration}
                  // onPress={() => navigation.navigate("Posts")}
                  // onPress={newRegistration}
                  onPress={onCheckRegistration}
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
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};
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
    // marginTop: -60,
  },
  // image: {
  //   width: 132,
  //   height: 132,
  //   alignSelf: "center",
  //   position: "absolute",
  // },
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
  focusedInput: {
    borderColor: "#FF6C00",
    borderWidth: 2,
  },
  buttonSee: {
    position: "absolute",
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

export default Registration;
