import React, {useState} from 'react';
import { StyleSheet, ImageBackground, Image, Text, TextInput, View, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Pressable } from 'react-native';
import Background from '../assets_new/photos/Photo_BG.png';
import { useNavigation } from '@react-navigation/native';

export default function Login() { 

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
            keyboardVerticalOffset={-50}>
            <View style={styles.loginWrap}>
              {/* <Image source={require('../assets_new/photos/Add_Ava.png')} resizeMode="cover" style={styles.image}></Image> */}
              <Text style={styles.title}>Увійти</Text>
              <TextInput
                style={styles.input}
                placeholder="Адреса електронної пошти"
                value={email}
                onChangeText={setEmail}
              />
              <TextInput
                style={styles.input}
                placeholder="Пароль"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
              />
              <Pressable
                style={styles.buttonLogin}
                onPress={() => navigation.navigate("Registration")}
              >
                <Text style={styles.btnLog}>Увійти</Text>
              </Pressable>
              <Pressable
                style={styles.buttonEntrance}
                onPress={() => navigation.navigate("Registration")}
              >
                <Text style={styles.text}>Немає акаунту? Зареєструватися</Text>
              </Pressable>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: "flex-end",
 },
  loginWrap: {
    backgroundColor: '#fff',
    paddingBottom: 79,
    paddingLeft: 16,
    paddingRight: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'stretch',
  },

  title: {
    fontSize: 30,
    color: '#212121',
    textAlign: 'center',
    marginTop: 32,
    marginBottom: 33,
  },
  input: {
    height: 50,
    color: '#212121',
    borderColor: '#E8E8E8',
    borderRadius: 6,
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 16,    
  },
  buttonLogin: {
    backgroundColor: '#FF6C00',
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
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: '#1B4371',
    textAlign: 'center',
  },
    
});