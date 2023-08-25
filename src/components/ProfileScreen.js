import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Profile = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Profile!</Text>
    </View>
  );
};

export default Profile;

// import React, { useState } from "react";
// import {
//   View,
//   Image,
//   Alert,
//   Text,
//   StyleSheet,
//   Pressable,
//   TextInput,
//   KeyboardAvoidingView,
//   Platform,
//   TouchableWithoutFeedback,
//   Keyboard,
//   TouchableHighlight,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { Ionicons, AntDesign } from "@expo/vector-icons";
// import Map from "./MapScreen.js";
// const CreatePost = () => {
//   const navigation = useNavigation();
//   const [text, setText] = useState("");
//   const [locate, setLocate] = useState("");
//   const [focused, setFocused] = useState(null);
//   // отримання даних з форми
//   const newPost = () => {
//     // console.log({ text, locate});
//     // Alert.alert("text and locate :", `${text}, ${locate}`);
//     navigation.navigate("Post");
//     // navigation.navigate("Home");
//     // очищення форми
//     setText("");
//     setLocate("");
//   };
//   return (
//     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//       <View style={{ height: "100%", justifyContent: "flex-end" }}>
//         <KeyboardAvoidingView // визначаємо ОС та налаштовуємо поведінку клавіатури
//           behavior={Platform.OS === "ios" ? "padding" : "height"}
//           keyboardVerticalOffset={-150}
//         >
//           <View style={styles.allWrap}>
//             <View style={styles.header}>
//               <Pressable
//                 style={styles.pressLogoff}
//                 onPress={() => navigation.navigate("Post")}
//               >
//                 <AntDesign name="arrowleft" size={22} color="black" />
//               </Pressable>
//               <Text style={styles.title}>Створити публікацію</Text>
//             </View>
//             <View style={styles.createWrap}>
//               <View style={styles.photoWrap}>
//                 <Pressable
//                   style={styles.postPhoto}
//                   // onPress={() => navigation.navigate("Comments")}
//                 >
//                   <Image
//                     source={require("../assets_new/photos/Content_Block.png")}
//                   />
//                 </Pressable>
//                 <Pressable style={styles.ellipse} onPress={() => PhotoCamera}>
//                   <Ionicons
//                     name="ios-camera"
//                     size={24}
//                     color="#BDBDBD"
//                     style={styles.photoCam}
//                   />
//                 </Pressable>
//               </View>
//               <Text style={styles.downloadPhoto}>Завантажте фото</Text>
//               <KeyboardAvoidingView // визначаємо ОС та налаштовуємо поведінку клавіатури
//                 behavior={Platform.OS == "ios" ? "padding" : "height"}
//                 //  keyboardVerticalOffset={-50}
//                 // style={{ flex: 1 }}
//               >
//                 <View style={styles.inputsWrap}>
//                   <TextInput
//                     // style={styles.input}
//                     style={
//                       focused === "text"
//                         ? {
//                             ...styles.input,
//                             ...styles.focusedInput,
//                           }
//                         : { ...styles.input }
//                     }
//                     placeholder="Назва"
//                     value={text}
//                     onChangeText={setText}
//                     onFocus={() => setFocused("text")}
//                     onBlur={() => setFocused(null)}
//                   />
//                   <View style={styles.inputLoc}>
//                     <Ionicons
//                       name="ios-location-outline"
//                       size={24}
//                       color="#BDBDBD"
//                       style={styles.ico}
//                     />
//                     <TextInput
//                       // style={styles.inputLoc}
//                       style={
//                         focused === "locate"
//                           ? {
//                               ...styles.input,
//                               ...styles.focusedInput,
//                             }
//                           : { ...styles.input }
//                       }
//                       placeholder="Місцевість..."
//                       value={locate}
//                       onChangeText={setLocate}
//                       onFocus={() => setFocused("locate")}
//                       onBlur={() => setFocused(null)}
//                     />
//                   </View>
//                 </View>
//               </KeyboardAvoidingView>
//               <Pressable
//                 style={styles.button}
//                 // style={
//                 //   focused === "button"
//                 //     ? { ...styles.button, ...styles.focusedButton }
//                 //     : { ...styles.button }
//                 // }
//                 // onPress={() => navigation.navigate("Login")}
//                 onPress={newPost}
//                 // onFocus={() => setFocused("button")}
//                 // onBlur={() => setFocused(null)}
//               >
//                 <Text style={styles.btnText}>Опублікувати</Text>
//               </Pressable>
//               <Pressable
//                 style={styles.delButton}
//                 // onPress={() => navigation.navigate("Login")}
//               >
//                 <AntDesign name="delete" size={24} color="#BDBDBD" />
//               </Pressable>
//             </View>
//           </View>
//         </KeyboardAvoidingView>
//       </View>
//     </TouchableWithoutFeedback>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     height: "100%",
//     // justifyContent: "flex-end",
//     flex: 1,
//     // paddingLeft: 16,
//     // paddingRight: 16,
//     // backgroundColor: "#fff",
//   },
//   allWrap: {
//     // flex: 1,
//     paddingLeft: 16,
//     paddingRight: 16,
//     backgroundColor: "#fff",
//   },
//   header: {
//     flexDirection: "row",
//     marginTop: 44,
//     paddingBottom: 11,
//     justifyContent: "flex-start",
//     borderBottomWidth: 1,
//     borderColor: "#E8E8E8",
//   },
//   title: {
//     backgroundColor: "#FFFFFF",
//     fontSize: 17,
//     paddingBottom: 5,
//     marginLeft: 80,
//   },
//   pressLogoff: {
//     alignSelf: "center",
//     marginLeft: 12,
//     paddingRight: 10,
//   },
//   createWrap: {
//     alignItems: "center",
//     marginTop: 32,
//     alignItems: "stretch",
//     paddingLeft: 16,
//     paddingRight: 16,
//   },
//   photoWrap: {
//     alignItems: "center",
//     // position: "relative",
//   },
//   postPhoto: {
//     marginBottom: 8,
//     alignSelf: "center",
//   },
//   ellipse: {
//     flex: 1,
//     backgroundColor: "#fff",
//     width: 60,
//     height: 60,
//     borderRadius: 100,
//     alignItems: "center",
//     position: "absolute",
//     top: 90,
//   },
//   photoCam: {
//     position: "absolute",
//     top: 15,
//   },
//   downloadPhoto: {
//     fontSize: 16,
//     color: "#BDBDBD",
//     marginBottom: 32,
//   },
//   input: {
//     height: 50,
//     color: "#212121",
//     borderColor: "#E8E8E8",
//     fontSize: 16,
//     borderBottomWidth: 1,
//     marginBottom: 16,
//   },
//   focusedInput: {
//     borderColor: "#FF6C00",
//     // borderWidth: 2,
//     // color: "#000",
//     color: "#FF6C00",
//   },
//   ico: {
//     position: "absolute",
//     top: 10,
//   },
//   inputLoc: {
//     height: 50,
//     color: "#212121",
//     borderColor: "#E8E8E8",
//     fontSize: 16,
//     borderBottomWidth: 1,
//     marginBottom: 16,
//     paddingLeft: 30,
//   },
//   button: {
//     // backgroundColor: "#FF6C00",
//     backgroundColor: "#F6F6F6",
//     borderRadius: 100,
//     marginTop: 16,
//     marginBottom: 70,
//     paddingTop: 16,
//     paddingBottom: 16,
//     paddingLeft: 32,
//     paddingRight: 32,
//   },
//   // focusedButton: {
//   //   borderColor: "#FF6C00",
//   //   // borderWidth: 2,
//   //   // color: "#000",
//   //   color: "#FF6C00",
//   // },
//   btnText: {
//     fontSize: 16,
//     // color: "#fff",
//     color: "#BDBDBD",
//     textAlign: "center",
//   },
//   delButton: {
//     // backgroundColor: "#FF6C00",
//     alignSelf: "center",
//     backgroundColor: "#F6F6F6",
//     borderRadius: 20,
//     // marginBottom: 10,
//     paddingTop: 8,
//     paddingBottom: 8,
//     paddingLeft: 23,
//     paddingRight: 23,
//     marginBottom: 20,
//     justifyContent: "flex-end",
//   },
// });
// export default CreatePost;



