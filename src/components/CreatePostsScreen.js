import { Camera } from "expo-camera";

import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Alert,
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
import Toast from "react-native-toast-message";
import {
  Ionicons,
  AntDesign,
  MaterialIcons,
  Feather,
  SimpleLineIcons,
} from "@expo/vector-icons";

import * as Location from "expo-location";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";

const CreatePostsScreen = () => {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [namePost, setNamePost] = useState("");
  const [location, setLocation] = useState("");

  const [convertedCoordinate, setConvertedCoordinate] = useState(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [isDisabledPublishBtn, setIsDisabledPublishBtn] = useState(false);

  const [focused, setFocused] = useState(null);

  // отримання даних з форми
  // const newPost = () => {
  //   // console.log({ text, locate});
  //   // Alert.alert("text and locate :", `${text}, ${locate}`);
  //   navigation.navigate("Post");
  //   // navigation.navigate("Home");
  //   // очищення форми
  //   setText("");
  //   setLocate("");
  // };
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      await Location.requestForegroundPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    const disabled =
      capturedPhoto !== null &&
      namePost !== "" &&
      convertedCoordinate !== null &&
      location !== null
        ? false
        : true;
    setIsDisabledPublishBtn(disabled);
  }, [capturedPhoto, namePost, convertedCoordinate, location]);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const openCamera = async () => {
    const result = await ImagePicker.launchCameraAsync();

    if (!result.canceled && result.assets.length > 0) {
      await MediaLibrary.createAssetAsync(result.assets[0].uri);
      setCapturedPhoto(result.assets[0].uri);

      const { coords } = await Location.getCurrentPositionAsync();
      setLocation(coords);

      const address = await Location.reverseGeocodeAsync({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
      console.log(address);

      const { region, country } = address[0];
      setConvertedCoordinate({ region, country });
    }
  };

  const openGallery = async () => {
    const galleryResult = await ImagePicker.launchImageLibraryAsync();

    if (!galleryResult.canceled && galleryResult.assets.length > 0) {
      setCapturedPhoto(galleryResult.assets[0].uri);

      const { coords } = await Location.getCurrentPositionAsync();
      setLocate(coords);
      const address = await Location.reverseGeocodeAsync({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
      const { region, country } = address[0];
      setConvertedCoordinate({ region, country });
    }
  };

  const publishPhoto = () => {
    if (location) {
      console.log({
        capturedPhoto,
        namePost,
        location,
        convertedCoordinate,
      });
      setCapturedPhoto(null);
      setNamePost("");
      setlocation(null);
      setConvertedCoordinate(null);
      navigation.navigate("Post");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* <View style={{ height: "100%", justifyContent: "flex-end" }}> */}
        <KeyboardAvoidingView // визначаємо ОС та налаштовуємо поведінку клавіатури
          behavior={Platform.OS === "ios" ? "padding" : "height"}
           keyboardVerticalOffset={-150}
        >
        <View style={styles.allWrap}>
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
              <Pressable style={styles.postPhoto}>
                <Image
                  source={require("../assets_new/photos/Content_Block.png")}
                />
              </Pressable>

              <Pressable style={styles.ellipse} onPress={openCamera}>
                <Ionicons
                  name="ios-camera"
                  size={24}
                  color="#BDBDBD"
                  style={styles.photoCam}
                />
              </Pressable>
              {capturedPhoto ? (
                <Image
                  style={styles.previewImage}
                  source={{ uri: capturedPhoto }}
                />
              ) : (
                <Camera style={styles.camera} />
              )}
            </View>
            <Pressable onPress={openGallery}>
              <Text style={styles.cameraText}>
                {capturedPhoto ? "Редагувати фото" : "Завантажте фото"}
              </Text>
            </Pressable>
              {/* <Text style={styles.downloadPhoto}>Завантажте фото</Text> */}
              
            <KeyboardAvoidingView // визначаємо ОС та налаштовуємо поведінку клавіатури
              behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
              <View style={styles.inputsWrap}>
                <TextInput
                  // style={styles.input}
                  style={
                    focused === "namePost"
                      ? { ...styles.input, ...styles.focusedInput }
                      : { ...styles.input }
                  }
                  placeholder="Назва"
                  value={namePost.trimStart()}
                  onChangeText={setNamePost}
                  onFocus={() => setFocused("namePost")}
                  onBlur={() => setFocused(null)}
                />
                <View style={styles.inputLoc}>
                  <Ionicons
                    name="ios-location-outline"
                    size={24}
                    color="#BDBDBD"
                    style={styles.ico}
                  />
                  <TextInput
                    // style={styles.inputLoc}
                    style={
                      focused === "location"
                        ? { ...styles.input, ...styles.focusedInput }
                        : { ...styles.input }
                    }
                    placeholder="Місцевість..."
                    // value={locate}
                    value={
                      convertedCoordinate
                        ? `${convertedCoordinate.region}, ${convertedCoordinate.country}`
                        : null
                    }
                    onChangeText={setLocation}
                    onFocus={() => setFocused("location")}
                    onBlur={() => setFocused(null)}
                  />
                </View>
              </View>
            </KeyboardAvoidingView>

            {/* <Pressable
              style={styles.button}
              onPress={newPost}>
              <Text style={styles.btnText}>Опублікувати</Text>
            </Pressable> */}
            <Pressable
              style={
                isDisabledPublishBtn
                  ? {
                      ...styles.button,
                      backgroundColor: "#F6F6F6",
                      color: "#BDBDBD",
                    }
                  : { ...styles.button, backgroundColor: "#FF6C00" }
              }
              disabled={isDisabledPublishBtn}
              onPress={publishPhoto}
            >
              <Text
                style={
                  isDisabledPublishBtn
                    ? { ...styles.btnText, color: "#BDBDBD" }
                    : { ...styles.btnText, color: "#FFFFFF" }
                }
              >
                {location || !capturedPhoto
                  ? "Опублікувати"
                  : "Завантаження..."}
              </Text>
            </Pressable>

            <Pressable
              style={styles.delButton}
              onPress={() => {
                setCapturedPhoto(null);
                setNamePost("");
                setConvertedCoordinate(null);
                console.log("Delete");
              }}
            >
              <AntDesign name="delete" size={24} color="#BDBDBD" />
            </Pressable>
          </View>
        </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "flex-end",
    flex: 1,
    // paddingLeft: 16,
    // paddingRight: 16,
    // backgroundColor: "#fff",
  },
  allWrap: {
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
    // position: "relative",
  },
  // postPhoto: {
  //   marginBottom: 8,
  //   alignSelf: "center",
  // },
  previewImage: {
    marginBottom: 8,
    alignSelf: "center",
  },
  // camera: {
  //   height: 240,
  // },
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
  cameraText: {
    marginBottom: 32,
    marginTop: 8,
    // fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#BDBDBD",
  },
  // downloadPhoto: {
  //   fontSize: 16,
  //   color: "#BDBDBD",
  //   marginBottom: 32,
  // },
  input: {
    height: 50,
    color: "#212121",
    borderColor: "#E8E8E8",
    fontSize: 16,
    borderBottomWidth: 1,
    marginBottom: 16,
  },
  focusedInput: {
    borderColor: "#FF6C00",
    // borderWidth: 2,
    // color: "#000",
    color: "#FF6C00",
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
    // backgroundColor: "#F6F6F6",
    borderRadius: 100,
    marginTop: 16,
    marginBottom: 70,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 32,
    paddingRight: 32,
  },
  // focusedButton: {
  //   borderColor: "#FF6C00",
  //   // borderWidth: 2,
  //   // color: "#000",
  //   color: "#FF6C00",
  // },
  btnText: {
    fontSize: 16,
    // color: "#fff",
    // color: "#BDBDBD",
    textAlign: "center",
  },
  delButton: {
    // backgroundColor: "#FF6C00",
    alignSelf: "center",
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 23,
    paddingRight: 23,
    marginBottom: 20,
    // justifyContent: "flex-end",
    // alignItems: "center",
    // justifyContent: "center",
  },
});

export default CreatePostsScreen;
