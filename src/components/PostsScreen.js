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
  FlatList,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
// import Comments from "./CommentsScreen.js";
import { Feather } from "@expo/vector-icons";
import Photo_2 from "../assets_new/photos/Photo_2.png";

const Post = () => {
    
  const navigation = useNavigation();
  const post = [
    {
      id: 1,
      photo: "../assets_new/photos/Photo_2.png",
      namePost: "Kyev sea",
      latitude: 50.420985224801235,
      longitude: 30.4675226163555,
      convertedCoordinate: { region: "Kyev", country: "Ukraine" },
      commentsCount: 15,
    },
  ];


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
      {/* <Pressable
        style={styles.postStyle}
        onPress={() => navigation.navigate("Comments")}
      >
        <Image source={require("../assets_new/photos/Photo_2.png")} />
      </Pressable> */}
      {/* <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Login")}>
        <Text style={styles.btnText}>Змінити аккаунт через логін</Text>
      </Pressable> */}
      <FlatList
        data={post}
        renderItem={({
          item: {
            id,
            photo,
            namePost,
            latitude,
            longitude,
            convertedCoordinate: { region, country },
            commentsCount,
          },
        }) => {
          return (
            <View style={styles.subContainer}>
              <View style={styles.imageContainer}>
                <Image source={Photo_2} style={styles.image} />
              </View>
              <Text style={[{ ...styles.text, ...styles.namePost }]}>
                {namePost}
              </Text>
              <View style={styles.infoThumb}>
                <Pressable
                  style={styles.info}
                  onPress={() => navigation.navigate("Comments")}
                >
                  <Feather
                    name="message-circle"
                    size={24}
                    color="#BDBDBD"
                    style={[
                      { transform: [{ rotate: "-90deg" }] },
                      commentsCount
                        ? { color: "#FF6C00" }
                        : { color: "#BDBDBD" },
                    ]}
                  />
                  <Text
                    style={[
                      styles.textComment,
                      commentsCount
                        ? { color: "#212121" }
                        : { color: "#BDBDBD" },
                    ]}
                  >
                    {commentsCount}
                  </Text>
                </Pressable>
                <Pressable
                  style={styles.info}
                  onPress={() => {
                    navigation.navigate("Map", {
                      photo,
                      namePost,
                      latitude,
                      longitude,
                    });
                  }}
                >
                  <Feather name="map-pin" size={24} color="#BDBDBD" />
                  <Text
                    style={[{ ...styles.text, ...styles.locationText }]}
                  >{`${region}, ${country}`}</Text>
                </Pressable>
              </View>
            </View>
          );
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingLeft: 16,
    // paddingRight: 16,
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
    // alignSelf: "flex-start",
    // justifyContent: "flex-start",
    // gap: 8,
    flexDirection: "row",
    marginTop: 32,

    paddingLeft: 16,
  },
  // image: {
  //   width: 60,
  //   height: 60,
  // },
  userInfotWrap: {
    flexDirection: "column",
    paddingLeft: 8,
  },
  name: {
    fontSize: 13,
    color: "#212121",
  },
  email: {
    fontSize: 11,
    color: "#212121",
  },
  postStyle: {
    alignSelf: "center",
    marginTop: 15,
  },
  subContainer: {
    paddingHorizontal: 16,
    marginBottom: 32,
    marginTop: 10,
    // alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: "#212121",
  },
  namePost: {
    marginVertical: 8,
    // fontFamily: "Roboto-Medium",
  },
  infoThumb: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  info: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  textComment: {
    // fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#BDBDBD",
  },
  locationText: {
    // fontFamily: "Roboto-Regular",
    textDecorationLine: "underline",
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

export default Post;