// import { Camera } from "expo-camera";
// import { useEffect, useState } from "react";
// import {
//   Keyboard,
//   KeyboardAvoidingView,
//   StyleSheet,
//   View,
//   Image,
//   Text,
//   TextInput,
//   Pressable,
//   Platform,
//   TouchableWithoutFeedback,
// } from "react-native";
// import Toast from "react-native-toast-message";
// import { useNavigation } from "@react-navigation/native";
// import * as Location from "expo-location";
// import * as MediaLibrary from "expo-media-library";
// import * as ImagePicker from "expo-image-picker";
// import {
//   MaterialIcons,
//   Feather,
//   AntDesign,
//   Ionicons,
// } from "@expo/vector-icons";
// import { SimpleLineIcons } from "@expo/vector-icons";

// const CreatePostsScreen = () => {
//   const navigation = useNavigation();
//   const [hasPermission, setHasPermission] = useState(null);
//   const [location, setLocation] = useState(null);
//   const [convertedCoordinate, setConvertedCoordinate] = useState(null);
//   const [capturedPhoto, setCapturedPhoto] = useState(null);
//   const [namePost, setNamePost] = useState("");
//   const [isDisabledPublishBtn, setIsDisabledPublishBtn] = useState(false);

//   useEffect(() => {
//     (async () => {
//       const { status } = await Camera.requestCameraPermissionsAsync();
//       await MediaLibrary.requestPermissionsAsync();
//       await Location.requestForegroundPermissionsAsync();
//       setHasPermission(status === "granted");
//     })();
//   }, []);

