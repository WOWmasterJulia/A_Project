import React from "react";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  Pressable,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../redux/selectors";
import Photo_2 from "../assets_new/photos/Photo_2.png";

import {
  commentsCollectionRef,
  addCommentFirebase,
  updatePostCountCommentsFirebase,
} from "../firebase/postsFirebaseOperation";
import { onSnapshot, query, where, orderBy } from "firebase/firestore";
import { FlatList } from "react-native-gesture-handler";

const Comments = ({ route: { params } }) => {
  const authState = useSelector(selectUser);
  const [comments, setComments] = useState([]);
  const [inputComment, setInputComment] = useState("");
  const [visibileList, setVisibileList] = useState(false);
  const [focused, setFocused] = useState(null);
  const navigation = useNavigation();
  const { photo, namePost, id, uid } = params;
  //console.log("namePost, id, uid ", namePost, id, uid);
  //console.log('authState in Comments', authState.photoURL);

  useEffect(() => {
    const q = query(
      commentsCollectionRef,
      where("postid", "==", id),
      orderBy("postdatetime", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newData = [];
      snapshot.forEach((doc) => {
        newData.push(doc.data());
      });
      setComments(newData);
      if (comments.length > 0) {
        setVisibileList(true);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const onSaveComment = () => {
    const { comment } = inputComment;
    if (comment) {
      const date = new Date();
      addCommentFirebase({
        comment,
        postdatetime: date,
        postid: id,
        userName: authState.displayName,
        userAvatar: authState.photoURL,
        userUID: authState.uid,
        unixtime: date.getTime(),
      });
      updatePostCountCommentsFirebase(id, comments.length + 1);
      setInputComment("");
    }
  };
  const commentDatetime = (unixtime) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(unixtime).toLocaleString("uk-UA", options);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={-10}
        style={{ flex: 1, justifyContent: "flex-end", zIndex: 10 }}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Pressable
              style={styles.pressLogoff}
              onPress={() => navigation.navigate("Post")}
            >
              <AntDesign name="arrowleft" size={22} color="black" />
            </Pressable>
            <Text style={styles.title}>Коментарі</Text>
          </View>
          <View style={styles.wrapperPost}>
            <Image source={{ uri: photo }} style={styles.imagePost} />
            <Text style={styles.namePost}>{namePost}</Text>
          </View>
          {/* <View style={styles.wrapperComments}> */}
          {/* <Image
                source={require("../assets_new/photos/Ava_Ellipse.png")}
                style={styles.imageAvatar}
              /> */}
          {/* <View style={styles.textAllComments}>
                <Text style={styles.textComments}>
                  Really love your most recent photo. I’ve been trying to capture
                  the same thing for a few months and would love some tips!
                </Text>
                <Text style={styles.textDate}>09 червня, 2020 | 08:40</Text>
              </View> */}
          {/* </View> */}
          {/* <View style={styles.wrapperComments}>
              <View style={styles.textAllCommentsOwner}>
                <Text style={styles.textCommentsOwner}>
                  A fast 50mm like f1.8 would help with the bokeh. I’ve been using
                  primes as they tend to get a bit sharper images.
                </Text>
                <Text style={styles.textDateOwner}>09 червня, 2020 | 09:14</Text>
              </View>
              <Image
                source={require("../assets_new/photos/Ava_Romanova.png")}
                style={styles.imageAvatarOwner}
              />
            </View> */}
          {/* <View style={styles.wrapperInput}>
              <TextInput
                style={styles.input}
                placeholder="Коментувати"
                autoComlete="password"
                editable
                numberOfLines={1}
                maxLength={40}
              />
              <Pressable
                style={styles.inputArrow}
              >
                <AntDesign name="arrowup" size={22} color="white" />
              </Pressable>  
            </View>        */}
          {/* </View> */}
          <FlatList
            data={comments}
            renderItem={({
              item: { id, comment, userUID, userAvatar, userName, unixtime },
            }) => {
              return (
                <View
                  style={
                    userUID === authState.uid
                      ? {
                          ...styles.subContainer,
                          ...styles.subContainerReverse,
                        }
                      : { ...styles.subContainer }
                  }
                >
                  <Image
                    source={{ uri: userAvatar }}
                    style={styles.imageAvatar}
                  />
                  <View
                    style={
                      userUID === authState.uid
                        ? {
                            ...styles.commentWrapper,
                            ...styles.commentWrapperReverse,
                          }
                        : { ...styles.commentWrapper }
                    }
                  >
                    <Text style={styles.commentText}>{comment}</Text>
                    <Text
                      style={
                        userUID === authState.uid
                          ? {
                              ...styles.commentDate,
                              ...styles.commentDateReverse,
                            }
                          : { ...styles.commentDate }
                      }
                    >
                      {commentDatetime(unixtime)}
                    </Text>
                  </View>
                </View>
              );
            }}
            // keyExtractor={(item) => item.id}
          />
          <TextInput
            style={
              focused === "comment"
                ? { ...styles.input, ...styles.focusedInput }
                : { ...styles.input }
            }
            placeholder="Коментувати..."
            editable
            numberOfLines={1}
            maxLength={40}
            onChangeText={(value) =>
              setInputComment((prev) => ({ ...prev, comment: value }))
            }
            value={inputComment.comment}
            onFocus={() => setFocused("comment")}
            onBlur={() => setFocused(null)}
          />
          <Pressable style={styles.buttonSaveComment} onPress={onSaveComment}>
            <AntDesign name="arrowup" size={20} color="white" />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
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
    marginLeft: 120,
    // alignSelf: 'center',
    // justifyContent: 'center',
  },
  pressLogoff: {
    alignSelf: "center",
    marginLeft: 16,
    paddingRight: 10,
  },
  wrapperPost: {
    paddingHorizontal: 16,
    marginTop: 32,
    // marginBottom: 32,
    flexDirection: "column",
    // marginLeft: 16,
    // marginRight: 16,
    alignItems: "center",
  },
  imagePost: {
    height: 240,
    borderRadius: 8,
    // marginBottom: 32,
    marginBottom: 15,
    width: 383,
    // maxWidth: 383,
    // minWidth: 343,
  },

  namePost: {
    // fontFamily: "Roboto-Medium",
    fontWeight: 700,
    fontSize: 13,
  },

  subContainer: {
    paddingHorizontal: 16,
    paddingTop: 15,
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
  },
  subContainerReverse: {
    flexDirection: "row-reverse",
  },

  // wrapperComments: {
  //   flexDirection: "row",
  //   marginBottom: 24,
  //   paddingHorizontal: 16,
  //   marginLeft: 16,
  //   marginRight: 16,
  // },
  imageAvatar: {
    height: 28,
    width: 28,
    borderRadius: 16,
    // marginRight: 16,
    marginLeft: 12,
  },
  commentWrapper: {
    // width: 299,
    minWidth: 299,
    maxWidth: 320,
    marginLeft: 12,
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    backgroundColor: "#F6F6F6",
  },
  commentWrapperReverse: {
    borderTopRightRadius: 0,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  commentText: {
    // fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#212121",
  },
  commentDate: {
    // fontFamily: "Roboto-Regular",
    fontSize: 10,
    color: "#BDBDBD",
    alignSelf: "flex-end",
  },
  commentDateReverse: {
    alignSelf: "flex-start",
  },
  input: {
    marginBottom: 16,
    marginTop: 12,
    paddingLeft: 16,
    alignSelf: "center",
    // width: 343,
    maxWidth: 383,
    minWidth: 343,
    height: 50,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderRadius: 25,
    borderColor: "#E8E8E8",
  },
  // input: {
  //   maxWidth: 383,
  //   minWidth: 343,
  //   color: "#212121",
  //   borderColor: "#E8E8E8",
  //   borderWidth: 1,
  //   paddingLeft: 16,
  //   paddingVertical: 16,
  //   borderRadius: 100,
  //   fontSize: 16,
  // },

  focusedInput: {
    borderColor: "#FF6C00",
    borderWidth: 2,
  },
  buttonSaveComment: {
    position: "absolute",
    // right: 36,
    right: 45,
    bottom: 26,
    bottom: 24,
    width: 35,
    height: 35,
    backgroundColor: "#FF6C00",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 17,
  },
  // buttonSaveComment: {
  //   position: "absolute",
  //   right: 8,
  //   top: 8,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   textAlign: "center",
  //   width: 34,
  //   height: 34,
  //   borderRadius: 60,
  //   backgroundColor: "#FF6C00",
  // },

  // textAllComments: {
  //   backgroundColor: "#F6F6F6",
  //   padding: 16,
  //   position: "relative",
  //   borderRadius: 6,
  //   borderTopLeftRadius: 0,
  // },
  // textComments: {
  //   fontWeight: 700,
  //   fontSize: 13,
  //   marginBottom: 8,
  //   paddingBottom: 8,
  //   // marginRight: 16,
  // },
  // textDate: {
  //   fontWeight: 400,
  //   fontSize: 10,
  //   color: "#BDBDBD",
  //   position: "absolute",
  //   right: 16,
  //   bottom: 16,
  // },
  // imageAvatarOwner: {
  //   height: 28,
  //   width: 28,
  //   borderRadius: 16,
  //   marginLeft: 16,
  // },
  // textAllCommentsOwner: {
  //   backgroundColor: "#F6F6F6",
  //   padding: 16,
  //   borderRadius: 6,
  //   borderTopRightRadius: 0,
  // },
  // textCommentsOwner: {
  //   fontWeight: 700,
  //   fontSize: 13,
  //   marginBottom: 8,
  // },
  // textDateOwner: {
  //   fontWeight: 400,
  //   fontSize: 10,
  //   color: "#BDBDBD",
  // },

  // input: {
  //   maxWidth: 383,
  //   minWidth: 343,
  //   color: "#212121",
  //   borderColor: "#E8E8E8",
  //   borderWidth: 1,
  //   paddingLeft: 16,
  //   paddingVertical: 16,
  //   borderRadius: 100,
  //   fontSize: 16,
  // },
  // focusedInput: {
  //   borderColor: "#FF6C00",
  //   borderWidth: 2,
  // },
  // inputArrow: {
  //   position: "absolute",
  //   right: 8,
  //   top: 8,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   textAlign: "center",
  //   width: 34,
  //   height: 34,
  //   borderRadius: 60,
  //   backgroundColor: "#FF6C00",
  // },
});
export default Comments;
