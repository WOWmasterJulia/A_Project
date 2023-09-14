import { Camera } from "expo-camera";
import { useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  Pressable,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import {
  MaterialIcons,
  Feather,
  AntDesign,
  Ionicons,
} from "@expo/vector-icons";

//import { selectAuthState } from "../redux/auth/authSelectors";
import { addPost } from "../redux/postSlice";
import {
  addPostFirebase,
  loadPhotoToServer,
} from "../firebase/postsFirebaseOperation";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../redux/selectors";

const CreatePostsScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [location, setLocation] = useState(null);
  const [convertedCoordinate, setConvertedCoordinate] = useState(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [namePost, setNamePost] = useState("");
  const [isDisabledPublishBtn, setIsDisabledPublishBtn] = useState(false);

  const authState = useSelector(selectUser);
  // console.log("Create authState ", authState.uid);

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
    try {
      const result = await ImagePicker.launchCameraAsync();
      if (!result.canceled && result.assets.length > 0) {
        const test = await MediaLibrary.createAssetAsync(result.assets[0].uri);
        setCapturedPhoto(result.assets[0].uri);
        const { coords } = await Location.getCurrentPositionAsync({});
        setLocation(coords);
        const address = await Location.reverseGeocodeAsync({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
        const { region, country } = address[0];
        setConvertedCoordinate({ region, country });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openGallery = async () => {
    const galleryResult = await ImagePicker.launchImageLibraryAsync();

    if (!galleryResult.canceled && galleryResult.assets.length > 0) {
      setCapturedPhoto(galleryResult.assets[0].uri);

      const { coords } = await Location.getCurrentPositionAsync();
      setLocation(coords);
      const address = await Location.reverseGeocodeAsync({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
      const { region, country } = address[0];
      setConvertedCoordinate({ region, country });
    }
  };

  // const publishPhoto = () => {
  //   if (location) {
  //     console.log({
  //       capturedPhoto,
  //       namePost,
  //       location,
  //       convertedCoordinate,
  //     });
  //     setCapturedPhoto(null);
  //     setNamePost("");
  //     setLocation(null);
  //     setConvertedCoordinate(null);
  //     navigation.navigate("Post");
  //   }
  // };

  const publishPhoto = async () => {
    try {
      let geoLocation = await Location.getCurrentPositionAsync({});
      if (location) {
        const photoFilename = Date.now().toString();
        const photo = await loadPhotoToServer(capturedPhoto, photoFilename);
        // console.log("loadPhoto to Storage 2", photo);
        const coords = {
          latitude: geoLocation.coords.latitude,
          longitude: geoLocation.coords.longitude,
        };
        setLocation(coords);
        const date = new Date();
        const testAnswer = await addPostFirebase({
          createdatetime: date,
          uid: authState.uid,
          namePost,
          convertedCoordinate,
          photo,
          photoFilename,
          location: {
            latitude: coords.latitude,
            longitude: coords.longitude,
          },
          commentsCount: 0,
        });
        dispatch(
          addPost({
            namePost,
            convertedCoordinate,
            photo,
            location,
            commentsNumber: 0,
          })
        );
        navigation.navigate("Post");
        setCapturedPhoto(null);
        setNamePost("");
        setLocation(null);
        setConvertedCoordinate(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const goBackPost = () => {
    setCapturedPhoto(null);
    setNamePost("");
    setLocation(null);
    setConvertedCoordinate(null);
    navigation.navigate("Post");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <KeyboardAvoidingView // визначаємо ОС та налаштовуємо поведінку клавіатури
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={-35}
        >
          <View>
            <View style={styles.header}>
              <Pressable
                style={styles.pressLogoff}
                // onPress={() => navigation.navigate("Post")}
                onPress={goBackPost}
              >
                <AntDesign name="arrowleft" size={22} color="black" />
              </Pressable>
              <Text style={styles.title}>Створити публікацію</Text>
            </View>

            <View style={styles.cameraContainer}>
              <View style={styles.cameraIconContainer}>
                <Pressable style={styles.cameraIcon} onPress={openCamera}>
                  <MaterialIcons name="camera-alt" size={24} color="#BDBDBD" />
                </Pressable>
              </View>
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
            {/* <KeyboardAvoidingView // визначаємо ОС та налаштовуємо поведінку клавіатури
              behavior={Platform.OS == "ios" ? "padding" : "height"}
            > */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Назва..."
                placeholderTextColor="#BDBDBD"
                value={namePost.trimStart()}
                onChangeText={setNamePost}
              />
              <View style={styles.inputLoc}>
                <Pressable style={styles.ico}>
                  {/* <Ionicons
                    name="ios-location-outline"
                    size={24}
                    color="#BDBDBD"
                  /> */}
                  <Feather name="map-pin" size={24} color="#BDBDBD" />
                </Pressable>

                <TextInput
                  style={{ ...styles.inputL }}
                  placeholder="Місцевість..."
                  placeholderTextColor="#BDBDBD"
                  value={
                    convertedCoordinate
                      ? `${convertedCoordinate.region}, ${convertedCoordinate.country}`
                      : null
                  }
                />
              </View>
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
                      ? {
                          ...styles.buttonTitle,
                          color: "#BDBDBD",
                        }
                      : { ...styles.buttonTitle, color: "#FFFFFF" }
                  }
                >
                  {location || !capturedPhoto
                    ? "Опублікувати"
                    : "Завантаження..."}
                </Text>
              </Pressable>
            </View>
            {/* </KeyboardAvoidingView> */}
          </View>

          <View
            style={{
              alignItems: "center",
              marginBottom: 34,
            }}
          >
            <Pressable
              style={styles.buttonDelete}
              onPress={() => {
                setCapturedPhoto(null);
                setNamePost("");
                setConvertedCoordinate(null);
                console.log("Delete");
              }}
            >
              <Feather name="trash-2" size={24} color="#BDBDBD" />
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    paddingHorizontal: 16,
    backgroundColor: "#ffffff",
    flex: 1,
    // justifyContent: "space-between",

    // justifyContent: "flex-end",
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
    marginLeft: 60,
    // alignSelf: 'center',
    // justifyContent: 'center',
  },
  pressLogoff: {
    alignSelf: "center",
    marginLeft: 12,
    paddingRight: 10,
  },
  cameraContainer: {
    position: "relative",
    marginTop: 32,
    borderRadius: 8,
    overflow: "hidden",
  },
  cameraIconContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -30 }, { translateY: -30 }],
    zIndex: 1,
  },
  cameraIcon: {
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: "#FFFFFF4D",
  },
  camera: {
    height: 240,
  },
  cameraText: {
    marginTop: 8,
    // fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#BDBDBD",
  },
  inputContainer: {
    marginTop: 32,
  },
  input: {
    gap: 16,
    borderBottomWidth: 1,
    paddingTop: 16,
    paddingBottom: 15,
    // fontFamily: "Roboto-Regular",
    fontSize: 16,
    borderBottomColor: "#E8E8E8",
    color: "#212121",
  },
  ico: {
    position: "absolute",
    top: 10,
  },
  inputLoc: {
    position: "relative",
    flexDirection: "row",
    height: 50,
    // color: "#212121",
    borderColor: "#E8E8E8",
    fontSize: 16,
    borderBottomWidth: 1,
    // marginBottom: 16,
    paddingLeft: 30,
  },
  inputL: {
    gap: 16,
    // borderBottomWidth: 1,
    paddingTop: 16,
    paddingBottom: 15,
    // fontFamily: "Roboto-Regular",
    fontSize: 16,
    // borderBottomColor: "#E8E8E8",
    color: "#212121",
  },

  button: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    marginTop: 32,
    borderRadius: 100,
    marginBottom: 70,
  },

  buttonTitle: {
    textAlign: "center",
    fontSize: 16,
    // fontFamily: "Roboto-Regular",
    lineHeight: 19,
  },
  previewImage: {
    height: 240,
    borderRadius: 8,
  },
  buttonDelete: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F6F6F6",
    // justifyContent: "flex-end",
  },
});

export default CreatePostsScreen;