//   useEffect(() => {
//     const disabled =
//       capturedPhoto !== null &&
//       namePost !== "" &&
//       convertedCoordinate !== null &&
//       location !== null
//         ? false
//         : true;
//     setIsDisabledPublishBtn(disabled);
//   }, [capturedPhoto, namePost, convertedCoordinate, location]);

//   if (hasPermission === null) {
//     return <View />;
//   }
//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   }

//   const openCamera = async () => {
//     const result = await ImagePicker.launchCameraAsync();

//     if (!result.canceled && result.assets.length > 0) {
//       await MediaLibrary.createAssetAsync(result.assets[0].uri);
//       setCapturedPhoto(result.assets[0].uri);

//       const { coords } = await Location.getCurrentPositionAsync();
//       setLocation(coords);

//       const address = await Location.reverseGeocodeAsync({
//         latitude: coords.latitude,
//         longitude: coords.longitude,
//       });
//       console.log(address);

//       const { region, country } = address[0];
//       setConvertedCoordinate({ region, country });
//     }
//   };

//   const openGallery = async () => {
//     const galleryResult = await ImagePicker.launchImageLibraryAsync();

//     if (!galleryResult.canceled && galleryResult.assets.length > 0) {
//       setCapturedPhoto(galleryResult.assets[0].uri);

//       const { coords } = await Location.getCurrentPositionAsync();
//       setLocation(coords);
//       const address = await Location.reverseGeocodeAsync({
//         latitude: coords.latitude,
//         longitude: coords.longitude,
//       });
//       const { region, country } = address[0];
//       setConvertedCoordinate({ region, country });
//     }
//   };

//   const publishPhoto = () => {
//     if (location) {
//       console.log({
//         capturedPhoto,
//         namePost,
//         location,
//         convertedCoordinate,
//       });
//       setCapturedPhoto(null);
//       setNamePost("");
//       setLocation(null);
//       setConvertedCoordinate(null);
//       navigation.navigate("Post");
//     }
//   };

//   return (
//     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//       <View style={styles.container}>
//         <KeyboardAvoidingView // визначаємо ОС та налаштовуємо поведінку клавіатури
//           behavior={Platform.OS === "ios" ? "padding" : "height"}
//           // keyboardVerticalOffset={-150}
//         >
//           <View>
//             <View style={styles.header}>
//               <Pressable
//                 style={styles.pressLogoff}
//                 onPress={() => navigation.navigate("Post")}
//               >
//                 <AntDesign name="arrowleft" size={22} color="black" />
//               </Pressable>
//               <Text style={styles.title}>Створити публікацію</Text>
//             </View>

//             <View style={styles.cameraContainer}>
//               <View style={styles.cameraIconContainer}>
//                 <Pressable style={styles.cameraIcon} onPress={openCamera}>
//                   <MaterialIcons name="camera-alt" size={24} color="#BDBDBD" />
//                 </Pressable>
//               </View>
//               {capturedPhoto ? (
//                 <Image
//                   style={styles.previewImage}
//                   source={{ uri: capturedPhoto }}
//                 />
//               ) : (
//                 <Camera style={styles.camera} />
//               )}
//             </View>

//             <Pressable onPress={openGallery}>
//               <Text style={styles.cameraText}>
//                 {capturedPhoto ? "Редагувати фото" : "Завантажте фото"}
//               </Text>
//             </Pressable>
//             {/* <KeyboardAvoidingView // визначаємо ОС та налаштовуємо поведінку клавіатури
//               behavior={Platform.OS == "ios" ? "padding" : "height"}
//             > */}
//             <View style={styles.inputContainer}>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Назва..."
//                 placeholderTextColor="#BDBDBD"
//                 value={namePost.trimStart()}
//                 onChangeText={setNamePost}
//               />
//               <View style={styles.inputLoc}>
//                 <Pressable style={styles.ico}>
//                   <Ionicons
//                     name="ios-location-outline"
//                     size={24}
//                     color="#BDBDBD"
//                   />
//                 </Pressable>

