import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableHighlight,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import Map from "./MapScreen.js";

const CreatePost = () => {
const navigation = useNavigation();
  const [text, setText] = useState("");
  const [locate, setLocate] = useState("");
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <KeyboardAvoidingView // визначаємо ОС та налаштовуємо поведінку клавіатури
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          // keyboardVerticalOffset={-50}
          // style={{ flex: 1 }}
        >
          <View style={styles.header}>
            <Pressable
              style={styles.pressLogoff}
              onPress={() => navigation.navigate("Post")}
            >
              <AntDesign name="arrowleft" size={22} color="black" />
            </Pressable>
            <Text style={styles.title}>Створити публікацію</Text>
          </View>
          
          <View style={styles.createWrap}>
            <View style={styles.photoWrap}>
              <Pressable
                style={styles.postPhoto}
                onPress={() => navigation.navigate("Comments")}
              >
                <Image
                  source={require("../assets_new/photos/Content_Block.png")}
                />
              </Pressable>

              <Pressable style={styles.ellipse} onPress={() => PhotoCamera}>
                <Ionicons
                  name="ios-camera"
                  size={24}
                  color="#BDBDBD"
                  style={styles.photoCam}
                />
              </Pressable>
            </View>

            <Text style={styles.downloadPhoto}>Завантажте фото</Text>

            <View style={styles.inputsWrap}>
              <TextInput
                style={styles.input}
                placeholder="Назва"
                value={text}
                onChangeText={setText}
              />
              <View>
                <Ionicons
                  name="ios-location-outline"
                  size={24}
                  color="#BDBDBD"
                  style={styles.ico}
                />
                <TextInput
                  style={styles.inputLoc}
                  placeholder="Місцевість..."
                  value={locate}
                  onChangeText={setLocate}
                />
              </View>
            </View>

            <Pressable
              style={styles.button}
              // onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.btnText}>Опублікувати</Text>
            </Pressable>
            <Pressable
              style={styles.delButton}
              // onPress={() => navigation.navigate("Login")}
            >
              <AntDesign name="delete" size={24} color="#BDBDBD" />
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}


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
    justifyContent: "flex-start",
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
  },
  title: {
    backgroundColor: "#FFFFFF",
    fontSize: 17,
    paddingBottom: 5,
    marginLeft: 80,
  },
  pressLogoff: {
    alignSelf: "center",
    marginLeft: 12,
    paddingRight: 10,
  },
  createWrap: {
    alignItems: "center",
    marginTop: 32,
    alignItems: "stretch",
    paddingLeft: 16,
    paddingRight: 16,
  },
  photoWrap: {
    alignItems: "center",
    position: "relative",
  },
  postPhoto: {
    marginBottom: 8,
    alignSelf: "center",
  },
  ellipse: {
    flex: 1,
    backgroundColor: "#fff",
    width: 60,
    height: 60,
    borderRadius: 100,
    alignItems: "center",
    position: "absolute",
    top: 90,
  },
  photoCam: {
    position: "absolute",
    top: 15,
  },
  downloadPhoto: {
    fontSize: 16,
    color: "#BDBDBD",
    marginBottom: 32,
  },
  input: {
    height: 50,
    color: "#212121",
    borderColor: "#E8E8E8",
    fontSize: 16,
    borderBottomWidth: 1,
    marginBottom: 16,
  },
  ico: {
    position: "absolute",
    top: 10,
  },
  inputLoc: {
    height: 50,
    color: "#212121",
    borderColor: "#E8E8E8",
    fontSize: 16,
    borderBottomWidth: 1,
    marginBottom: 16,
    paddingLeft: 30,
  },
  button: {
    // backgroundColor: "#FF6C00",
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    marginTop: 16,
    marginBottom: 70,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 32,
    paddingRight: 32,
  },
  btnText: {
    fontSize: 16,
    // color: "#fff",
    color: "#BDBDBD",
    textAlign: "center",
  },
  delButton: {
    // backgroundColor: "#FF6C00",
    alignSelf: "center",
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    // marginBottom: 10,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 23,
    paddingRight: 23,
    justifyContent: "flex-end",
  },
});

export default CreatePost;
