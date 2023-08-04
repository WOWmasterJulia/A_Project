import React, {useState} from 'react';
import { StyleSheet, ImageBackground, Image, Text, TextInput, View, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Button, TouchableHighlight, Pressable } from 'react-native';
import Background from '../assets_new/photos/Photo_BG.png';

import { useNavigation } from '@react-navigation/native';



export default function Registration() {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const navigation = useNavigation();
  
  return (
    
      <ImageBackground source={Background} resizeMode="cover" style={styles.background}> 
        <View style={styles.container}>
         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView // визначаємо ОС та налаштовуємо поведінку клавіатури
            behavior={Platform.OS === "ios" ? "padding" : "height"}>
          
        <View>
          <View style={styles.Wrap}>
            <Image source={require('../assets_new/photos/Add_Ava.png')} resizeMode="cover" style={styles.image}></Image>
            <Pressable style={styles.buttonAdd}
              onPress={() => navigation.navigate("Text")}>
              <Image source={require('../assets_new/icons/add.png')}style={styles.btnAdd}></Image> 
            </Pressable>
          </View>
          
          <View style={styles.registrationWrap}>
            <Text style={styles.title}>Реєстрація</Text>
            <View style={styles.inputsWrap}>
                <TextInput style={styles.input} placeholder="Логін"
                value={login}
                onChangeText={setLogin}/>
                <TextInput style={styles.input} placeholder="Адреса електронної пошти"
                value={email}
                onChangeText={setEmail}/> 
                <TextInput style={styles.input} placeholder="Пароль"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true} />
            </View> 
          </View>
        </View>
          </KeyboardAvoidingView>
          </TouchableWithoutFeedback>

          <View style={styles.btnWrap}>
              <Pressable style={styles.buttonRegistration}
                onPress={() => navigation.navigate("Posts")}>
                <Text style={styles.btnReg}>Зареєстуватися</Text>
              </Pressable>
              <Pressable style={styles.buttonEntrance}
                onPress={() => navigation.navigate("Login")}>
                <Text style={styles.text}>Вже є акаунт? Увійти</Text>
              </Pressable>
          </View> 
        </View>
      </ImageBackground>
    
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: "flex-end",
    // flex: 1,
  // backgroundColor: '#fff',
    // alignItems: 'center',
  // justifyContent: 'center',
    // justifyContent: "flex-end",
    // paddingBottom: 30,
   },
  registrationWrap: {
    backgroundColor: '#fff',
    // marginTop: 163,
    // paddingBottom: 79,
    paddingLeft: 16,
    paddingRight: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'stretch',   
    // justifyContent: "flex-end", 
  },

  background: {
    // flex: 1,
    height: '100%',
    justifyContent: 'flex-end',
  },


  image: {
    flex: 1,
    width: 132,
    height: 132,
    marginTop: -60,  
    alignSelf: 'center', 
    position: 'absolute',
    marginBottom: 30,
  },
  buttonAdd: {
    // position: 'absolute',
    marginTop: 21,
    marginLeft: 245,
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
  btnWrap: {
    backgroundColor: '#fff',
    paddingLeft: 16,
    paddingRight: 16,
  },
  buttonRegistration: {
    backgroundColor: '#FF6C00',
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
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: '#1B4371',
    textAlign: 'center',
    paddingBottom: 79,
  },
    
});