//                 <TextInput
//                   style={{ ...styles.inputL }}
//                   placeholder="Місцевість..."
//                   placeholderTextColor="#BDBDBD"
//                   value={
//                     convertedCoordinate
//                       ? `${convertedCoordinate.region}, ${convertedCoordinate.country}`
//                       : null
//                   }
//                 />
//               </View>
//               <Pressable
//                 style={
//                   isDisabledPublishBtn
//                     ? {
//                         ...styles.button,
//                         backgroundColor: "#F6F6F6",
//                         color: "#BDBDBD",
//                       }
//                     : { ...styles.button, backgroundColor: "#FF6C00" }
//                 }
//                 disabled={isDisabledPublishBtn}
//                 onPress={publishPhoto}
//               >
//                 <Text
//                   style={
//                     isDisabledPublishBtn
//                       ? {
//                           ...styles.buttonTitle,
//                           color: "#BDBDBD",
//                         }
//                       : { ...styles.buttonTitle, color: "#FFFFFF" }
//                   }
//                 >
//                   {location || !capturedPhoto
//                     ? "Опублікувати"
//                     : "Завантаження..."}
//                 </Text>
//               </Pressable>
//             </View>
//             {/* </KeyboardAvoidingView> */}
//           </View>

//           <View
//             style={{
//               alignItems: "center",
//               marginBottom: 34,
//             }}
//           >
//             <Pressable
//               style={styles.buttonDelete}
//               onPress={() => {
//                 setCapturedPhoto(null);
//                 setNamePost("");
//                 setConvertedCoordinate(null);
//                 console.log("Delete");
//               }}
//             >
//               <Feather name="trash-2" size={24} color="#BDBDBD" />
//             </Pressable>
//           </View>
//         </KeyboardAvoidingView>
//       </View>
//     </TouchableWithoutFeedback>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     height: "100%",
//     paddingHorizontal: 16,
//     backgroundColor: "#ffffff",
//     flex: 1,
//     // justifyContent: "space-between",
//     justifyContent: "flex-end",
//   },
//   header: {
//     flexDirection: "row",
//     marginTop: 44,
//     paddingBottom: 11,
//     justifyContent: "flex-start",
//     borderBottomWidth: 1,
//     borderColor: "#E8E8E8",
//   },
//   title: {
//     backgroundColor: "#FFFFFF",
//     fontSize: 17,
//     paddingBottom: 5,
//     marginLeft: 30,
//     // alignSelf: 'center',
//     // justifyContent: 'center',
//   },
//   pressLogoff: {
//     alignSelf: "center",
//     marginLeft: 12,
//     paddingRight: 10,
//   },
//   cameraContainer: {
//     position: "relative",
//     marginTop: 32,
//     borderRadius: 8,
//     overflow: "hidden",
//   },
//   cameraIconContainer: {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: [{ translateX: -30 }, { translateY: -30 }],
//     zIndex: 1,
//   },
//   cameraIcon: {
//     justifyContent: "center",
//     alignItems: "center",
//     width: 60,
//     height: 60,
//     borderRadius: 60,
//     backgroundColor: "#FFFFFF4D",
//   },
//   camera: {
//     height: 240,
//   },
//   cameraText: {
//     marginTop: 8,
//     // fontFamily: "Roboto-Regular",
//     fontSize: 16,
//     color: "#BDBDBD",
//   },
//   inputContainer: {
//     marginTop: 32,
//   },
//   input: {
//     gap: 16,
//     borderBottomWidth: 1,
//     paddingTop: 16,
//     paddingBottom: 15,
//     // fontFamily: "Roboto-Regular",
//     fontSize: 16,
//     borderBottomColor: "#E8E8E8",
//     color: "#212121",
//   },
//   ico: {
//     position: "absolute",
//     top: 10,
//   },
//   inputLoc: {
//     position: "relative",
//     flexDirection: "row",
//     height: 50,
//     // color: "#212121",
//     borderColor: "#E8E8E8",
//     fontSize: 16,
//     borderBottomWidth: 1,
//     marginBottom: 16,
//     paddingLeft: 30,
//   },
//   inputL: {
//     gap: 16,
//     // borderBottomWidth: 1,
//     paddingTop: 16,
//     paddingBottom: 15,
//     // fontFamily: "Roboto-Regular",
//     fontSize: 16,
//     // borderBottomColor: "#E8E8E8",
//     color: "#212121",
//   },

//   button: {
//     paddingVertical: 16,
//     paddingHorizontal: 32,
//     marginTop: 32,
//     borderRadius: 100,
//   },

//   buttonTitle: {
//     textAlign: "center",
//     fontSize: 16,
//     // fontFamily: "Roboto-Regular",
//     lineHeight: 19,
//   },
//   previewImage: {
//     height: 240,
//     borderRadius: 8,
//   },
//   buttonDelete: {
//     justifyContent: "center",
//     alignItems: "center",
//     width: 70,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: "#F6F6F6",
//   },
// });

// export default CreatePostsScreen;