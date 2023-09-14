import React from "react";
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
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../redux/selectors";
import { Feather } from "@expo/vector-icons";
import { postsCollectionRef } from "../firebase/postsFirebaseOperation";
import { onSnapshot, query, orderBy } from "firebase/firestore";
// import Photo_2 from "../assets_new/photos/Photo_2.png";
import { auth } from "../firebase/config";
import { logOut } from "../redux/authSlice";

const Post = () => {
  const [post, setPost] = useState([]);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const authState = useSelector(selectUser);

  // console.log("authState", authState);

  useEffect(() => {
    const q = query(postsCollectionRef, orderBy("createdatetime", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      //console.log('newdata - ', newData);
      setPost(newData);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const userLogOut = () => {
    auth
      .signOut()
      .then(() => {
        dispatch(logOut());
        navigation.navigate("Login");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Публікації</Text>
        <Pressable
          style={styles.logOut}
          // onPress={() => navigation.navigate("Login")}
          onPress={userLogOut}
        >
          <Image source={require("../assets_new/icons/log-out.png")} />
        </Pressable>
      </View>

      <View style={styles.profileWrap}>
        <Image
          // source={require("../assets_new/photos/Ava_Romanova.png")}
          source={{ uri: authState.photoURL }}
          // resizeMode="cover"
          style={styles.imageAvatar}
        ></Image>
        <View style={styles.userInfoWrap}>
          {/* <Text style={styles.name}>Natali Romanova</Text>
          <Text style={styles.email}>email@example.com</Text> */}
          <Text style={styles.name}>{authState.displayName}</Text>
          <Text style={styles.email}>{authState.email}</Text>
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
            // latitude,
            // longitude,
            location: { latitude, longitude },
            convertedCoordinate: { region, country },
            commentsCount,
            uid,
          },
        }) => {
          return (
            <View style={styles.subContainer} key={id}>
              <View style={styles.imageContainer}>
                {/* <Image source={Photo_2} style={styles.image} /> */}
                <Image source={{ uri: photo }} style={styles.imagePost} />
              </View>
              <Text style={[{ ...styles.text, ...styles.namePost }]}>
                {namePost}
              </Text>
              <View style={styles.infoThumb}>
                <Pressable
                  style={styles.info}
                  onPress={() =>
                    navigation.navigate("Comments", {
                      photo,
                      namePost,
                      id,
                      uid,
                    })
                  }
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
  imageAvatar: {
    width: 60,
    height: 60,
    borderRadius: 16,
    marginBottom: 10,
  },
  userInfoWrap: {
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
    // marginTop: 10,
    // alignItems: "center",
  },
  imagePost: {
    height: 240,
    borderRadius: 8,
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
